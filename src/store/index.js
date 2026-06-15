import { configureStore, createSlice } from '@reduxjs/toolkit';

// Constants
const INITIAL_CART = [
  { id: 1, name: "Arctic Puffer Jacket", color: "Ivory", size: "M", price: 189, qty: 1, img: "https://framerusercontent.com/images/g813yVl0fq2gEobS7kOZx537SY.jpg" },
  { id: 2, name: "Urban Layer Coat", color: "Charcoal", size: "L", price: 245, qty: 1, img: "https://framerusercontent.com/images/Or4CSjqekPU2Ug6V0zSDTbgtg.jpg" },
];

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: INITIAL_CART },
  reducers: {
    updateQty: (state, action) => {
      const { id, delta } = action.payload;
      state.items = state.items.map((i) => 
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, user: null },
  reducers: {
    signIn: (state) => {
      state.isLoggedIn = true;
      state.user = { name: "Alex Kim", email: "alex.kim@email.com", avatar: "AK" };
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// UI Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState: { 
    cartOpen: false, 
    dashOpen: false, 
    searchOpen: false, 
    isScrolled: false 
  },
  reducers: {
    setCartOpen: (state, action) => { state.cartOpen = action.payload; },
    setDashOpen: (state, action) => { state.dashOpen = action.payload; },
    setSearchOpen: (state, action) => { state.searchOpen = action.payload; },
    setIsScrolled: (state, action) => { state.isScrolled = action.payload; },
    closeAllOverlays: (state) => {
      state.cartOpen = false;
      state.dashOpen = false;
      state.searchOpen = false;
    },
  },
});

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// Export actions
export const { updateQty, removeItem, addItem, clearCart } = cartSlice.actions;
export const { signIn, signOut } = authSlice.actions;
export const { setCartOpen, setDashOpen, setSearchOpen, setIsScrolled, closeAllOverlays } = uiSlice.actions;