import { useState } from "react";
import "../css/WaterUsage.css"

export const WaterBillForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        supply_number: "",
        bill_number: "",
        billed_year: "",
        billed_month: "",
        usage_period_start: "",
        usage_period_end: "",
        water_usage_m3_total: "",
        water_bill_total: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = () => {
        const hasEmptyFields = Object.values(formData).some((value) => value === "");

        if (hasEmptyFields) {
            alert("Completa todos los campos del recibo de agua.");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Registrar recibo de agua</h5>
                        <button type="button" className="btn-close" onClick={onClose} />
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <input
                                        type="text"
                                        name="supply_number"
                                        value={formData.supply_number}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="N° de suministro"
                                    />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <input
                                        type="text"
                                        name="bill_number"
                                        value={formData.bill_number}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="N° de recibo"
                                    />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <input
                                        type="number"
                                        name="billed_year"
                                        value={formData.billed_year}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Año facturado"
                                    />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <select name="billed_month" value={formData.billed_month} onChange={handleChange} className="form-select" required>
                                        <option value="">Selecciona un mes</option>
                                        <option value="1">Enero</option>
                                        <option value="2">Febrero</option>
                                        <option value="3">Marzo</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Mayo</option>
                                        <option value="6">Junio</option>
                                        <option value="7">Julio</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Septiembre</option>
                                        <option value="10">Octubre</option>
                                        <option value="11">Noviembre</option>
                                        <option value="12">Diciembre</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-2">
                                    <label className="form-label">Inicio del periodo</label>
                                    <input
                                        type="date"
                                        name="usage_period_start"
                                        value={formData.usage_period_start}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <label className="form-label">Fin del periodo</label>
                                    <input
                                        type="date"
                                        name="usage_period_end"
                                        value={formData.usage_period_end}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <input
                                        type="number"
                                        name="water_usage_m3_total"
                                        value={formData.water_usage_m3_total}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Consumo en m³"
                                    />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="water_bill_total"
                                        value={formData.water_bill_total}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Total en soles"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={onClose} > Cancelar </button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>  Guardar </button>
                    </div>
                </div>
            </div>
        </div>
    );
};