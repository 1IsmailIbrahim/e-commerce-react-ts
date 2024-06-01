import { Flex, Box, Heading, Button, useColorMode } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import ColorModeToggle from "./ColorModeToggle";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const LinkStyles = {
    variant: "ghost",
    as: NavLink,
    _hover: {
      color: colorMode === "light" ? "#8D64DF" : "#9f7aea",
      backgroundColor: "gray.200",
      transition: "background-color 0.3s",
    },
    _activeLink: {
      color: colorMode === "light" ? "#8D64DF" : "#9f7aea",
      backgroundColor: "gray.200",
      transition: "background-color 0.3s",
    },
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      marginBottom={"10px"}
      bg={colorMode === "light" ? "#e6f3fd" : "gray.900"}
      color={colorMode === "light" ? "gray.900" : "white"}
    >
      <Flex align="center" mr={5}>
        <Heading cursor={"pointer"} as={Link} to={`/`} size="md">
          Elimr
        </Heading>
      </Flex>

      <Box
        display={{ base: "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex gap={5} align="center">
          <Button {...LinkStyles} to={"/"}>
            Home
          </Button>
          <Button {...LinkStyles} to={"/about"}>
            About
          </Button>
          <Button {...LinkStyles} to={"/products"}>
            Products
          </Button>
          <Box display={{ base: "block" }}>
            <ColorModeToggle />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
