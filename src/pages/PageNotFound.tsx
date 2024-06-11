import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  useColorMode,
  ButtonGroup,
} from "@chakra-ui/react";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const isDark = colorMode === "dark";
  const goBack = () => navigate(-1);

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
          <Heading as="h1" size="4xl" color="purple.500" fontWeight="bold">
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
          <ButtonGroup>
            <Button
              as={Link}
              to="/"
              bg="purple.500"
              color="white"
              _hover={{ bg: "purple.700" }}
              reloadDocument
            >
              Go Home
            </Button>
            <Button
              onClick={goBack}
              bg="purple.500"
              color="white"
              _hover={{ bg: "purple.700" }}
            >
              Go Back
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PageNotFound;
