import { IProduct } from "../interfaces";

export const addItemToCart = (cartProducts: IProduct[], action: IProduct) => {
  const exists = cartProducts.find((item: IProduct) => item.id === action.id);

  if (exists) {
    return cartProducts.map((item: IProduct) =>
      item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartProducts, { ...action, quantity: 1 }];
};

export const removeItemFromCart = (cartItems: IProduct[], action: IProduct) => {
  if (action.quantity > 1) {
    return cartItems.map((item: IProduct) =>
      item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
  if (action.quantity === 1) {
    return cartItems.filter((item: IProduct) => item.id !== action.id);
  }
  return cartItems;
};
