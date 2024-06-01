import {
  Card,
  CardBody,
  Heading,
  Stack,
  Image,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";
const ProductCard = ({
  attributes: { title, description, price, thumbnail },
  id,
}: IProduct) => {
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

  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody display={"flex"} flexDir={"column"} justifyContent={"flex-end"}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${
            thumbnail?.data?.attributes?.url
          }`}
          alt="Product image"
          borderRadius="full"
          boxSize={200}
          mx={"auto"}
        />
        <Stack mt="6" spacing="3" textAlign={"center"}>
          <Heading size="md">{title}</Heading>
          <Text>
            {description.length >= 150
              ? `${description.slice(0, 150)}...`
              : description}
          </Text>
          <Text color="purple.600" fontSize="3xl">
            {price}
          </Text>
          <Button
            as={Link}
            to={`/product/${id}`}
            py={5}
            overflow={"hidden"}
            w={"full"}
            size={"xl"}
            border={"none"}
            variant="outline"
            {...buttonStyles}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
