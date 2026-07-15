import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiUser, FiLogOut, FiHeart, FiCalendar } from "react-icons/fi";
import { NAV_LINKS } from "../../utils/constants";
import { Button, ButtonLink } from "../common/Button";
import { Avatar } from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const dashboardPath = user?.role === "admin" ? "/admin" : user?.role === "owner" ? "/owner" : "/dashboard";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-secondary">
          <span className="text-lg font-bold">Chennai Traditions Reserved</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn("text-sm font-medium transition-colors", isActive ? "text-primary" : "text-slate-600 hover:text-primary")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3 hover:border-primary cursor-pointer"
              >
                <Avatar name={user.name} src={user.avatar} size={32} />
                <span className="text-sm font-medium text-secondary">{user.name.split(" ")[0]}</span>
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-100 bg-white py-2 shadow-xl"
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <Link to={dashboardPath} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary hover:bg-slate-50">
                      <FiUser size={15} /> Dashboard
                    </Link>
                    <Link to="/dashboard/reservations" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary hover:bg-slate-50">
                      <FiCalendar size={15} /> Reservations
                    </Link>
                    <Link to="/dashboard/favorites" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary hover:bg-slate-50">
                      <FiHeart size={15} /> Favorites
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                        navigate("/");
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                    >
                      <FiLogOut size={15} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <ButtonLink to="/login" variant="ghost" size="sm">
                Login
              </ButtonLink>
              <ButtonLink to="/register" variant="primary" size="sm">
                Register
              </ButtonLink>
            </>
          )}
        </div>

        <button className="p-2 text-secondary md:hidden cursor-pointer" onClick={() => setIsOpen((v) => !v)} aria-label="Toggle menu">
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    cn("rounded-lg px-3 py-2.5 text-sm font-medium", isActive ? "bg-primary/10 text-primary" : "text-slate-600")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
                {isAuthenticated && user ? (
                  <>
                    <ButtonLink to={dashboardPath} variant="outline" size="sm" onClick={closeMenu}>
                      Dashboard
                    </ButtonLink>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        closeMenu();
                        logout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <ButtonLink to="/login" variant="outline" size="sm" onClick={closeMenu}>
                      Login
                    </ButtonLink>
                    <ButtonLink to="/register" variant="primary" size="sm" onClick={closeMenu}>
                      Register
                    </ButtonLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
