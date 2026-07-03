import { useState } from "react"
import { WaterBillForm } from "../components/WaterBillForm";
import { WaterUsageTable } from "../components/WaterUsageTable";
import "../css/WaterUsage.css"

export const WaterUsage = () => {
    const [showWaterBillModal, setShowWaterBillModal] = useState(false);

    return (
        <div className="container py-3 budget-container">
            <div className="container water-usage-header d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-primary fw-bold mb-0"> Registro de Consumo de Agua </h3>
                <button className="btn btn-primary" onClick={() => setShowWaterBillModal(true)} > Registrar recibo de agua </button>
            </div>

            {/*<WaterUsageTable />*/}

            <div className="d-flex justify-content-end mt-3">
                <button  className="btn btn-primary" /* onClick={handleSubmit} */ > Registrar consumo de agua </button>
            </div>

            {showWaterBillModal && (
                <WaterBillForm
                    onClose={() => setShowWaterBillModal(false)}
                />
            )}
        </div>
    );
};