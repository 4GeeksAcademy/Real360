import { useEffect, useState } from "react"

export const DashboardSummary = () => {
    const [totalIncome, setTotalIncome] = useState(0)

    useEffect(() => {
        const getIncomeSummary = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/dashboard/income/summary`
                )

                if (!response.ok) {
                    throw new Error("No se pudo cargar el resumen de ingresos")
                }

                const data = await response.json()

                setTotalIncome(data.total_income)
            } catch (error) {
                console.error(error)
            }
        }

        getIncomeSummary()
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Presupuesto</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Ingresos</h5>
                            <h3 className="text-success mt-3">
                                S/ {Number(totalIncome).toFixed(2)}
                            </h3>

                            <p className="card-text text-muted">
                                Total registrado este mes
                            </p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Egresos</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Deuda</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};