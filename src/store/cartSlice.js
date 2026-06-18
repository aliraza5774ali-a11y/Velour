import { createSlice } from '@reduxjs/toolkit';

// Cart slice — items + the actions CartItem.jsx and CartPanel.jsx need:
// updateQty (+/- buttons), removeItem (Remove link), setCartItems (e.g.
// after fetching a saved cart from your backend).
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item shape: { id, name, img, color, size, price, qty }
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    updateQty: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.qty = Math.max(1, item.qty + delta); // never drops below 1
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { setCartItems, updateQty, removeItem } = cartSlice.actions;
export default cartSlice.reducer;