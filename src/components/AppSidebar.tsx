import { useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Bell,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Staff", url: "/staff", icon: Users },
  { title: "Attendance", url: "/attendance", icon: ClipboardList },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const staffNav = [
  { title: "My Dashboard", url: "/my-dashboard", icon: LayoutDashboard },
  { title: "Department", url: "/department", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  role: "admin" | "staff";
  onRoleSwitch: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AppSidebar({ role, onRoleSwitch, mobileOpen, onMobileClose }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navItems = role === "admin" ? adminNav : staffNav;

  const sidebarContent = (
    <>
      {/* Logo area */}
      <div className="h-16 flex items-center px-5 border-b border-sidebar-border safe-top">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 flex-1"
            >
              <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <ClipboardList className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-sidebar-accent-foreground tracking-tight">
                Attendance
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto"
            >
              <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <ClipboardList className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Mobile close button */}
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden ml-auto p-1 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <RouterNavLink
              key={item.url}
              to={item.url}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-sidebar-primary"
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              )}
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </RouterNavLink>
          );
        })}
      </nav>

      {/* Role switcher & bottom */}
      <div className="p-3 border-t border-sidebar-border space-y-2 safe-bottom">
        <button
          onClick={onRoleSwitch}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          <User className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && (
            <span className="whitespace-nowrap text-xs">
              Switch to {role === "admin" ? "Staff" : "Admin"}
            </span>
          )}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-full px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden md:flex h-screen bg-sidebar flex-col border-r border-sidebar-border sticky top-0 overflow-hidden z-30"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-sidebar flex flex-col border-r border-sidebar-border z-50 md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
