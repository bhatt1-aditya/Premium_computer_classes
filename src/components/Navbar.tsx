import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/#courses" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname === "/") {
        const el = document.querySelector(href.replace("/", ""));
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Premium Computer Classes"
            className="h-12 w-auto rounded-full"
          />
          <span className="hidden font-display text-lg font-bold text-cream-light sm:block">
            Premium Computer Classes
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="relative font-medium text-cream-light/80 transition-colors hover:text-cream-light after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-light-teal after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+919583778772"
            className="flex items-center gap-2 text-sm text-cream-light/80"
          >
            <Phone className="h-4 w-4" />
            +91 9583778772
          </a>
          {/* <Link
            to="/signin"
            className="rounded-full bg-light-teal px-6 py-2.5 text-sm font-semibold text-navy transition-all hover:scale-105 hover:shadow-lg"
          >
            Sign In
          </Link> */}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-cream-light lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-navy/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-medium text-cream-light/80 transition-colors hover:text-cream-light"
                >
                  {link.label}
                </button>
              ))}
              {/* <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-light-teal px-6 py-2.5 text-center text-sm font-semibold text-navy"
              >
                Sign In
              </Link> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
