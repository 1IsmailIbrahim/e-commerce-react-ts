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
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../app/store";
import { userLogin } from "../app/features/loginSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

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

  const onSubmitHandler = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (
      !emailRegex.test(user.identifier) &&
      !passwordRegex.test(user.password)
    ) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!emailRegex.test(user.identifier)) {
      setIsEmail(true);
      return;
    }
    if (!passwordRegex.test(user.password)) {
      setIsPassword(true);
      return;
    }
    dispatch(userLogin(user));
    console.log(user);
    setUser({ identifier: "", password: "" });
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
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
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default LoginPage;
