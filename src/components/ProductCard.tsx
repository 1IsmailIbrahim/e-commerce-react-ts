import {
  Card,
  CardBody,
  Heading,
  Stack,
  Image,
  Text,
  Button,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";
import { addToCart } from "../app/features/cartSlice";
import { useAppDispatch } from "../app/store";

const ProductCard = (data: IProduct) => {
  const {
    attributes: { title, description, price, thumbnail },
    id,
  } = data;
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();

  const buttonStyles = {
    bg: colorMode === "light" ? "#e6f3fd" : "#9f7aea",
    color: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
    _hover: {
      bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
      color: colorMode === "light" ? "white" : "#9f7aea",
      border: "transparent",
    },
  };

  const addToCartHandler = () => {
    dispatch(addToCart(data));
  };

  return (
    <Card
      maxW="300px"
      h="470px"
      mx="auto"
      border="1px solid #a8b5c8"
      bg="none"
      boxShadow="lg"
      borderRadius="lg"
    >
      <CardBody display="flex" flexDirection="column" alignItems="center">
        <Image
          src={thumbnail?.data?.attributes?.url}
          alt="Product image"
          borderRadius="md"
          boxSize="200px"
          objectFit="contain"
        />
        <Stack mt="6" spacing="3" textAlign="center" width="100%">
          <Heading size="md">{title}</Heading>
          <Text noOfLines={2}>{description}</Text>
          <Text color="purple.600" fontSize="2xl">
            ${price}
          </Text>
          <Flex
            justifyContent="center"
            alignItems="center"
            gap={2}
            flexDirection={{ lg: "row" }}
            overflow={"hidden"}
          >
            <Button
              as={Link}
              to={`/product/${id}`}
              w="full"
              py="10px"
              px="5px"
              {...buttonStyles}
            >
              View Details
            </Button>
            <Button
              w="full"
              py="10px"
              px="5px"
              {...buttonStyles}
              onClick={addToCartHandler}
            >
              Add To Cart
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
