import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductProvider } from "./context/ProductContext";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>

      <Toaster
  position="top-center"
  reverseOrder={false}
  containerStyle={{
    top:50,
  }}
  toastOptions={{
    duration: 3000,

    style: {
      background: "#fff",
      color: "#222",
      padding: "8px 17px",
      borderRadius: "16px",
      fontSize: "15px",
      fontWeight: "500",
      zIndex: 99999,
    },

    success: {
      duration: 3000,
    },

    error: {
      duration: 3000,
    },
  }}
/>
<WishlistProvider>
 <ProductProvider>

<App/>

</ProductProvider>
</WishlistProvider>
    </CartProvider>
  </BrowserRouter>
);