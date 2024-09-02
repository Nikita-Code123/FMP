// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userId: null,
    role: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
