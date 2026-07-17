import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

const WishlistContext =
  createContext();

export function WishlistProvider({
  children,
}) {

  const [wishlistItems, setWishlistItems] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "wishlist"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  // SAVE TO LOCALSTORAGE

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(
        wishlistItems
      )
    );

  }, [wishlistItems]);

  // ADD / REMOVE

  const toggleWishlist = (
    item
  ) => {

    const exists =
      wishlistItems.some(
        (product) =>
          product.id === item.id
      );

    if (exists) {

      setWishlistItems(
        wishlistItems.filter(
          (product) =>
            product.id !== item.id
        )
      );

      toast.error(
        "Removed from wishlist"
      );

    } else {

      setWishlistItems([
        ...wishlistItems,
        item,
      ]);

      toast.success(
        "Added to wishlist ❤️"
      );
    }
  };

  // CHECK

  const isInWishlist = (
    id
  ) => {

    return wishlistItems.some(
      (item) => item.id === id
    );
  };

  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist =
  () => useContext(
    WishlistContext
  );