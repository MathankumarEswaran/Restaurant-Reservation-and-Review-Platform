import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiBell, FiLogOut } from "react-icons/fi";
import { DashboardSidebar, type DashboardNavItem } from "../components/dashboard/DashboardSidebar";
import { Avatar } from "../components/common/Avatar";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import dashboardBgImage from "../assets/restaurants/dashboard background image.jpeg";

interface DashboardLayoutProps {
  navItems: DashboardNavItem[];
  roleLabel: string;
}

export function DashboardLayout({ navItems, roleLabel }: DashboardLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 shrink-0 border-r border-slate-100 bg-white lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-5">
          <div>
            <p className="text-sm font-bold text-secondary leading-tight">Chennai Traditions Reserved</p>
            <p className="text-xs text-slate-400 leading-tight">{roleLabel}</p>
          </div>
        </div>
        <DashboardSidebar navItems={navItems} />
      </aside>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-secondary/40 lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-secondary">Chennai Traditions Reserved</p>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-slate-400 cursor-pointer">
                  <FiX size={20} />
                </button>
              </div>
              <DashboardSidebar navItems={navItems} onNavigate={() => setDrawerOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6">
          <button className="text-secondary lg:hidden cursor-pointer" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <FiMenu size={22} />
          </button>
          <Link to="/" className="hidden text-sm font-medium text-slate-400 hover:text-primary lg:block">
            ← Back to site
          </Link>
          <div className="flex items-center gap-4">
            <Link to={navItems.find((n) => n.label === "Notifications")?.to ?? "#"} className="relative text-slate-500 hover:text-primary">
              <FiBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
            {user && (
              <div className="flex items-center gap-2.5">
                <Avatar name={user.name} src={user.avatar} size={32} />
                <span className="hidden text-sm font-medium text-secondary sm:block">{user.name}</span>
              </div>
            )}
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-slate-400 hover:text-red-500 cursor-pointer"
              aria-label="Logout"
            >
              <FiLogOut size={19} />
            </button>
          </div>
        </header>

        <main className="relative flex-1 overflow-hidden">
          <img
            src={dashboardBgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-surface/80" />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
