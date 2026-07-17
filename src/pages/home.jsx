import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Categories from "../components/categories";
// import Footer from "../components/footer";
import HeroBanner from "../components/herobanner";
import FAQSection from "../components/faqsection";
import ReviewSection from "../components/reviewsection";
import FeaturesSection from "../components/features";
import TrendingSection from "../components/trendingsection";
import Nav from "../components/Nav"


export default function Home() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
const [trendingProducts, setTrendingProducts] =
useState([]);

useEffect(() => {

  const handleScroll = () => {

    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      (window.scrollY / totalHeight) * 100;

    setScrollProgress(progress);
  };

  window.addEventListener("scroll", handleScroll);

  return () =>
    window.removeEventListener("scroll", handleScroll);

}, []);

useEffect(() => {

Promise.all([

fetch("http://localhost:5000/users")
.then(res => res.json()),

fetch("http://localhost:5000/products")
.then(res => res.json())

])

.then(([users, products]) => {

const soldMap = {};

users.forEach(user => {

(user.orders || []).forEach(order => {

(order.items || []).forEach(item => {

soldMap[item.id] =
(soldMap[item.id] || 0)
+
(item.qty || 1);

});

});

});

const topProducts =

products

.map(product => ({

...product,

soldCount:
soldMap[product.id] || 0

}))

.sort((a,b)=>

b.soldCount - a.soldCount

)

.slice(0,4);

setTrendingProducts(
topProducts
);

});

}, []);

  return (
    <div>
      {/* TOP GOLDEN SCROLL BAR */}
<div
  className="
  fixed top-0 left-0
  h-[4px]
  z-[9999]

  bg-gradient-to-r
  from-[#f7e7a0]
  via-[#d4af37]
  to-[#b8860b]

  shadow-[0_0_12px_rgba(212,175,55,0.9)]

  pointer-events-none
  "
  style={{
    width: `${scrollProgress}%`,
  }}
/>
    <Nav/>
      <HeroBanner/>
     <Categories/>
     <TrendingSection
products={trendingProducts}
/>
<FeaturesSection/>
     {/* SHOP BY GENDER */}
<section 
id="gender-section"
className=" w-full py-16 px-4 relative overflow-hidden">

  {/* GOLD GLOW */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2
    w-[500px] h-[500px]
    bg-[#d4af37]/10 blur-[140px]"
  />

  <div className="max-w-7xl mx-auto relative z-10">

    {/* HEADING */}
    <div className="text-center mb-12">

      <p
        className="
        text-[#c49b33]
        tracking-[5px]
        uppercase text-sm
        font-medium
        "
      >
        Curated Collections
      </p>

      <h2
        className="
        text-4xl sm:text-5xl md:text-6xl
        font-light
        text-[#3d2b0a]
        mt-3
        "
      >
        Curated
        <span className="text-[#c79b2c] font-semibold">
          {" "}For You
        </span>
      </h2>

      <p
        className="
        text-lg sm:text-2xl
        text-[#9d7a33]
        mt-3 font-light
        "
      >
        Shop By Gender
      </p>

      <div
        className="
        w-28 h-[2px]
        bg-gradient-to-r
        from-transparent
        via-[#d4af37]
        to-transparent
        mx-auto mt-6
        "
      />
    </div>

    {/* CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-7">

      {/* WOMEN */}
 <div
  className="group cursor-pointer"
 onClick={() => {
  navigate("/category/all?collection=Womens");
}}
>

        <div
          className="
          relative
          overflow-hidden
          rounded-[34px]

          border border-[#ecd9a2]

          bg-white/70
          backdrop-blur-xl

          shadow-[0_10px_35px_rgba(212,175,55,0.08)]

          transition-all duration-500

          group-hover:-translate-y-2
          group-hover:shadow-[0_18px_50px_rgba(212,175,55,0.18)]
          group-hover:border-[#d4af37]
          "
        >

          {/* TOP GOLD LINE */}
          <div
            className="
            absolute top-0 left-0 z-20
            w-full h-[2px]
            bg-gradient-to-r
            from-[#f6e7b3]
            via-[#d4af37]
            to-[#f6e7b3]
            "
          />

          <img
            src="https://images.unsplash.com/photo-1688382654723-a7366006519b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lkYSUyMHdlYXJpbmclMjBqZXdlbGxlcnl8ZW58MHwxfDB8fHww"
            alt="Women Jewellery"
            className="
            w-full h-[420px]
            object-cover

            transition duration-700
            group-hover:scale-105
            "
          />

          {/* GOLD OVERLAY */}
          <div
            className="
            absolute inset-0
            bg-gradient-to-t
            from-[#00000040]
            via-transparent
            to-transparent
            "
          />

        </div>

        <h3
          className="
          text-center
          text-2xl sm:text-3xl

          font-light
          text-[#3d2b0a]

          mt-5

          transition-all duration-300
          group-hover:text-[#b8860b]
          "
        >
          Women Jewellery
        </h3>

      </div>

      {/* MEN */}
<div
  className="group cursor-pointer"
  onClick={() =>
    navigate("/category/all?collection=Mens")
  }
>

        <div
          className="
          relative
          overflow-hidden
          rounded-[34px]

          border border-[#ecd9a2]

          bg-white/70
          backdrop-blur-xl

          shadow-[0_10px_35px_rgba(212,175,55,0.08)]

          transition-all duration-500

          group-hover:-translate-y-2
          group-hover:shadow-[0_18px_50px_rgba(212,175,55,0.18)]
          group-hover:border-[#d4af37]
          "
        >

          <div
            className="
            absolute top-0 left-0 z-20
            w-full h-[2px]
            bg-gradient-to-r
            from-[#f6e7b3]
            via-[#d4af37]
            to-[#f6e7b3]
            "
          />

          <img
            src="https://images.pexels.com/photos/26921465/pexels-photo-26921465.jpeg"
            alt="Men Jewellery"
            className="
            w-full h-[420px]
            object-cover

            transition duration-700
            group-hover:scale-105
            "
          />

          <div
            className="
            absolute inset-0
            bg-gradient-to-t
            from-[#00000040]
            via-transparent
            to-transparent
            "
          />

        </div>

        <h3
          className="
          text-center
          text-2xl sm:text-3xl

          font-light
          text-[#3d2b0a]

          mt-5

          transition-all duration-300
          group-hover:text-[#b8860b]
          "
        >
          Men Jewellery
        </h3>

      </div>

      {/* KIDS */}
<div
  className="group cursor-pointer"
  onClick={() =>
    navigate("/category/all?collection=Kids")
  }
>

        <div
          className="
          relative
          overflow-hidden
          rounded-[34px]

          border border-[#ecd9a2]

          bg-white/70
          backdrop-blur-xl

          shadow-[0_10px_35px_rgba(212,175,55,0.08)]

          transition-all duration-500

          group-hover:-translate-y-2
          group-hover:shadow-[0_18px_50px_rgba(212,175,55,0.18)]
          group-hover:border-[#d4af37]
          "
        >

          <div
            className="
            absolute top-0 left-0 z-20
            w-full h-[2px]
            bg-gradient-to-r
            from-[#f6e7b3]
            via-[#d4af37]
            to-[#f6e7b3]
            "
          />

          <img
            src="https://cdn-media.glamira.com/media/wysiwyg/Kids-newlp/kids2.jpg"
            alt="Kids Jewellery"
            className="
            w-full h-[420px]
            object-cover

            transition duration-700
            group-hover:scale-105
            "
          />

          <div
            className="
            absolute inset-0
            bg-gradient-to-t
            from-[#00000040]
            via-transparent
            to-transparent
            "
          />

        </div>

        <h3
          className="
          text-center
          text-2xl sm:text-3xl

          font-light
          text-[#3d2b0a]

          mt-5

          transition-all duration-300
          group-hover:text-[#b8860b]
          "
        >
          Kids Jewellery
        </h3>

      </div>

    </div>
  </div>
</section>

<ReviewSection/>
     <FAQSection/>
    
    </div>
  );
}