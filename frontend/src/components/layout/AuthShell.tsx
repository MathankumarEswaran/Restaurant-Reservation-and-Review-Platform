import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import authCafeImage from "../../assets/auth-cafe.jpg";
import restaurantTableImage from "../../assets/restaurants/restaurant-table.jpg";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2">
      <div className="relative flex items-center justify-center overflow-hidden px-4 py-14 sm:px-8">
        <img src={restaurantTableImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px]" />
        <div className="absolute inset-0 bg-surface/50" />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="relative w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 text-text">
            <span className="text-lg font-bold">BookMyBite</span>
          </Link>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-text-muted">{footer}</div>}
        </motion.div>
      </div>
      <div className="relative hidden overflow-hidden bg-secondary lg:block">
        <img src={authCafeImage} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
        <div className="absolute bottom-12 left-10 right-10 text-white">
          <p className="text-2xl font-semibold leading-snug">"BookMyBite made it so easy to find and book the perfect spot for every occasion."</p>
          <p className="mt-4 text-sm text-slate-300">— Emma Carter, Food Blogger</p>
        </div>
      </div>
    </div>
  );
}
