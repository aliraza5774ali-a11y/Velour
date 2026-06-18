import { useState, useEffect, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setCartOpen, setSearchOpen, setDashOpen, setUser, setToken, setError } from '../store';
import { loginUser, registerUser } from '../api.js';
import IconButton from './IconButton';
import { SearchIcon, BagIcon } from '../assets/icons/index';
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Menu,
  User,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const panelVariants = {
  initial: { opacity: 0, x: 36, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -36, scale: 0.98 },
};

const fieldBase =
  "w-full rounded-full border border-white/10 bg-white/[0.06] px-11 py-3.5 text-[14px] text-white shadow-sm transition placeholder:text-white/35 focus:border-[#c9a96e] focus:bg-white/[0.09] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#c9a96e]/35";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#EA4335" d="M12 5.04c1.69 0 3.18.58 4.36 1.72l3.25-3.25C17.63 1.67 15.05.55 12 .55 7.66.55 3.92 3.04 2.1 6.67l3.78 2.93C6.78 6.89 9.16 5.04 12 5.04Z" />
      <path fill="#4285F4" d="M23.49 12.26c0-.78-.07-1.53-.2-2.26H12v4.27h6.46a5.52 5.52 0 0 1-2.39 3.62l3.69 2.86c2.16-1.99 3.73-4.93 3.73-8.49Z" />
      <path fill="#FBBC05" d="M5.88 14.4a7.23 7.23 0 0 1 0-4.8L2.1 6.67a11.45 11.45 0 0 0 0 10.66l3.78-2.93Z" />
      <path fill="#34A853" d="M12 23.45c3.05 0 5.61-1 7.48-2.7l-3.69-2.86c-1.02.68-2.33 1.08-3.79 1.08-2.84 0-5.22-1.85-6.12-4.57L2.1 17.33c1.82 3.63 5.56 6.12 9.9 6.12Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
      />
    </svg>
  );
}

