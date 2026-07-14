import { useEffect, useState } from "react";
import { AreaChartCard } from "../components/AreaChartCard";
import { DashboardSummary } from "../components/DashboardSummary.jsx";
import "../css/Dashboard.css"

export const Dashboard = () => {
	const [waterBills, setWaterBills] = useState([]);
	const [electricityBills, setElectricityBills] = useState([]);

	useEffect(() => {
		const getWaterBills = async () => {
			try {
				const url = `${import.meta.env.VITE_BACKEND_URL}/api/water-bills/last-six-months`;

				const response = await fetch(url);

				const text = await response.text();

				const data = JSON.parse(text);

				if (!response.ok) {
					throw new Error(data.msg || "No se pudieron cargar los recibos");
				}

				setWaterBills(data);
			} catch (error) {
				console.error("Error cargando gráfico de agua:", error);
			}
		};

		getWaterBills();

		const getElectricityBills = async () => {
			try {
				const url = `${import.meta.env.VITE_BACKEND_URL}/api/electricity-bills/last-six-months`;

				const response = await fetch(url);
				const text = await response.text();
				const data = JSON.parse(text);
				
				console.log("Electricity data:", data);

				if (!response.ok) {
					throw new Error(data.msg || "No se pudieron cargar los recibos de electricidad");
				}

				setElectricityBills(data);

			} catch (error) {
				console.error("Error cargando gráfico de electricidad:", error);
			}
		};

		getElectricityBills();

	}, []);

	const waterChartData = waterBills.map((bill) => ({
		month: bill.month_name,
		usage: Number(bill.water_usage_total_cost) || 0
	}));

	const electricityChartData = electricityBills.map((bill) => ({
		month: bill.month_name,
		usage: Number(bill.electricity_usage_total_cost) || 0
	}));

	return (
		<>
			<div className="container dashboard">
				<div className="dashboard-summary">
					<DashboardSummary />
				</div>
				<div className="dashboard-chart">
					<div className="row mt-4">
						<div className="col-12 col-lg-6">
							<AreaChartCard
								title="Consumo de agua (S/)"
								data={waterChartData}
								xDataKey="month"
								yDataKey="usage"
								tooltipLabel="Gasto de agua"
								tooltipPrefix="S/ "
								color="#2f80ed"
								gradientId="waterGradient"
							/>
						</div>

						<div className="col-12 col-lg-6">
							<AreaChartCard
								title="Consumo de electricidad (S/)"
								data={electricityChartData}
								xDataKey="month"
								yDataKey="usage"
								tooltipLabel="Gasto de electricidad"
								tooltipPrefix="S/ "
								color="#f2c94c"
								gradientId="electricityGradient"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}; 