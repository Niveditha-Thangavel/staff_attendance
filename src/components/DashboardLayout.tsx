import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

interface DashboardLayoutProps {
  role: "admin" | "staff";
  onRoleSwitch: () => void;
}

export function DashboardLayout({ role, onRoleSwitch }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar
        role={role}
        onRoleSwitch={onRoleSwitch}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <Outlet context={{ onMobileMenuOpen: () => setMobileOpen(true) }} />
      </main>
    </div>
  );
}
