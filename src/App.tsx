import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import CartDrawer from "./components/CartDrawer";

const App = () => {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <RouterProvider router={router} />
      <CartDrawer />
    </ChakraProvider>
  );
};

export default App;
