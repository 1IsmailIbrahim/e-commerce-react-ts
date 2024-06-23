import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputRightElement,
  Link,
  Stack,
  InputGroup,
  FormHelperText,
  useToast,
  Box,
  Select,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import CookieService from "../services/CookieService";
import { useUserRegisterMutation } from "../app/features/registerSlice";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    admin: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [isUsername, setIsUsername] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  const toast = useToast();

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "admin") {
      setUser({ ...user, admin: value === "true" }); // Convert string to boolean
    } else {
      setUser({ ...user, [name]: value });
      switch (name) {
        case "email":
          setIsEmail(false);
          break;
        case "password":
          setIsPassword(false);
          break;
        case "username":
          setIsUsername(false);
          break;
        default:
          break;
      }
    }
  };

  const onConfirmPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setIsConfirmPassword(false);
  };

  const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email" && !emailRegex.test(value)) {
      setIsEmail(true);
    }
    if (name === "password" && !passwordRegex.test(value)) {
      setIsPassword(true);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!emailRegex.test(user.email)) {
      setIsEmail(true);
      return;
    }

    if (!passwordRegex.test(user.password)) {
      setIsPassword(true);
      return;
    }

    if (user.password !== confirmPassword) {
      setIsConfirmPassword(true);
      return;
    }

    if (user.username.trim() === "") {
      setIsUsername(true);
      return;
    }

    // Cookies expire date
    const date = new Date();
    const IN_DAYS = 3;
    const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
    date.setTime(date.getTime() + EXPIRES_IN_DAYS);
    const options = { path: "/", expires: date };

    try {
      // Perform registration mutation
      const response = await userRegister(user).unwrap();
      CookieService.set("jwt", response.jwt, options);
      CookieService.set("data", response.user.admin.toString(), options);
      CookieService.set("username", response.user.username, options);
      toast({
        title: "Registration successful",
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      setTimeout(() => {
        setUser({ username: "", email: "", password: "", admin: false });
        setConfirmPassword("");
        window.location.replace("/");
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        title: error.data?.error?.message || "Registration failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack pt={20} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading mb={7} fontSize={"3xl"}>
            Create your account
          </Heading>
          <Stack as={"form"} onSubmit={onSubmitHandler}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                value={user.username}
                name="username"
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                focusBorderColor="#9f7aea"
                errorBorderColor=""
                isInvalid={isUsername}
              />
              {isUsername && (
                <FormHelperText color="#FC8181">
                  Please enter a username
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={user.email}
                name="email"
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                focusBorderColor="#9f7aea"
                errorBorderColor=""
                isInvalid={isEmail}
              />
              {isEmail && (
                <FormHelperText color="#FC8181">
                  Please enter a valid Email
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={user.password}
                  name="password"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                  focusBorderColor="#9f7aea"
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPassword}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword && (
                <FormHelperText color="#FC8181">
                  Please enter a valid Password
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="confirm-password">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onConfirmPasswordChangeHandler}
                  type={showPassword ? "text" : "password"}
                  focusBorderColor="#9f7aea"
                  isInvalid={isConfirmPassword}
                />
              </InputGroup>
              {isConfirmPassword && (
                <FormHelperText color="#FC8181">
                  Passwords do not match
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="role">
              <FormLabel>Role</FormLabel>
              <Select
                value={user.admin ? "true" : "false"} // Display as string
                name="role"
                onChange={onChangeHandler}
                focusBorderColor="#9f7aea"
              >
                <option value="false">User</option>
                <option value="true">Admin</option>
              </Select>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox colorScheme="purple">Remember me</Checkbox>
              </Stack>
              <Button
                type="submit"
                colorScheme={
                  isEmail || isPassword || isConfirmPassword || isUsername
                    ? "red"
                    : "purple"
                }
                variant={"solid"}
                isLoading={isLoading}
              >
                Sign up
              </Button>
              <Flex>
                <Box as="h2" mr={2}>
                  Already have an account?
                </Box>
                <Link as={NavLink} to={"/login"} color={"purple.500"}>
                  Sign in
                </Link>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default RegisterPage;
