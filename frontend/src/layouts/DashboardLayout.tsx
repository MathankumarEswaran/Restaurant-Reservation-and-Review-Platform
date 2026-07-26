import { Link, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { DashboardSidebar, type DashboardNavItem } from "../components/dashboard/DashboardSidebar";
import { useDashboardShell } from "../context/DashboardShellContext";
import dashboardBgImage from "../assets/restaurants/restaurant-table.jpg";

interface DashboardLayoutProps {
  navItems: DashboardNavItem[];
  roleLabel: string;
}

export function DashboardLayout({ navItems, roleLabel }: DashboardLayoutProps) {
  const { drawerOpen, closeDrawer } = useDashboardShell();

  return (
    <div className="flex flex-1">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface-raised lg:flex">
        <Link to="/" className="block border-b border-border px-5 py-4 hover:bg-surface-sunken">
          <p className="text-sm font-bold text-text leading-tight">BookMyBite</p>
          <p className="text-xs text-text-subtle leading-tight">{roleLabel}</p>
        </Link>
        <div className="flex-1">
          <DashboardSidebar navItems={navItems} />
        </div>
        <Link to="/" className="flex items-center gap-2 border-t border-border px-5 py-4 text-sm font-medium text-text-muted hover:text-primary">
          <FiArrowLeft size={15} /> Back to site
        </Link>
      </aside>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-secondary/40 lg:hidden"
              onClick={closeDrawer}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-surface-raised shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Link to="/" onClick={closeDrawer}>
                  <p className="text-sm font-bold text-text leading-tight">BookMyBite</p>
                  <p className="text-xs text-text-subtle leading-tight">{roleLabel}</p>
                </Link>
                <button onClick={closeDrawer} className="text-text-subtle cursor-pointer" aria-label="Close menu">
                  <FiX size={20} />
                </button>
              </div>
              <div className="flex-1">
                <DashboardSidebar navItems={navItems} onNavigate={closeDrawer} />
              </div>
              <Link
                to="/"
                onClick={closeDrawer}
                className="flex items-center gap-2 border-t border-border px-5 py-4 text-sm font-medium text-text-muted hover:text-primary"
              >
                <FiArrowLeft size={15} /> Back to site
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="relative flex-1 overflow-hidden">
        <img src={dashboardBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-surface/80" />
        <div className="relative p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
