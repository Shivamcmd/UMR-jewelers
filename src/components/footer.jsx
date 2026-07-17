import {
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
   <footer
  className="
  relative
  overflow-hidden
  w-full
  bg-gradient-to-b
  from-[#fffdf9]
  via-[#fdf7ec]
  to-[#f6ecd7]
  text-[#2a1f12]
  border-t border-[#e8d8ab]
  px-5 sm:px-8 lg:px-12
  pt-8 pb-5
  "
>

  {/* GOLD BLUR */}
  <div className="absolute top-0 left-0 w-[clamp(150px,20vw,300px)]
h-[clamp(150px,20vw,300px)] bg-[#e7c86e]/20 blur-3xl rounded-full" />
  <div className="absolute bottom-0 right-0 w-[clamp(130px,18vw,260px)]
h-[clamp(130px,18vw,260px)] bg-[#c8a13b]/10 blur-3xl rounded-full" />

  <div className="max-w-7xl mx-auto relative z-10">

    {/* TOP GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

      {/* LEFT */}
      <div>

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
  w-fit
  "
>

  <h1
    className="
    text-[38px]
    sm:text-[45px]
    leading-none
    tracking-[0.26em]
    text-[#c8a13b]
    font-medium
    drop-shadow-[0_2px_10px_rgba(200,161,59,0.18)]
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
    mt-[8px]
    ml-[4px]
    text-[11px]
    tracking-[0.62em]
    uppercase
    text-[#8d8478]
    font-medium
    "
  >
    JEWELLERS
  </span>

</Link>

        {/* TITLE */}
        <h3
          className="
          text-[24px]
          font-semibold
          mt-9 mb-5
          text-[#2a1f12]
          leading-snug
          "
        >
          Visit UMR Jewellers
        </h3>

      {/* QR */}
<div
  className="
  relative
  w-full
max-w-[180px]
sm:max-w-[220px]

mr-auto
sm:mx-auto

  p-[2px]
  rounded-[24px] sm:rounded-[28px]

  bg-gradient-to-br
  from-[#f6df92]
  via-[#c8a13b]
  to-[#f3e2a0]

  shadow-[0_10px_45px_rgba(200,161,59,0.22)]
  "
>

  <div
    className="
    bg-[#fffaf0]/90
    backdrop-blur-md
    rounded-[22px] sm:rounded-[26px]
    p-2 sm:p-3
    border border-[#f3e2b3]
    "
  >

    <div
      className="
      relative
      overflow-hidden
      rounded-xl sm:rounded-2xl
      flex justify-center
      "
    >

      {/* GOLD OVERLAY */}
      <div
        className="
        absolute inset-0
        bg-[#c8a13b]/10
        mix-blend-multiply
        pointer-events-none
        z-10
        "
      />

      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://yourwebsite.com"
        alt="QR Code"
        className="
        
        h-[90px]
        sm:h-[120px]
        md:h-[140px]
w-[clamp(80px,10vw,140px)]
        object-contain
        rounded-xl
        "
      />

    </div>

    <p
      className="
      text-center
      mt-2
      text-[9px]
      sm:text-[11px]

      tracking-[0.22em]
      uppercase
      text-[#8c7650]
      font-medium
      "
    >
      Scan To Explore
    </p>

  </div>
</div>

      </div>

      {/* USEFUL LINKS */}
      <div>

        <h3
          className="
          text-[24px]
          font-semibold
          text-[#2a1f12]
          mb-6
          "
        >
          Useful Links
        </h3>

        <ul className="space-y-4 text-[15px] text-[#76695a]">

          {[
            "Delivery Information",
            "International Shipping",
            "Payment Options",
            "Track your Order",
            "Returns",
            "Find a Store",
          ].map((item) => (
            <li
              key={item}
              className="
              hover:text-[#c8a13b]
              transition-all
              duration-300
              cursor-pointer
              hover:translate-x-1
              w-fit
              "
            >
              {item}
            </li>
          ))}

        </ul>
      </div>

      {/* INFORMATION */}
      <div>

        <h3
          className="
          text-[24px]
          font-semibold
          text-[#2a1f12]
          mb-6
          "
        >
          Information
        </h3>

        <ul className="space-y-4 text-[15px] text-[#76695a]">

          <li className="hover:text-[#c8a13b] transition-all duration-300 hover:translate-x-1 cursor-pointer w-fit">
            Blog
          </li>

          <li className="hover:text-[#c8a13b] transition-all duration-300 hover:translate-x-1 cursor-pointer w-fit">
            <Link to="/about">About Us</Link>
          </li>

          <li className="hover:text-[#c8a13b] transition-all duration-300 hover:translate-x-1 cursor-pointer w-fit">
            <Link to="/contact">Contact Us</Link>
          </li>

          <li className="hover:text-[#c8a13b] transition-all duration-300 hover:translate-x-1 cursor-pointer w-fit">
            Help & FAQs
          </li>

        </ul>
      </div>

      {/* CONTACT */}
      <div>

        <h3
          className="
          text-[24px]
          font-semibold
          text-[#2a1f12]
          mb-6
          "
        >
          Contact Us
        </h3>

        <div className="space-y-6 text-[#76695a]">

          <div className="flex items-center gap-3">
            <Phone size={17} className="text-[#c8a13b]" />

            <span className="text-[15px] font-medium">
              1800-296-6677
            </span>
          </div>

          <div>

            <h4
              className="
              text-[22px]
              font-semibold
              text-[#2a1f12]
              mb-3
              "
            >
              Chat With Us
            </h4>

            <div className="flex items-center gap-3">
              <MessageCircle
                size={17}
                className="text-[#c8a13b]"
              />

              <span className="text-[15px] font-medium">
                +91 8147349242
              </span>
            </div>

          </div>

          {/* SOCIAL MINI */}
          <div className="border-t border-[#ead9aa] pt-5 flex gap-4">

            <a
              href="#"
              className="
              w-10 h-10
              rounded-full
              bg-white/70
              border border-[#ead9aa]
              text-[#c8a13b]
              flex items-center justify-center
              hover:bg-[#c8a13b]
              hover:text-white
              hover:scale-110
              transition-all duration-300
              shadow-sm
              "
            >
              <FaWhatsapp size={18} />
            </a>

            <a
              href="#"
              className="
              w-10 h-10
              rounded-full
              bg-white/70
              border border-[#ead9aa]
              text-[#c8a13b]
              flex items-center justify-center
              hover:bg-[#c8a13b]
              hover:text-white
              hover:scale-110
              transition-all duration-300
              shadow-sm
              "
            >
              <Mail size={18} />
            </a>

            <a
              href="#"
              className="
              w-10 h-10
              rounded-full
              bg-white/70
              border border-[#ead9aa]
              text-[#c8a13b]
              flex items-center justify-center
              hover:bg-[#c8a13b]
              hover:text-white
              hover:scale-110
              transition-all duration-300
              shadow-sm
              "
            >
              <MessageCircle size={18} />
            </a>

          </div>

        </div>
      </div>
    </div>

    {/* BOTTOM */}
    <div className="border-t border-[#e7d8b0] mt-5 pt-2">

      <div className="flex flex-col md:flex-row items-center  justify-between gap-5">

        <p className="text-sm text-[#84745e] text-center  md:text-left">
          © 2026 UMR Jewellers. All rights reserved.
        </p>

        {/* SOCIAL */}
        <div className="flex items-center gap-3 flex-wrap justify-center">

          <span
            className="
            text-[20px]
            font-semibold
            text-[#2a1f12]
            mr-1
            "
          >
            Social
          </span>

          {[
            {
              icon: <FaInstagram size={16} />,
            },
            {
              icon: <FaXTwitter size={15} />,
            },
            {
              icon: <FaFacebookF size={15} />,
            },
            {
              icon: <FaYoutube size={16} />,
            },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className="
              w-11 h-11
              rounded-full
              bg-white/70
              text-[#c8a13b]
              border border-[#ead9aa]
              hover:bg-[#c8a13b]
              hover:text-white
              flex items-center justify-center
              hover:scale-110
              transition-all duration-300
              shadow-sm
              backdrop-blur-md
              "
            >
              {item.icon}
            </a>
          ))}

        </div>
      </div>
    </div>
  </div>
</footer>
  );
}