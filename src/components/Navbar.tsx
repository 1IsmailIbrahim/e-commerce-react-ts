import { useState, useRef, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  useColorMode,
  IconButton,
  useMediaQuery,
  Menu,
  MenuButton,
  Center,
  MenuList,
  Avatar,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ColorModeToggle from "./ColorModeToggle";
import CookieService from "../services/CookieService";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCart } from "../app/features/cartSlice";
import { useAppDispatch } from "../app/store";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";

const Navbar = () => {
  const { cartProducts } = useSelector(selectCart);
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const token = CookieService.get("jwt");
  const [isLargerThanMobile] = useMediaQuery("(min-width: 48em)");
  const isAdmin = !!CookieService.get("data");

  const LinkStyles = {
    variant: "ghost",
    size: "sm",
    border: "1px solid",
    borderRadius: "30",
    padding: "0.2rem 1rem",
    transition: "all 0.3s",
    _hover: {
      color: colorMode === "light" ? "#8D64DF" : "#9f7aea",
      borderColor: colorMode === "light" ? "#8D64DF" : "#9f7aea",
      transition: "background-color 0.3s, border-color 0.3s",
      backgroundColor: "rgba(220,220,220, 0.9)",
    },
    _activeLink: {
      color: colorMode === "light" ? "#8D64DF" : "#9f7aea",
      borderColor: colorMode === "light" ? "#8D64DF" : "#9f7aea",
      backgroundColor: "rgba(220,220,220)",
    },
  };

  useEffect(() => {
    if (isLargerThanMobile) {
      setIsOpen(false);
    }
  }, [isLargerThanMobile]);
  // Close nav when an action happened
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const handleLinkClick = () => {
    if (!isLargerThanMobile) {
      setIsOpen(false);
    }
  };
  const onLogout = () => {
    CookieService.remove("data");
    CookieService.remove("jwt");
    CookieService.remove("username");
    handleLinkClick();
    location.replace(pathname);
  };
  const ProfileMenu = () => {
    return (
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} bg="purple.500" />
        </MenuButton>
        <MenuList alignItems={"center"}>
          <br />
          <Center>
            <Avatar size={"xl"} bg="purple.500" />
          </Center>
          <br />
          <Center>
            <p>Username</p>
          </Center>
          <br />
          <MenuDivider />
          <MenuItem>Your Servers</MenuItem>
          <MenuItem>Account Settings</MenuItem>
          <MenuItem
            onClick={onLogout}
            _hover={{
              borderRadius: "md",
            }}
          >
            <Button
              _hover={{ color: "red.300" }}
              as={NavLink}
              to={"/"}
              rounded={"full"}
              variant="link"
            >
              <IoIosLogOut fontSize={18} />
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <Flex
      ref={navbarRef}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={
        isOpen || colorMode === "light"
          ? "rgba(220,220,220, 0.4)"
          : "transparent"
      }
      color={colorMode === "light" ? "gray.900" : "white"}
      position="absolute"
      top={0}
      width="100%"
      zIndex={3}
    >
      <Flex gap={4} align="center" mr={5}>
        <Heading cursor={"pointer"} as={Link} to={`/`} size="md">
          Elimr
        </Heading>
        {isAdmin && (
          <Button as={NavLink} {...LinkStyles} to={"/dashboard"}>
            Dashboard
          </Button>
        )}
      </Flex>
      <Box display={{ base: "flex", md: "none" }}>
        {token && !isLargerThanMobile && ProfileMenu()}
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={6} />}
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
          marginTop={{ base: "15px", md: "auto" }}
        >
          <Button
            {...LinkStyles}
            as={NavLink}
            to={"/"}
            onClick={handleLinkClick}
          >
            Home
          </Button>
          <Button
            {...LinkStyles}
            as={NavLink}
            to={"/products"}
            onClick={handleLinkClick}
          >
            Products
          </Button>
          <Button
            {...LinkStyles}
            onClick={() => dispatch(onOpenCartDrawerAction())}
          >
            Cart ({cartProducts.length})
          </Button>
          {!token && (
            <Button
              size="sm"
              as={NavLink}
              w={20}
              rounded={"full"}
              to={"/login"}
              onClick={handleLinkClick}
              bgColor={"rgba(220,220,220, 0.5)"}
            >
              Login
            </Button>
          )}
          <Button
            width={"10"}
            rounded={"full"}
            bgColor={"rgba(220,220,220, 0.5)"}
            display={"flex"}
            variant="ghost"
            size="sm"
          >
            <ColorModeToggle />
          </Button>
          {token && !isOpen && ProfileMenu()}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
