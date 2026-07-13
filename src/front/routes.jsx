// Import necessary components and functions from react-router-dom.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route, 
  Navigate,
} from "react-router-dom";

import { PublicLayout } from "./pages/PublicLayout";
import { PrivateLayout } from "./pages/PrivateLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

import { Dashboard } from "./pages/Dashboard";
import { ResetPassword } from "./pages/ResetPassword";
import { EditProfile } from "./pages/EditProfile";
import { Payments } from "./pages/Payments";
import { Budget } from "./pages/Budget";
import { WaterUsage } from "./pages/WaterUsage";
import { ElectricityUsage } from "./pages/ElectricityUsage";
import { Maintenance } from "./pages/Maintenance";
import { Settings } from "./pages/Settings";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Portal público: Navbar + Footer + Outlet */}
      <Route path="/" element={<PublicLayout />} errorElement={<h1>Not found!</h1>}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Route>

      {/* Portal privado: Sidebar + Topbar + Outlet */}
      <Route path="/portal" element={<PrivateLayout />} errorElement={<h1>Not found!</h1>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="payments" element={<Payments />} />
        <Route path="budget" element={<Budget />} />
        <Route path="water-usage" element={<WaterUsage />} />
        <Route path="electricity-usage" element={<ElectricityUsage />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Route>
    </>
  )
);