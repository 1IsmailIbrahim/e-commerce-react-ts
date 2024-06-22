import {
  Button,
  Flex,
  Text,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectCart, removeAllCart } from "../app/features/cartSlice";
import { IProduct } from "../interfaces";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import { useAppDispatch } from "../app/store";
import CartDrawerItems from "./CartDrawerItems";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total: number, product: IProduct) => {
      return total + product.attributes.price * product?.quantity;
    }, 0);
  };

  const onClose = () => dispatch(onCloseCartDrawerAction());
  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Shopping Cart Items</DrawerHeader>
        {CartDrawerItems()}
        <DrawerFooter justifyContent={"space-evenly"}>
          <Flex
            align={"center"}
            gap={2}
            fontSize="2xl"
            fontWeight="bold"
            mr="4"
          >
            Total :
            <Text fontSize="3xl" color={"green.300"}>
              ${calculateTotalPrice().toFixed(2)}
            </Text>
          </Flex>
          {cartProducts.length > 0 ? (
            <Button
              variant={"outline"}
              onClick={() => dispatch(removeAllCart())}
              colorScheme="red"
            >
              Clear All
            </Button>
          ) : (
            <Button variant={"outline"} onClick={onClose} colorScheme="red">
              Close
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
