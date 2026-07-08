import { useState, useEffect } from "react";
import { WaterBill } from "../components/WaterBill";
import { WaterUsageUnit } from "../components/WaterUsageUnit";
import "../css/WaterUsage.css"

export const WaterUsage = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [selectedSupplyNumber, setSelectedSupplyNumber] = useState("");

    const [showWaterBillModal, setShowWaterBillModal] = useState(false);

    const [previousWaterUsageUnits, setPreviousWaterUsageUnits] = useState([]);

    const [waterBill, setWaterBill] = useState({
        provider: "Sedapal",
        supply_number: "",
        year: "",
        month: "",
        period_start: "",
        period_end: "",
        currency: "PEN",
        water_usage_total_m3: 0,
        water_usage_total_cost: 0,
        water_bill_attachment: null,
        building: ""
    });

    useEffect(() => {
        if (selectedYear && selectedMonth && selectedSupplyNumber) {
            getPreviousWaterUsageUnits();
            getWaterBill();
        }
    }, [selectedYear, selectedMonth, selectedSupplyNumber]);

    const getPreviousWaterUsageUnits = async () => {
        setPreviousWaterUsageUnits([]);

        try {

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/water-usage-units/previous?provider=Sedapal&supply_number=${selectedSupplyNumber}&year=${selectedYear}&month=${selectedMonth}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error obteniendo lecturas anteriores");
            }

            console.log("Filtro enviado:", {
                supply: selectedSupplyNumber,
                year: selectedYear,
                month: selectedMonth
            });

            console.log("Respuesta backend:", data);

            setPreviousWaterUsageUnits(data.units);


        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveWaterBill = async (data) => {

        const formData = new FormData();

        formData.append("provider", "Sedapal");
        formData.append("year", data.year);
        formData.append("month", data.month);
        formData.append("supply_number", data.supply_number);

        formData.append("bill_number", data.bill_number);
        formData.append("period_start", data.period_start);
        formData.append("period_end", data.period_end);

        formData.append("currency", "PEN");

        formData.append("water_usage_total_m3", data.water_usage_total_m3);
        formData.append("water_usage_total_cost", data.water_usage_total_cost);

        formData.append("water_bill_attachment", data.water_bill_attachment);

        console.log("Datos recibidos:", data);

        try {

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/water-bills`,
                {
                    method: "POST",
                    body: formData
                }
            );


            const result = await response.json();


            if (!response.ok) {
                throw new Error(result.error || "Error registrando recibo");
            }


            console.log("Recibo guardado:", result);

            alert("Recibo de agua registrado correctamente");

            setWaterBill(result.water_bill);
            setShowWaterBillModal(false);


        } catch (error) {

            console.error(error);
            alert("Error al registrar recibo");

        }
    };

    const getWaterBill = async () => {
        setWaterBill((previousWaterBill) => ({
            ...previousWaterBill,
            bill_number: "",
            water_usage_total_m3: 0,
            water_usage_total_cost: 0
        }));

        try {
            const params = new URLSearchParams({
                supply_number: selectedSupplyNumber,
                year: selectedYear,
                month: selectedMonth
            });

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/reports/get-water-bill?${params}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudo obtener el recibo de agua."
                );
            }

            setWaterBill((previousWaterBill) => ({
                ...previousWaterBill,
                bill_number: data.bill_number,
                supply_number: selectedSupplyNumber,
                year: Number(selectedYear),
                month: Number(selectedMonth),
                water_usage_total_m3: data.water_usage_m3_building,
                water_usage_total_cost: data.water_usage_cost_building
            }));

        } catch (error) {
            console.error("Error al obtener el recibo de agua:", error);
        }
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


                    </div>
                </div>
            </div>
            {!selectedBuilding || !selectedSupplyNumber || !selectedYear || !selectedMonth ? (
                <div className="alert alert-info">
                    Seleccione el año, mes, edificio y número de suministro para cargar las unidades.
                </div>
            ) : (
                <>
                    {waterBill.water_usage_total_m3 > 0 &&
                        waterBill.water_usage_total_cost > 0 && (
                            <div className="alert alert-success mb-3">
                                <div className="mt-1">
                                    <strong>Datos del recibo de agua: </strong>
                                    {waterBill.bill_number && (
                                        <>N.°: {waterBill.bill_number} - </>
                                    )}
                                    Consumo: {waterBill.water_usage_total_m3} m³ -
                                    Total: S/ {waterBill.water_usage_total_cost}
                                </div>
                            </div>
                        )}

                    <div className="alert alert-primary">
                        Registre únicamente la lectura actual (m³) de cada contómetro.
                        La lectura anterior se obtendrá del último registro guardado.
                    </div>

                    <WaterUsageUnit
                        waterUsageM3Total={Number(waterBill?.water_usage_total_m3)}
                        waterBillTotal={Number(waterBill?.water_usage_total_cost)}
                        waterUsageUnits={previousWaterUsageUnits}

                        provider="Sedapal"
                        supplyNumber={selectedSupplyNumber}
                        year={selectedYear}
                        month={selectedMonth}
                    />
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