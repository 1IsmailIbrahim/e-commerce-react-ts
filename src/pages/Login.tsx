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
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useUserLoginMutation } from "../app/features/loginSlice";
import CookieService from "../services/CookieService";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  const toast = useToast();

  // Handlers
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "identifier") {
      setIsEmail(false);
    } else if (name === "password") {
      setIsPassword(false);
    }
  };

  const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "identifier" && !emailRegex.test(value)) {
      setIsEmail(true);
    }
    if (name === "password" && !passwordRegex.test(value)) {
      setIsPassword(true);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!emailRegex.test(user.identifier)) {
      setIsEmail(true);
      return;
    }

    if (!passwordRegex.test(user.password)) {
      setIsPassword(true);
      return;
    }

    // Cookies expire date
    const date = new Date();
    const IN_DAYS = 3;
    const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
    date.setTime(date.getTime() + EXPIRES_IN_DAYS);
    const options = { path: "/", expires: date };

    try {
      const response = await userLogin(user).unwrap();
      CookieService.set("jwt", response.jwt, options);
      CookieService.set("data", JSON.stringify(response.user), options);
      toast({
        title: "Login successful",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setTimeout(() => {
        setUser({ identifier: "", password: "" });
        location.replace("/");
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        title: error.data?.error?.message || "Login failed",
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
            Sign in to your account
          </Heading>
          <Stack as={"form"} onSubmit={onSubmitHandler}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={user.identifier}
                name="identifier"
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
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox colorScheme="purple">Remember me</Checkbox>
                <Link color={"blue.500"}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                colorScheme={isEmail || isPassword ? "red" : "purple"}
                variant={"solid"}
                isLoading={isLoading}
              >
                Sign in
              </Button>
              <Flex>
                <Box as="h2" mr={2}>
                  Dosen't Have an account?
                </Box>
                <Link as={NavLink} to={"/register"} color={"purple.500"}>
                  Sign up
                </Link>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default LoginPage;
