import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  firstname?: string;
  lastname?: string;
  isActive?: boolean;
  accessToken?: string;
  // Add other auth properties here as needed
};

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
    logout: () => {},
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
