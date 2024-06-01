import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  useColorMode,
} from "@chakra-ui/react";

const PageNotFound = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex
      position="fixed"
      inset="0"
      align="center"
      justify="center"
      w="full"
      h="full"
      bg={isDark ? "gray.800" : "gray.50"}
    >
      <Box px={4} py={{ base: 8, lg: 12 }}>
        <Flex direction="column" align="center" justify="center">
          <Heading as="h1" size="4xl" color="#149eca" fontWeight="bold">
            404
          </Heading>
          <Text
            mb={2}
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            textAlign="center"
            color={isDark ? "white" : "gray.800"}
          >
            <Text as="span" mr={2} color="red.500">
              Oops!
            </Text>
            <Text as="span">Page not found</Text>
          </Text>
          <Text
            mb={8}
            textAlign="center"
            fontSize={{ base: "md", md: "lg" }}
            color={isDark ? "gray.300" : "gray.600"}
          >
            The page you’re looking for doesn’t exist.
          </Text>
          <Button
            as={Link}
            to="/"
            bg="#149eca"
            color="white"
            _hover={{ textDecoration: "none", bg: "#117b9b" }}
            reloadDocument
          >
            Go Home
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PageNotFound;
