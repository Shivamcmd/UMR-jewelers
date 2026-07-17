import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    // DESKTOP
    img: "https://images.pexels.com/photos/19332643/pexels-photo-19332643.png",

    title: "Diamonds Ring Collection",

    subtitle:
      "Brilliant diamond artistry inspired by royal bridal traditions and modern luxury.",

    // MOBILE
    mobileImg:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1200&auto=format&fit=crop",

    mobileTitle: "Diamond Rings",

    mobileSubtitle:
      "Luxury diamond artistry for timeless elegance.",

    align: "right",

    overlay:
      "from-black/65 via-black/15 to-black/65",
  },

  {
    // DESKTOP
    img: "https://images.pexels.com/photos/14037486/pexels-photo-14037486.png",

    title: "Bridal Collections",

    subtitle:
      "Discover handcrafted necklaces, rings, and earrings made with unmatched precision and grace.",

    // MOBILE
    mobileImg:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",

    mobileTitle: "Bridal Jewellery",

    mobileSubtitle:
      "Elegant bridal jewellery crafted with timeless beauty.",

    align: "left",

    overlay:
      "from-transparent via-black/25 to-black/25",
  },

  {
    // DESKTOP
    img: "https://plus.unsplash.com/premium_photo-1683140573640-712430e92713?q=80&w=1170&auto=format&fit=crop",

    title: "Luxury In Every Detail",

    subtitle:
      "Discover handcrafted necklaces, rings & earrings made with unmatched precision and grace.",

    // MOBILE
    mobileImg:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop",

    mobileTitle: "Luxury Jewellery",

    mobileSubtitle:
      "Handcrafted jewellery with refined elegance.",

    align: "right",

    overlay:
      "from-transparent via-black/25 to-black/75",
  },

  {
    // DESKTOP
    img: "https://images.pexels.com/photos/29080967/pexels-photo-29080967.jpeg",

    title: "Timeless Gold Elegance",

    subtitle:
      "Exquisite handcrafted gold jewellery designed to elevate every graceful moment.",

    // MOBILE
    mobileImg:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",

    mobileTitle: "Gold Elegance",

    mobileSubtitle:
      "Elegant handcrafted jewellery for modern royal beauty.",

    align: "left",

    overlay:
      "from-black/75 via-black/20 to-transparent",
  },
];

