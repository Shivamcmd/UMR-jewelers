import { Gem, ShieldCheck, Truck, Sparkles } from "lucide-react";
import Nav from "../components/Nav";

export default function AboutUs() {
  return (
    <>
      <Nav />

      <section className="bg-[#FFF9F0]">

        {/* HERO SECTION */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-24 pb-16 text-center">

          <p className="uppercase tracking-[10px] text-[#B8860B] text-xl mb-4 font-medium">
            About Us
          </p>

          <h1 className="text-4xl md:text-6xl font-serif text-[#7A5A00] leading-tight">
            We Don’t Just Sell Jewellery,
            <br />
            We Craft Emotions
          </h1>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-8">
            Every piece of jewellery tells a story of elegance,
            tradition and modern luxury. We bring you designs
            that are timeless and made with love.
          </p>

        </div>

        {/* IMAGE + STORY */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 pb-24 grid md:grid-cols-2 gap-12 items-center">

          <div className="relative w-full h-[500px] rounded-[40px] overflow-hidden shadow-2xl">

            <img
              src="https://images.pexels.com/photos/27954780/pexels-photo-27954780.jpeg"
              alt="Jewellery Model"
              className="w-full h-full object-cover object-center scale-105"
            />

            {/* Left Badge */}
            <div className="absolute bottom-6 left-6 bg-[#FFF8E7]/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-[#E5C76B]">

              <h3 className="text-3xl font-bold text-[#B8860B]">
                10+
              </h3>

              <p className="text-sm text-gray-700">
                Years Experience
              </p>

            </div>

            {/* Right Badge */}
            <div className="absolute bottom-6 right-6 bg-[#FFF8E7]/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-[#E5C76B]">

              <h3 className="text-3xl font-bold text-[#B8860B]">
                50+
              </h3>

              <p className="text-sm text-gray-700">
                Products
              </p>

            </div>

          </div>

          {/* Story Content */}
          <div>

            <h2 className="text-3xl md:text-4xl font-serif text-[#7A5A00] mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              Started with a small vision to bring premium jewellery
              to everyone, we have grown into a trusted brand known
              for quality and design excellence.
            </p>

            <p className="text-gray-600 leading-8 mb-8">
              Each piece is carefully crafted by expert artisans
              using certified materials, ensuring perfection
              in every detail.
            </p>

            <button
              className="
              bg-gradient-to-r
              from-[#D4AF37]
              to-[#B8860B]
              text-white
              px-7
              py-3
              rounded-xl
              hover:scale-105
              hover:shadow-xl
              transition duration-300
              "
            >
              Explore Collection
            </button>

          </div>

        </div>

        {/* FEATURES */}
        <div className="bg-[#FFFDF8] py-20">

          <div className="max-w-7xl mx-auto px-6 md:px-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                icon: Gem,
                title: "Premium Jewellery",
                desc: "Certified luxury designs",
              },
              {
                icon: ShieldCheck,
                title: "Trusted Quality",
                desc: "Guaranteed authenticity",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Safe & secure shipping",
              },
              {
                icon: Sparkles,
                title: "Unique Designs",
                desc: "Modern + traditional mix",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                bg-gradient-to-b
                from-[#FFF8E7]
                to-[#FFFDF8]
                p-6
                rounded-3xl
                border border-[#E5D08A]
                hover:shadow-2xl
                hover:-translate-y-2
                transition duration-300
                "
              >

                <item.icon
                  className="text-[#B8860B] mb-4"
                  size={32}
                />

                <h4 className="font-semibold text-lg mb-2 text-[#7A5A00]">
                  {item.title}
                </h4>

                <p className="text-gray-500 text-sm">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>
    </>
  );
}