import {
  useParams,
  useNavigate,
} from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  Heart,
  Star,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

import toast from "react-hot-toast";

const iconMap = {
  truck: Truck,
  shield: ShieldCheck,
  return: RotateCcw,
};

export default function ProductDetails() {
  const { slug } = useParams();

  const navigate = useNavigate();

 const {
  addToCart,
  cartItems,
} = useCart();

const {
  toggleWishlist,
  isInWishlist,
} = useWishlist();

  const [product, setProduct] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("description");

  const [qty, setQty] =
    useState(1);

  const [activeIndex, setActiveIndex] =
    useState(0);


  const [showReviewBox, setShowReviewBox] =
    useState(false);

  const [userRating, setUserRating] =
    useState(0);

  const [userComment, setUserComment] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const [editComment, setEditComment] =
    useState("");

  const [editRating, setEditRating] =
    useState(0);

    const reviewsRef =
useRef(null);

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  // FETCH PRODUCT
  useEffect(() => {
    fetch(
      "http://localhost:5000/products"
    )
      .then((res) => res.json())
      .then((data) => {
        const found =
          data.find(
            (p) =>
              p.slug === slug
          );

        setProduct(found);
      });
  }, [slug]);

  // FETCH REVIEWS
  useEffect(() => {
    if (!product?.id) return;

    fetch(
      `http://localhost:5000/reviews?productId=${product.id}`
    )
      .then((res) => res.json())
      .then((data) =>
        setReviews(data.reverse())
      );
  }, [product]);

  if (!product) {
    return (
      <div className="p-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  const images =
    product.gallery ||
    product.images || [
      product.image,
    ];

    const alreadyInCart =
  cartItems.some(
    (item) =>
      item.id === product.id
  );
  const liked =
  product
    ? isInWishlist(product.id)
    : false;

const outOfStock =
product.inStock === false;

const totalRating=

reviews.reduce(
(sum,item)=>
sum+item.rating,
0
);

const avgRating=

reviews.length
?

(
totalRating/
reviews.length
).toFixed(1)

:

0;

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      qty,
    });

    toast.success(
      "Added to cart"
    );
  };

  return (
    <div className="bg-[#faf8f7] min-h-screen">

      {/* CONTAINER */}
      <div
       className="
max-w-screen-xl
mx-auto
px-4
sm:px-5
md:px-8
py-6
md:py-8
"
      >

        {/* BACK */}
        <button
          onClick={() =>
            navigate(-1)
          }
          className="flex items-center gap-2
          mb-7 text-sm
          text-[#5f4f4f]
          hover:text-black"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {/* TOP SECTION */}
     <div
className="
grid
grid-cols-1
xl:grid-cols-[0.9fr_1fr]
gap-6
md:gap-8
items-start
"
>

          {/* LEFT */}
          <div>

            {/* MAIN IMAGE */}
            <div
              className="relative
              bg-white
              rounded-[24px]
              border border-[#efe7e7]
              overflow-hidden
              shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >

              <img
                src={images[activeIndex]}
                alt={product.name}
                className="w-full
                h-[260px]
                sm:h-[340px]
                md:h-[430px]
                object-contain
                hover:scale-110
                transition duration-700"
              />

              {/* LEFT BTN */}
              <button
                onClick={prevImage}
                className="absolute
                left-4 top-1/2
                -translate-y-1/2
                w-10 h-10
                rounded-full
                bg-white/90
                shadow-md
                flex items-center
                justify-center"
              >
                <ChevronLeft
                  size={18}
                />
              </button>

              {/* RIGHT BTN */}
              <button
                onClick={nextImage}
                className="absolute
                right-4 top-1/2
                -translate-y-1/2
                w-10 h-10
                rounded-full
                bg-white/90
                shadow-md
                flex items-center
                justify-center"
              >
                <ChevronRight
                  size={18}
                />
              </button>

              {/* IMAGE COUNT */}
              <div
                className="absolute
                bottom-4 right-4
                bg-black/80
                text-white
                text-xs
                px-3 py-1
                rounded-full"
              >
                {activeIndex + 1}
                /
                {images.length}
              </div>

            </div>

            {/* THUMBNAILS */}
          <div
className="
flex
gap-3
mt-5
overflow-x-auto
pb-2
scrollbar-hide
"
>

              {images.map(
                (img, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      setActiveIndex(
                        i
                      )
                    }
                    className={`

h-[62px]
w-14
md:w-16
md:h-[72px]
                    rounded-2xl
                    border overflow-hidden
                    cursor-pointer
                    transition
                    ${
                      activeIndex === i
                        ? "border-[#c8a24b]"
                        : "border-[#ece2e2]"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full
                      h-full
                      object-cover"
                    />
                  </div>
                )
              )}

            </div>

          </div>

          {/* RIGHT */}
          <div
            className="pt-2
            sticky top-24
            h-fit"
          >

            {/* TITLE */}
            <h1
              className="text-[22px]
sm:text-[26px]
md:text-[30px]
              leading-tight
              font-semibold
              text-[#2a1a1a]"
            >
              {product.name}
            </h1>

            {/* RATING */}
            <div
              className="flex
              items-center gap-3
              mt-5"
            >

              <div className="flex gap-1">

                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i <
                        Math.round(
                          avgRating
                        )
                          ? "fill-[#d4a017] text-[#d4a017]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}

              </div>

           <span
className="
text-[#c8a24b]
font-medium"
>

{
reviews.length
?

`${avgRating} ★`

:

"New"

}

</span>

              <span
               onClick={() => {

setActiveTab(
"reviews"
);

setTimeout(()=>{

reviewsRef.current
?.scrollIntoView({

behavior:"smooth",
block:"start"

});

},100);

}}
                className="text-[#8a6b6b]
                cursor-pointer
                hover:underline"
              >
                (
                {reviews.length}
                reviews)
              </span>

            </div>

            {/* PRICE */}
            <div className="mt-6">

              <div
                className="flex
                items-center gap-3
                flex-wrap"
              >

                <span
                  className="text-[26px]
                  md:text-[32px]
                  font-bold
                  text-[#111]"
                >
                  ₹
                  {product.price}
                </span>

                {product.originalPrice && (
                  <span
                    className="text-[20px]
                    md:text-[22px]
                    text-gray-400
                    line-through"
                  >
                    ₹
                    {
                      product.originalPrice
                    }
                  </span>
                )}

              </div>

              {product.originalPrice && (
                <p
                  className="text-[#0f9d58]
                  mt-2 font-medium"
                >
                  {Math.round(
                    ((product.originalPrice -
                      product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </p>
              )}

            </div>
{
outOfStock && (
<div
className="
mt-3
inline-block
bg-red-100
text-red-700
font-semibold
px-3 py-1
rounded-full
"
>
Out Of Stock
</div>
)}
            {/* DESCRIPTION */}
            <p
              className="mt-6
              text-[14px]
              md:text-[15px]
              w-full max-w-[580px]
              text-[#6b5b5b]
              leading-relaxed"
            >
              {
                product.description
              }
            </p>

            {/* QUANTITY */}
            <div className="mt-8">

              <h3
                className="text-[17px]
                font-semibold"
              >
                Quantity
              </h3>

              <div
                className="mt-3
                flex items-center
                border border-[#e7dede]
                rounded-xl
                overflow-hidden
                w-fit"
              >

                <button
                  onClick={() =>
                    setQty(
                      (prev) =>
                        prev > 1
                          ? prev - 1
                          : 1
                    )
                  }
                  className="w-10 h-10
                  flex items-center
                  justify-center"
                >
                  <Minus size={16} />
                </button>

                <div
                  className="w-12 h-12
                  border-x
                  border-[#e7dede]
                  flex items-center
                  justify-center"
                >
                  {qty}
                </div>

                <button
                  onClick={() =>
                    setQty(
                      (prev) =>
                        prev + 1
                    )
                  }
                  className="w-12 h-12
                  flex items-center
                  justify-center"
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>

            {/* BUTTONS */}
          <div
className="
flex
flex-col
sm:flex-row
gap-3
mt-6
w-full
"
>

              {/* WISHLIST */}
              <button
                onClick={() => {
  toggleWishlist(product);
}}
                className={`w-11 h-11
md:w-12 md:h-12
                rounded-2xl
                border
                flex items-center
                justify-center
                transition
                ${
                  liked
                    ? "bg-[#c8a24b] text-white border-[#c8a24b]"
                    : "bg-white border-[#ddd]"
                }`}
              >
                <Heart
                  size={22}
                  className={
                    liked
                      ? "fill-white"
                      : ""
                  }
                />
              </button>

              {/* CART */}

<button
  disabled={outOfStock}
  onClick={() => {
    if (alreadyInCart) {
      navigate("/cart");
    } else {
      handleAddToCart();
    }
  }}
  className={`flex-1
  h-16 md:h-13
  rounded-2xl
  text-white
  text-[14px]
  md:text-[15px]
  font-medium
  transition
  flex items-center
  justify-center gap-2
  ${
    outOfStock
      ? "bg-gray-400 cursor-not-allowed"
      : alreadyInCart
      ? "bg-black hover:bg-[#222]"
      : "bg-[#c8a24b] hover:bg-[#b68d35]"
  }`}
>
  {
    outOfStock
      ? "Out Of Stock"
      : alreadyInCart
      ? "View Cart"
      : "Add To Cart"
  }

  <ShoppingCart size={20} />
</button>

              {/* BUY NOW */}
              <button disabled={outOfStock}
                onClick={() =>
                  
                  navigate(
                    "/checkout"
                  )
                }
               className="
flex-1
h-11
md:h-13
rounded-2xl
border
border-[#c8a24b]
text-[#c8a24b]
bg-white
text-[14px]
md:text-[15px]
font-medium
hover:bg-[#fff7e8]
transition"
              >
                {
outOfStock
?
"Out Of Stock"
:
"Buy Now"
}
              </button>

            </div>

           {/* FEATURES */}
<div
  className="
  grid
  grid-cols-2
  sm:grid-cols-3
  gap-2 sm:gap-3
  mt-6 sm:mt-7
  "
>

  {product.highlights?.map(
    (item, i) => {

      const Icon = iconMap[item.icon];

      return (
        <div
          key={i}
          className="
          bg-white
          rounded-xl sm:rounded-2xl
          border border-[#eee]
          px-2 py-3
          sm:p-3
          text-center
          min-h-[80px]
          sm:min-h-[100px]
          flex flex-col
          justify-center
          "
        >

          {Icon && (
            <Icon
              className="mx-auto text-[#c8a24b]"
              size={window.innerWidth < 640 ? 15 : 18}
            />
          )}

          <p
            className="
            mt-2
            text-[11px]
            sm:text-[12px]
            md:text-[14px]
            leading-tight
            text-[#4b3b3b]
            "
          >
            {item.title}
          </p>

        </div>
      );
    }
  )}

</div>

          </div>

        </div>

        {/* DETAILS */}
        <div className="mt-14">

          {/* HEADER */}
          <div>

            <h2
              className="text-[24px]
              md:text-[34px]
              font-bold
              text-[#2a1a1a]"
            >
              Product Details
            </h2>

            <p
              className="text-[#7d6d6d]
              mt-2
              text-[16px]
              md:text-[18px]"
            >
              Everything you need to know
              before purchasing.
            </p>

          </div>

          {/* TABS */}
         <div
className="
flex
gap-2
mt-8
overflow-x-auto
pb-2
whitespace-nowrap
"
>

            {[
              "description",
              "specifications",
              "reviews",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`px-6
                md:px-7
                h-10 md:h-11
                rounded-full
                text-[13px]
                md:text-[14px]
                font-medium
                transition
                ${
                  activeTab === tab
                    ? "bg-[#c8a24b] text-white"
                    : "bg-[#f1eeee] text-[#4a3a3a]"
                }`}
              >
                {tab}
              </button>
            ))}

          </div>

          {/* CONTENT */}
          <div
            className="mt-8
            bg-[#f5f2f2]
            rounded-[32px]
            p-5 md:p-8"
          >

            {/* DESCRIPTION */}
            {activeTab ===
              "description" && (
              <div>

                <p
                  className="text-[16px]
                  md:text-[20px]
                  text-[#4b3b3b]
                  leading-relaxed"
                >
                  {
                    product.description
                  }
                </p>

                <div
                  className="grid
                  md:grid-cols-3
                  gap-5 mt-10"
                >

                  {product.features?.map(
                    (
                      item,
                      i
                    ) => (
                      <div
                        key={i}
                        className="bg-white
                        rounded-3xl
                        border border-[#e7dede]
                        p-6"
                      >
                        <h3
                          className="text-[18px]
                          md:text-[22px]
                          font-semibold"
                        >
                          {item}
                        </h3>
                      </div>
                    )
                  )}

                </div>

              </div>
            )}

            {/* SPECS */}
            {activeTab ===
              "specifications" && (
              <div
                className="grid
                md:grid-cols-2
                gap-5"
              >

                {product.specifications?.map(
                  (
                    item,
                    i
                  ) => (
                    <div
                      key={i}
                      className="bg-white
                      rounded-3xl
                      border border-[#e7dede]
                      p-6"
                    >
                      <h3
                        className="text-[18px]
                        md:text-[22px]
                        font-semibold"
                      >
                        {item}
                      </h3>
                    </div>
                  )
                )}

              </div>
            )}

            {/* REVIEWS */}
            {activeTab ===
              "reviews" && (
            <div
ref={reviewsRef}
>

                <h3
                  className="text-[28px]
                  md:text-[36px]
                  font-semibold"
                >
                  Customer Reviews
                </h3>

                <button
                  onClick={() =>
                    setShowReviewBox(
                      true
                    )
                  }
                  className="mt-5
                  px-6 h-12
                  rounded-xl
                  bg-[#c8a24b]
                  text-white"
                >
                  Write a Review
                </button>

               <div
className="
grid
grid-cols-1
md:grid-cols-2
gap-5
mt-8
"
>

                  {reviews.map(
                    (
                      review
                    ) => (
                      <div
                        key={
                          review.id
                        }
                        className="bg-white
                        rounded-3xl
                        border
                        border-[#e7dede]
                        p-6"
                      >

                        {/* TOP */}
                        <div
                          className="flex
                          justify-between"
                        >

                          <h4
                            className="text-[20px]
                            font-semibold"
                          >
                            {
                              review.user
                            }
                          </h4>

                          {review.userId ===
                            currentUser?.id && (
                            <div
                              className="flex
                              gap-3 text-sm"
                            >

                              <button
                                onClick={() => {
                                  setEditId(
                                    review.id
                                  );

                                  setEditComment(
                                    review.comment
                                  );

                                  setEditRating(
                                    review.rating
                                  );
                                }}
                                className="text-blue-500"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => {

                                  fetch(
                                    `http://localhost:5000/reviews/${review.id}`,
                                    {
                                      method:
                                        "DELETE",
                                    }
                                  ).then(
                                    () => {

                                      setReviews(
                                        (
                                          prev
                                        ) =>
                                          prev.filter(
                                            (
                                              r
                                            ) =>
                                              r.id !==
                                              review.id
                                          )
                                      );

                                      toast.success(
                                        "Review deleted"
                                      );
                                    }
                                  );
                                }}
                                className="text-red-500"
                              >
                                Delete
                              </button>

                            </div>
                          )}

                        </div>

                        {/* STARS */}
                        <div
                          className="flex
                          gap-1 mt-3"
                        >

                          {Array(
                            5
                          )
                            .fill()
                            .map(
                              (
                                _,
                                i
                              ) => (
                                <Star
                                  key={
                                    i
                                  }
                                  size={
                                    18
                                  }
                                  className={`${
                                    i <
                                    review.rating
                                      ? "fill-[#d4a017] text-[#d4a017]"
                                      : "text-gray-300"
                                  }`}
                                />
                              )
                            )}

                        </div>

                        {/* EDIT */}
                        {editId ===
                        review.id ? (
                          <div className="mt-4">

                            {/* STARS */}
                            <div
                              className="flex
                              gap-1"
                            >

                              {[1,2,3,4,5].map(
                                (
                                  star
                                ) => (
                                  <span
                                    key={
                                      star
                                    }
                                    onClick={() =>
                                      setEditRating(
                                        star
                                      )
                                    }
                                    className={`cursor-pointer
                                    text-2xl
                                    ${
                                      star <=
                                      editRating
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    ★
                                  </span>
                                )
                              )}

                            </div>

                            <textarea
                              value={
                                editComment
                              }
                              onChange={(
                                e
                              ) =>
                                setEditComment(
                                  e
                                    .target
                                    .value
                                )
                              }
                              className="w-full
                              border
                              rounded-xl
                              p-3 mt-3"
                            />

                            <div
                              className="flex
                              gap-3 mt-3"
                            >

                              <button
                                onClick={() => {

                                  const updatedReview =
                                    {
                                      ...review,
                                      rating:
                                        editRating,
                                      comment:
                                        editComment,
                                    };

                                  fetch(
                                    `http://localhost:5000/reviews/${review.id}`,
                                    {
                                      method:
                                        "PUT",
                                      headers:
                                        {
                                          "Content-Type":
                                            "application/json",
                                        },
                                      body: JSON.stringify(
                                        updatedReview
                                      ),
                                    }
                                  ).then(
                                    () => {

                                      setReviews(
                                        (
                                          prev
                                        ) =>
                                          prev.map(
                                            (
                                              r
                                            ) =>
                                              r.id ===
                                              review.id
                                                ? updatedReview
                                                : r
                                          )
                                      );

                                      setEditId(
                                        null
                                      );

                                      toast.success(
                                        "Review updated"
                                      );
                                    }
                                  );
                                }}
                                className="bg-green-500
                                text-white
                                px-4 py-2
                                rounded-xl"
                              >
                                Save
                              </button>

                              <button
                                onClick={() =>
                                  setEditId(
                                    null
                                  )
                                }
                                className="bg-gray-200
                                px-4 py-2
                                rounded-xl"
                              >
                                Cancel
                              </button>

                            </div>

                          </div>
                        ) : (
                          <>

                            <p
                              className="mt-4
                              text-[#5f4f4f]"
                            >
                              {
                                review.comment
                              }
                            </p>

                            <p
                              className="mt-4
                              text-sm
                              text-gray-400"
                            >
                              {
                                review.date
                              }
                            </p>

                          </>
                        )}

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* REVIEW MODAL */}
      {showReviewBox && (
        <div
          className="fixed inset-0
          bg-black/40
          z-50
          flex items-center
          justify-center
          p-4"
        >

          <div
            className="bg-white
            w-full max-w-md
            rounded-3xl
            p-6"
          >

            <h3
              className="text-2xl
              font-semibold"
            >
              Write a Review
            </h3>

            {/* STARS */}
            <div
              className="flex gap-2
              mt-5"
            >

              {[1,2,3,4,5].map(
                (star) => (
                  <span
                    key={star}
                    onClick={() =>
                      setUserRating(
                        star
                      )
                    }
                    className={`cursor-pointer
                    text-3xl
                    ${
                      star <=
                      userRating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                )
              )}

            </div>

            <textarea
              value={userComment}
              onChange={(e) =>
                setUserComment(
                  e.target.value
                )
              }
              placeholder="Write your review..."
              className="w-full
              border rounded-2xl
              p-4 mt-5
              min-h-[120px]"
            />

            <div
              className="flex justify-end
              gap-3 mt-5"
            >

              <button
                onClick={() =>
                  setShowReviewBox(
                    false
                  )
                }
                className="px-5 py-2
                rounded-xl
                bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {

                  if (
                    !currentUser?.id
                  ) {
                    toast.error(
                      "Please login first"
                    );
                    return;
                  }

                  if (
                    !userRating ||
                    !userComment.trim()
                  ) {
                    toast.error(
                      "Please add rating and review"
                    );
                    return;
                  }

                  const existing =
                    reviews.find(
                      (
                        r
                      ) =>
                        r.userId ===
                          currentUser.id &&
                        r.productId ===
                          product.id
                    );

                  if (
                    existing
                  ) {
                    toast.error(
                      "Already reviewed"
                    );
                    return;
                  }

                  const newReview =
                    {
                      userId:
                        currentUser.id,
                      productId:
                        product.id,
                      user:
                        currentUser.name,
                      rating:
                        userRating,
                      comment:
                        userComment,
                      date: new Date().toLocaleString(),
                    };

                  fetch(
                    "http://localhost:5000/reviews",
                    {
                      method:
                        "POST",
                      headers:
                        {
                          "Content-Type":
                            "application/json",
                        },
                      body: JSON.stringify(
                        newReview
                      ),
                    }
                  )
                    .then(
                      (
                        res
                      ) =>
                        res.json()
                    )
                    .then(
                      (
                        data
                      ) => {

                        setReviews(
                          (
                            prev
                          ) => [
                            data,
                            ...prev,
                          ]
                        );

                        setShowReviewBox(
                          false
                        );
const updatedReviews = [
  data,
  ...reviews,
];

const avgRating =
(
  updatedReviews.reduce(
    (sum, r) => sum + r.rating,
    0
  ) / updatedReviews.length
).toFixed(1);

fetch(
  `http://localhost:5000/products/${product.id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      rating: Number(avgRating),
      reviewCount:
        updatedReviews.length,
    }),
  }
);

                        setUserRating(
                          0
                        );

                        setUserComment(
                          ""
                        );

                      toast.success(
"Review submitted"
);

setActiveTab(
"reviews"
);

setTimeout(()=>{

reviewsRef.current
?.scrollIntoView({

behavior:"smooth"

});

},100);
                      }
                    );
                }}
                className="px-5 py-2
                rounded-xl
                bg-[#c8a24b]
                text-white"
              >
                Submit
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}