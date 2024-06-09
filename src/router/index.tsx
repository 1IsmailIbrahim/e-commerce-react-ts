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
import LoginPage from "../pages/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import CookieService from "../services/CookieService";
import CartPage from "../pages/Cart";

const token = CookieService.get("jwt");
const test = token ? true : false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute isAllowed={test} redirectPath="/login">
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAllowed={test} redirectPath="/login">
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute isAllowed={test} redirectPath="/login">
              <ProductDetailsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <ProtectedRoute isAllowed={!test} redirectPath="/">
            <LoginPage />
          </ProtectedRoute>
        }
      />
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
