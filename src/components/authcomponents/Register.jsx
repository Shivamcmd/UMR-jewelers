import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

const Register = ({
  switchToLogin,
  phone,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: phone || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  };

  const handleRegister = async () => {
    if (!form.name || !form.email) {
      toast.error(
        "All fields required"
      );
      return;
    }

    if (
      !isValidEmail(form.email)
    ) {
      toast.error(
        "Enter valid email"
      );
      return;
    }

    const newUser = {
      ...form,
      role: "user",

      createdAt: new Date()
        .toISOString()
        .split("T")[0],

      isBlocked: false,

      orders: [],

      totalSpent: 0,
    };

    await fetch(
      "https://umr-jewelers.onrender.com/users",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          newUser
        ),
      }
    );

    toast.success(
      "Welcome to UMR Jewellers ✨"
    );

    switchToLogin();
  };

  return (
    <div
     className="w-full max-w-[1100px] mx-auto overflow-hidden
rounded-[18px] md:rounded-[22px]
border border-[#D4AF37]/30
bg-[#FFFDF7]
shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
    >
      <div
       className="flex flex-col xl:flex-row
xl:max-h-[560px]"
      >

        {/* LEFT IMAGE */}
        <div
className="
hidden xl:block
xl:w-[45%]
relative"
        >
          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
            alt=""
           className="w-full
h-[260px]
md:h-[500px]
lg:h-full
object-cover"
          />

          {/* OVERLAY */}
          <div
            className="absolute inset-0
            bg-gradient-to-t
            from-black/70 via-black/20 to-transparent"
          />

          {/* TEXT */}
          <div
            className="absolute bottom-10 left-6
            text-white max-w-[260px]"
          >
            <p
              className="uppercase
              tracking-[3px]
              text-[15px]
              text-[#f3d7b4]"
            >
              UMR Jewellers
            </p>

            <h2
              className="mt-2
              text-[24px] md:text-[28px]
              leading-[1.1]
              font-semibold"
            >
              Crafted For
              Timeless Elegance
            </h2>

            <p
              className="mt-3
              text-white/80
              text-[12px]
              leading-relaxed"
            >
              Premium handcrafted
              jewellery inspired by
              luxury and elegance.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
       <div
  className="w-full xl:w-[55%]
flex justify-center
px-5
sm:px-8
md:px-10
lg:px-12
py-8
md:py-10"
>
  <div
    className="w-full max-w-[420px]
    flex flex-col justify-center"
  >

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <div
                className="w-10 h-10
md:w-12 md:h-12
                rounded-2xl
                bg-gradient-to-br
from-[#D4AF37]
to-[#F4C542]
                flex items-center
                justify-center
                shadow-md"
              >
                <Sparkles
                  size={17}
                  className="text-white"
                />
              </div>

              <div>
                <h2
                  className="text-[20px]
                  font-semibold
                  text-[#5C4320]"
                >
                  UMR Jewellers
                </h2>

                <p
                  className="text-[11px]
                  text-[#B8860B]"
                >
                  Luxury Jewellery Store
                </p>
              </div>

            </div>

            {/* HEADING */}
            <div className="mt-5">

              <h1
                className="text-[22px]
                md:text-[26px]
                leading-[1.1]
                font-semibold
                text-[#5C4320]"
              >
                Create
                <br />
                Your Account
              </h1>

              <p
                className="mt-2
                text-[13px]
                text-[#B8860B]
                leading-relaxed"
              >
                Join UMR Jewellers
                and explore timeless
                handcrafted jewellery
                collections.
              </p>

            </div>

            {/* FORM */}
            <div className="space-y-3 mt-5">

              {/* NAME */}
              <div>
                <label
                  className="text-[13px]
                  text-[#8B6F2D]
                  font-medium"
                >
                  Full Name
                </label>

                <input
                  name="name"
                  placeholder="Enter your full name"
                  onChange={
                    handleChange
                  }
                  className="mt-2
                  w-full h-11
                  rounded-xl
                  border border-[#D4AF37]/30
                  bg-white px-4
                  text-[14px]
                  outline-none
                  focus:border-[#D4AF37]
                  transition"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  className="text-[13px]
                  text-[#8B6F2D]
                  font-medium"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  name="email"
                  value={form.email}
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email"
                  className="mt-2
                  w-full h-11
                  rounded-xl
                  border border-[#D4AF37]/30
                  bg-white px-4
                  text-[14px]
                  outline-none
                  focus:border-[#D4AF37]
                  transition"
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  className="text-[13px]
                  text-[#8B6F2D]
                  font-medium"
                >
                  Phone Number
                </label>

                <input
                  value={form.phone}
                  readOnly
                  className="mt-2
                  w-full h-11
                  rounded-xl
                  border border-[#D4AF37]/30
                  bg-[#FFF8E6]
                  px-4 text-[14px]
                  text-[#777]"
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={
                  handleRegister
                }
                className="w-full h-11
                mt-2 rounded-xl
                bg-gradient-to-r from-[#D4AF37] to-[#F4C542]
hover:from-[#C9A227] hover:to-[#E6B800]
text-black
                text-white
                text-[14px]
                font-medium
                flex items-center
                justify-center gap-2
                transition-all duration-300"
              >
                Create Account

                <ArrowRight
                  size={16}
                />
              </button>

            </div>

            {/* LOGIN */}
            <p
              className="mt-5
              text-[13px]
             text-[#B8860B] "
            >
              Already have an account?

              <span
                onClick={
                  switchToLogin
                }
                className="ml-2
                cursor-pointer
                font-semibold
               text-[#D4AF37]
hover:text-[#B8860B]"
              >
                Sign In
              </span>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;