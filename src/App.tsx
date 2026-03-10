import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import LandingPage from "@/pages/LandingPage";
import AdminDashboard from "@/pages/AdminDashboard";
import StaffDashboard from "@/pages/StaffDashboard";
import StaffManagement from "@/pages/StaffManagement";
import AttendanceLogs from "@/pages/AttendanceLogs";
import AlertsPage from "@/pages/AlertsPage";
import ReportsPage from "@/pages/ReportsPage";
import SettingsPage from "@/pages/SettingsPage";
import DepartmentPage from "@/pages/DepartmentPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [role, setRole] = useState<"admin" | "staff">("admin");
  const toggleRole = () => setRole((r) => (r === "admin" ? "staff" : "admin"));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard routes */}
            <Route element={<DashboardLayout role={role} onRoleSwitch={toggleRole} />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/staff" element={<StaffManagement />} />
              <Route path="/attendance" element={<AttendanceLogs />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/my-dashboard" element={<StaffDashboard />} />
              
              <Route path="/department" element={<DepartmentPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
