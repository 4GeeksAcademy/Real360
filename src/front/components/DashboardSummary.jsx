import { useEffect, useState } from "react"

export const DashboardSummary = () => {
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalDebt, setTotalDebt] = useState(0)
    const [totalBudget, setTotalBudget] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    useEffect(() => {

        const getBudgetSummary = async () => {

            try {

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/budget/summary`

                const response = await fetch(url)


                if (!response.ok) {
                    throw new Error("No se pudo cargar el resumen de presupuesto")
                }

                const text = await response.text()

                const data = JSON.parse(text)

                setTotalBudget(data.total_budget)


            } catch (error) {

                console.error(error)

            }
        }

        const getIncomeSummary = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/income/summary`

                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error("No se pudo cargar el resumen de ingresos")
                }

                const text = await response.text()

                const data = JSON.parse(text)

                setTotalIncome(data.total_income)

            } catch (error) {
                console.error(error)
            }
        }

        const getExpensesSummary = async () => {

            try {

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/expenses/summary`

                console.log("URL egresos:", url)

                const response = await fetch(url)

                console.log("Status egresos:", response.status)


                if (!response.ok) {
                    throw new Error("No se pudo cargar el resumen de egresos")
                }


                const text = await response.text()

                console.log("Respuesta egresos:", text)


                const data = JSON.parse(text)

                setTotalExpenses(data.total_expenses)


            } catch (error) {

                console.error(error)

            }
        }

        const getDebtSummary = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/debt/summary`

                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error("No se pudo cargar el resumen de deuda")
                }

                const text = await response.text()

                const data = JSON.parse(text)

                setTotalDebt(data.total_debt)

            } catch (error) {
                console.error(error)
            }
        }

        getBudgetSummary()
        getIncomeSummary()
        getExpensesSummary()
        getDebtSummary()

    }, [])

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                Presupuesto
                            </h5>

                            <h3 className="text-primary mt-3">
                                S/ {Number(totalBudget).toFixed(2)}
                            </h3>

                        </div>
                        <div className="card-footer">
                            {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
                            <p className="card-text text-muted">
                                Presupuesto del mes
                            </p>
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
                        </div>
                        <div className="card-footer">
                            {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
                            <p className="card-text text-muted">
                                Ingresos del mes
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                Egresos
                            </h5>
                            <h3 className="text-danger mt-3">
                                S/ {Number(totalExpenses).toFixed(2)}
                            </h3>
                        </div>
                        <div className="card-footer">
                            {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
                            <p className="card-text text-muted">
                                Gastos del mes
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                Deuda
                            </h5>
                            <h3 className="text-warning mt-3">
                                S/ {Number(totalDebt).toFixed(2)}
                            </h3>
                        </div>
                        <div className="card-footer">
                            {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
                            <p className="card-text text-muted">
                                Deuda total acomulada
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};