import { useState } from "react";

export const Payments = () => {

    const [selectedDebts, setSelectedDebts] = useState([]);

    const debts = [
        {
            id: 1,
            apartment: "701",
            month: "Junio",
            amount: 318.35
        },
        {
            id: 2,
            apartment: "502",
            month: "Junio",
            amount: 340.21
        },
        {
            id: 3,
            apartment: "801",
            month: "Junio",
            amount: 323.94
        },
        {
            id: 4,
            apartment: "802",
            month: "Junio",
            amount: 294.54
        },
        {
            id: 5,
            apartment: "703",
            month: "Junio",
            amount: 278.25
        },
        {
            id: 6,
            apartment: "302",
            month: "Junio",
            amount: 277.06
        }
    ];

    return (
        <div className="container mt-4">
            <h2 className="text-center">
                REPORTE DE DEUDA
            </h2>

            <p className="text-center">
                Fecha de corte:
                <strong> 05/07/2026</strong>
            </p>
            <table className="table table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>
                            Dpto.
                        </th>
                        <th>
                            Junio
                        </th>
                        <th>
                            Saldo Total
                        </th>
                        <th>
                            Seleccionar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {debts.map((debt)=>(
                        <tr key={debt.id}>
                            <td>
                                {debt.apartment}
                            </td>
                            <td>
                                {debt.amount.toFixed(2)}
                            </td>
                            <td>
                                {debt.amount.toFixed(2)}
                            </td>
                            <td className="text-center">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedDebts.includes(debt.id)
                                    }
                                />

                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <strong>TOTAL</strong>
                        </td>
                        <td>
                            <strong>
                                1832.35
                            </strong>
                        </td>
                        <td>
                            <strong>
                                1832.35
                            </strong>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            {
                selectedDebts.length > 0 &&
                <div className="mt-3">
                    <button  className="btn btn-success me-2"  >  💳 Pagar en línea  </button>
                    <button  className="btn btn-primary"  onClick={handleVoucher} > 📎 Adjuntar voucher  </button>
                </div>
            }
        </div>
    );
};