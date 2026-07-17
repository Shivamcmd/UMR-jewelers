// ========================== HEADER ==========================

import {
 Search,
Heart,
ShoppingBag,
User,
Package,
LogOut,
Settings,
Menu,
X,
} from "lucide-react";

import { useLocation } from "react-router-dom";

import {
  GiDiamondRing,
  GiHeartNecklace,
  GiDropEarrings,
  GiGemChain,
  GiCutDiamond,
} from "react-icons/gi";

import {
  FaGift,
  FaChevronDown,
} from "react-icons/fa";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import { useNavigate } from "react-router-dom";

export default function Header({
  
  setAuthOpen,
}) {

  const [user, setUser] =
    useState(null);

  const [showMenu, setShowMenu] =
    useState(false);

    const [mobileMenu, setMobileMenu] =
  useState(false);

  const [metalPrice, setMetalPrice] = useState(null);

  const { totalItems } =
    useCart();

    const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const location = useLocation();

const isAdminPage =
  location.pathname.startsWith("/admin");
const navCategories = [
  {
    name: "Earrings",
    slug: "earring-designs",
    icon: <GiDropEarrings size={16} />,
  },
  {
    name: "Rings",
    slug: "rings",
    icon: <GiDiamondRing size={16} />,
  },
  {
    name: "Bracelet & Bangles",
    slug: "bangles",
    icon: <GiCutDiamond size={16} />,
  },
  {
    name: "Necklaces & Pendants",
    slug: "necklace-sets",
    icon: <GiGemChain size={16} />,
  },
  {
    name: "Mangalsutra",
    slug: "mangalsutra",
    icon: <GiHeartNecklace size={16} />,
  },
  {
    name: "Hair Accessories",
    slug: "hair-accessories",
    icon: <GiCutDiamond size={16} />,
  },
  {
    name: "Collections",
    section: "gender-section",
    icon: <GiGemChain size={16} />,
  },
  {
    name: "Gifting",
    slug: "pendant-sets",
    icon: <FaGift size={14} />,
  },
  {
    name: "More Jewellery",
    slug: "waistbands",
    icon: <FaChevronDown size={12} />,
  },
];

useEffect(() => {

const loadUser=()=>{

const storedUser=
localStorage.getItem(
"user"
);

setUser(

storedUser
?

JSON.parse(
storedUser
)

:

null

);

};

loadUser();
const handleUserUpdate=(e)=>{

if(e.detail){

setUser(
e.detail
);

}else{

loadUser();

}

};

window.addEventListener(
"userUpdated",
handleUserUpdate
);

window.addEventListener(
"storage",
loadUser
);

return()=>{

window.removeEventListener(
"userUpdated",
handleUserUpdate
);

window.removeEventListener(
"storage",
loadUser
);

};

},[]);

useEffect(() => {
  fetch("https://umr-jewelers.onrender.com/metalPrices")
    .then((res) => res.json())
    .then((data) => setMetalPrice(data))
    .catch((err) => console.log(err));
}, []);

useEffect(() => {

  const handleClickOutside =
    (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {

        setShowMenu(false);
      }
    };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };

}, []);

  return (

    <header
      className="
      w-full
      h-[68px]
      bg-[#fbfaf8]
      border-b
      border-[#ece5d8]"
    >

      <div
        className="
        max-w-screen-2xl
        mx-auto
        h-full
        flex
        items-center
        justify-between
        px-6
        lg:px-8"
      >

{/* ================= LEFT ================= */}

<div
  className="
  flex
  items-center
  gap-3"
>

  {/* MOBILE MENU BUTTON */}

 {!isAdminPage && (

<button
  onClick={() =>
    setMobileMenu(!mobileMenu)
  }
  className="
  md:hidden

  w-6
  h-9

  rounded-full

  flex
  items-center
  justify-center

  text-[#4b4338]

  hover:bg-[#f3ede2]
  transition-all"
>

  {mobileMenu ? (
    <X size={20} />
  ) : (
    <Menu size={20} />
  )}

</button>

)}

  {/* LOGO */}

  <Link
    to="/"
    className="
    flex
    flex-col
    justify-center
    leading-none
    shrink-0
    select-none
    "
  >

    <h1
      className="
      text-[24px]
      sm:text-[30px]
      md:text-[35px]

      leading-none
      tracking-[0.24em]
      text-[#c9a234]
      font-semi-bold
      "
      style={{
        fontFamily:
          "'Cormorant Garamond', serif",
      }}
    >
     UMR
    </h1>

    <span
      className="
      mt-[4px]
      ml-[2px]

      text-[8px]
      sm:text-[10px]

      tracking-[0.58em]
      uppercase
      text-[#8d8478]
      "
    >
      JEWELLERS
    </span>

  </Link>

</div>

        {/* ================= SEARCH ================= */}

        <div
          className="
           hidden
  md:flex
  flex-1
  max-w-[620px]
  mx-4
  items-center
  h-[40px]
  bg-[#f4f4f4]
  rounded-full
  px-5
          transition-all
          duration-300
          hover:bg-[#f1f1f1]
          focus-within:bg-white
          focus-within:ring-1
          focus-within:ring-[#e2d3ad]"
        >

          <Search
            size={16}
            className="
            text-[#a6a09a]
            mr-3
            shrink-0"
          />

          <input
            type="text"
            placeholder="Search jewellery..."
            className="
            w-full
            bg-transparent
            outline-none
            text-[14px]
            font-normal
            text-[#4e463d]
            placeholder:text-[#aaa39a]"
          />

        </div>


        {/* ================= RIGHT ================= */}

        <div
          className="
          flex
          items-center
          gap-2 sm:gap-5
          shrink-0"
        >
{/* GOLD / SILVER PRICE */}

<div
onClick={() => navigate("/gold-rates")}
className="
hidden md:flex
cursor-pointer
items-center
justify-center
min-w-0
h-[38px]
px-1
rounded-full
bg-white
border
border-gray-200
shadow-sm
overflow-hidden
relative
hover:border-[#c9a234]
hover:shadow-md
transition-all
"
>

  <style>{`

    .metal-slider {
      position: relative;
      width: 130px;
      height: 20px;
    
    }

    .metal-slider div {
      position: absolute;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      opacity: 0;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      font-size: 13px;
      font-weight: 600;
    }

    .silver-text {
      color: #6b7280;
      animation-name: silverFade;
    }

    .gold-text {
      color: #b8901f;
      animation-name: goldFade;
    }

    @keyframes silverFade {

      0%, 45% {
        opacity: 1;
      }

      50%, 100% {
        opacity: 0;
      }
    }

    @keyframes goldFade {

      0%, 45% {
        opacity: 0;
      }

      50%, 100% {
        opacity: 1;
      }
    }

  `}</style>

  <div className="metal-slider">

    {/* SILVER */}

    <div className="silver-text">

      <span>⚪</span>

      <span>
        Silver : ₹{metalPrice?.silver ?? "--"}/g
      </span>

    </div>

    {/* GOLD */}

    <div className="gold-text">

      <span>🟡</span>

      <span>
        Gold : ₹{metalPrice?.gold?.["24k"] ?? "--"}/g
      </span>

    </div>

  </div>

</div>

          {/* WISHLIST */}

<Link
  to="/wishlist"
 className="
invisible
sm:visible

pointer-events-none
sm:pointer-events-auto

text-[#443d36]
hover:text-[#c39a42]

transition-all
duration-300"
>

  <Heart size={20} />

</Link>

          {/* CART */}

       {user?.role!=="admin" && (

<Link
to="/cart"
className="
relative
text-[#443d36]
hover:text-[#c39a42]
transition-all"
>

<ShoppingBag size={20}/>

{totalItems>0 && (

<span
className="
absolute
-top-2
-right-2
min-w-[17px]
h-[17px]
px-1
rounded-full
bg-[#caa437]
text-white
text-[10px]
flex
items-center
justify-center"
>

{totalItems}

</span>

)}

</Link>

)}

          {/* USER */}

          <div className="relative"
          ref={dropdownRef}>

<button
  onClick={() => {

    if (!user) {

      if (
        typeof setAuthOpen ===
        "function"
      ) {

        setAuthOpen(true);
      }

    } else {

      setShowMenu(
        !showMenu
      );
    }
  }}

  className="
  h-[35px]
sm:h-[37px]

px-1.5
sm:px-2.5

pr-2
sm:pr-3
  rounded-full
  border
  border-[#ece2d2]
  bg-white
  flex
  items-center
  gap-2
  hover:border-[#dcc9a0]
  hover:bg-[#fdfbf8]
  transition-all
  duration-300
  shadow-sm"
>

  {/* PROFILE IMAGE */}

{user?.profilePic ? (

<img
src={user.profilePic}
alt="profile"
className="
w-8
h-8
rounded-full
object-cover
border
border-[#eadfcb]"
/>

) : (

<div
className="
w-8
h-8
rounded-full
bg-[#f4ead8]
flex
items-center
justify-center"
>

<User
size={15}
className="
text-[#9b7b36]"
/>

</div>

)}

  {/* NAME */}

  <span
className="
hidden sm:block
max-w-[90px]
truncate
text-[13px]
font-medium
text-[#40372f]
"
>
  

    {user
      ? user.name
      : "Login"}

  </span>

  {/* ARROW */}

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="
    w-4
    h-4
    text-[#a08f7d]"
  >

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19 9-7 7-7-7"
    />

  </svg>

</button>

      
           {/* ================= DROPDOWN ================= */}

{showMenu && user && (

  <div
    className="
absolute
top-12
right-0
min-w-full
bg-white
border
border-[#ece3d5]
rounded-[24px]
overflow-hidden
shadow-[0_15px_35px_rgba(0,0,0,0.08)]
z-50"
  >

{/* ================= ADMIN MENU ================= */}

{user?.role==="admin" ? (

<>

<div
onClick={()=>{
navigate("/admin");
setShowMenu(false);
}}

className="
flex
items-center
gap-3
px-5
py-3.5
cursor-pointer
hover:bg-[#faf5ec]"
>

<Package
size={16}
className="text-[#b58a2f]"
/>

Admin Dashboard

</div>
</>

)

:

(

<>

{/* PROFILE */}

<div
onClick={()=>{
navigate("/profile");
setShowMenu(false);
}}

className="
flex
items-center
gap-3
px-5
py-3.5
cursor-pointer
hover:bg-[#faf5ec]"
>

<Settings
size={16}
className="text-[#b58a2f]"
/>
My Profile
</div>


{/* ORDERS */}

<div
onClick={()=>{
navigate("/orders");
setShowMenu(false);
}}

className="
flex
items-center
gap-3
px-5
py-3.5
cursor-pointer
hover:bg-[#faf5ec]"
>

<Package
size={16}
className="text-[#b58a2f]"
/>

My Orders

</div>


{/* WISHLIST */}

<div
onClick={()=>{
navigate("/wishlist");
setShowMenu(false);
}}

className="
flex
items-center
gap-3
px-5
py-3.5
cursor-pointer
hover:bg-[#faf5ec]"
>

<Heart
size={16}
className="text-[#b58a2f]"
/>

Wishlist

</div>

</>

)}

{/* LOGOUT */}

<button
onClick={() => {

localStorage.removeItem("user");

window.location.href="/";

}}

className="
w-full
flex
items-center
gap-3
px-5
py-3.5
text-red-500
hover:bg-red-50"
>

<LogOut size={16}/>

Logout

</button>

</div>

)}

          </div>

        </div>

      </div>
{/* ================= MOBILE MENU ================= */}

{!isAdminPage && mobileMenu && (

  <div
    className="
    md:hidden

    absolute
    top-[68px]
    left-0

    w-full

    bg-[#fbfaf8]

    border-b
    border-[#ece5d8]

    shadow-[0_10px_30px_rgba(0,0,0,0.06)]

    z-50"
  >

    {/* SEARCH */}

    <div className="p-4">

      <div
        className="
        flex
        items-center

        h-[42px]

        bg-[#f4f4f4]

        rounded-full

        px-4"
      >

        <Search
          size={16}
          className="
          text-[#a6a09a]
          mr-3"
        />

        <input
          type="text"
          placeholder="Search jewellery..."
          className="
          w-full
          bg-transparent
          outline-none

          text-[14px]

          text-[#4e463d]
          placeholder:text-[#aaa39a]"
        />

      </div>

    </div>
<div className="border-t border-[#ece5d8]">

  {navCategories.map((item, i) => (

    <button
      key={i}
      onClick={() => {

        setMobileMenu(false);

        if (item.section) {

          navigate("/");

          setTimeout(() => {

            document
              .getElementById(item.section)
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

          }, 300);

          return;
        }

        navigate(`/category/${item.slug}`);
      }}

      className="
      w-full
      flex
      items-center
      gap-3

      px-5
      py-4

      text-left

      border-b
      border-[#f1ece3]

      text-[#4d4338]

      hover:bg-[#f8f2e7]
      "
    >

      <span className="text-[#c3a04d]">
        {item.icon}
      </span>

      <span className="text-[14px] font-medium">
        {item.name}
      </span>

    </button>

  ))}

</div>
  </div>

)}
    </header>
  );
}