import { Heart, ShoppingCart, Star } from "lucide-react";
import { FaTruck } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import toast from "react-hot-toast";

export default function ProductCard({ item }) {
 const {
  toggleWishlist,
  isInWishlist,
} = useWishlist();

const liked =
  isInWishlist(item.id);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
  addToCart,
  cartItems,
} = useCart();

  // Rating 
  const rating =
item.rating || 0;

const reviews =
item.reviewCount || 0;

  const randomOff = Math.floor(Math.random() * 35 + 15);

  const alreadyInCart =
  cartItems.some(
    (product) =>
      product.id === item.id
  );

  const outOfStock =
item.inStock === false;

  return (
  <div
className="group bg-[#fffdf9]
rounded-xl sm:rounded-2xl
overflow-hidden
border border-[#ead7ad]
hover:shadow-[0_12px_35px_rgba(212,175,55,0.18)]
transition-all duration-300
hover:-translate-y-1
w-full
h-full
flex
flex-col"
>
      {/* IMAGE */}
      <div
        onClick={() => navigate(`/product/${item.slug}`)}
        className="relative overflow-hidden cursor-pointer bg-[#faf6ee]"
      >
        <img
          src={item.image}
          alt={item.name}
          
  className="
w-full
h-[155px]
sm:h-[190px]
object-cover
group-hover:scale-110
transition
duration-500
"
        />
{
outOfStock && (
<div
className="
absolute
bottom-1
left-2
bg-red-600
text-white
px-2
py-1
rounded-full
text-xs
font-semibold
z-20
"
>
Out Of Stock
</div>
)}
       
        {/* HEART */}
      <button
  onClick={(e) => {
    e.stopPropagation();

    toggleWishlist(item);
  }}
  className="absolute
top-2 right-2
sm:top-3 sm:right-3
  bg-white/95 backdrop-blur-md
  border border-[#ecd8a5]
p-1.5 sm:p-2 rounded-full shadow-md
  hover:scale-110 transition"
>
 <Heart
  size={15}
  className={
    liked
      ? "fill-[#ed0000] text-[#ed0000]"
      : "text-[#9b8251]"
  }
/>
</button>

{/* RATING */}
<div
  className="absolute
top-2 left-2
sm:top-2 sm:left-3
  bg-white/95 backdrop-blur-md
  border border-[#ecd8a5]
  px-2 py-1 rounded-full
  flex items-center gap-1 shadow"
>
  <Star
    size={11}
    className="fill-[#d4af37] text-[#d4af37]"
  />

{
reviews > 0 ? (
<>
  <span
    className="
    text-[10px]
    font-semibold
    text-[#5f4712]
    "
  >
    {rating}
  </span>

  <span
    className="
    text-[9px]
    text-[#a89266]
    "
  >
    ({reviews})
  </span>
</>
) : (
<span
  className="
  text-[10px]
  font-semibold
  text-[#5f4712]
  "
>
  New
</span>
)
}

</div>
      </div>

      {/* CONTENT */}
      <div
className="
p-2 sm:p-3
flex
flex-col
flex-1
"
>
        {/* BRAND */}
<h3
className="
text-[13px]
sm:text-[15px]
font-bold
text-[#5c430d]
line-clamp-1
min-h-[22px]
"
>
          {item.brand}
        </h3>

        {/* NAME */}
        <p
className="
text-[11px]
sm:text-[13px]
text-[#8a7448]
mt-1
line-clamp-2
min-h-[38px]
"
>
          {item.name}
        </p>

        {/* PRICE */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[16px] sm:text-[20px] font-bold text-[#b8860b]">
            ₹{item.price}
          </span>

          <span className="text-[#bca57a] line-through text-[13px]">
            ₹{item.originalPrice}
          </span>
        </div>

        {/* DELIVERY */}
<div className="mt-2 flex items-center gap-1 whitespace-nowrap">

<div
  className="flex items-center gap-1
  text-[8px] sm:text-[10px]
  text-[#8b6b1d]
  bg-[#fff4d6]
  border border-[#ecd8a5]
  px-1.5 sm:px-2
  py-[3px]
  rounded-full"
>
  <FaTruck size={7} />
  Free Delivery
</div>

<div
  className="text-[8px] sm:text-[10px]
  bg-[#f8edd1]
  text-[#a17408]
  border border-[#ecd8a5]
  px-1.5 sm:px-2
  py-[3px]
  rounded-full
  font-medium"
>
  {randomOff}% OFF
</div>

</div>

       
     
    {/* BUTTONS */}


<div className="mt-auto">

<div className="mt-3 flex gap-1.5">

{/* ADD TO CART */}

<button disabled={outOfStock}
onClick={() => {

if (alreadyInCart) {

navigate("/cart");

}

else {

setLoading(true);

setTimeout(()=>{

addToCart({
...item,
qty:1
});

toast.success(
"Added to cart 🛒"
);

setLoading(false);

},800);

}

}}

className={`

flex-1
py-1.5 sm:py-2.5
rounded-lg
text-[11px] sm:text-[13px]
font-medium

flex
items-center
justify-center
gap-2

transition
text-white

${
outOfStock
?
"bg-gray-400 cursor-not-allowed"
:
alreadyInCart
?
"bg-[#3d2d12] hover:bg-[#2c1f0b]"
:
"bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:opacity-90"
}

`}
>

<ShoppingCart size={15}/>

{loading ? (

<>

<div
className="
w-3 h-3
border-2
border-white
border-t-transparent
rounded-full
animate-spin"
/>

Adding...

</>

)

:

outOfStock
?
"Out Of Stock"
:
alreadyInCart
?
"View Cart"
:
"Add to Cart"

}

</button>


{/* BUY NOW */}

<button disabled={outOfStock}

onClick={()=>{

if(!alreadyInCart){

addToCart({

...item,
qty:1

});

}

navigate("/cart");

}}

className="
px-2 sm:px-3
py-1.5 sm:py-2.5

border
border-[#d4af37]

text-[#a17408]

bg-[#fffaf0]

rounded-lg

text-[11px]
sm:text-[13px]

whitespace-nowrap
"

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

</div>
      </div>
    </div>
  );
}