import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import "../css/WaterUsage.css"

export const WaterUsageTable = () => {
    let id = 1;
    const waterUsages = [
        { id: id++, dpto: 101, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 201, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 202, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 203, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 301, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 302, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 303, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 401, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 402, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 403, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 501, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 502, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 503, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 601, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 602, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 603, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 701, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 702, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 703, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 801, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 802, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 803, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 901, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 902, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 },
        { id: id++, dpto: 903, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_individual_cost: 0, water_common_cost: 0, water_total_cost: 0 }
    ];
    return (

        <div className="water-usage-table-container">
            <table className="table table-bordered align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Dpto</th>
                        <th>Lectura anterior</th>
                        <th>Lectura actual</th>
                        <th>Consumo m3</th>
                        <th>Consumo %</th>
                        <th>Costo Individual</th>
                        <th>Costo Área Comunes</th>
                        <th>Costo Total</th>
                    </tr>
                </thead>
                <tbody>
                    {waterUsages.map((item, index) => (
                        <tr key={index}>
                            <td>{item.dpto}</td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.previous_reading_m3}
                                    onChange={(e) =>
                                        handleChange(index, "previous_reading_m3", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.current_reading_m3}
                                    onChange={(e) =>
                                        handleChange(index, "current_reading_m3", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.water_usage_m3}
                                    onChange={(e) =>
                                        handleChange(index, "water_usage_m3", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.water_usage_percentage}
                                    onChange={(e) =>
                                        handleChange(index, "water_usage_percentage", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.water_individual_cost}
                                    onChange={(e) =>
                                        handleChange(index, "water_individual_cost", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.water_common_cost}
                                    onChange={(e) =>
                                        handleChange(index, "water_common_cost", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.water_total_cost}
                                    onChange={(e) =>
                                        handleChange(index, "water_total_cost", e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}