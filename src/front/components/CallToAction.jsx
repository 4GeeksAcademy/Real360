export const CallToAction = () => {
    return (
        <div className="bg-secondary-subtle mt-2">
            <h2 className="jumbotron-title m-2">Todo lo que tu edificio necesita, en un solo lugar</h2>
            <p className="jumbotron-subtitle m-2">
                Brindamos una plataforma integral para la administración de edificios y bienes
                raíces, facilitando la gestión operativa, el mantenimiento, la contratación de
                personal y la promoción de inmuebles.
            </p>
            <div className="d-flex justify-content-center m-2">
                <img src="https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-25" />
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-info m-3" onClick={() => navigate("/Services")}>Conoce más</button>
            </div>
        </div>
    )
}