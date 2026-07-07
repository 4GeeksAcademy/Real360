import { useState } from "react";
import "../css/WaterUsage.css"

export const WaterBill = ({ onClose, onSave, selectedYear, selectedMonth, selectedBuilding, selectedSupplyNumber }) => {

    const [formData, setFormData] = useState({
        bill_number: "",
        usage_period_start: "",
        usage_period_end: "",
        water_usage_m3_total: "",
        water_bill_total: ""
    });

    const [receiptFile, setReceiptFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "application/pdf"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Solo se permiten imágenes JPG, PNG o archivos PDF.");
            e.target.value = "";
            return;
        }

        setReceiptFile(file);
    };

    const handleSave = () => {
        const hasEmptyFields = Object.values(formData).some((value) => value === "");

        if (hasEmptyFields) {
            alert("Completa todos los campos del recibo de agua.");
            return;
        }

        if (!receiptFile) {
            alert("Adjunta el recibo de agua.");
            return;
        }

        onSave({
            ...formData,
            billed_year: selectedYear,
            billed_month: selectedMonth,
            building: selectedBuilding,
            supply_number: selectedSupplyNumber,
            receipt_photo: receiptFile
        });
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
                        <div className="alert alert-light border mb-3">
                            <div><strong>Año:</strong> {selectedYear}</div>
                            <div><strong>Mes:</strong> {selectedMonth}</div>
                            <div><strong>Edificio:</strong> {selectedBuilding}</div>
                            <div><strong>N.° de suministro:</strong> {selectedSupplyNumber}</div>
                        </div>
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <input
                                        type="text"
                                        name="bill_number"
                                        value={formData.bill_number}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="N° de recibo"
                                        required
                                    />
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
                                        min="0"
                                        step="0.001"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        name="water_bill_total"
                                        value={formData.water_bill_total}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Total en soles"
                                        required
                                    />
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label className="form-label">
                                        Adjuntar recibo de agua (Imagen o PDF)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,application/pdf"
                                        onChange={handleFileChange}
                                        className="form-control"
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