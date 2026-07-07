import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { DashboardSummary } from "../components/DashboardSummary.jsx";
import { WaterUsageChart } from "../components/WaterUsageChart.jsx";
import { UpcomingMaintenance } from "../components/UpcomingMaintenance.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {

	return (
		<>
			<div className="row">
				<div className="col-12">
					<DashboardSummary />
				</div>
			</div>

			<div className="row mt-4">
				<div className="col-12 col-lg-6">
					<WaterUsageChart />
				</div>

				<div className="col-12 col-lg-6">
					ElectricityUsageChart
				</div>
			</div>
		</>
	);
}; 