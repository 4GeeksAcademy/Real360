import { useState } from "react"

export const ElectricityUsage = () => {

    const [electricityBills, setElectricityBills] = useState({
        periodStart: "",
        periodEnd: "",
        supplyNumber: "",
        supplyNumber2: "",
    })

    const saveBills = async () => {
        console.log(electricityBills)

        const response = await fetch('https://scaling-funicular-g49wp9x6qw57c9p5q-3001.app.github.dev/api/electricity-usage', {
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
    }

    return (
        <div className="d-flex row justify-content-center m-1">
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
                    <tr>
                        <td>Enero</td>
                        <td><input type="date" className="form-control" value={electricityBills.periodStart} onChange={
                            (event) => setElectricityBills({
                                ...electricityBills,
                                periodStart: event.target.value
                            })} /></td>
                        <td><input type="date" className="form-control" value={electricityBills.periodEnd} onChange={
                            (event) => setElectricityBills({
                                ...electricityBills,
                                periodEnd: event.target.value
                            })
                        } /></td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" value={electricityBills.supplyNumber} onChange={
                                    (event) => setElectricityBills({
                                        ...electricityBills,
                                        supplyNumber: event.target.value
                                    })
                                } />
                            </div>
                        </td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" value={electricityBills.supplyNumber2} onChange={
                                    (event) => setElectricityBills({
                                        ...electricityBills,
                                        supplyNumber2: event.target.value
                                    })
                                } />
                            </div>
                        </td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" value={
                                    Number(electricityBills.supplyNumber || 0) + Number(electricityBills.supplyNumber2 || 0)
                                }
                                    readOnly />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Febrero</td>
                        <td><input type="date" className="form-control" /></td>
                        <td><input type="date" className="form-control" /></td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" />
                            </div>
                        </td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" />
                            </div>
                        </td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Marzo</td>
                        <td><input type="date" className="form-control" /></td>
                        <td><input type="date" className="form-control" /></td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" />
                            </div>
                        </td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" />
                            </div>
                        </td>
                        <td>
                            <div className="input-group">
                                <span className="input-group-text">S/</span>
                                <input type="number" className="form-control" placeholder="0.00" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" className="btn btn-primary w-50" onClick={saveBills}>Guardar Cambios</button>
        </div>
    )
}