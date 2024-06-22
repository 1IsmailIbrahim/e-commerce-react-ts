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
const isAdmin = CookieService.get("data") === "true" ? true : false;
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
        element={<DashboardLayout children={undefined} />}
        errorElement={<ErrorHandler />}
      >
        <Route
          index
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
              <DashboardProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="categories"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
              <DashboardCategories />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Login Page */}
      <Route
        path="/login"
        element={
          <ProtectedRoute isAllowed={!test} redirectPath="/">
            <LoginPage />
          </ProtectedRoute>
        }
      />
      {/* Register Page */}
      <Route
        path="/register"
        element={
          <ProtectedRoute isAllowed={!test} redirectPath="/">
            <RegisterPage />
          </ProtectedRoute>
        }
      />
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
