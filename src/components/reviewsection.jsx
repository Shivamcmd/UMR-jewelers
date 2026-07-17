import { useState, useEffect } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";



export default function ReviewSection() {

  const [current, setCurrent] = useState(0);
const [reviews, setReviews] =
  useState([]);

  /* AUTO SLIDE */
  useEffect(() => {

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);

  }, [current, reviews.length]);

 const nextSlide = () => {

  if (reviews.length === 0)
    return;

  setCurrent((prev) =>
    prev === reviews.length - 1
      ? 0
      : prev + 1
  );
};

 const prevSlide = () => {

  if (reviews.length === 0)
    return;

  setCurrent((prev) =>
    prev === 0
      ? reviews.length - 1
      : prev - 1
  );
};


useEffect(() => {

  const fetchReviews =
    async () => {

      try {

        const res =
          await 
         fetch(
"https://umr-jewelers.onrender.com/siteReviews"
);

     const data = await res.json();

const validReviews = data.filter(
  (review) =>
    review.name?.trim() &&
    review.review?.trim()
);

const shuffled = validReviews
  .sort(() => 0.5 - Math.random())
  .slice(0, 5);

setReviews(shuffled);

      } catch (err) {

        console.log(err);
      }
    };

  fetchReviews();

}, []);
if (reviews.length === 0) {

  return null;
}

  return (
  <section className="w-full py-10 sm:py-16 px-3 sm:px-4 relative overflow-hidden">

  {/* GOLD GLOW */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2
    w-[260px] sm:w-[500px]
h-[260px] sm:h-[500px]
bg-[#d4af37]/10
blur-[90px] sm:blur-[140px]"
  />

  <div className="max-w-6xl mx-auto relative z-10">

    {/* HEADING */}
    <div className="text-center mb-12">

      <p
        className="text-[#c49b33]
tracking-[3px] sm:tracking-[4px]
uppercase text-[11px] sm:text-sm
font-medium"
      >
        Testimonials
      </p>

      <h2
        className="text-2xl sm:text-5xl
        font-light text-[#3d2b0a] mt-3"
      >
        Hear From Our Customers
      </h2>

      <div
        className="w-24 h-[2px]
        bg-gradient-to-r
        from-transparent
        via-[#d4af37]
        to-transparent
        mx-auto mt-5"
      />
    </div>

    {/* WRAPPER */}
    <div className="relative flex items-center">

      {/* LEFT NAV */}
      <button
        onClick={prevSlide}
        className="flex
        absolute left-1 sm:-left-5 lg:-left-10
        top-1/2 -translate-y-1/2
        z-20
        w-9 h-9 sm:w-12 sm:h-12 rounded-full
        bg-white/90
        border border-[#e7cf8a]
        shadow-lg
        items-center justify-center
        text-[#b8860b]
        hover:scale-105
        hover:border-[#d4af37]
        transition-all duration-300"
      >
        <ChevronLeft size={22} />
      </button>

      {/* REVIEW CARD */}
      <div
        className="
        relative
        bg-white/85
        backdrop-blur-xl
        rounded-[24px] sm:rounded-[34px]
        shadow-[0_10px_40px_rgba(212,175,55,0.10)]
        border border-[#ecd9a2]
        overflow-hidden
        max-w-5xl mx-auto w-full
        "
      >

        {/* TOP GOLD LINE */}
        <div
          className="absolute top-0 left-0
          w-full h-[3px]
          bg-gradient-to-r
          from-[#f6e7b3]
          via-[#d4af37]
          to-[#f6e7b3]"
        />

        {/* SLIDER TRACK */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >

          {reviews.map((review, index) => (

            <div
              key={index}
              className="min-w-full"
            >

              <div
                className="grid grid-cols-1
                md:grid-cols-[1.4fr_0.8fr]
                items-center"
              >

                {/* LEFT CONTENT */}
                <div className="p-5 sm:p-10">

                  {/* STARS */}
                  <div className="flex gap-1 mb-5">

                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="#d4af37"
                        stroke="#d4af37"
                      />
                    ))}

                  </div>

                  {/* TITLE */}
                  <h3
                    className="text-xl sm:text-3xl
                    font-semibold text-[#3d2b0a]
                    leading-snug"
                  >
                    {review.name}'s Experience ✨
                  </h3>

                  {/* REVIEW */}
                  <p
                    className="
                    text-[#6f5a32]
                    mt-4 leading-relaxed
                    text-sm sm:text-base
                    min-h-[90px] sm:min-h-[70px]
                    "
                  >
                    {review.review}
                  </p>

                  {/* USER */}
                  <div className="mt-6">

                    <p
                      className="
                      font-semibold
                      text-[#3d2b0a]
                      "
                    >
                      {review.name}
                    </p>

                    <p
                      className="
                      text-sm
                      text-[#a08446]
                      mt-1"
                    >
                      {review.username}
                    </p>

                  </div>

                </div>

                {/* IMAGE */}
                <div
                  className="
flex justify-center
md:justify-end
px-4 sm:px-6
pb-6 md:pb-0"
                >

                  <div
                    className="
                    w-[140px] h-[140px]
sm:w-[220px] sm:h-[220px]
                    rounded-[30px]
                    overflow-hidden
                    shadow-xl
                    border-[5px]
                    border-[#f3df9c]
                    "
                  >

                    <img
                      src={review.image}
                      alt=""
                      className="w-full h-full object-contain"
                    />

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* RIGHT NAV */}
      <button
        onClick={nextSlide}
        className="flex
        absolute right-1 sm:-right-5 lg:-right-10
        top-1/2 -translate-y-1/2
        z-20
        w-9 h-9 sm:w-12 sm:h-12 rounded-full
        bg-white/90
        border border-[#e7cf8a]
        shadow-lg
        items-center justify-center
        text-[#b8860b]
        hover:scale-105
        hover:border-[#d4af37]
        transition-all duration-300"
      >
        <ChevronRight size={22} />
      </button>

    </div>

    {/* DOTS */}
    <div className="flex justify-center gap-3 mt-8">

      {reviews.map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrent(i)}
          className={`transition-all duration-300 rounded-full ${
            current === i
              ? "w-8 h-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b]"
              : "w-2 h-2 bg-[#dcc68d]"
          }`}
        />
      ))}

    </div>

  </div>
</section>
  );
}