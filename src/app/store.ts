import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { LoginApiSlice } from "./features/loginSlice";

export const store = configureStore({
  reducer: {
    [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LoginApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
