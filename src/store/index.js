import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import cartReducer from './cartSlice';

// Bug fix: original file referenced `authReducer` without ever
// importing it, and only had one slice — but Navbar needs
// state.auth, state.ui, and state.cart all to exist.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    cart: cartReducer,
  },
});

// Re-export so existing imports like:
//   import { setCartOpen, setSearchOpen, setDashOpen } from '../store';
// keep working without changing Navbar.jsx at all.
export { setCartOpen, setSearchOpen, setDashOpen, setScrolled, closeAllOverlays } from './uiSlice';
export { setLoading, setUser, setToken, logout, signOut, setError } from './authSlice';
export { setCartItems, updateQty, removeItem } from './cartSlice';