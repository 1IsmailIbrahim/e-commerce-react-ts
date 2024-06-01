import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "../pages";
import ErrorHandler from "../components/errors/ErrorHandler";
import RootLayout from "../pages/Layout";
import AboutPage from "../pages/About";
import ProductsPage from "../pages/Products";
import ProductDetailsPage from "../pages/ProductDetails";
import PageNotFound from "../pages/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
