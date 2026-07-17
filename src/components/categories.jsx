// Categories.jsx
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Necklace Sets",
    slug: "necklace-sets",
    img: "https://m.media-amazon.com/images/I/71L793bY9OL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    name: "Pendant Sets",
    slug: "pendant-sets",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRNUBBhNTxtXGc5SMtUmeeqCAHswNAUtVyQ2dVp-ooV5YGb-rzk_gFLXc3_yR4o5q4GLoWylR-p2b7aQ-ELfK-A6x5dobjlXwBzKw2Sx0egDeQR6wE8t0DFCQVv8zgP8XsW4CPzGX8&usqp=CAc"
  },
  {
    name: "Earring Designs",
    slug: "earring-designs",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSvTM1i8BLiMgk4Cql86J5duND6eFwomczqa5bRPtasR5xlZtXA2xbtVAbCsKiGs-jgcT05It4vBNjbR7_PASDFyzBzcmBMLSPnvHVEqJpzXIdjlq8W9EL07g0iCjTeT0VgTkLRAtvbRw&usqp=CAc"
  },
  {
    name: "Bangles",
    slug: "bangles",
    img: "https://www.bhindi.com/upload/product/Ban-3689-3.webp"
  },
  {
    name: "Long Necklace ",
    slug: "long-necklace-sets",
    img: "https://m.media-amazon.com/images/I/71d3NFbWo0L._AC_UY1100_.jpg"
  },
  {
    name: "Rings",
    slug: "rings",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTN-c3DpflYqd_Ubn98zVSeP2bwWVsWvhEejc4WmnRHA5dGNtgfIdJv-MCXlXOSEQi6ULuToLBjUjIl3JjXO_DQnmicQ9qk7HUmglUpBUW2UiC00fLu-X2qrtLwVUURc6VzCWlLAg&usqp=CAc"
  },
  {
    name: "Hair Accessories",
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
  },
];

export default function Categories() {
  return (
   <div className="w-full py-10 md:py-14 relative overflow-hidden">

      {/* GOLD GLOW */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2
        w-[500px] h-[500px]
        bg-[#d4af37]/10 blur-[140px]"
      />

      <div className="w-full px-4 relative z-10">

        {/* HEADING */}
        <div className="text-center mb-8 md:mb-14">

          <p
            className="
            text-[#c49b33]
            tracking-[4px]
            uppercase text-sm
            font-medium
            "
          >
            Explore Collections
          </p>

          <h2
            className="
text-3xl
sm:text-4xl
lg:text-5xl
            font-light
            text-[#3d2b0a]
            leading-tight
            mt-3
            "
          >
            Find Your
            <span className="text-[#c79b2c] font-semibold">
              {" "}Perfect Match
            </span>
          </h2>

          <p
            className="
            text-[#9d7a33]
            text-lg sm:text-2xl
            font-light mt-3
            "
          >
            Shop by Categories
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

      {/* GRID */}
<div
  className="
  grid
  grid-cols-3
  sm:grid-cols-4
  md:grid-cols-5
  lg:grid-cols-7
  xl:grid-cols-9

  gap-y-8
  gap-x-4

  justify-items-center
  "
>

  {categories.map((item, i) => (
    <Link
      to={`/category/${item.slug}`}
      key={i}
    >

      <div
        className="
        flex flex-col items-center
        cursor-pointer group
        transition-all duration-500
        "
      >

        {/* IMAGE CARD */}
        <div
          className="
          relative
w-[105px]
h-[105px]

sm:w-[118px]
sm:h-[118px]

md:w-[125px]
md:h-[125px]

          bg-white/80
          backdrop-blur-xl

          border border-[#ecd9a2]

          rounded-[28px]
          overflow-hidden

          shadow-[0_6px_24px_rgba(212,175,55,0.07)]

          transition-all duration-500

          group-hover:-translate-y-2
          group-hover:shadow-[0_14px_35px_rgba(212,175,55,0.16)]
          group-hover:border-[#d4af37]
          "
        >

          {/* TOP GOLD LINE */}
          <div
            className="
            absolute top-0 left-0
            w-full h-[2px]
            bg-gradient-to-r
            from-[#f6e7b3]
            via-[#d4af37]
            to-[#f6e7b3]
            "
          />

          {/* GOLD OVERLAY */}
          <div
            className="
            absolute inset-0
            bg-gradient-to-br
            from-[#fff8e1]/60
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition duration-500
            "
          />

          <img
            src={item.img}
            alt={item.name}
            className="
            w-full h-full
            object-contain p-2.5

            transition-transform duration-500
            group-hover:scale-110
            "
          />

        </div>

        {/* TEXT */}
        <p
          className="
          text-[13px] sm:text-[14px]
          mt-3
          font-medium
          text-[#4a3713]
          text-center
          leading-snug

          transition-all duration-300

          group-hover:text-[#b8860b]
          "
        >
          {item.name}
        </p>

      </div>

    </Link>
  ))}

</div>

      </div>
    </div>
  );
}