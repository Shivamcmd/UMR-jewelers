import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {

  const [cartItems, setCartItems] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "cart"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  // ADD TO CART
  const addToCart = (
    product
  ) => {

    const exists =
      cartItems.find(
        (item) =>
          item.id === product.id
      );

    if (exists) {

      const updated =
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty:
                  item.qty +
                  product.qty,
              }
            : item
        );

      setCartItems(updated);

      // toast.success(
      //   "Cart updated"
      // );

    } else {

      setCartItems([
        ...cartItems,
        product,
      ]);

    
    }
  };

  // REMOVE
  const removeFromCart = (
    id
  ) => {

    setCartItems(
      cartItems.filter(
        (item) =>
          item.id !== id
      )
    );

    toast.success(
      "Removed from cart"
    );
  };

  // CLEAR
  const clearCart = () => {

    setCartItems([]);

    toast.success(
      "Cart cleared"
    );
  };

  // INCREASE
  const increaseQty = (
    id
  ) => {

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty + 1,
            }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (
    id
  ) => {

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty > 1
                  ? item.qty - 1
                  : 1,
            }
          : item
      )
    );
  };

  // TOTAL ITEMS
  const totalItems =
    cartItems.reduce(
      (acc, item) =>
        acc + item.qty,
      0
    );

  // TOTAL PRICE
  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.qty,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);