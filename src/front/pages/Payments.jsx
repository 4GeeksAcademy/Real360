import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { ConstanciaPDF } from "../components/ConstanciaPDF.jsx";
import "../css/Payments.css"

export const Payments = () => {

    const [selectedDebts, setSelectedDebts] = useState([]);
    const [unitDebts, setUnitDebts] = useState([]);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [paymentSaved, setPaymentSaved] = useState(false);

    const [paymentForm, setPaymentForm] = useState({
        operation_number: "",
        payment_date: "",
        description: "",
        currency: "PEN",
        amount: "",
        voucher: null
    });

    const getUnitDebts = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/unit-debts`;
            const response = await fetch(url);
            const text = await response.text();
            const data = JSON.parse(text);

            if (!response.ok) {
                throw new Error(data.msg || "No se pudieron cargar los datos");
            }

            setUnitDebts(data);
        } catch (error) {
            console.error("Error cargando los datos:", error);
        }
    };

    useEffect(() => {
        getUnitDebts();

    }, []);

    const handleCheckboxChange = (id) => {

        setSelectedDebts(prev => {

            if (prev.includes(id)) {
                return prev.filter(debtId => debtId !== id);
            }

            return [...prev, id];

        });

    };

    const handleVoucher = () => {
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPaymentForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setPaymentForm(prev => ({
            ...prev,
            voucher: e.target.files[0]
        }));
    };

    const handleSubmitPayment = async (e) => {

        e.preventDefault();

        if (saving) return;

        setSaving(true);

        const data = {
            debts: selectedDebts,
            ...paymentForm,
            issue_date: new Date().toISOString()
        };

        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/payments`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            console.log("RESPUESTA BACKEND:", result);

            if (!response.ok) {
                throw new Error(result.msg || "Ocurrió un error.");
            }

            const pdfData = {
                ...data,
                receipt_number: result.payment.receipt_number,
                unit: result.payment.unit,
                debts_detail: unitDebts.filter(debt =>
                    selectedDebts.includes(debt.id)
                )
            };

            setPaymentSuccess(pdfData);

            setPaymentSaved(true);

            await getUnitDebts();

        } catch (error) {

            console.error(error);

            alert(error.message);

        } finally {

            setSaving(false);

        }

    };

    const handleCloseModal = () => {

        setShowModal(false);

        setPaymentSaved(false);

        setPaymentSuccess(null);

        setSelectedDebts([]);

        setPaymentForm({
            operation_number: "",
            payment_date: "",
            description: "",
            currency: "PEN",
            amount: "",
            voucher: null
        });

    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h2 className="text-center">
                        REPORTE DE DEUDA
                    </h2>
                    <table className="table table-bordered text-center align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th>
                                    Dpto.
                                </th>
                                <th>
                                    Mes
                                </th>
                                <th>
                                    Deuda
                                </th>
                                <th>
                                    Seleccionar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {unitDebts.map((debt) => (
                                <tr key={debt.id}>
                                    <td>
                                        {debt.unit_number}
                                    </td>
                                    <td>
                                        {debt.fee_year}/{debt.fee_month}
                                    </td>
                                    <td>
                                        {debt.pending_amount.toFixed(2)}
                                    </td>
                                    <td className="text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedDebts.includes(debt.id)}
                                            onChange={() => handleCheckboxChange(debt.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        selectedDebts.length > 0 &&
                        <div className="mt-4 d-flex justify-content-center">
                            <button className="btn btn-primary me-2" onClick={handleVoucher} > Registrar Pago  </button>
                            {/*<button className="btn btn-success" disabled >  💳 Pagar en línea  </button>*/}
                        </div>
                    }
                </div>
            </div>
            {
                showModal &&
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {paymentSaved ? "Constancia de pago" : "Registrar pago"}
                                </h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}  >
                                </button>
                            </div>
                            <form onSubmit={handleSubmitPayment}>
                                <div className="modal-body">

                                    {!paymentSaved ? (
                                        <>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label"> Fecha de pago </label>
                                                    <input type="date" className="form-control" name="payment_date" value={paymentForm.payment_date} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label"> Número de operación </label>
                                                    <input type="text" className="form-control" name="operation_number" value={paymentForm.operation_number} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"> Descripción </label>
                                                <textarea className="form-control" name="description" rows="1" value={paymentForm.description} onChange={handleChange} placeholder="Ingrese una descripción del pago" required />
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label"> Moneda  </label>
                                                    <select className="form-select" name="currency" value={paymentForm.currency} onChange={handleChange} >
                                                        <option value="PEN"> Soles (S/) </option>
                                                        <option value="USD"> Dólares ($) </option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label"> Monto pagado </label>
                                                    <input type="number" step="0.01" className="form-control" name="amount" value={paymentForm.amount} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"> Voucher de pago </label>
                                                <input type="file" className="form-control" accept="image/*,.pdf" onChange={handleFileChange} required />
                                            </div>
                                        </>

                                    ) : (
                                        <>
                                            <div className="text-center mb-3">
                                                <strong> Pago registrado correctamente</strong>
                                            </div>

                                            <div className="text-center">

                                                <PDFDownloadLink
                                                    document={<ConstanciaPDF datos={paymentSuccess} />}
                                                    fileName={`Constancia-${paymentSuccess.operation_number}.pdf`}
                                                    className="btn btn-outline-primary"
                                                >
                                                    {({ loading }) =>
                                                        loading
                                                            ? "Generando constancia..."
                                                            : "📄 Descargar constancia"
                                                    }

                                                </PDFDownloadLink>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="modal-footer">
                                    {!paymentSaved ? (
                                        <>
                                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal} >
                                                Cancelar
                                            </button>

                                            <button type="submit" className="btn btn-primary" disabled={saving} >
                                                {saving ? "Guardando..." : "Guardar pago"}
                                            </button>
                                        </>

                                    ) : (
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal} >
                                            Cerrar
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            }
        </div >
    );
};