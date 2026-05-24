import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { OrderProvider } from "@/context/OrderContext";
import { AppProvider } from "@/context/AppContext";
import "./index.css";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <OrderProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </OrderProvider>
    </AppProvider>
  </StrictMode>,
);
