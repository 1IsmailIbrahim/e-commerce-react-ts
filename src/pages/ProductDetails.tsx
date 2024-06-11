import {
  Card,
  Heading,
  Stack,
  Text,
  Button,
  useColorMode,
  Flex,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { IProduct } from "../interfaces";
import HoverImage from "../components/HoverImage";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../app/store";
import { addToCart } from "../app/features/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const buttonStyles = {
    bg: colorMode === "light" ? "#e6f3fd" : "#9f7aea",
    color: colorMode !== "light" ? "e6f3fd" : "#9f7aea",
    _hover: {
      bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
      color: colorMode === "light" ? "white" : "#9f7aea",
      border: "transparent",
    },
  };
  const LinkStyles = {
    _hover: {
      color: colorMode === "light" ? "#8D64DF" : "#9f7aea",
      backgroundColor: "gray.200",
      transition: "background-color 0.3s",
    },
  };

  const getProductDetails = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=thumbnail,categories&fields[0]=title&fields[2]=price&fields[1]=description`
    );
    return data;
  };

  const { data, isLoading } = useQuery(["product", id], getProductDetails);
  const { title, description, price, thumbnail, categories } =
    data?.data?.attributes ?? {};
  const thumbnailUrl = thumbnail?.data?.attributes?.url;
  const fullImageUrl = thumbnailUrl;

  const goBack = () => navigate(-1);

  if (isLoading) {
    return (
      <Box pt={20} maxW={"sm"} mx={"auto"} my={20}>
        <ProductCardSkeleton variant={""} />
      </Box>
    );
  }

  const addToCartHandler = () => {
    dispatch(addToCart(data.data));
  };

  return (
    <Box pt={20} mx={2}>
      <Flex maxWidth={"5xl"} mx={"auto"} my={7}>
        <Flex
          cursor={"pointer"}
          onClick={goBack}
          rounded={"md"}
          alignItems={"center"}
          gap={3}
          border={"1px solid #a8b5c8"}
          px={4}
          py={2}
          {...LinkStyles}
        >
          <ArrowBackIcon />
          <Text>Back</Text>
        </Flex>
      </Flex>
      <Card maxWidth={"5xl"} mx={"auto"} bg={"none"}>
        <Flex gap={5}>
          {thumbnailUrl && (
            <HoverImage
              thumbnailSrc={`${import.meta.env.VITE_SERVER_URL}${thumbnailUrl}`}
              fullImageSrc={`${import.meta.env.VITE_SERVER_URL}${fullImageUrl}`}
              alt="Product image"
            />
          )}
          <Stack justifyContent={"space-between"} maxW={"xl"} spacing="3">
            <Heading size="lg">{title}</Heading>
            <Box fontWeight={"bold"} fontSize={"20px"}>
              Discription :
              <Text fontWeight={"100"} fontSize={"18px"}>
                {description}
              </Text>
            </Box>
            <Flex gap={1} flexWrap={"wrap"}>
              {categories?.data.map((category: IProduct, idx: number) => (
                <Text
                  align={"center"}
                  cursor={"pointer"}
                  key={idx}
                  {...buttonStyles}
                  p={1}
                  mx={"auto"}
                  w={"130px"}
                  rounded={"2xl"}
                >
                  {category.attributes.title}
                </Text>
              ))}
            </Flex>
            <Text textAlign={"center"} color="purple.600" fontSize="3xl">
              ${price}
            </Text>
            <Button
              py={5}
              overflow={"hidden"}
              w={"full"}
              size={"xl"}
              border={"none"}
              variant="outline"
              {...buttonStyles}
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </Stack>
        </Flex>
      </Card>
    </Box>
  );
};

export default ProductDetailsPage;
