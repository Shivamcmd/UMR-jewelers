import {
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function WishlistPage() {

  const {
    wishlistItems,
    toggleWishlist,
  } = useWishlist();

 
const {
  addToCart,
  cartItems,
} = useCart();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdf9f1]">

      {/* TOP HERO */}
      <div
        className="relative overflow-hidden
        border-b border-[#ead7ad]
        bg-gradient-to-br
        from-[#fffaf0]
        via-[#f9f1df]
        to-[#f5e4b8]"
      >

        {/* GLOW */}
        <div
          className="absolute
          top-[-80px] right-[-60px]
          w-[220px] h-[220px]
          rounded-full
          bg-[#d4af37]/20
          blur-3xl"
        />

        <div
          className="max-w-[1450px]
          mx-auto
          px-2 sm:px-6 md:px-2
          py-4 md:py-6"
        >

          <div
            className="flex flex-col
            lg:flex-row
            lg:items-center
            justify-between
            gap-6"
          >

            {/* LEFT */}
            <div>

              <div
                className="inline-flex items-center
                gap-2
                px-3 py-1
                rounded-full
                bg-white/70
                border border-[#ead7ad]
                text-[#a17408]
                text-[12px]
                font-medium"
              >
                <Heart
                  size={13}
                  className="fill-[#d4af37]
                  text-[#d4af37]"
                />

                Luxury Collection
              </div>

              <h1
                className="mt-4
                text-[20px]
                sm:text-[30px]
                md:text-[35px]
                font-bold
                leading-[1.05]
                text-[#4f3a10]"
              >
                My Wishlist
              </h1>

              <p
                className="mt-3
                text-[#7d6840]
                text-sm sm:text-base
                max-w-[550px]
                leading-relaxed"
              >
                Your saved jewellery pieces,
                ready whenever elegance calls ✨
              </p>

            </div>

            {/* RIGHT */}
            <div
              className="flex flex-col
              sm:flex-row
              items-stretch sm:items-center
              gap-3"
            >

              <div
                className="bg-gradient-to-r
                from-[#d4af37]
                to-[#b8860b]
                text-white
                px-3 py-3
                rounded-2xl
                text-sm font-medium
                shadow-[0_10px_30px_rgba(212,175,55,0.28)]
                text-center"
              >
                {wishlistItems.length} Saved Items
              </div>

              <button
                onClick={() =>
                  navigate("/category/necklace-sets")
                }
                className="bg-white/90
                backdrop-blur-md
                border border-[#d4af37]
                text-[#a17408]
                px-5 py-3
                rounded-2xl
                text-sm font-semibold
                hover:bg-[#d4af37]
                hover:text-white
                transition"
              >
                Explore More
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN */}
      <div
        className="max-w-[1450px]
        mx-auto
        px-3 sm:px-5 md:px-8
        py-6 md:py-8"
      >

        {/* EMPTY */}
        {wishlistItems.length === 0 ? (

          <div
            className="min-h-[60vh]
            flex flex-col
            justify-center items-center
            text-center"
          >

            <div
              className="w-24 h-24
              rounded-full
              bg-gradient-to-br
              from-[#f8edd1]
              to-[#f2ddb0]
              flex items-center
              justify-center
              shadow-[0_10px_30px_rgba(212,175,55,0.18)]"
            >
              <Heart
                size={42}
                className="text-[#c89b2c]"
              />
            </div>

            <h2
              className="mt-6
              text-[26px]
              sm:text-[32px]
              font-bold
              text-[#5f4712]"
            >
              Wishlist Empty
            </h2>

            <p
              className="mt-2
              text-[#8f7a52]
              text-sm sm:text-base"
            >
              Save your favourite jewellery ✨
            </p>

            <button
              onClick={() =>
                navigate("/shop")
              }
              className="mt-6
              bg-gradient-to-r
              from-[#d4af37]
              to-[#b8860b]
              text-white
              px-6 py-3
              rounded-2xl
              text-sm font-semibold
              shadow-[0_8px_24px_rgba(212,175,55,0.25)]"
            >
              Start Exploring
            </button>

          </div>

        ) : (


<div
  className="grid
  grid-cols-2
  md:grid-cols-3
  xl:grid-cols-4
  gap-3 sm:gap-5"
>

  {wishlistItems.map((item) => {

    const alreadyInCart =
      cartItems.some(
        (product) =>
          product.id === item.id
      );

    return (

      <div
        key={item.id}
        className="group
        bg-[#fffdf9]
        rounded-[24px]
        overflow-hidden
        border border-[#ead7ad]
        shadow-[0_8px_24px_rgba(212,175,55,0.08)]
        hover:shadow-[0_14px_36px_rgba(212,175,55,0.18)]
        transition-all duration-300
        hover:-translate-y-1"
      >

        {/* IMAGE */}
        <div
          className="relative
          overflow-hidden
          bg-[#faf6ee]"
        >

          <img
            src={item.image}
            alt={item.name}
            className="w-full
            h-[170px]
            sm:h-[240px]
            object-cover
            transition duration-700
            group-hover:scale-105"
          />

          {/* REMOVE */}
          <button
            onClick={() =>
              toggleWishlist(item)
            }
            className="absolute
            top-2.5 right-2.5
            sm:top-3 sm:right-3
            bg-white/95
            backdrop-blur-md
            border border-[#ead7ad]
            p-2 rounded-full
            shadow-md
            hover:scale-110
            transition"
          >
            <Trash2
              size={15}
              className="text-[#c89b2c]"
            />
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-3 sm:p-4">

          <h3
            className="font-bold
            text-[14px]
            sm:text-[16px]
            text-[#5f4712]
            line-clamp-1"
          >
            {item.brand}
          </h3>

          <p
            className="text-[#8f7a52]
            text-[11px]
            sm:text-[13px]
            mt-1 line-clamp-1"
          >
            {item.name}
          </p>

          {/* PRICE */}
          <div
            className="flex items-center
            gap-2 mt-3 flex-wrap"
          >

            <span
              className="text-[18px]
              sm:text-[22px]
              font-bold
              text-[#b8860b]"
            >
              ₹{item.price}
            </span>

            <span
              className="line-through
              text-[#c0ac84]
              text-[11px]
              sm:text-sm"
            >
              ₹{item.originalPrice}
            </span>

          </div>

          {/* BUTTON */}
          <button
            onClick={() => {

              if (alreadyInCart) {

                navigate("/cart");

              } else {

                addToCart({
                  ...item,
                  qty: 1,
                });

                toast.success(
                  "Added to cart ✨"
                );
              }
            }}

            className={`
            mt-4
            w-full
            py-2.5
            sm:py-3
            rounded-2xl
            text-[12px]
            sm:text-sm
            font-medium
            flex
            items-center
            justify-center
            gap-2
            text-white
            transition-all
            duration-300

            ${
              alreadyInCart
                ? "bg-[#3d2d12] hover:bg-[#2c1f0b]"
                : "bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:opacity-90"
            }
            `}
          >
            <ShoppingCart size={16} />

            {alreadyInCart
              ? "View Cart"
              : "Add to Cart"}
          </button>

        </div>

      </div>

    );

  })}

</div>

        )}

      </div>

    </div>
  );
}