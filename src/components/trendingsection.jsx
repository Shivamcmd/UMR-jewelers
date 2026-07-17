
import ProductCard from "../pages/categories/ProductCard";
import { useNavigate } from "react-router-dom";

export default function TrendingSection({
  
products = []

}) {
  const navigate = useNavigate();

  return (
<section className="w-full py-10 sm:py-16 px-3 sm:px-4 relative overflow-hidden">

  {/* GOLD GLOW */}
  <div
    className="
    absolute top-0 left-1/2 -translate-x-1/2
    w-[260px] sm:w-[500px]
    h-[260px] sm:h-[500px]
    bg-[#d4af37]/10 blur-[100px] sm:blur-[140px]"
  />

  <div className="max-w-7xl mx-auto relative z-10">

    {/* HEADING */}
    <div className="flex items-end justify-between mb-8 sm:mb-12">

      <div>

        <p
          className="
          text-[#c49b33]
          tracking-[3px] sm:tracking-[4px]
          uppercase text-[11px] sm:text-m
          font-medium"
        >
          Most Loved
        </p>

        <h2
          className="
          text-2xl sm:text-5xl
          font-light text-[#3d2b0a]
          mt-2 sm:mt-3 leading-tight"
        >
          Trending Jewellery
        </h2>

      </div>

    <button
  onClick={() => navigate("/category/all")}
  className="
  hidden sm:block
  border border-[#d4af37]
  text-[#b8860b]
  px-6 py-2.5 rounded-full
  text-sm font-medium
  bg-white/70 backdrop-blur-md
  hover:bg-[#d4af37]
  hover:text-white
  hover:shadow-lg
  hover:shadow-[#d4af37]/20
  transition-all duration-300
  "
>
  View All
</button>

    </div>

    {/* PRODUCTS GRID */}
    <div
      className="
      grid grid-cols-2
      lg:grid-cols-4
      gap-3 sm:gap-6"
    >

  {products.map((item) => (

  <div
    key={item.id}
    className="
    rounded-[22px]
    bg-gradient-to-b
    from-[#f7e7b5]
    via-[#fffaf0]
    to-[#efe1b0]
    p-[1px]
    shadow-[0_8px_24px_rgba(212,175,55,0.10)]
    hover:shadow-[0_12px_30px_rgba(212,175,55,0.18)]
    transition-all duration-300
    "
  >
    <div className="rounded-[22px] bg-[#fffdf9] h-full">
      <ProductCard item={item} />
    </div>
  </div>

))}

    </div>

    {/* MOBILE BUTTON */}
    <div className="mt-8 flex justify-center sm:hidden">

     <button
  onClick={() => navigate("/category/all")}
  className="
  border border-[#d4af37]
  text-[#b8860b]
  px-5 py-2 rounded-full
  text-sm font-medium
  bg-white"
>
  View All
</button>

    </div>

  </div>
</section>
  );
}