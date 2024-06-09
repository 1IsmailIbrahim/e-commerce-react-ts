import { Box, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box onClick={toggleColorMode} rounded={"full"}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Box>
  );
};

export default ColorModeToggle;
