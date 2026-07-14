import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

export const AreaChartCard = ({title,periodText = "Últimos 6 meses",data = [],xDataKey = "month",yDataKey = "usage", tooltipLabel = "Gasto",tooltipPrefix = "S/ ", color = "#2f80ed",gradientId = "areaChartGradient"}) => {
    
    return (
        <div className="chart-card">
            <div className="chart-header">
                <h5>{title} </h5>
                <span className="chart-period">{periodText}</span>
            </div>

            <div className="chart-content">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 15, right: 20, left: -15, bottom: 0 }} >
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="0%" stopColor={color} stopOpacity={0.30} />
                                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#e8edf5" />
                        <XAxis dataKey={xDataKey} axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 13 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 13 }} />
                        <Tooltip formatter={(value) => [`${tooltipPrefix}${value}`, tooltipLabel ]} />
                        <Area
                            type="monotone"
                            dataKey={yDataKey}
                            stroke={color}
                            strokeWidth={3}
                            fill={`url(#${gradientId})`}
                            dot={{
                                r: 4,
                                fill:  color,
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