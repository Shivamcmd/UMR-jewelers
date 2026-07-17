import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import { useCart }
from "../../context/CartContext";
import Nav from "../../components/Nav";
import FAQSection from "../../components/faqsection";

export default function CartPage() {

  const navigate =
    useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <>
    <Nav/>

   <div
  className="min-h-screen
bg-[#fcfaf4]
py-6 px-4"
>

      <div
        className="max-w-[1400px]
        mx-auto"
      >

        {/* HEADER */}
        <div
         className="flex
items-center
justify-between
mb-10 flex-wrap
gap-4
sticky top-0
z-20
bg-[#faf8f7]
py-3"
        >

          <div>

            <h1
              className="text-[34px]
              md:text-[46px]
              font-bold
              text-[#2a1a1a]"
            >
              Your Cart
            </h1>

            <p
              className="text-[#7d6d6d]
              mt-2"
            >
              {totalItems}
              {" "}
              items in your cart
            </p>

          </div>
<div className="flex items-center gap-3">

  <button
    onClick={() =>
      navigate("/category/necklace-sets")
    }
    className="h-12 px-5
    rounded-xl
  border border-[#d4b044]
text-[#b89222]
hover:bg-[#d4b044]
hover:text-white
    transition"
  >
    Add More Products
  </button>

  {cartItems.length > 0 && (

<button
  onClick={clearCart}
  className="
  h-12 px-5
  rounded-xl
  border border-gray-300
  bg-white
  text-[#333]
  font-medium
  hover:border-[#d4b044]
  hover:text-white
  hover:bg-[#d4b044]
  transition-all duration-300
  "
>
  Clear Cart
</button>

  )}

</div>

        </div>

        {/* EMPTY */}
        {cartItems.length === 0 ? (

          <div
            className="bg-gradient-to-b
from-white
to-[#fff9e8]
rounded-[40px]
border border-[#eadfb5]
p-14 text-center
shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          >

            <ShoppingBag
              size={70}
              className="mx-auto
              text-[#d4b044]"
            />

            <h2
              className="mt-6
              text-3xl font-semibold"
            >
              Your cart is empty
            </h2>

            <p
              className="mt-3
              text-[#7d6d6d]"
            >
              Add some beautiful
              jewellery pieces.
            </p>

            <button
              onClick={() =>
                navigate("/")
              }
              className="mt-8
              px-7 h-14
              rounded-2xl
              bg-[#d4b044]
              hover:bg-[#be9d35]
              transition
              text-white"
            >
              Continue Shopping
            </button>

          </div>

        ) : (

         <div
 className="grid
lg:grid-cols-[1fr_400px]
gap-8
items-start"
>

            {/* LEFT */}
           <div
className="space-y-5
max-h-[75vh]
overflow-y-auto
pr-1
hide-scrollbar"
>

              {cartItems.map(
                (item) => (

                  <div
                    key={item.id}
                   className="relative overflow-hidden
bg-gradient-to-br
from-white
via-[#fffdf7]
to-[#fff9ea]
rounded-[32px]
border border-[#eadfb5]
p-5 md:p-7
flex flex-col md:flex-row
gap-6
shadow-[0_10px_40px_rgba(0,0,0,0.04)]
hover:shadow-[0_15px_50px_rgba(0,0,0,0.07)]
transition duration-300"
                  >

                    {/* IMAGE */}
                    <div
                     className="w-full
md:w-[220px]
h-[220px]
bg-gradient-to-br
from-[#fffaf3]
to-[#f8f3ec]
rounded-[28px]
overflow-hidden
border border-[#eadfb5]"
                    >

                      <img
                        src={
                          item.image ||
                          item.gallery?.[0]
                        }
                        alt={
                          item.name
                        }
                       className="w-full
h-full
object-contain
hover:scale-110
transition duration-500"
                      />

                    </div>

                    {/* DETAILS */}
                    <div
                      className="flex-1"
                    >

                      <div
                        className="flex
                        justify-between
                        gap-4"
                      >

                        <div>

                          <h2
                           className="text-[24px]
md:text-[28px]
font-semibold
tracking-tight
text-[#2a1a1a]"
                          >
                            {item.name}
                          </h2>

                          <p
                            className="mt-2
                            text-[#7d6d6d]
                            line-clamp-2"
                          >
                            {
                              item.description
                            }
                          </p>

                        </div>

                        <button
                        onClick={() => {

  removeFromCart(
    item.id
  );

  toast.success(
    "Item removed 🗑️"
  );
}}
                        className="w-10 h-10
rounded-full
bg-[#fff5da]
text-[#d4b044]
flex items-center
justify-center
hover:scale-110
transition"
                        >
                          <Trash2
                            size={20}
                          />
                        </button>

                      </div>

                      {/* PRICE */}
                      <div
                        className="mt-5
                        flex items-center
                        justify-between
                        flex-wrap gap-4"
                      >

                        <div>

                          <p
                            className="text-[28px]
                            font-bold"
                          >
                            ₹
                            {item.price}
                          </p>

                          <p
                            className="text-sm
                            text-[#7d6d6d]"
                          >
                            Total:
                            {" "}
                            ₹
                            {item.price *
                              item.qty}
                          </p>

                        </div>

                        {/* QTY */}
                        <div
                          className="flex
                          items-center
                          border border-[#e7dede]
                          rounded-xl
                          overflow-hidden"
                        >

                          <button
                            onClick={() =>
                              decreaseQty(
                                item.id
                              )
                            }
                            className="w-12
                            h-12 flex
                            items-center
                            justify-center"
                          >
                            <Minus
                              size={16}
                            />
                          </button>

                          <div
                            className="w-12
                            h-12 border-x
                            border-[#eadfb5]
                            flex items-center
                            justify-center"
                          >
                            {item.qty}
                          </div>

                          <button
                            onClick={() =>
                              increaseQty(
                                item.id
                              )
                            }
                            className="w-12
                            h-12 flex
                            items-center
                            justify-center"
                          >
                            <Plus
                              size={16}
                            />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

            {/* RIGHT */}
            <div
             className="bg-gradient-to-b
from-[#fffef9]
to-[#fff7e2]
rounded-[36px]
border border-[#eadfb5]
p-7 md:p-8 text-[#2d2415]
h-fit sticky top-24
shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
            >

              <h2
                className="text-3xl
                font-semibold"
              >
                Order Summary
              </h2>

              <div
                className="mt-8
                space-y-5"
              >

                <div
                  className="flex
                  justify-between"
                >
                  <span>
                    Items
                  </span>

                  <span>
                    {totalItems}
                  </span>
                </div>

                <div
                  className="flex
                  justify-between"
                >
                  <span>
                    Delivery
                  </span>

                  <span
                    className="text-green-600"
                  >
                    Free
                  </span>
                </div>

                <div
                  className="border-t
                  pt-5 flex
                  justify-between
                  text-xl font-semibol0
                  text-[#b89222]"
                >
                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {totalPrice}
                  </span>
                </div>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/checkout"
                  )
                }
               className="w-full
mt-8 h-14
rounded-2xl
bg-gradient-to-r
from-[#c7a032]
to-[#d4b044]
hover:from-[#b89222]
hover:to-[#c9a73d]
text-white
text-lg font-medium
hover:scale-[1.02]
transition duration-300
shadow-lg"
              >
                Proceed To Checkout
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
    <FAQSection/>
    </>
    
  );
}