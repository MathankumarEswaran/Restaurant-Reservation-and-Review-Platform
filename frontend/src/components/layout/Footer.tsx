import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiFacebook, FiInstagram, FiTwitter, FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";
import { NAV_LINKS } from "../../utils/constants";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! Watch your inbox for updates.");
    setEmail("");
  };

  return (
    <footer className="mt-auto bg-secondary text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white">
              <span className="text-lg font-bold">BookMyBite</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Discover, book, and review the best restaurants near you — all in one premium platform.
            </p>
            <div className="mt-5 flex gap-3">
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
                  aria-label="Social link"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/login" className="text-slate-400 hover:text-primary">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 shrink-0" size={15} /> 2/108, RS Puram, Coimbatore, Tamil Nadu
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone size={15} /> +91 96882 91673
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail size={15} /> mathan@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Newsletter</h4>
            <p className="mb-3 text-sm text-slate-400">Get the best restaurant picks delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 rounded-xl bg-white/10 p-1.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent px-2.5 py-1.5 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button type="submit" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white cursor-pointer">
                <FiSend size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} BookMyBite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
