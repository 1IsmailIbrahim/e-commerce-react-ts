import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  useColorMode,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ColorModeToggle from "./ColorModeToggle";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);

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

  const [isLargerThanMobile] = useMediaQuery("(min-width: 48em)");

  React.useEffect(() => {
    if (isLargerThanMobile) {
      setIsOpen(false);
    }
  }, [isLargerThanMobile]);

  const handleLinkClick = () => {
    if (!isLargerThanMobile) {
      setIsOpen(false);
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={colorMode === "light" ? "#e6f3fd" : "gray.900"}
      color={colorMode === "light" ? "gray.900" : "white"}
    >
      <Flex align="center" mr={5}>
        <Heading cursor={"pointer"} as={Link} to={`/`} size="md">
          Elimr
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        />
      </Box>

      <Box
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          gap={5}
          align="center"
          flexDirection={{ base: isOpen ? "column" : "row", md: "row" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Button {...LinkStyles} to={"/"} onClick={handleLinkClick}>
            Home
          </Button>
          <Button {...LinkStyles} to={"/about"} onClick={handleLinkClick}>
            About
          </Button>
          <Button {...LinkStyles} to={"/products"} onClick={handleLinkClick}>
            Products
          </Button>
          <Button
            as={NavLink}
            w={20}
            rounded={"full"}
            to={"/login"}
            onClick={handleLinkClick}
          >
            Login
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
