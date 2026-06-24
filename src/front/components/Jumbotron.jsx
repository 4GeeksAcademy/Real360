export default function Jumbotron() {
  return (
    <div className="container jumbotron">
      <div className="jumbotron-content">
        <h1 className="jumbotron-title"> Simplifica la gestión de tu edificio</h1>
        <p className="jumbotron-subtitle">Gestiona tus pagos, reportes, comunicados, votaciones y reservas desde una sola plataforma digital diseñada para administradores y residentes.</p>
        <button className="btn btn-primary btn-lg" type="button">Solicita tu Demo</button>
      </div>
      <div className="jumbotron-image">
        <img
          src="https://images.pexels.com/photos/17543777/pexels-photo-17543777.jpeg"
          alt="building"
          className="jumbotron-img"
        />
      </div>
    </div>
  )
}