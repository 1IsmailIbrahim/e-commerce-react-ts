import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import CartDrawer from "./components/CartDrawer";

const App = () => {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <RouterProvider router={router} />
      <CartDrawer />
    </ChakraProvider>
  );
};

export default App;
