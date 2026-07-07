import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../css/WaterUsageChart.css";

export const WaterUsageChart = () => {
    const [waterBills, setWaterBills] = useState([]);

    useEffect(() => {
        const getWaterBills = async () => {
            try {
                console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/water-bills/last-six-months`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "No se pudieron cargar los recibos");
                }

                setWaterBills(data);
            } catch (error) {
                console.error("Error cargando gráfico de agua:", error);
            }
        };

        getWaterBills();
    }, []);

    const chartData = waterBills.map((bill) => ({
        month: bill.month_name,
        usage: Number(bill.water_usage_total_cost)
    }));

    console.log("waterBills:", waterBills);
    console.log("chartData:", chartData);

    return (
        <div className="water-chart-card">
            <div className="water-chart-header">
                <h5>Consumo de agua (S/)</h5>
                <span className="water-chart-period">Últimos 6 meses</span>
            </div>

            <div className="water-chart-content">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 15, right: 20, left: -15, bottom: 0 }} >
                        <defs>
                            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="0%" stopColor="#2f80ed" stopOpacity={0.30} />
                                <stop offset="100%" stopColor="#2f80ed" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#e8edf5" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 13 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 13 }} />
                        <Tooltip formatter={(value) => [`${value} s/`, "Gasto"]} />
                        <Area
                            type="monotone"
                            dataKey="usage"
                            stroke="#2f80ed"
                            strokeWidth={3}
                            fill="url(#waterGradient)"
                            dot={{
                                r: 4,
                                fill: "#2f80ed",
                                strokeWidth: 0
                            }}
                            activeDot={{ r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};