import {
  Card,
  CardBody,
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

const ProductDetailsPage = () => {
  const { id } = useParams();
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
      }/api/products/${id}?populate=thumbnail,categories`
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
      <Box maxW={"sm"} mx={"auto"} my={20}>
        <ProductCardSkeleton variant={""} />
      </Box>
    );
  }

  return (
    <Box mx={2}>
      <Flex maxW={"md"} mx={"auto"} my={7}>
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
      <Card maxW={"md"} mx={"auto"} border={"1px solid #a8b5c8"} bg={"none"}>
        <CardBody>
          {thumbnailUrl && (
            <HoverImage
              thumbnailSrc={`${import.meta.env.VITE_SERVER_URL}${thumbnailUrl}`}
              fullImageSrc={`${import.meta.env.VITE_SERVER_URL}${fullImageUrl}`}
              alt="Product image"
            />
          )}
          <Stack mt="6" spacing="3" textAlign={"center"}>
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
            <Flex gap={1} flexWrap={"wrap"}>
              {categories?.data.map((category: IProduct, idx: number) => (
                <Text
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
            <Text color="purple.600" fontSize="3xl">
              {price}
            </Text>
            <Button
              py={5}
              overflow={"hidden"}
              w={"full"}
              size={"xl"}
              border={"none"}
              variant="outline"
              {...buttonStyles}
            >
              Add to cart
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ProductDetailsPage;
