import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { DashboardShellProvider } from "../context/DashboardShellContext";

export function RootLayout() {
  return (
    <DashboardShellProvider>
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <Outlet />
      </div>
    </DashboardShellProvider>
  );
}
