import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import ScreenerSlice from "./slices/ScreenerSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    Screener: ScreenerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
