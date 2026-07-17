import {
  PackageCheck,
  Truck,
  ShieldCheck,
  Sparkles,
  MapPin,
  Phone,
  CalendarDays,
  CreditCard,
  Gem,
  ChevronDown,
  ChevronUp,
  Star,
  X,
} from "lucide-react";

import toast from "react-hot-toast";
import {
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "../../components/Nav";

export default function OrdersPage() {
const location =
  useLocation();

  const [orders, setOrders] =
    useState([]);

  const [openOrder, setOpenOrder] =
    useState(null);

  const [showReviewModal, setShowReviewModal] =
  useState(false);

const [selectedOrder, setSelectedOrder] =
  useState(null);

const [rating, setRating] =
  useState(5);

const [reviewText, setReviewText] =
  useState("");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const res =
            await fetch(
              `http://localhost:5000/users/${user.id}`
            );

          const data =
            await res.json();

          setOrders(
            data.orders || []
          );

        } catch (err) {

          console.log(err);
        }
      };

    if (user?.id) {

      fetchOrders();
    }

  }, []);

useEffect(() => {

  try {

    const pendingReview =
      localStorage.getItem(
        "reviewOrder"
      );

    if (pendingReview) {

      const parsedOrder =
        JSON.parse(
          pendingReview
        );

      if (
        parsedOrder &&
        parsedOrder.items
      ) {

        setSelectedOrder(
          parsedOrder
        );

        setTimeout(() => {

          setShowReviewModal(
            true
          );

        }, 2000);
      }
    }

  } catch (err) {

    console.log(
      "review modal error",
      err
    );
  }

}, []);

  const handleSubmitReview =
  async () => {

    if (!reviewText) {

      toast.error(
        "Write your experience"
      );

      return;
    }

    try {

      const newReview = {

        id: Date.now(),

        orderId:
          selectedOrder?.id,

        name:
          user.name,

        username:
          `@${user.name
            ?.toLowerCase()
            ?.replace(/\s/g, "")}`,

        review:
          reviewText,

        rating,

       image:
    user?.profilePic || "",

        userId: user.id,
      };

      // GET EXISTING REVIEWS

     const res =
await fetch(
"http://localhost:5000/siteReviews"
);

      const reviews =
        await res.json();

      // SAVE NEW REVIEW

  const existingReview =
  reviews.find(
    (r) =>
      r.userId === user.id
  );

if (existingReview) {

  // UPDATE EXISTING REVIEW

await fetch(
`http://localhost:5000/siteReviews/${existingReview.id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        ...existingReview,

        review:
          reviewText,

        rating,

      image:
user?.profilePic || "",

        orderId:
          selectedOrder?.id,
      }),
    }
  );

  toast.success(
    "Review Updated ✨"
  );

} else {

  // CREATE NEW REVIEW

 await fetch(
"http://localhost:5000/siteReviews",
{
method:"POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        newReview
      ),
    }
  );

  toast.success(
    "Review Submitted ✨"
  );
}

      localStorage.removeItem(
  "reviewOrder"
);

      setShowReviewModal(false);

      setReviewText("");

      setRating(5);

    } catch (err) {

      console.log(err);

      toast.error(
        "Something went wrong"
      );
    }
};

const handleDeleteOrder =
  async (orderId) => {

    try {

      const updatedOrders =
        orders.filter(
          (order) =>
            order.id !== orderId
        );

      await fetch(
        `http://localhost:5000/users/${user.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            orders:
              updatedOrders,
          }),
        }
      );

     setOrders(updatedOrders);

