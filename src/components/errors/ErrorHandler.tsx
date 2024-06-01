import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const { pathname } = useLocation();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex
      position="fixed"
      inset="0"
      align="center"
      justify="center"
      p="5"
      w="full"
      bg={isDark ? "gray.800" : "gray.50"}
      color={isDark ? "gray.100" : "gray.800"}
    >
      <VStack spacing={5} textAlign="center">
        <Box
          bg={isDark ? "red.300" : "red.100"}
          p={4}
          rounded="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg={isDark ? "red.400" : "red.200"}
            p={4}
            rounded="full"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiAlertTriangle} w={16} h={16} color="red.600" />
          </Box>
        </Box>
        <Text fontSize={{ base: "36px", lg: "50px" }} fontWeight="bold">
          {statusCode} - {title}
        </Text>
        <Text fontSize={{ base: "md", lg: "lg" }}>
          Oops something went wrong. Try to refresh this page or <br /> feel
          free to contact us if the problem persists.
        </Text>
        <Flex justify="center" gap={4}>
          <Button
            as={Link}
            to="/"
            colorScheme="teal"
            variant="solid"
            _hover={{ textDecoration: "none" }}
            reloadDocument
          >
            Home
          </Button>
          <Button
            as={Link}
            to={pathname}
            colorScheme="teal"
            variant="solid"
            _hover={{ textDecoration: "none" }}
            reloadDocument
          >
            Refresh
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default ErrorHandler;
