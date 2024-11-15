// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;  // Infer RootState type
export type AppDispatch = typeof store.dispatch;  // Infer AppDispatch type

export default store;
