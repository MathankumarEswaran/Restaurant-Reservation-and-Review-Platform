import {
  FiHome,
  FiUser,
  FiCalendar,
  FiHeart,
  FiBell,
  FiStar,
  FiSettings,
  FiGrid,
  FiBookOpen,
  FiDollarSign,
  FiUsers,
  FiMessageSquare,
  FiCreditCard,
  FiBarChart2,
} from "react-icons/fi";
import type { DashboardNavItem } from "../components/dashboard/DashboardSidebar";

export const customerNavItems: DashboardNavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: FiHome, end: true },
  { label: "Profile", to: "/dashboard/profile", icon: FiUser },
  { label: "Reservations", to: "/dashboard/reservations", icon: FiCalendar },
  { label: "Favorites", to: "/dashboard/favorites", icon: FiHeart },
  { label: "Notifications", to: "/dashboard/notifications", icon: FiBell },
  { label: "Review History", to: "/dashboard/reviews", icon: FiStar },
  { label: "Settings", to: "/dashboard/settings", icon: FiSettings },
];

export const ownerNavItems: DashboardNavItem[] = [
  { label: "Overview", to: "/owner", icon: FiGrid, end: true },
  { label: "Restaurant Profile", to: "/owner/profile", icon: FiHome },
  { label: "Menu Management", to: "/owner/menu", icon: FiBookOpen },
  { label: "Reservations", to: "/owner/reservations", icon: FiCalendar },
  { label: "Reviews", to: "/owner/reviews", icon: FiStar },
  { label: "Revenue", to: "/owner/revenue", icon: FiDollarSign },
  { label: "Settings", to: "/owner/settings", icon: FiSettings },
];

export const adminNavItems: DashboardNavItem[] = [
  { label: "Overview", to: "/admin", icon: FiGrid, end: true },
  { label: "Users", to: "/admin/users", icon: FiUsers },
  { label: "Restaurants", to: "/admin/restaurants", icon: FiHome },
  { label: "Reservations", to: "/admin/reservations", icon: FiCalendar },
  { label: "Reviews", to: "/admin/reviews", icon: FiMessageSquare },
  { label: "Payments", to: "/admin/payments", icon: FiCreditCard },
  { label: "Analytics", to: "/admin/analytics", icon: FiBarChart2 },
  { label: "Settings", to: "/admin/settings", icon: FiSettings },
];