setTimeout(() => {

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  toast.success(
    "Order Deleted 🗑️",
    {
      duration: 2500,
    }
  );

}, 200);

    } catch (err) {

      console.log(err);

      toast.error(
        "Delete failed"
      );
    }
};

  return (
    <>
      <Nav />

      <div
        className="
min-h-screen
bg-gradient-to-b
from-[#fffdf5]
via-[#fff9ec]
to-[#fff4dc]
px-4 py-6
"
      >

        <div
          className="max-w-7xl
          mx-auto"
        >

          {/* HERO */}

          <div
         className="
relative
overflow-hidden
rounded-[30px]
border border-[#f3df9b]
bg-gradient-to-r
from-[#6b5314]
via-[#c9a227]
to-[#f0d77a]
p-6 md:p-8
shadow-[0_20px_70px_rgba(201,162,39,0.25)]
"
          >

            <div
              className="
absolute
bottom-[-50px]
left-[-40px]
w-[170px]
h-[170px]
rounded-full
bg-[#fff4c4]/20
blur-3xl
"
            />

            <div
              className="absolute
              bottom-[-50px]
              left-[-40px]
              w-[170px]
              h-[170px]
              rounded-full
              bg-[#ffd7b8]/10
              blur-3xl"
            />

            <div
              className="relative z-10
              flex flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6"
            >

              {/* LEFT */}

              <div>

                <div
                  className="inline-flex
                  items-center
                  gap-2
                  px-4 py-2
                  rounded-full
                  bg-white/10
                  border border-white/10
                  text-white
                  text-sm"
                >

                  <Sparkles size={15} />

                  Luxury Jewellery Orders

                </div>

                <h1
                  className="mt-4
                  text-3xl md:text-5xl
                  font-bold
                  text-white
                  leading-tight"
                >
                  Your Precious
                  Collection 💎
                </h1>

                <p
                  className="mt-4
                  text-white/80
                  text-sm md:text-base
                  max-w-2xl"
                >
                  Elegant jewellery orders,
                  beautifully delivered to
                  your doorstep ✨
                </p>

              </div>

              {/* RIGHT STATS */}

              <div
                className="grid
                grid-cols-2
                gap-4
                min-w-[220px]"
              >

                <div
                  className="rounded-2xl
                  bg-white/10
                  border border-white/10
                  p-4 backdrop-blur-md"
                >

                  <p
                    className="text-white/70
                    text-xs"
                  >
                    Total Orders
                  </p>

                  <h2
                    className="mt-2
                    text-3xl
                    font-bold
                    text-white"
                  >
                    {orders.length}
                  </h2>

                </div>

                <div
                  className="rounded-2xl
                  bg-white/10
                  border border-white/10
                  p-4 backdrop-blur-md"
                >

                  <p
                    className="text-white/70
                    text-xs"
                  >
                    Premium
                  </p>

                  <h2
                    className="mt-2
                    text-3xl"
                  >
                    ✨
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* EMPTY */}

          {orders.length === 0 && (

            <div
             className="
mt-8
bg-[#fffdf5]
border border-[#f3df9b]
rounded-[30px]
p-10 text-center
"
            >

              <div
             className="
w-20 h-20
mx-auto
rounded-full
bg-gradient-to-br
from-[#fff7dc]
to-[#f5deb3]
flex items-center
justify-center
"
              >

                <Gem
                  size={34}
                  className="text-[#c9a227]"
                />

              </div>

              <h2
                className="mt-5
                text-2xl
                font-bold
                text-[#2a1a1a]"
              >
                No Orders Yet
              </h2>

              <p
                className="mt-3
                text-[#7d6d6d]
                max-w-lg
                mx-auto"
              >
                Your luxury jewellery
                collection is waiting ✨
              </p>

            </div>

          )}

          {/* ORDERS */}

          <div className="mt-8 space-y-5">

            {orders.map((order) => (

              <div
                key={order.id}
                className="
overflow-hidden
rounded-[28px]
border border-[#f3df9b]
bg-[#fffdf8]
shadow-[0_10px_40px_rgba(201,162,39,0.08)]
hover:border-[#d6b24c]
transition-all duration-300
"
              >

                {/* TOP */}

                <div
                 className="
bg-gradient-to-r
from-[#fff8e7]
via-[#fffdf7]
to-[#fff3d1]
border-b border-[#f3df9b]
p-5 md:p-6
"
                >

                  <div
                    className="flex
                    flex-col xl:flex-row
                    xl:items-center
                    xl:justify-between
                    gap-6"
                  >

                    {/* LEFT */}

                    <div className="flex-1">

                      <div
                        className="flex
                        items-center
                        gap-4"
                      >

                        <div
                          className="
w-14 h-14
rounded-2xl
bg-gradient-to-br
from-[#b8901f]
to-[#f0d77a]
text-white
flex items-center
justify-center
shadow-lg
"
                        >

                          <PackageCheck
                            size={24}
                          />

                        </div>

                        <div>

                          <h2
                            className="text-2xl
                            font-bold
                            text-[#2a1a1a]"
                          >
                            Order #{order.id}
                          </h2>

                          <p
                            className="text-sm
                            text-[#7d6d6d]
                            mt-1"
                          >
                            Premium Jewellery
                            Purchase ✨
                          </p>

                        </div>

                      </div>

                      {/* INFO */}

                      <div
                        className="mt-5
                        grid
                        md:grid-cols-3
                        gap-3"
                      >

                        {/* ORDER DATE */}

                        <div
                          className="rounded-2xl
                          bg-white
                          border border-[#f2e5d8]
                          p-4"
                        >

                          <div
                            className="flex
                            items-center
                            gap-2
                            text-[#7a1124]"
                          >

                            <CalendarDays
                              size={16}
                            />

                            <span
                              className="text-sm
                              font-medium"
                            >
                              Ordered
                            </span>

                          </div>

                          <p
                            className="mt-2
                            text-xs
                            text-[#555]"
                          >
                            {order.orderDate}
                          </p>

                        </div>

                        {/* DELIVERY */}

                        <div
                          className="rounded-2xl
                          bg-white
                          border border-[#f2e5d8]
                          p-4"
                        >

                          <div
                            className="flex
                            items-center
                            gap-2
                            text-[#7a1124]"
                          >

                            <Truck
                              size={16}
                            />

                            <span
                              className="text-sm
                              font-medium"
                            >
                              Delivery
                            </span>

                          </div>

                          <p
                            className="mt-2
                            text-xs
                            text-[#555]"
                          >
                            {
                              order
                              .expectedDelivery
                            }
                          </p>

                        </div>

                        {/* PAYMENT */}

                        <div
                          className="rounded-2xl
                          bg-white
                          border border-[#f2e5d8]
                          p-4"
                        >

                          <div
                            className="flex
                            items-center
                            gap-2
                            text-[#7a1124]"
                          >

                            <CreditCard
                              size={16}
                            />

                            <span
                              className="text-sm
                              font-medium"
                            >
                              Payment
                            </span>

                          </div>

                          <div
                            className="mt-2
                            inline-flex
                            items-center
                            gap-2
                            px-3 py-1.5
                            rounded-full
                            bg-green-50
                            text-green-700
                            text-xs
                            font-medium"
                          >

                            <ShieldCheck
                              size={14}
                            />

                            {
                              order
                              .paymentStatus
                            }

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* RECEIVER */}

                    <div
                      className="xl:w-[280px]
                      rounded-[24px]
                      bg-white
                      border border-[#f1e4d8]
                      p-5"
                    >

                      <div
                        className="flex
                        items-center
                        gap-3"
                      >

                        <div
                          className="
w-11 h-11
rounded-2xl
bg-[#fff6d8]
text-[#c9a227]
flex items-center
justify-center
"
                        >

                          <MapPin
                            size={20}
                          />

                        </div>

                        <div>

                          <h3
                            className="font-semibold"
                          >
                            Receiver
                          </h3>

                          <p
                            className="text-xs
                            text-[#7d6d6d]"
                          >
                            Delivery Details
                          </p>

                        </div>

                      </div>

                      <div className="mt-4">

                        <h4
                          className="text-lg
                          font-bold
                          text-[#2a1a1a]"
                        >
                          {
                            order
                            .receiverDetails
                            .name
                          }
                        </h4>

                        <div
                          className="mt-3
                          flex items-start
                          gap-2"
                        >

                          <Phone
                            size={16}
                            className="text-[#7a1124]
                            mt-1"
                          />

                          <p
                            className="text-sm
                            text-[#555]"
                          >
                            +91 {
                              order
                              .receiverDetails
                              .phone
                            }
                          </p>

                        </div>

                        <div
                          className="mt-3
                          flex items-start
                          gap-2"
                        >

                          <MapPin
                            size={16}
                            className="text-[#7a1124]
                            mt-1"
                          />

                          <p
                            className="text-sm
                            text-[#555]
                            leading-relaxed"
                          >
                            {
                              order
                              .receiverDetails
                              .address
                            }
                            ,{" "}
                            {
                              order
                              .receiverDetails
                              .city
                            }
                            {" - "}
                            {
                              order
                              .receiverDetails
                              .pincode
                            }
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* BUTTON */}

                  <button
                    onClick={() =>
                      setOpenOrder(
                        openOrder ===
                          order.id
                          ? null
                          : order.id
                      )
                    }
                    className="
mt-5
h-11 px-5
rounded-xl
bg-gradient-to-r
from-[#b8901f]
to-[#f0d77a]
text-[#4b3907]
font-semibold
text-sm
flex items-center
gap-2
hover:shadow-[0_10px_30px_rgba(201,162,39,0.35)]
transition-all duration-300
"
                  >

                    {openOrder ===
                    order.id ? (
                      <>
                        Hide Details
                        <ChevronUp
                          size={16}
                        />
                      </>
                    ) : (
                      <>
                        View Details
                        <ChevronDown
                          size={16}
                        />
                      </>
                    )}

                  </button>

                </div>

                {/* DETAILS */}

                {openOrder ===
                  order.id && (

                  <div
                    className="p-5 md:p-6"
                  >

                    {/* ITEMS */}

                    <div
                      className="flex
                      items-center
                      justify-between
                      mb-5"
                    >

                      <h3
                        className="text-xl
                        font-bold
                        text-[#2a1a1a]"
                      >
                        Order Items
                      </h3>

                      <div
                        className="
px-4 py-2
rounded-full
bg-[#fff4d1]
text-[#8b6b15]
text-xs
font-semibold
"
                      >
                        {
                          order.totalItems
                        }{" "}
                        Items
                      </div>

                    </div>

                    <div className="space-y-4">

                      {order.items.map(
                        (item) => (

                          <div
                            key={item.id}
                           className="
rounded-[24px]
border border-[#f3df9b]
bg-gradient-to-r
from-[#fffdf5]
to-[#fff6dc]
p-4
hover:border-[#d6b24c]
transition
"
                          >

                            <div
                              className="flex
                              flex-col md:flex-row
                              md:items-center
                              gap-4"
                            >

                              {/* IMAGE */}

                              <div
                                className="w-20 h-20
                                rounded-[20px]
                                overflow-hidden
                                bg-white
                                border border-[#f1e4d8]
                                shrink-0"
                              >

                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full
                                  h-full
                                  object-contain
                                  p-2"
                                />

                              </div>

                              {/* INFO */}

                              <div className="flex-1">

                                <div
                                  className="flex
                                  flex-col lg:flex-row
                                  lg:items-center
                                  lg:justify-between
                                  gap-3"
                                >

                                  <div>

                                    <h2
                                      className="text-lg
                                      font-bold
                                      text-[#2a1a1a]"
                                    >
                                      {
                                        item.name
                                      }
                                    </h2>

                                    <p
                                      className="mt-1
                                      text-sm
                                      text-[#7d6d6d]"
                                    >
                                      Crafted with
                                      elegance ✨
                                    </p>

                                  </div>

                                  <div
                                    className="flex
                                    items-center
                                    gap-3"
                                  >

                                    <div
                                      className="px-4 py-2
                                      rounded-full
                                      bg-white
                                      border
                                      text-sm"
                                    >
                                      Qty:
                                      {" "}
                                      {
                                        item.qty
                                      }
                                    </div>

                                    <div
                                     className="
text-2xl
font-bold
text-[#b8901f]
"
                                    >
                                      ₹
                                      {
                                        item.price
                                      }
                                    </div>

                                  </div>

                                </div>

                              </div>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                    {/* TOTAL */}

                 <div
className="
mt-6
rounded-[28px]
bg-gradient-to-r
from-[#b8901f]
to-[#f0d77a]
p-5
text-[#4b3907]
shadow-[0_10px_40px_rgba(201,162,39,0.25)]
"
>

  <div
    className="flex
    flex-col md:flex-row
    md:items-center
    md:justify-between
    gap-5"
  >

    <div>

      <p
        className="text-white/70
        text-sm"
      >
        Total Amount
      </p>

      <h2
        className="text-2xl
        font-bold mt-2"
      >
        ₹{order.total}
      </h2>

    </div>

    <div
     className="
px-4 py-3
rounded-2xl
bg-white/30
border border-white/20
text-sm
font-medium
backdrop-blur-md
"
    >
      💎 Premium Jewellery
      Order Confirmed
    </div>

  </div>

  {/* ACTIONS */}

  <div
    className="mt-5
    flex flex-wrap
    gap-3"
  >

  

    {/* DELETE */}
<button
  onClick={() =>
    handleDeleteOrder(
      order.id
    )
  }
 className="
h-12 px-6
rounded-2xl
bg-gradient-to-r
from-[#8b0000]
to-[#d62828]
text-white
font-semibold
hover:scale-[1.03]
transition-all duration-300
shadow-md
"
>
  Delete Order
</button>

  </div>

</div>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>
{showReviewModal && (

  <div
    className="fixed inset-0
    z-50
    bg-black/50
    backdrop-blur-sm
    flex items-center
    justify-center
    p-4"
  >

    <div
      
className="
w-full
max-w-lg
rounded-[32px]
bg-[#fffdf8]
border border-[#f3df9b]
p-6 md:p-8
relative
shadow-[0_20px_60px_rgba(201,162,39,0.2)]
"
    >

      {/* CLOSE */}

      <button
        onClick={() =>
          setShowReviewModal(false)
        }
       className="
absolute
top-5 right-5
w-10 h-10
rounded-full
bg-[#fff4d1]
text-[#8b6b15]
flex items-center
justify-center
"
      >

        <X size={18} />

      </button>

      {/* TITLE */}

      <h2
        className="text-3xl
        font-bold
        text-[#2a1a1a]"
      >
        Share Your Experience ✨
      </h2>

      <p
        className="mt-2
        text-[#7d6d6d]"
      >
        Tell others how your
        jewellery experience was
      </p>

      {/* STARS */}

      <div
        className="flex gap-2
        mt-6"
      >

        {[1, 2, 3, 4, 5].map(
          (star) => (

            <button
              key={star}
              onClick={() =>
                setRating(star)
              }
            >

              <Star
                size={34}
                fill={
  star <= rating
    ? "#d4af37"
    : "transparent"
}
stroke="#d4af37"
              />

            </button>

          )
        )}

      </div>

      {/* TEXTAREA */}

      <textarea
        placeholder="Write your experience..."
        value={reviewText}
        onChange={(e) =>
          setReviewText(
            e.target.value
          )
        }
       className="
mt-6
w-full h-36
rounded-3xl
border border-[#f3df9b]
bg-[#fffdf5]
p-5
outline-none
resize-none
focus:border-[#c9a227]
focus:ring-4
focus:ring-[#f3df9b]/40
transition
"
      />

      {/* BUTTON */}

      <button
        onClick={
          handleSubmitReview
        }
        className="
mt-6
w-full h-14
rounded-2xl
bg-gradient-to-r
from-[#b8901f]
to-[#f0d77a]
text-[#4b3907]
font-bold
hover:shadow-[0_10px_30px_rgba(201,162,39,0.35)]
transition-all duration-300
"
      >
        Submit Review
      </button>

    </div>

  </div>

)}
      </div>
    </>
  );
}