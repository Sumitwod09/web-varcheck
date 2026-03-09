import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-varcheck-dark/80 backdrop-blur-xl border-b border-varcheck-dark-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20 px-6">
        <Link to="/" className="font-display text-xl md:text-2xl font-bold text-varcheck-dark-text tracking-tight">
          VARCHECK
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-body text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.href
                  ? "text-varcheck-accent"
                  : "text-varcheck-dark-muted hover:text-varcheck-dark-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-varcheck-accent hover:bg-varcheck-accent-light text-primary-foreground font-body text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-varcheck-accent/25"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-varcheck-dark-text p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-varcheck-dark/95 backdrop-blur-xl border-b border-varcheck-dark-border"
          >
            <div className="container-main px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-body text-base font-medium py-2 ${
                    location.pathname === link.href
                      ? "text-varcheck-accent"
                      : "text-varcheck-dark-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-varcheck-accent text-primary-foreground font-body text-sm font-medium px-5 py-3 rounded-lg text-center mt-2"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
