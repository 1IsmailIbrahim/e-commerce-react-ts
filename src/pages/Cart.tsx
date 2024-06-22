import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCart,
} from "../app/features/cartSlice";
import { useAppDispatch } from "../app/store";
import { FiShoppingCart } from "react-icons/fi";

const CartPage = () => {
  const dispatch = useAppDispatch();

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBgColor = useColorModeValue("gray.100", "gray.600");
  const { cartProducts } = useSelector(selectCart);
  cartProducts.map((product) => product.id);

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      return total + product.attributes.price * product?.quantity;
    }, 0);
  };

  return cartProducts.length > 0 ? (
    <Box pt={20}>
      <Grid templateColumns="repeat(1, 1fr)" gap={6} p={4} rounded="md" mb={10}>
        {cartProducts.map((product) => (
          <Box
            key={product.id}
            position="relative"
            overflow="hidden"
            rounded="lg"
            borderWidth="1px"
            borderColor={borderColor}
            bg={bgColor}
            shadow="md"
          >
            <Flex mt={4} px={5} pb={5} justify="space-between" align="center">
              <Flex align="center">
                <Box
                  as="a"
                  mx={3}
                  mt={3}
                  h="60"
                  w="60"
                  overflow="hidden"
                  rounded="xl"
                  href="#"
                >
                  <Image
                    w="full"
                    h="full"
                    src={`${product.attributes.thumbnail?.data?.attributes?.url}`}
                    alt={`product ${product.id} image`}
                  />
                </Box>
                <Box>
                  <Box as="a" href="#">
                    <Heading as="h5" size="md" isTruncated maxW="200px">
                      {product.attributes.title}
                    </Heading>
                  </Box>
                  <Flex mt={2} flexDir="column" justify="space-between">
                    <Text fontSize="xl" fontWeight="semibold" color="green.500">
                      ${product.attributes.price}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <Flex flexDir="column" align="center">
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Quantity: {product.quantity}
                </Text>
                <Flex align="center" justify="space-between">
                  <Button
                    fontSize="xl"
                    h="10"
                    w="10"
                    borderWidth="2px"
                    borderColor={borderColor}
                    rounded="lg"
                    bg={bgColor}
                    _hover={{ bg: hoverBgColor }}
                    mr={2}
                    onClick={() => dispatch(removeFromCart(product))}
                  >
                    -
                  </Button>
                  <Button
                    fontSize="xl"
                    h="10"
                    w="10"
                    borderWidth="2px"
                    borderColor={borderColor}
                    rounded="lg"
                    bg={bgColor}
                    _hover={{ bg: hoverBgColor }}
                    onClick={() => dispatch(addToCart(product))}
                  >
                    +
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>
      <Text fontSize="2xl" fontWeight="bold" ml={2} mt={4}>
        Total Price: ${calculateTotalPrice()}
      </Text>
    </Box>
  ) : (
    <Flex
      minHeight={"100vh"}
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
        <Text mx={"auto"} width={"400px"} color={"gray.500"}>
          It seems like you haven't added any items to your cart yet. Explore
          our products and start adding items to your cart now!
        </Text>
      </Box>
    </Flex>
  );
};

export default CartPage;
