import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Flex
      w={"full"}
      minHeight={"calc(100vh)"}
      backgroundImage={"url('/coverEcommerce.png')"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              zIndex={1}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "#9f7aea",
                zIndex: -1,
              }}
            >
              Summer Sale
            </Text>
            <br />
            <Text color={"#9f7aea"} as={"span"}>
              Up to 50% Off
            </Text>
          </Heading>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            Get the best deals on your favorite products. Limited time offer!
          </Text>
          <Stack direction={"row"}>
            <Button
              rounded={"full"}
              bg={"#8D64DF"}
              color={"white"}
              _hover={{
                bg: "#9f7aea",
              }}
              as={Link}
              to="/products"
            >
              Shop Now
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default HomePage;
