// ContactUs.jsx

import { Mail, MapPin, Phone, Send } from "lucide-react";
import Nav from "../components/Nav";

export default function ContactUs() {
  return (
    <>
      <Nav />

      <section className="bg-gradient-to-b from-[#fffdf8] to-[#fdf6e9] py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">

          {/* Left Section */}

          <div>
            <p className="uppercase tracking-[6px] text-[#c8a24b] text-sm font-semibold mb-4">
              Contact Us
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#5f4712] leading-tight mb-6">
              Let’s Connect
            </h2>

            <p className="text-[#8c7650] text-lg leading-8 mb-10">
              Have questions about our collections, orders, or custom jewellery?
              Our team is always here to help you.
            </p>

            <div className="space-y-6">

              {/* Phone */}

              <div className="flex items-start gap-4">
                <div
                  className="
                  bg-gradient-to-br
                  from-[#d8bb73]
                  to-[#b8860b]
                  p-4
                  rounded-2xl
                  text-white
                  shadow-md
                  "
                >
                  <Phone size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-[#5f4712]">
                    Phone
                  </h4>

                  <p className="text-[#8c7650]">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Email */}

              <div className="flex items-start gap-4">
                <div
                  className="
                  bg-gradient-to-br
                  from-[#d8bb73]
                  to-[#b8860b]
                  p-4
                  rounded-2xl
                  text-white
                  shadow-md
                  "
                >
                  <Mail size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-[#5f4712]">
                    Email
                  </h4>

                  <p className="text-[#8c7650]">
                    support@jewellery.com
                  </p>
                </div>
              </div>

              {/* Location */}

              <div className="flex items-start gap-4">
                <div
                  className="
                  bg-gradient-to-br
                  from-[#d8bb73]
                  to-[#b8860b]
                  p-4
                  rounded-2xl
                  text-white
                  shadow-md
                  "
                >
                  <MapPin size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-[#5f4712]">
                    Location
                  </h4>

                  <p className="text-[#8c7650]">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form */}

          <div
            className="
            bg-white/90
            backdrop-blur-sm
            p-8
            md:p-10
            rounded-[40px]
            shadow-xl
            border
            border-[#ecd8a5]
            "
          >

            <form className="space-y-6">

              <div>
                <label className="block mb-2 font-medium text-[#5f4712]">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-[#ecd8a5]
                  px-5
                  py-4
                  outline-none
                  bg-[#fffdf8]
                  focus:border-[#c8a24b]
                  focus:ring-2
                  focus:ring-[#f5e4b5]
                  transition
                  "
                />
              </div>


              <div>
                <label className="block mb-2 font-medium text-[#5f4712]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-[#ecd8a5]
                  px-5
                  py-4
                  outline-none
                  bg-[#fffdf8]
                  focus:border-[#c8a24b]
                  focus:ring-2
                  focus:ring-[#f5e4b5]
                  transition
                  "
                />
              </div>


              <div>
                <label className="block mb-2 font-medium text-[#5f4712]">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-[#ecd8a5]
                  px-5
                  py-4
                  outline-none
                  bg-[#fffdf8]
                  focus:border-[#c8a24b]
                  focus:ring-2
                  focus:ring-[#f5e4b5]
                  transition
                  resize-none
                  "
                />
              </div>


              <button
                className="
                bg-gradient-to-r
                from-[#d4af37]
                to-[#b8860b]
                hover:scale-105
                hover:shadow-lg
                transition-all
                duration-300
                text-white
                font-medium
                px-8
                py-4
                rounded-2xl
                flex
                items-center
                gap-3
                "
              >
                Send Message
                <Send size={18} />
              </button>

            </form>

          </div>

        </div>
      </section>
    </>
  );
}