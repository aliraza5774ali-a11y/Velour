import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setCartOpen, setSearchOpen, setDashOpen } from '../store';
import IconButton from './IconButton';
import { SearchIcon, BagIcon } from '../assets/icons/index';
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const location = useLocation()
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.items.reduce((s, i) => s + i.qty, 0));
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className={`transition-all duration-400 ${useAppSelector((state) => state.ui.isScrolled) ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-white/[0.06]" : ""}`}>
      <div className="max-w-[1280px] mx-auto px-8 h-[68px] flex items-center">
        <Link to="/" className="font-['Playfair_Display'] text-[22px] font-bold tracking-[0.05em] text-white shrink-0 no-underline">
  VE<span className="text-[#c9a96e]">LO</span>
</Link>

        <div className="flex items-center ml-12">
          {NAV_LINKS.map((link) => (
  <Link
    key={link.name}
    to={link.path}
    className={`relative text-[13px] tracking-[0.06em] uppercase font-medium px-4 py-2 transition-colors duration-200 no-underline
      after:content-[''] after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px after:bg-[#c9a96e] after:transition-transform after:duration-250 after:origin-left
      ${
        location.pathname === link.path
          ? "text-white after:scale-x-100"
          : "text-white/60 hover:text-white after:scale-x-0 hover:after:scale-x-100"
      }`}
  >
    {link.name}
  </Link>
))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <IconButton onClick={() => dispatch(setSearchOpen(true))} aria-label="Search"><SearchIcon /></IconButton>

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
              onClick={() => dispatch(setDashOpen(true))}
              className="h-9 px-[18px] bg-white text-black text-[12px] font-semibold tracking-[0.08em] uppercase border-none rounded-full cursor-pointer transition-all duration-200 hover:bg-[#f8f8f6] hover:-translate-y-px"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}