export default function HeroBanner() {

  return (

    <section
      className="
      relative
      w-full
      bg-[#faf7f2]
      py-4
      overflow-hidden

      "
    >

      {/* WRAPPER */}

      <div
  className="
  relative
max-w-[1360px]
  mx-auto
  px-4
  sm:px-6
  lg:px-8
  "
>

        {/* OUTSIDE NAV BUTTONS */}

        <button
      className="
hero-prev

hidden sm:flex
items-center
justify-center

absolute
top-1/2
-left-2
-translate-y-1/2

z-30

w-12 h-12
md:w-14 md:h-14

rounded-full

bg-white/95
backdrop-blur-md

border-[6px]
border-[#e7dcc4]

text-[#b89146]

shadow-xl

hover:bg-[#c8a13b]
hover:text-white
hover:scale-105

transition-all
duration-300
"
        >
          <ChevronLeft size={24} />
        </button>

        <button
   className="
hero-next

hidden sm:flex
items-center
justify-center

absolute
top-1/2
-right-2
-translate-y-1/2

z-30

w-12 h-12
md:w-14 md:h-14

rounded-full

bg-white/95
backdrop-blur-md

border-[6px]
border-[#e7dcc4]

text-[#b89146]

shadow-xl

hover:bg-[#c8a13b]
hover:text-white
hover:scale-105

transition-all
duration-300
"
        >
          <ChevronRight size={24} />
        </button>

        <Swiper

          modules={[
            Navigation,
            Pagination,
            Autoplay,
          ]}

          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}

          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}

          pagination={{
            clickable: true,
          }}

          speed={1000}

          loop={true}

          slidesPerView={1}

          className="heroSwiper rounded-[18px] sm:rounded-[28px] lg:rounded-[34px] overflow-hidden"
        >

          {banners.map((banner, index) => (

         <SwiperSlide key={index}>
  <div
    className="
    relative
transform-gpu
 h-[260px]
sm:h-[340px]
md:h-[460px]
lg:h-[530px]
xl:h-[550px]

    overflow-hidden

    rounded-[18px]
    sm:rounded-[28px]
    lg:rounded-[34px]

    shadow-[0_12px_30px_rgba(0,0,0,0.12)]
    sm:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
    "
  >

    {/* IMAGE */}

    <picture>
  <source
    media="(max-width: 639px)"
    srcSet={banner.mobileImg}
  />

  <img
  src={banner.img}
  alt={banner.title}
  className="
  w-full
  h-full

  object-cover
  object-center

  scale-100
  sm:scale-[1.02]

  [backface-visibility:hidden]

  transition-all
  duration-700
  "
/>
</picture>

    {/* OVERLAY */}

    <div
      className={`
      absolute
      inset-0

      bg-gradient-to-r
      ${banner.overlay}
      `}
    />

    {/* GOLD TINT */}

    <div
      className="
      absolute
      inset-0

      bg-[#c8a13b]/10
      "
    />

    {/* CONTENT */}

    <div
      className={`
      absolute
      inset-0

      flex
      items-center

      px-4
      sm:px-12
      lg:px-20

      py-5

      ${
        banner.align === "center"
          ? "justify-center text-center"
          : banner.align === "right"
          ? "justify-end text-right"
          : "justify-start text-left"
      }
      `}
    >

<div
 className="
 max-w-full
 sm:max-w-[500px]
 md:max-w-[560px]
 text-white
 "
>

        <p
          className="
          text-[8px]
          sm:text-sm

          uppercase

          tracking-[0.25em]
          sm:tracking-[0.42em]

          text-[#f3d98a]

          mb-2
          sm:mb-4
          "
        >
          UMR JEWELLERS
        </p>

        <h1
          className="
          text-xl
sm:text-3xl
md:text-5xl
lg:text-6xl
          leading-[1.1]

          font-light
          "
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
    <>
  {/* MOBILE */}
  <span className="block sm:hidden">
    {banner.mobileTitle}
  </span>

  {/* DESKTOP */}
  <span className="hidden sm:block">
    {banner.title}
  </span>
</>
        </h1>

        <p
          className="
          mt-2
          sm:mt-4

          text-[11px]
          sm:text-lg

          text-white/85

          leading-4
          sm:leading-7

          max-w-[280px]
          sm:max-w-full
          "
        >
<>
  {/* MOBILE */}
  <span className="block sm:hidden">
    {banner.mobileSubtitle}
  </span>

  {/* DESKTOP */}
  <span className="hidden sm:block">
    {banner.subtitle}
  </span>
</>
        </p>

        <button
          className="
          mt-4
          sm:mt-7

          px-4
          sm:px-7

          py-2
          sm:py-3

          rounded-full

          bg-[#c8a13b]

          text-white

          text-[10px]
          sm:text-sm

          tracking-[0.15em]
          sm:tracking-[0.2em]

          uppercase

          shadow-lg

          hover:bg-[#b8912f]

          transition-all
          duration-300
          "
        >
          Explore Collection
        </button>

      </div>

    </div>

  </div>
</SwiperSlide>

          ))}

        </Swiper>

      </div>

      <style jsx>{`

        .heroSwiper {
          padding-bottom: 50px;
        }

        .heroSwiper .swiper-pagination-bullet {

          width: 8px;
          height: 8px;

          background: #d8c6a0;

          opacity: 1;

          transition: all 0.3s ease;
        }

        .heroSwiper .swiper-pagination-bullet-active {

          width: 28px;

          border-radius: 999px;

          background: #c8a13b;
        }

      `}</style>

    </section>
  );
}