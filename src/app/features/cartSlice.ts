import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";
import { RootState } from "../store";
import { addItemToCart, removeItemFromCart } from "../../utils/functions";

interface ICart {
  cartProducts: IProduct[];
}

const initialState: ICart = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = addItemToCart(state.cartProducts, action.payload);
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = removeItemFromCart(
        state.cartProducts,
        action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCart = ({ cart }: RootState) => cart;

export default cartSlice.reducer;
