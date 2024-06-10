import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  selectCart,
  addToCart,
  removeFromCart,
  removeAllCart,
} from "../app/features/cartSlice";
import { FiShoppingCart } from "react-icons/fi";
import { IProduct } from "../interfaces";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import { useAppDispatch } from "../app/store";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");
  const { cartProducts } = useSelector(selectCart);

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total: number, product: IProduct) => {
      return total + product.attributes.price * product.quantity;
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

        <DrawerBody>
          {cartProducts.length > 0 ? (
            <Grid templateColumns="repeat(1, 1fr)" gap={4}>
              {cartProducts.map((product: IProduct) => (
                <Box
                  key={product.id}
                  borderWidth="1px"
                  borderColor={borderColor}
                  bg={bgColor}
                  rounded="md"
                  overflow="hidden"
                  p="4"
                >
                  <Flex justify={"space-between"} align="center">
                    <Flex align={"center"}>
                      <Image
                        boxSize="80px"
                        src={`${import.meta.env.VITE_SERVER_URL}${
                          product.attributes.thumbnail?.data?.attributes?.url
                        }`}
                        alt={product.attributes.title}
                        borderRadius="md"
                        mr="4"
                      />
                      <Box>
                        <Heading as="h4" size="md" mb="2">
                          {product.attributes.title.length >= 15
                            ? `${product.attributes.title.slice(0, 15)}...`
                            : product.attributes.title}
                        </Heading>
                        <Text
                          fontSize="lg"
                          color="gray.600"
                          fontWeight="semibold"
                          mb="2"
                        >
                          ${product.attributes.price}
                        </Text>
                      </Box>
                    </Flex>
                    <Box>
                      <Text fontSize="sm" color="gray.500">
                        Quantity: {product.quantity}
                      </Text>
                      <Flex mt="2">
                        <Button
                          size="sm"
                          onClick={() => dispatch(addToCart(product))}
                          bg="green.500"
                          color="white"
                          _hover={{
                            bg: "green.600",
                          }}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          ml="2"
                          onClick={() => dispatch(removeFromCart(product))}
                          bg="red.500"
                          color="white"
                          _hover={{
                            bg: "red.600",
                          }}
                        >
                          -
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Grid>
          ) : (
            <Flex
              textAlign={"center"}
              align={"center"}
              justifyContent={"center"}
            >
              <Box textAlign="center" py={10} px={6}>
                <Icon
                  as={FiShoppingCart}
                  boxSize={"50px"}
                  color={"green.500"}
                  alignSelf={"center"}
                />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                  Your cart is empty
                </Heading>
                <Text mx={"auto"} color={"gray.500"}>
                  It seems like you haven't added any items to your cart yet.
                  Explore our products and start adding items to your cart now!
                </Text>
              </Box>
            </Flex>
          )}
        </DrawerBody>
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
          <Button
            variant={"outline"}
            onClick={() => dispatch(removeAllCart())}
            colorScheme="red"
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
