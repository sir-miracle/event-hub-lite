import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import networkRequests from '../services/networkRequests';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [networkRequests.reducerPath]: networkRequests.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(networkRequests.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
