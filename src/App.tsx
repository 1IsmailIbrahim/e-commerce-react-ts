import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
