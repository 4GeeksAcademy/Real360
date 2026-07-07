import { useState, useEffect } from "react"
import "../css/WaterUsage.css"

export const WaterUsageUnit = ({ water_usage_total_m3_building, water_usage_total_cost_building, waterUsageUnits }) => {
    let id = 1;
    const waterUsageTotalM3Building = Number(water_usage_total_m3_building);
    const waterUsageTotalCostBuilding = Number(water_usage_total_cost_building);

    const [waterUsages, setWaterUsages] = useState([
        { id: id++, building: "Torre 1", unit_number: 101, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 201, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 202, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 203, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 301, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 302, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 303, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 401, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 402, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 403, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 501, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 502, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 503, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 601, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 602, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 603, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 701, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 702, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 703, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 801, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 802, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 803, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 901, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 902, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 903, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3: 0, water_usage_percentage: 0, water_usage_individual_cost: 0, water_usage_common_cost: 0, water_usage_total_cost: 0, meter_reading_photo: null }
    ]);

    const loadPreviousReadings = () => {
        setWaterUsages((previousWaterUsages) =>
            previousWaterUsages.map((item) => {

                const reading = waterUsageUnits.find(
                    (unit) =>
                        unit.unit_number === item.unit_number
                );

                return {
                    ...item,
                    previous_reading_m3: reading
                        ? reading.meter_reading_m3
                        : 0
                };
            })
        );
    };

    useEffect(() => {
        if (waterUsageUnits && waterUsageUnits.length > 0) {
            loadPreviousReadings();
        }
    }, [waterUsageUnits]);

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
                /*updatedItem.water_total_cost = individualCost + commonCost;*/
                updatedItem.water_usage_total_cost = individualCost + commonCost;

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

    console.log("waterUsageUnits:", waterUsageUnits);
    console.log("waterUsages:", waterUsages);

    return (
        <>
            <div className="water-usage-unit-container">
                <table className="table table-bordered align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Unidad</th>
                            <th>Lectura anterior</th>
                            <th>Lectura actual</th>
                            <th>Consumo m3</th>
                            <th>Consumo %</th>
                            <th>Costo Individual</th>
                            <th>Costo A. Común</th>
                            <th>Costo Total</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waterUsages.map((item, index) => (
                            <tr key={index}>
                                <td>{item.unit_number}</td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control input-readonly"
                                        value={item.previous_reading_m3}
                                        readOnly
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
                                <td>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control"

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
                            <td>-</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}