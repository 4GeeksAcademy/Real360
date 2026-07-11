import { useState, useEffect } from "react";

export const Payments = () => {

    const [selectedDebts, setSelectedDebts] = useState([]);
    const [unitDebts, setUnitDebts] = useState([]);

    useEffect(() => {
        const getUnitDebts = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/unit-debts`;
                const response = await fetch(url);
                const text = await response.text();
                const data = JSON.parse(text);

                console.log(data);

                if (!response.ok) {
                    throw new Error(data.msg || "No se pudieron cargar los datos");
                }

                setUnitDebts(data);
            } catch (error) {
                console.error("Error cargando los datos:", error);
            }
        };

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
        console.log("Deudas seleccionadas:", selectedDebts);
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
        </div>
    );
};