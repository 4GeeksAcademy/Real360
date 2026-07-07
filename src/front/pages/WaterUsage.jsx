import { useState } from "react"
import { WaterBill } from "../components/WaterBill";
import { WaterUsageUnit } from "../components/WaterUsageUnit";
import "../css/WaterUsage.css"

export const WaterUsage = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [selectedSupplyNumber, setSelectedSupplyNumber] = useState("");

    const [showWaterBillModal, setShowWaterBillModal] = useState(false);

    const [waterBill, setWaterBill] = useState({
        provider: "",
        supply_number: "",
        year: "",
        month: "",
        period_start: "",
        period_end: "",
        currency: "",
        water_usage_total_m3: 0,
        water_usage_total_cost: 0,
        water_bill_attachment: null,
        building: ""
    });

    const waterUsageUnits = [
        {
            building: "Torre 1",
            unit_number: 101,
            meter_reading_m3: 25
        },
        {
            building: "Torre 1",
            unit_number: 301,
            meter_reading_m3: 30
        }
    ];

    const handleSaveWaterBill = (billData) => {

        const completeWaterBill = {
            ...billData,
            provider: "Sedapal",
            currency: "PEN",
            year: selectedYear,
            month: selectedMonth,
            supply_number: selectedSupplyNumber,
            building: selectedBuilding
        };

        console.log("Recibo completo:", completeWaterBill);

        setWaterBill(completeWaterBill);
        setShowWaterBillModal(false);
    };

    return (
        <div className="container py-3 water-usage-container">
            <div className="container water-usage-header d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3 className="text-primary fw-bold mb-0"> Registro de Consumo de Agua </h3>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowWaterBillModal(true)}
                    disabled={!selectedYear || !selectedMonth || !selectedBuilding || !selectedSupplyNumber}
                >
                    Registrar recibo de agua
                </button>
            </div>
            <div className="card shadow-sm mb-3">
                <div className="card-body">
                    {/*<h5 className="text-primary fw-bold mb-3"> Datos Generales </h5>*/}

                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Año</label>
                            <select className="form-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} >
                                <option value="">Seleccione</option>
                                <option value="2026">2026</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Mes</label>
                            <select className="form-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} >
                                <option value="">Seleccione</option>
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Edificio</label>
                            <select className="form-select" value={selectedBuilding} onChange={(e) => setSelectedBuilding(e.target.value)} >
                                <option value="">Seleccione</option>
                                <option value="Torre 1">Torre 1</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">N.° de suministro</label>
                            <select className="form-select" value={selectedSupplyNumber} onChange={(e) => setSelectedSupplyNumber(e.target.value)} >
                                <option value="">Seleccione</option>
                                <option value="2737811">2737811</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {waterBill.bill_number && (
                <div className="alert alert-success mb-3">
                    <strong>Recibo registrado correctamente.</strong>

                    <div className="mt-1">
                        Recibo: {waterBill.bill_number} ·
                        Consumo total: {waterBill.water_usage_total_m3} m³
                        Importe total: S/ {waterBill.water_usage_total_cost}
                    </div>
                </div>
            )}
            {!selectedYear || !selectedMonth || !selectedBuilding || !selectedSupplyNumber ? (
                <div className="alert alert-info">
                    Seleccione el año, mes, edificio y número de suministro para cargar las unidades.
                </div>
            ) : (
                <>
                    <div className="alert alert-primary">
                        Registre únicamente la lectura actual (m³) de cada contómetro.
                        La lectura anterior se obtendrá del último registro guardado.
                    </div>

                    <WaterUsageUnit
                        waterUsageM3Total={Number(waterBill.water_usage_m3_total)}
                        waterBillTotal={Number(waterBill.water_bill_total)}
                        waterUsageUnits={waterUsageUnits}
                    />

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary w-100" /* onClick={handleSubmit} */ > Calcular consumo de agua </button>
                    </div>
                </>
            )}
            {showWaterBillModal && (<WaterBill
                onClose={() => setShowWaterBillModal(false)}
                onSave={handleSaveWaterBill}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                selectedBuilding={selectedBuilding}
                selectedSupplyNumber={selectedSupplyNumber}
            />)}

        </div>
    );
};