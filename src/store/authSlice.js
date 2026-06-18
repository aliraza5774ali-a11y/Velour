import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'), // matches Navbar's state.auth.isLoggedIn
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, setToken, logout, setError } = authSlice.actions;
// Alias: DashboardPanel.jsx dispatches signOut() — same action as logout,
// just exported under the name that component already expects.
export const signOut = logout;
export default authSlice.reducer;