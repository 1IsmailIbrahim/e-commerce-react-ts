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
import { useNavigate, useParams } from "react-router-dom";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import HoverImage from "../components/HoverImage";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../app/store";
import { addToCart } from "../app/features/cartSlice";
import { useGetDashboardProductsQuery } from "../app/services/productsApiSlice";
import { ICategory, IProduct } from "../interfaces";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetDashboardProductsQuery();
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
  const selectedProduct = data?.data.find(
    (product: IProduct) => product.id === +`${id}`
  );

  const { title, description, price, thumbnail, categories } =
    selectedProduct?.attributes ?? {};
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
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
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
          border={".1px solid rgba(168, 181, 200,0.3)"}
          px={4}
          py={2}
          {...LinkStyles}
        >
          <ArrowBackIcon />
          <Text>Back</Text>
        </Flex>
      </Flex>
      <Card
        py={"50px"}
        border={".1px solid rgba(168, 181, 200,0.3)"}
        maxWidth={"5xl"}
        mx={"auto"}
        bg={"none"}
      >
        <Flex mx={"auto"} gap={5}>
          {thumbnailUrl && (
            <HoverImage
              thumbnailSrc={`${thumbnailUrl}`}
              fullImageSrc={`${fullImageUrl}`}
              alt="Product image"
            />
          )}
          <Stack justifyContent={"space-between"} maxW={"xl"} spacing="3">
            <Heading size="lg">{title}</Heading>
            <Box fontWeight={"bold"} fontSize={"20px"}>
              Description :
              <Text fontWeight={"100"} fontSize={"18px"}>
                {description}
              </Text>
            </Box>
            <Flex gap={1} flexWrap={"wrap"}>
              {categories?.data.map((category: ICategory, idx: number) => (
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
