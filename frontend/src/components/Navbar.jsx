import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";

const Brand = () => (
  <Link to="/" data-testid="nav-brand-link" className="flex items-center gap-2.5 group">
    <span className="flex h-8 w-8 items-center justify-center bg-yellow-500 text-black font-heading font-extrabold text-lg leading-none transition-transform duration-300 group-hover:rotate-[-6deg]">
      N
    </span>
    <span className="font-heading font-semibold tracking-[0.18em] text-sm text-neutral-100">
      NEXVORA LABS <span className="text-yellow-500">//</span>
    </span>
  </Link>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { open: openContact } = useContactModal();
  const location = useLocation();
  const navigate = useNavigate();

  const goServices = () => {
    setOpen(false);
    if (location.pathname === "/") {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#services");
    }
  };

  const linkCls = (active) =>
    `font-mono-tech text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
      active ? "text-yellow-500" : "text-neutral-400 hover:text-neutral-100"
    }`;

  return (
    <>
      <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-[#070709]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Brand />
          <nav className="hidden md:flex items-center gap-10" data-testid="nav-desktop-links">
            <button data-testid="nav-services-link" onClick={goServices} className={linkCls(false)}>
              Services
            </button>
            <Link data-testid="nav-pricing-link" to="/pricing" className={linkCls(location.pathname === "/pricing")}>
              Pricing
            </Link>
            <button
              data-testid="nav-start-project-btn"
              onClick={() => openContact("General Inquiry")}
              className="group flex items-center gap-2 bg-yellow-500 text-black font-heading font-semibold text-sm px-5 py-2 transition-colors duration-300 hover:bg-yellow-400"
            >
              Start Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </nav>
          <button
            data-testid="nav-mobile-menu-btn"
            onClick={() => setOpen(true)}
            className="md:hidden text-neutral-200 p-2"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#070709]/97 backdrop-blur-2xl flex flex-col"
          >
            <div className="h-16 px-4 flex items-center justify-between border-b border-white/5">
              <Brand />
              <button
                data-testid="nav-mobile-close-btn"
                onClick={() => setOpen(false)}
                className="text-neutral-200 p-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-8">
              {[
                { label: "Home", testid: "mobile-nav-home-link", action: () => { setOpen(false); navigate("/"); } },
                { label: "Services", testid: "mobile-nav-services-link", action: goServices },
                { label: "Pricing", testid: "mobile-nav-pricing-link", action: () => { setOpen(false); navigate("/pricing"); } },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  data-testid={item.testid}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  onClick={item.action}
                  className="text-left font-heading text-4xl font-semibold text-neutral-100 hover:text-yellow-500 transition-colors"
                >
                  <span className="font-mono-tech text-xs text-yellow-500/70 align-super mr-3">0{i + 1}</span>
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                data-testid="mobile-nav-start-project-btn"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                onClick={() => { setOpen(false); openContact("General Inquiry"); }}
                className="mt-6 w-fit flex items-center gap-2 bg-yellow-500 text-black font-heading font-semibold px-7 py-3"
              >
                Start Project <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
