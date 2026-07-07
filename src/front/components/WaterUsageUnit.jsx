import { useState, useEffect } from "react"
import "../css/WaterUsage.css"

export const WaterUsageUnit = ({ waterUsageM3Total, waterBillTotal, waterUsageUnits }) => {
    let id = 1;

    const water_usage_m3_building = Number(waterUsageM3Total);
    const water_usage_cost_building = Number(waterBillTotal);

    console.log("water_usage_m3_building:", water_usage_m3_building);
    console.log("water_usage_cost_building:", water_usage_cost_building);

    const cost_per_m3 = water_usage_cost_building / water_usage_m3_building;

    console.log("cost_per_m3:", cost_per_m3);

    const [waterUsages, setWaterUsages] = useState([
        { id: id++, building: "Torre 1", unit_number: 101, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 201, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 202, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 203, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 301, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 302, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 303, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 401, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 402, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 403, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 501, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 502, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 503, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 601, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 602, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 603, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 701, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 702, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 703, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 801, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 802, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 803, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 901, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 902, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null },
        { id: id++, building: "Torre 1", unit_number: 903, previous_reading_m3: 0, current_reading_m3: 0, water_usage_m3_unit_individual: 0, water_usage_cost_unit_individual: 0, water_usage_cost_unit_commons: 0, water_usage_cost_unit: 0, meter_reading_photo: null }
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

                const previous_reading_m3 = Number(updatedItem.previous_reading_m3) || 0;
                const current_reading_m3 = Number(updatedItem.current_reading_m3) || 0;


                updatedItem.water_usage_m3_unit_individual = Number((current_reading_m3 - previous_reading_m3).toFixed(3));
                updatedItem.water_usage_cost_unit_individual = updatedItem.water_usage_m3_unit_individual * cost_per_m3;

                return updatedItem;
            });

            return updatedWaterUsages;
        });
    }

    const previous_reading_m3_total = Number(waterUsages.reduce((total, item) => total + (Number(item.previous_reading_m3) || 0), 0).toFixed(3));

    const current_reading_m3_total = Number(waterUsages.reduce((total, item) => total + (Number(item.current_reading_m3) || 0), 0).toFixed(3));

    const water_usage_m3_unit_individual_total = Number(waterUsages.reduce((total, item) => total + (Number(item.water_usage_m3_unit_individual) || 0), 0).toFixed(3));

    const water_usage_cost_unit_individual_total = waterUsages.reduce(
        (total, item) => total + (Number(item.water_usage_cost_unit_individual) || 0),
        0
    );

    const water_usage_cost_unit_commons_total = waterUsages.reduce(
        (total, item) => total + (Number(item.water_usage_cost_unit_commons) || 0),
        0
    );

    const water_usage_cost_unit_total = waterUsages.reduce(
        (total, item) => total + (Number(item.water_usage_cost_unit) || 0),
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
                                        value={item.water_usage_m3_unit_individual}
                                        readOnly
                                    />

                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control input-readonly"
                                        value={item.water_usage_cost_unit_individual}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control input-readonly"
                                        value={item.water_usage_cost_unit_commons}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control input-readonly"
                                        value={item.water_usage_cost_unit}
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
                            <td>{previous_reading_m3_total}</td>
                            <td>{current_reading_m3_total}</td>
                            <td>{water_usage_m3_unit_individual_total}</td>
                            <td>{water_usage_cost_unit_individual_total.toFixed(2)}</td>
                            <td>{water_usage_cost_unit_commons_total.toFixed(2)}</td>
                            <td>{water_usage_cost_unit_total.toFixed(2)}</td>
                            <td>-</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}