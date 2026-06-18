import { createSlice } from '@reduxjs/toolkit';

// Holds the open/closed state for the slide-out panels (cart, search,
// dashboard) plus the navbar scroll flag. Keys are named to match what
// CartPanel (state.ui.cartOpen) and DashboardPanel (state.ui.dashOpen)
// read directly.
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isScrolled: false,
    cartOpen: false,
    searchOpen: false,
    dashOpen: false,
  },
  reducers: {
    setScrolled: (state, action) => {
      state.isScrolled = action.payload;
    },
    setCartOpen: (state, action) => {
      state.cartOpen = action.payload;
    },
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
    setDashOpen: (state, action) => {
      state.dashOpen = action.payload;
    },
    closeAllOverlays: (state) => {
      // MainLayout uses this for the search overlay's onClose — also
      // closes cart/dash in case multiple panels are ever open together.
      state.searchOpen = false;
      state.cartOpen = false;
      state.dashOpen = false;
    },
  },
});

export const { setScrolled, setCartOpen, setSearchOpen, setDashOpen, closeAllOverlays } = uiSlice.actions;
export default uiSlice.reducer;