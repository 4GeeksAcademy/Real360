import { useState } from "react"
import "../css/WaterUsage.css"

export const WaterUsageTable = ({ water_usage_total_m3_building, water_usage_total_cost_building }) => {
    let id = 1;
    const waterUsageTotalM3Building = Number(water_usage_total_m3_building);
    const waterUsageTotalCostBuilding = Number(water_usage_total_cost_building);

    const [waterUsages, setWaterUsages] = useState([
        { id: id++, dpto: 101, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 201, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 202, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 203, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 301, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 302, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 303, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 401, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 402, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 403, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 501, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 502, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 503, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 601, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 602, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 603, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 701, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 702, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 703, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 801, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 802, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 803, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 901, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 902, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 },
        { id: id++, dpto: 903, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0 }
    ]);

    const handleChange = (index, field, value) => {
        setWaterUsages((previousWaterUsages) => {
            const updatedWaterUsages = previousWaterUsages.map((item, itemIndex) => {
                if (itemIndex !== index) return item;

                const updatedItem = {
                    ...item,
                    [field]: value
                };

                const previousReading = Number(updatedItem.previous_reading_m3) || 0;
                const currentReading = Number(updatedItem.current_reading_m3) || 0;
                const individualCost = Number(updatedItem.water_usage_individual_cost) || 0;
                const commonCost = Number(updatedItem.water_usage_common_cost) || 0;


                updatedItem.water_usage_m3 = currentReading - previousReading;
                updatedItem.water_total_cost = individualCost + commonCost;

                return updatedItem;
            });

            const totalWaterUsage = updatedWaterUsages.reduce(
                (total, item) => total + (Number(item.water_usage_m3) || 0),
                0
            );

            return updatedWaterUsages.map((item) => ({
                ...item,
                water_usage_percentage:
                    totalWaterUsage > 0
                        ? (Number(item.water_usage_m3) / totalWaterUsage) * 100
                        : 0
            }));
        });
    };

    const totalPreviousReadingM3 = waterUsages.reduce(
        (total, item) => total + (Number(item.previous_reading_m3) || 0),
        0
    );

    const totalCurrentReadingM3 = waterUsages.reduce(
        (total, item) => total + (Number(item.current_reading_m3) || 0),
        0
    );

    const totalWaterUsageM3 = waterUsages.reduce(
        (total, item) => total + (Number(item.water_usage_m3) || 0),
        0
    );

    const totalWaterUsageIndividualCost = waterUsages.reduce(
        (total, item) => total + (Number(item.water_usage_individual_cost) || 0),
        0
    );

    const totalWaterUsageCommonCost = waterUsages.reduce(
        (total, item) => total + (Number(item.water_usage_common_cost) || 0),
        0
    );

    const totalWaterUsageTotalCost = waterUsages.reduce(
        (total, item) => total + (Number(item.water_usage_total_cost) || 0),
        0
    );

    return (
        <>
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
                                        className="form-control input-readonly"
                                        value={item.water_usage_m3}
                                        readOnly
                                    />

                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control input-readonly"
                                        value={item.water_usage_percentage.toFixed(2)}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.water_usage_individual_cost}
                                        onChange={(e) =>
                                            handleChange(index, "water_usage_individual_cost", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.water_usage_common_cost}
                                        onChange={(e) =>
                                            handleChange(index, "water_usage_common_cost", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control input-readonly"
                                        value={item.water_usage_total_cost}
                                        readOnly
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="table-primary fw-bold">
                            <td>TOTALES</td>
                            <td>{totalPreviousReadingM3}</td>
                            <td>{totalCurrentReadingM3}</td>
                            <td>{totalWaterUsageM3}</td>
                            <td>-</td>
                            <td>{totalWaterUsageIndividualCost.toFixed(2)}</td>
                            <td>{totalWaterUsageCommonCost.toFixed(2)}</td>
                            <td>{totalWaterUsageTotalCost.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}