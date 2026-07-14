import { useState, useEffect } from "react";

export const Payments = () => {

    const [selectedDebts, setSelectedDebts] = useState([]);
    const [unitDebts, setUnitDebts] = useState([]);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

        if (selectedDebts.includes(id)) {
            // Si ya estaba seleccionado, lo quitamos
            setSelectedDebts(
                selectedDebts.filter(debtId => debtId !== id)
            );
        } else {
            // Si no estaba seleccionado, lo agregamos
            setSelectedDebts([
                ...selectedDebts,
                id
            ]);
        }
    };

    const handleVoucher = () => {
        /*console.log("Deudas seleccionadas:", selectedDebts);*/
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentForm({
            ...paymentForm,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setPaymentForm({
            ...paymentForm,
            voucher: e.target.files[0]
        });

    };

    const handleSubmitPayment = async (e) => {

        e.preventDefault();

        if (saving) return;

        setSaving(true);

        const data = {
            debts: selectedDebts,
            ...paymentForm
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

            if (!response.ok) {
                throw new Error(result.msg || "Ocurrió un error.");
            }

            alert(result.msg);

            setShowModal(false);

            setSelectedDebts([]);

            setPaymentForm({
                operation_number: "",
                payment_date: "",
                description: "",
                currency: "PEN",
                amount: "",
                voucher: null
            });

            await getUnitDebts();

        } catch (error) {

            console.error(error);

            alert(error.message);

        } finally {

            setSaving(false);

        }

    };

    const today = new Date().toLocaleDateString("es-PE");

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h2 className="text-center">
                        REPORTE DE DEUDA
                    </h2>
                    <p className="text-center">  {/*Fecha de corte:  <strong> {today}</strong>*/} </p>
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
                            <button className="btn btn-primary me-2" onClick={handleVoucher} > 📎 Adjuntar voucher  </button>
                            <button className="btn btn-success" disabled >  💳 Pagar en línea  </button>
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
                                    Registrar pago
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}  >
                                </button>
                            </div>
                            <form onSubmit={handleSubmitPayment}>
                                <div className="modal-body">
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
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} > Cancelar </button>
                                    <button type="submit" className="btn btn-primary" disabled={saving} >  {saving ? "Guardando..." : "Guardar pago"} </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};