import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import PatientManagement from "./pages/admin/PatientManagement";
import PatientDetails from "./pages/admin/PatientDetails";
import Scheduling from "./pages/admin/Scheduling";
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Admin dashboard route */}
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/patient" element={<PatientManagement />} />
        <Route path="admin/patient/:mrn" element={<PatientDetails />} />
        <Route path="admin/scheduling" element={<Scheduling />} />

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
