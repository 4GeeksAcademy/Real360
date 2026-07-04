import { useState } from "react"
import { WaterBillForm } from "../components/WaterBillForm";
import { WaterUsageTable } from "../components/WaterUsageTable";
import "../css/WaterUsage.css"

export const WaterUsage = () => {
    const [showWaterBillModal, setShowWaterBillModal] = useState(false);

    const [waterBill, setWaterBill] = useState({ waterUsageM3Total: 0, waterBillTotal: 0 });


    const handleSaveWaterBill = (billData) => {
        setWaterBill({
            waterUsageM3Total: billData.water_usage_m3_total,
            waterBillTotal: billData.water_bill_total
        });

        setShowWaterBillModal(false);
    };


    return (
        <div className="container py-3 water-usage-container">
            <div className="container water-usage-header d-flex justify-content-between align-items-center mb-3">

                <h3 className="text-primary fw-bold mb-0"> Registro de Consumo de Agua </h3>

                <button className="btn btn-primary" onClick={() => setShowWaterBillModal(true)} > Registrar recibo de agua </button>
            </div>

            <WaterUsageTable waterUsageM3Total={waterBill.waterUsageM3Total} waterBillTotal={waterBill.waterBillTotal}  />

            <div className="d-flex justify-content-end">
                <button className="btn btn-primary w-100" /* onClick={handleSubmit} */ > Calcular consumo de agua </button>
            </div>
            {showWaterBillModal && (<WaterBillForm onClose={() => setShowWaterBillModal(false)} onSave={handleSaveWaterBill} />)}

        </div>
    );
};