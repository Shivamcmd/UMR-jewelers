import { Link, useLocation } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";

import allImg from "../../assets/all.png";
const categories = [

{
name:"All",
slug:"all",
img:allImg,
},
{
  name: "Necklace Sets",
  slug: "necklace-sets",
  img: "https://m.media-amazon.com/images/I/71L793bY9OL._AC_UL480_FMwebp_QL65_.jpg"
},
 {
    name: "Pendant",
    slug: "pendant-sets",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRNUBBhNTxtXGc5SMtUmeeqCAHswNAUtVyQ2dVp-ooV5YGb-rzk_gFLXc3_yR4o5q4GLoWylR-p2b7aQ-ELfK-A6x5dobjlXwBzKw2Sx0egDeQR6wE8t0DFCQVv8zgP8XsW4CPzGX8&usqp=CAc"
  },
  {
    name: "Earrings",
    slug: "earring-designs",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSvTM1i8BLiMgk4Cql86J5duND6eFwomczqa5bRPtasR5xlZtXA2xbtVAbCsKiGs-jgcT05It4vBNjbR7_PASDFyzBzcmBMLSPnvHVEqJpzXIdjlq8W9EL07g0iCjTeT0VgTkLRAtvbRw&usqp=CAc"
  },
  {
    name: "Bangles",
    slug: "bangles",
    img: "https://www.bhindi.com/upload/product/Ban-3689-3.webp"
  },
  {
    name: "Long Sets",
    slug: "long-necklace-sets",
    img: "https://m.media-amazon.com/images/I/71d3NFbWo0L._AC_UY1100_.jpg"
  },
  {
    name: "Rings",
    slug: "rings",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTN-c3DpflYqd_Ubn98zVSeP2bwWVsWvhEejc4WmnRHA5dGNtgfIdJv-MCXlXOSEQi6ULuToLBjUjIl3JjXO_DQnmicQ9qk7HUmglUpBUW2UiC00fLu-X2qrtLwVUURc6VzCWlLAg&usqp=CAc"
  },
  {
    name: "Hair Accesories",
    slug: "hair-accessories",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2S599urW6pcvg45D3aappxv_HdQNYYPBsoA&s"
  },
  {
    name: "Waistbands",
    slug: "waistbands",
    img: "https://www.tarinika.in/cdn/shop/files/AKX0160X.jpg?v=1695452256"
  },
  {
    name: "Mangalsutra",
    slug: "mangalsutra",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSLsYxM-K5JeTjcEV5oJlS6y8Y38f5Xptn3IlCdfl4Tegc7nFyqlAm5gPDcdlrnZn6xm24vRCltaDawZB_MyLoduRreEsOfDqRGeEat5EZwMXpi6Ix5UqucY3kUx69QNWkTfSqT8bVnGg&usqp=CAc"
  }

];

export default function TopCategories() {
  const location = useLocation();

  // current category
 const currentCategory = categories.find(
(cat)=> location.pathname.includes(cat.slug)
);

  return (
    <section className="w-full py-1 bg-[#fbf7ef]">

      {/* BREADCRUMB */}
      <div className="flex items-center flex-wrap gap-1 text-[14px] text-[#9b8353] mb-4 px-4">

        <Link
          to="/"
          className="hover:text-[#c79a32] transition"
        >
          Home
        </Link>

        {/* <ChevronRight size={15} className="text-[#cbb78b]" /> */}

        {/* <Link
          to="/categories"
          className="hover:text-[#c79a32] transition"
        >
          Categories
        </Link> */}

        <ChevronRight size={15} className="text-[#cbb78b]" />

        <span className="text-[#b8860b] font-semibold capitalize">
          {currentCategory?.name || "Category"}
        </span>

      </div>

      {/* CATEGORIES */}
<div
  className="
  flex
  overflow-x-auto
  scrollbar-hide
  md:gap-8
  gap-4
  px-3
  py-2
  md:flex-wrap
  md:justify-center
  md:overflow-visible"
>

        {categories.map((cat) => {
          const isActive =
            location.pathname === `/category/${cat.slug}`;

          return (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group flex-shrink-0"
            >
              <div className="flex flex-col items-center relative">

  {/* IMAGE */}
<div
className={`relative
w-[58px]
h-[58px]
sm:w-[64px]
sm:h-[64px]
md:w-[80px]
md:h-[80px]
md:rounded-[22px] overflow-visible transition-all duration-300 bg-white
  ${
    isActive
      ? "border-2 border-[#d4af37] shadow-[0_10px_30px_rgba(212,175,55,0.28)]"
      : "border border-[#eadfbe] shadow-[0_4px_15px_rgba(212,175,55,0.08)]"
  }
  group-hover:-translate-y-1
  group-hover:border-[#d4af37]
  group-hover:shadow-[0_10px_25px_rgba(212,175,55,0.18)]`}
>

  {/* IMAGE WRAPPER */}
  <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#fffdf9]">
    <img
      src={cat.img}
      alt={cat.name}
      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
    />
  </div>

  {/* GOLD TICK */}
  {isActive && (
    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-[#f7e7a3] via-[#d4af37] to-[#a97808] flex items-center justify-center shadow-lg border-2 border-white">
      <Check size={13}
       className="text-white stroke-[3]" />
    </div>
  )}
</div>

                {/* TEXT */}
                <p
className={`mt-1.5 text-[10px] sm:text-[12px] md:text-[13px] font-medium text-center transition-all duration-300
                  ${
                    isActive
                      ? "text-[#b8860b]"
                      : "text-[#6f5a32] group-hover:text-[#b8860b]"
                  }`}
                >
                  {cat.name}
                </p>

              </div>
            </Link>
          );
        })}
      </div>

    </section>
  );
}