export default function Navbar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.items.reduce((s, i) => s + i.qty, 0));
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isScrolled = useAppSelector((state) => state.ui.isScrolled);

  // Auth modal state
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // --- New: local submit state for the API call (loading + server error) ---
  // Doesn't touch any markup/classes, just drives the submit button + a message.
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const modalRef = useRef(null);

  const isRegister = authMode === "register";

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAuthOpen(false);
      }
    }
    if (authOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [authOpen]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = authOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [authOpen]);

  const errors = useMemo(() => {
    const next = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
    if (isRegister && form.username.trim().length > 0 && form.username.trim().length < 3) {
      next.username = "Use at least 3 characters.";
    }
    if (isRegister && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email.";
    }
    if (form.password && form.password.length < 8) {
      next.password = "Use 8 characters or more.";
    }
    if (isRegister && form.confirmPassword && form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords must match.";
    }
    return next;
  }, [form, isRegister]);

  const handleChange = (e) => {
    setForm((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  // --- Updated: actually calls the API and dispatches into Redux ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // Don't submit if client-side validation already found problems
    const hasClientErrors = Object.values(errors).some(Boolean);
    if (hasClientErrors) return;

    setSubmitting(true);
    try {
      if (isRegister) {
        await registerUser(form.username, form.email, form.password);
        // After registering, log them straight in for a smooth flow
        const loginData = await loginUser(form.username, form.password);
        dispatch(setToken(loginData.token));
        dispatch(setUser(loginData.user));
      } else {
        const loginData = await loginUser(form.username, form.password);
        dispatch(setToken(loginData.token));
        dispatch(setUser(loginData.user));
      }
      setAuthOpen(false);
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
      dispatch(setError(err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const openAuth = () => {
    setAuthOpen(true);
    setAuthMode("login");
    setServerError("");
    setForm({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <>
      <nav className={`transition-all duration-400 ${isScrolled ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-white/[0.06]" : ""}`}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-[68px] flex items-center">
          <Link to="/" className="font-['Playfair_Display'] text-[22px] font-bold tracking-[0.05em] text-white shrink-0 no-underline">
            VE<span className="text-[#c9a96e]">LO</span>
          </Link>

          <div className="hidden lg:flex items-center ml-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-[13px] tracking-[0.06em] uppercase font-medium px-4 py-2 transition-colors duration-200 no-underline
                  after:content-[''] after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px after:bg-[#c9a96e] after:transition-transform after:duration-250 after:origin-left
                  ${location.pathname === link.path
                    ? "text-white after:scale-x-100"
                    : "text-white/60 hover:text-white after:scale-x-0 hover:after:scale-x-100"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <IconButton onClick={() => dispatch(setSearchOpen(true))} aria-label="Search">
              <SearchIcon />
            </IconButton>

            <button
              onClick={() => dispatch(setCartOpen(true))}
              aria-label="Cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-full border border-white/15 bg-transparent text-white/70 cursor-pointer transition-all duration-200 hover:bg-white/[0.08] hover:border-white/30 hover:text-white"
            >
              <BagIcon />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a96e] rounded-full text-[9px] font-bold flex items-center justify-center text-black border-2 border-[#0a0a0a]">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => dispatch(setDashOpen(true))}
                aria-label="Profile"
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#c9a96e] cursor-pointer hover:border-white transition-colors duration-200 bg-gradient-to-br from-[#c9a96e] to-[#a8863f] flex items-center justify-center font-semibold text-[13px] text-black"
              >
                AK
              </button>
            ) : (
              <button
                onClick={openAuth}
                className="hidden sm:block h-9 px-[18px] bg-white text-black text-[12px] font-semibold tracking-[0.08em] uppercase border-none rounded-full cursor-pointer transition-all duration-200 hover:bg-[#f8f8f6] hover:-translate-y-px"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {authOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-lg border border-white/[0.08] bg-[rgba(10,10,10,0.95)] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7"
            >
              {/* Close button */}
              <button
                onClick={() => setAuthOpen(false)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/50 transition hover:bg-white/[0.08] hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#c9a96e]">
                    {isRegister ? "Create account" : "Member login"}
                  </p>
                  <h2 className="font-['Playfair_Display'] mt-1 text-3xl font-bold tracking-normal text-white">
                    {isRegister ? "Register" : "Sign In"}
                  </h2>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#c9a96e] bg-gradient-to-br from-[#c9a96e] to-[#a8863f] text-black">
                  {isRegister ? <User className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
                </div>
              </div>

              {/* Toggle tabs */}
              <div className="mb-5 grid grid-cols-2 gap-1 rounded-full border border-white/[0.06] bg-white/[0.04] p-1">
                {(["login", "register"]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => { setAuthMode(item); setServerError(""); }}
                    className={`relative rounded-full px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition ${
                      authMode === item ? "text-black" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {authMode === item && (
                      <motion.span layoutId="auth-active-tab" className="absolute inset-0 rounded-full bg-[#c9a96e]" />
                    )}
                    <span className="relative">{item}</span>
                  </button>
                ))}
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={authMode}
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <Field
                    icon={<User className="h-5 w-5" />}
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    error={errors.username}
                  />

                  {isRegister && (
                    <Field
                      icon={<Mail className="h-5 w-5" />}
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      error={errors.email}
                    />
                  )}

                  <Field
                    icon={<LockKeyhole className="h-5 w-5" />}
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    error={errors.password}
                    action={
                      <button
                        type="button"
                        onClick={() => setShowPassword((c) => !c)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="grid h-8 w-8 place-items-center rounded-full text-white/45 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#c9a96e]/35"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                  />

                  {isRegister && (
                    <Field
                      icon={<LockKeyhole className="h-5 w-5" />}
                      label="Confirm password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat password"
                      error={errors.confirmPassword}
                    />
                  )}

                  {!isRegister && (
                    <div className="flex items-center justify-between gap-3 text-[13px]">
                      <label className="flex items-center gap-2 text-white/58 cursor-pointer">
                        <input type="checkbox" className="h-4 w-4 rounded border-white/20 accent-[#c9a96e]" />
                        Remember me
                      </label>
                      <button type="button" className="font-semibold text-[#c9a96e] transition hover:text-white">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* New: shows API errors like "wrong password" or "email taken" */}
                  {serverError && (
                    <p className="text-center text-xs font-medium text-red-300">{serverError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black shadow-lg shadow-black/25 transition-all duration-200 hover:-translate-y-px hover:bg-[#f8f8f6] disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {submitting ? "Please wait..." : isRegister ? "Create account" : "Sign In"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.form>
              </AnimatePresence>

              <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                <span className="h-px flex-1 bg-white/[0.08]" />
                or continue with
                <span className="h-px flex-1 bg-white/[0.08]" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SocialButton icon={<GoogleIcon />} label="Google" />
                <SocialButton icon={<FacebookIcon />} label="Facebook" />
              </div>

              <p className="mt-6 text-center text-[13px] text-white/55">
                {isRegister ? "Already have an account?" : "Need an account?"}{" "}
                <button
                  type="button"
                  onClick={() => { setAuthMode(isRegister ? "login" : "register"); setServerError(""); }}
                  className="font-semibold text-[#c9a96e] transition hover:text-white"
                >
                  {isRegister ? "Sign In" : "Register"}
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Sub-components ---------- */

function Field({ icon, label, error, action, ...inputProps }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/58">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">{icon}</span>
        <input
          className={`${fieldBase} ${action ? "pr-12" : ""} ${error ? "border-red-400" : ""}`}
          {...inputProps}
        />
        {action && <span className="absolute right-2 top-1/2 -translate-y-1/2">{action}</span>}
      </span>
      <span className="mt-1 block min-h-5 text-xs font-medium text-red-300">{error}</span>
    </label>
  );
}

function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/15 bg-transparent px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/72 transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
    >
      {icon}
      {label}
    </button>
  );
}