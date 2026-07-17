import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import GoldRates from "../pages/GoldRates";

import CategoryPage from "../pages/categories/CategoryPage";
import ProductDetails from "../pages/categories/ProductDetails"; // ✅ ADD THIS
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/cart/CheckoutPage";
import OrdersPage from "../components/UserComponents/OrdersPage";
import ProfilePage from "../components/UserComponents/ProfilePage";
import WishlistPage from "../components/UserComponents/wishlistPage";
import AdminRoutes from "../routes/AdminRoutes";

import { Navigate } from "react-router-dom";
import ScrollToTopButton from "../components/ScrollToTopButton";
const AppRoutes = () => {
  const user = JSON.parse(
localStorage.getItem("user")
);

const isAdmin =
user?.role === "admin";

  return (
    <>
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/gold-rates" element={<GoldRates />} />
{/* ADMIN */}

<Route
path="/admin/*"

element={

isAdmin

?

<AdminRoutes/>

:

<Navigate
to="/"
/>

}

/>
      <Route path="/product/:slug" element={<ProductDetails />} />
<Route
path="/cart"

element={

isAdmin

?

<Navigate to="/admin"/>

:

<CartPage/>

}

/>
<Route
path="/checkout"

element={

isAdmin

?

<Navigate
to="/admin"
/>

:

<CheckoutPage/>

}

/>
<Route
path="/orders"
element={
isAdmin
?
<Navigate to="/admin"/>
:
<OrdersPage/>
}
/>

<Route
path="/profile"
element={
isAdmin
?
<Navigate to="/admin"/>
:
<ProfilePage/>
}
/>

<Route
path="/wishlist"
element={
isAdmin
?
<Navigate to="/admin"/>
:
<WishlistPage/>
}
/>
    </Routes>
    <ScrollToTopButton/>
    </>

    
  );
};

export default AppRoutes;