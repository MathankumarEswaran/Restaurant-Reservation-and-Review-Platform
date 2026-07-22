import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface DashboardShellContextValue {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const DashboardShellContext = createContext<DashboardShellContextValue | undefined>(undefined);

export function DashboardShellProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const value = useMemo<DashboardShellContextValue>(
    () => ({ drawerOpen, openDrawer: () => setDrawerOpen(true), closeDrawer: () => setDrawerOpen(false) }),
    [drawerOpen]
  );

  return <DashboardShellContext.Provider value={value}>{children}</DashboardShellContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDashboardShell() {
  const ctx = useContext(DashboardShellContext);
  if (!ctx) throw new Error("useDashboardShell must be used within a DashboardShellProvider");
  return ctx;
}
