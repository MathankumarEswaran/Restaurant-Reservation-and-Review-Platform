import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";
import { cn } from "../../utils/cn";

export interface DashboardNavItem {
  label: string;
  to: string;
  icon: IconType;
  end?: boolean;
}

interface DashboardSidebarProps {
  navItems: DashboardNavItem[];
  onNavigate?: () => void;
}

export function DashboardSidebar({ navItems, onNavigate }: DashboardSidebarProps) {
  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              isActive ? "bg-primary text-white shadow-sm shadow-primary/30" : "text-text-muted hover:bg-surface-sunken hover:text-text"
            )
          }
        >
          <item.icon size={17} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
