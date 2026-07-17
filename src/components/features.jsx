import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Gem,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Gem size={24} />,
    title: "Premium Craftsmanship",
  },

  {
    icon: <BadgeCheck size={24} />,
    title: "Certified Jewellery",
  },

  {
    icon: <RotateCcw size={24} />,
    title: "Easy Exchange",
  },

  {
    icon: <Truck size={24} />,
    title: "Free Shipping",
  },

  {
    icon: <ShieldCheck size={24} />,
    title: "Secure Payments",
  },

  {
    icon: <Sparkles size={24} />,
    title: "Exclusive Designs",
  },
];

export default function FeaturesSection() {
  return (
   <section className="w-full py-14 px-4 relative overflow-hidden">

  {/* GOLD GLOW */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2
    w-[500px] h-[500px]
    bg-[#d4af37]/10 blur-[140px]"
  />

  <div
    className="
    max-w-7xl mx-auto
    bg-white/80
    backdrop-blur-xl
    border border-[#ecd9a2]
    rounded-[36px]
    shadow-[0_10px_40px_rgba(212,175,55,0.08)]
    overflow-hidden
    relative z-10
    "
  >

    <div
      className="grid grid-cols-1
      lg:grid-cols-[0.9fr_1.3fr]"
    >

      {/* LEFT */}
      <div
        className="
        relative
        flex items-center
        justify-center
        px-8 py-12 lg:py-0
        border-b lg:border-b-0
        lg:border-r border-[#f1dfaa]
        "
      >

        {/* GOLD LINE */}
        <div
          className="absolute top-0 left-0
          w-full h-[3px]
          bg-gradient-to-r
          from-[#f6e7b3]
          via-[#d4af37]
          to-[#f6e7b3]"
        />

        <div>

          <p
            className="
            text-[#c49b33]
            tracking-[5px]
            uppercase text-sm
            font-medium
            "
          >
            UML Jewellers
          </p>

          <h2
            className="
            text-4xl sm:text-5xl
            lg:text-6xl
            font-light
            leading-[0.9]
            text-[#3d2b0a]
            mt-4
            "
          >
            Luxury
            <br />

            <span className="text-[#c79b2c] font-semibold">
              Promise
            </span>
          </h2>

        </div>
      </div>

      {/* RIGHT */}
      <div
        className="
        grid grid-cols-2
        sm:grid-cols-3
        "
      >

        {features.map((item, index) => (
          <div
            key={index}
            className="
            group
            flex flex-col
            items-center justify-center
            text-center
            px-5 py-9
            border border-[#f6ebc7]
            hover:bg-gradient-to-b
            hover:from-[#fffdf7]
            hover:to-[#fff7df]
            transition-all duration-300
            "
          >

            {/* ICON */}
            <div
              className="
              w-16 h-16 rounded-full
              bg-gradient-to-br
              from-[#e6c15a]
              to-[#b8860b]
              text-white
              flex items-center justify-center
              shadow-lg shadow-[#d4af37]/20
              group-hover:scale-110
              transition duration-300
              "
            >
              {item.icon}
            </div>

            {/* TEXT */}
            <h3
              className="
              mt-5
              text-sm sm:text-base
              leading-snug
              font-medium
              text-[#3d2b0a]
              max-w-[140px]
              "
            >
              {item.title}
            </h3>

          </div>
        ))}

      </div>
    </div>
  </div>
</section>
  );
}