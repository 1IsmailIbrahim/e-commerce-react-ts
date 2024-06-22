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
import Dashboard from "../pages/dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardProducts from "../pages/dashboard/DashboardProducts";
import DashboardCategories from "../pages/dashboard/DashboardCategories";
import RegisterPage from "../pages/Register";

const token = CookieService.get("jwt");
const test = token ? true : false;
const isAdmin = !!CookieService.get("data");
console.log(isAdmin);
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
      {/* Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
            <DashboardLayout children={undefined} />
          </ProtectedRoute>
        }
        errorElement={<ErrorHandler />}
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<DashboardProducts />} />
        <Route path="categories" element={<DashboardCategories />} />
      </Route>
      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />
      {/* Register Page */}
      <Route path="/register" element={<RegisterPage />} />
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
