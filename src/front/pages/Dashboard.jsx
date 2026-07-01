import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { DashboardSummary } from "../components/DashboardSummary.jsx";
import { RecentActivity } from "../components/RecentActivity.jsx";
import { UpcomingMaintenance } from "../components/UpcomingMaintenance.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {

	return (
		<>
			<DashboardSummary />
			<RecentActivity />
			<UpcomingMaintenance />
		</>
	);
}; 