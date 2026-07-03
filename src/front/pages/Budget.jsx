import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import "../css/Budget.css"

export const Budget = () => {

  let id = 1;
  const initialData = [
    { id: id++, group: "GASTOS ADMINISTRATIVOS", category: "Administración", subcategory: "Administración", quantity: "", base: "", total: 0 },
    { id: id++, group: "GASTOS ADMINISTRATIVOS", category: "Administración", subcategory: "Personal de Limpieza", quantity: "", base: "", total: 0 },
    { id: id++, group: "GASTOS ADMINISTRATIVOS", category: "Administración", subcategory: "Personal de vigilancia - turno mañana", quantity: "", base: "", total: 0 },
    { id: id++, group: "GASTOS ADMINISTRATIVOS", category: "Administración", subcategory: "Personal de vigilancia - turno noche", quantity: "", base: "", total: 0 },
    { id: id++, group: "GASTOS ADMINISTRATIVOS", category: "Administración", subcategory: "Personal de vigilancia - descansero", quantity: "", base: "", total: 0 },
    { id: id++, group: "GASTOS ADMINISTRATIVOS", category: "Administración", subcategory: "Personal de vigilancia - vacaciones", quantity: "", base: "", total: 0 },

    { id: id++, group: "SERVICIOS PÚBLICOS", category: "Electricidad", subcategory: "Servicios generales", quantity: "", base: "", total: 0 },
    { id: id++, group: "SERVICIOS PÚBLICOS", category: "Electricidad", subcategory: "Bomba contraincendio", quantity: "", base: "", total: 0 },
    { id: id++, group: "SERVICIOS PÚBLICOS", category: "Agua", subcategory: "Consumo individual y de áreas comunes", quantity: "", base: "", total: 0 },

    { id: id++, group: "GASTOS VARIOS", category: "Gastos varios", subcategory: "Productos de limpieza", quantity: "", base: "", total: 0 },
    { id: id++, group: "GASTOS VARIOS", category: "Gastos varios", subcategory: "Productos de oficina", quantity: "", base: "", total: 0 },
    { id: id++, group: "GASTOS VARIOS", category: "Gastos varios", subcategory: "Línea postpago bitel", quantity: "", base: "", total: 0 },
    { id: id++, group: "GASTOS VARIOS", category: "Gastos varios", subcategory: "Café y azúcar", quantity: "", base: "", total: 0 },

    { id: id++, group: "MANTENIMIENTOS", category: "Mantenimientos Preventivos", subcategory: "Mantenimiento ascensor", quantity: "", base: "", total: 0 },
    { id: id++, group: "MANTENIMIENTOS", category: "Mantenimientos Preventivos", subcategory: "Mantenimiento equipos", quantity: "", base: "", total: 0 },
  ];

  const [budget, setBudget] = useState(initialData);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const years = [2026, 2027, 2028];

  const handleChange = (index, field, value) => {
    setBudget((prev) => {
      const updated = [...prev];
      const item = { ...updated[index] };

      item[field] = value;

      const qty = Number(item.quantity) || 0;
      const base = Number(item.base) || 0;

      item.total = qty * base;

      updated[index] = item;
      return updated;
    });
  };

  const grandTotal = budget.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  const handleSubmit = () => {
    if (!month) {
      alert("Selecciona el mes del presupuesto");
      return;
    }

    console.log({
      month,
      year,
      budget,
      grandTotal,
    });

    alert("Presupuesto registrado");
  };

  return (
    <div className="container py-3 budget-container">
      <div className="container budget-header">
        <h3 className="text-primary fw-bold mb-3">
          Registro de Presupuesto
        </h3>

        <div className="row mb-3">
          <div className="col-2 d-flex align-items-center gap-3">
            <label className="mb-0 fw-semibold"> Año</label>
            <select className="form-select form-select-sm" value={year} onChange={(e) => setYear(e.target.value)} >
              <option value="">Selecciona un año</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>))}
            </select>
          </div>

          <div className="col-3 d-flex align-items-center gap-3">
            <label className="mb-0 fw-semibold">Mes</label>
            <select className="form-select form-select-sm" value={month} onChange={(e) => setMonth(e.target.value)} >
              <option value="">Selecciona un mes</option>
              {months.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>))}
            </select>
          </div>
        </div>
      </div>
      <div className="budget-table-container">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Categoría</th>
              <th>SubCategoría</th>
              <th>Cantidad</th>
              <th>Sueldo / Pago base</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {budget.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.subcategory}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.base}
                    onChange={(e) =>
                      handleChange(index, "base", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={item.total.toFixed(2)}
                    disabled
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* TOTAL GENERAL */}
      <div className="alert alert-primary fw-bold py-1 px-3 mb-2 rounded-top-0">
        Total General: S/ {grandTotal.toFixed(2)}
      </div>
      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
      >
        Registrar presupuesto
      </button>

    </div>
  );
};