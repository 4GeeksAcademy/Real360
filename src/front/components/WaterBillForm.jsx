import "../css/WaterUsage.css"

export const WaterBillForm = ({ onClose }) => {
    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Registrar recibo de agua</h5>
                        <button type="button" className="btn-close" onClick={onClose} />
                    </div>

                    <div className="modal-body">
                        <p>El modal está funcionando.</p>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={onClose} > Cancelar </button>
                    </div>
                </div>
            </div>
        </div>
    );
};