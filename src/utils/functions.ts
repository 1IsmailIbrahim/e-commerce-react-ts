import { IProduct } from "../interfaces";
import CookieService from "../services/CookieService";

export const addItemToCart = (
  cartProducts: IProduct[],
  selectedProduct: IProduct
) => {
  const exists = cartProducts.find(
    (item: IProduct) => item.id === selectedProduct.id
  );

  if (exists) {
    return cartProducts.map((item: IProduct) =>
      item.id === selectedProduct.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartProducts, { ...selectedProduct, quantity: 1 }];
};

export const removeItemFromCart = (
  cartItems: IProduct[],
  selectedProduct: IProduct
) => {
  if (selectedProduct.quantity > 1) {
    return cartItems.map((item: IProduct) =>
      item.id === selectedProduct.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
  if (selectedProduct.quantity === 1) {
    return cartItems.filter((item: IProduct) => item.id !== selectedProduct.id);
  }
  return cartItems;
};
