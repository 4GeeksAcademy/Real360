import { useState, useEffect } from "react"

export const ElectricityUsage = () => {

    const [electricityBills, setElectricityBills] = useState([])

    const saveBills = async () => {
        console.log(electricityBills)

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/electricity-usage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(electricityBills)
        }
        )
        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Respuesta:", data);

        if(response.ok){
            getData()
        }
    }

    const months = [
        {
            id: 1,
            name: "Enero"
        },
        {
            id: 2,
            name: "Febrero"
        },
        {
            id: 3,
            name: "Marzo"
        },
        {
            id: 4,
            name: "Abril"
        },
        {
            id: 5,
            name: "Mayo"
        },
        {
            id: 6,
            name: "Junio"
        },
        {
            id: 7,
            name: "Julio"
        },
        {
            id: 8,
            name: "Agosto"
        },
        {
            id: 9,
            name: "Septiembre"
        },
        {
            id: 10,
            name: "Octubre"
        },
        {
            id: 11,
            name: "Noviembre"
        },
        {
            id: 12,
            name: "Diciembre"
        }
    ]

    const getData = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/electricity-usage`)

            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response.json()
            })
            .then(responseAsJson => {
                console.log("Respuesta del servidor:", responseAsJson)
                const completeBills = months.map((month) => {
                    const bill = responseAsJson.find((bill) => Number(bill.month) === Number(month.id))
                    if (!bill) {
                        return {
                            id: `temp-${month.id}`,
                            month: month.id,
                            year: 2026,
                            period_start: "",
                            period_end: "",
                            supply_number: "",
                            supply_number_2: "",
                        }
                    }
                    return bill
                })

                console.log("Respuesta del servidor:");
                console.log(responseAsJson);

                setElectricityBills(completeBills);
            })
            .catch(error => {
                console.log('Looks like there was a problem: \n', error);
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const handleFieldChange = (id, field, value) => {

        const updateBills = electricityBills.map((bill) => {
            if (bill.id === id) {
                return {
                    ...bill,
                    [field]: value
                }
            }
            return bill
        })
        setElectricityBills(updateBills)
    }

    const firstBill = electricityBills[0]
    const yearBill = firstBill ? firstBill.year : 2026
    const provider = firstBill ? firstBill.provider : "Luz del Sur"

    return (
        <div className="d-flex row justify-content-center m-1">
            <div className="mb-4 text-center">
                <h2 className="fw-bold text-primary">Registro de Consumo de Luz</h2>
                <div className="d-flex justify-content-center gap-4 fs-5 text-secondary">
                    <span><strong>Proveedor:</strong> {provider}</span>
                    <span><strong>Periodo:</strong> {yearBill}</span>
                </div>
            </div>
            <table className="table table-bordered table striped text-center align-middle">
                <thead className="table-primary">
                    <tr className="bg-primary text-light">
                        <th >Mes</th>
                        <th >Lectura Anterior</th>
                        <th >Lectura Actual</th>
                        <th >Consumo S/ Nº sum 852121</th>
                        <th >Consumo S/ Nº sum 158250</th>
                        <th >Total S/</th>
                    </tr>
                </thead>
                <tbody>
                    {electricityBills.map((bill) => {

                        const currentMonth = months.find((m) => m.id === bill.month)
                        const nameMonth = currentMonth ? currentMonth.name : ""


                        return (
                            <tr key={bill.id}>
                                <td>
                                    <input type="text" className="form-control" value={nameMonth}></input>
                                </td>
                                <td>
                                    <input type="date" className="form-control" value={bill.period_start || ""} onChange={
                                        (event) => handleFieldChange(
                                            bill.id,
                                            "period_start",
                                            event.target.value
                                        )}></input>
                                </td>
                                <td>
                                    <input type="date" className="form-control" value={bill.period_end || ""} onChange={
                                        (event) => handleFieldChange(
                                            bill.id,
                                            "period_end",
                                            event.target.value
                                        )
                                    }></input>
                                </td>
                                <td>
                                    <input type="number" className="form-control" value={bill.supply_number || ""} onChange={
                                        (event) => handleFieldChange(
                                            bill.id,
                                            "supply_number",
                                            event.target.value
                                        )
                                    }></input>
                                </td>
                                <td>
                                    <input type="number" className="form-control" value={bill.supply_number_2 || ""} onChange={
                                        (event) => handleFieldChange(
                                            bill.id,
                                            "supply_number_2",
                                            event.target.value
                                        )
                                    }></input>
                                </td>
                                <td>{Number(bill.supply_number) + Number(bill.supply_number_2)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button type="button" className="btn btn-primary w-50" onClick={saveBills}>Guardar Cambios</button>
        </div>
    )
}