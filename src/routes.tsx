import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import WelcomePage from "./pages/auth/WelcomePage";
import B2CAuthChoicePage from "./pages/auth/B2CAuthChoicePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import B2BLoginPage from "./pages/b2b/B2BLoginPage";
import B2BPortalPage from "./pages/b2b/B2BPortalPage";
import Catalog from "./pages/catalog/Catalog";
import CartPage from "./pages/main/CartPage";
import ProfilePage from "./pages/main/ProfilePage";
import AddAddressPage from "./pages/profile/AddAddressPage";
import AddressesCardsPage from "./pages/profile/AddressesCardsPage";
import EcoImpactPage from "./pages/profile/EcoImpactPage";
import FavoritesPage from "./pages/profile/FavoritesPage";
import MyOrdersPage from "./pages/profile/MyOrdersPage";
import NotificationsPage from "./pages/profile/NotificationsPage";
import OrderDetailsPage from "./pages/profile/OrderDetailsPage";
import SettingsPage from "./pages/profile/SettingsPage";
import AICamera from "./pages/ai/AICamera";
import AIResults from "./pages/ai/AIResults";
import Constructor from "./pages/ai/Constructor";
import Delivery from "./pages/checkout/Delivery";
import Payment from "./pages/checkout/Payment";
import Status from "./pages/checkout/Status";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <WelcomePage /> },

      {
        element: <AuthLayout />,
        children: [
          { path: "b2c-auth", element: <B2CAuthChoicePage /> },
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },

      {
    { path: "ai-camera", element: <AICamera /> },
        element: <MainLayout />,
        children: [
          { path: "home", element: <Catalog /> },
          { path: "catalog", element: <Catalog /> },
          { path: "orders", element: <Navigate to="/my-orders" replace /> },
          { path: "my-orders", element: <MyOrdersPage /> },
          { path: "order-details/:orderId", element: <OrderDetailsPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "profile", element: <ProfilePage /> },

          { path: "favorites", element: <FavoritesPage /> },
          { path: "addresses-cards", element: <AddressesCardsPage /> },
          { path: "add-address", element: <AddAddressPage /> },
          { path: "eco-impact", element: <EcoImpactPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "notifications", element: <NotificationsPage /> },
        ],
      },

      { path: "ai-results", element: <AIResults /> },
      { path: "constructor", element: <Constructor /> },

      { path: "delivery", element: <Delivery /> },
      { path: "payment", element: <Payment /> },
      { path: "status", element: <Status /> },

      { path: "b2b-login", element: <B2BLoginPage /> },
      { path: "b2b-portal", element: <B2BPortalPage /> },
    ],
  },
]);