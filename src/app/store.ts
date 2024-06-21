import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { WebStorage, persistReducer, persistStore } from "redux-persist";
import { LoginApiSlice } from "./features/loginSlice";
import cartSlice, { ICart } from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { productsApiSlice } from "./services/productsApiSlice";
import { categoriesApiSlice } from "./services/categoriesApiSlice";
import { usersApiSlice } from "./services/usersApiSlice";
import networkSlice from "./features/networkSlice";
import { RegisterApiSlice } from "./features/registerSlice";

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
  network: ReturnType<typeof networkSlice>;
  [LoginApiSlice.reducerPath]: ReturnType<typeof LoginApiSlice.reducer>;
  [RegisterApiSlice.reducerPath]: ReturnType<typeof RegisterApiSlice.reducer>;
  [productsApiSlice.reducerPath]: ReturnType<typeof productsApiSlice.reducer>;
  [categoriesApiSlice.reducerPath]: ReturnType<
    typeof categoriesApiSlice.reducer
  >;
  [usersApiSlice.reducerPath]: ReturnType<typeof usersApiSlice.reducer>;
}> = configureStore({
  reducer: {
    cart: persistedCart,
    global: globalSlice,
    network: networkSlice,
    [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
    [RegisterApiSlice.reducerPath]: RegisterApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      LoginApiSlice.middleware,
      RegisterApiSlice.middleware,
      productsApiSlice.middleware,
      categoriesApiSlice.middleware,
      usersApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
