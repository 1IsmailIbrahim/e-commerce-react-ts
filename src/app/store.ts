import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { WebStorage, persistReducer, persistStore } from "redux-persist";
import { LoginApiSlice } from "./features/loginSlice";
import cartSlice, { ICart } from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { productsApiSlice } from "./services/productsApiSlice";

interface IPersistCart {
  key: string;
  storage: WebStorage;
}

const persistCartConfig: IPersistCart = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistCartConfig, cartSlice);

export const store: EnhancedStore<{
  cart: ICart & PersistPartial;
  global: ReturnType<typeof globalSlice>;
  [LoginApiSlice.reducerPath]: ReturnType<typeof LoginApiSlice.reducer>;
}> = configureStore({
  reducer: {
    cart: persistedCart,
    global: globalSlice,
    [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      LoginApiSlice.middleware,
      productsApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
