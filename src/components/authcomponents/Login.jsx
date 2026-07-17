import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

import toast from "react-hot-toast";

const theme = "#C9A14A";

const Login = ({
  onLoginSuccess,
  openRegisterWithPhone,
}) => {
  const [step, setStep] = useState(1);

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [generatedOtp, setGeneratedOtp] =
    useState("");

  const [timer, setTimer] = useState(0);

  // SEND OTP
  const sendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
  return toast.error(
    "Enter valid 10 digit mobile number"
  );
}

    const fakeOtp = Math.floor(
      1000 + Math.random() * 9000
    );

    setGeneratedOtp(fakeOtp);

    console.log("OTP:", fakeOtp);

    toast.success("OTP sent successfully");

    setStep(2);

    setTimer(20);
  };

  // TIMER
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // VERIFY OTP
  const verifyOtp = async () => {
    if (otp != generatedOtp) {
      toast.error("Invalid OTP");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/users?phone=${phone}`
      );

      const data = await res.json();

      if (data.length === 0) {
        toast.success(
          "New user, please register"
        );

        openRegisterWithPhone(phone);
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify(data[0])
        );

        if (data[0].isBlocked) {
          toast.error(
            "Your account is blocked 🚫"
          );

          return;
        }

        toast.success(
          `Welcome back, ${data[0].name}`
        );

        if (data[0].role === "admin") {
          window.location.href = "/admin";
        } else {
          onLoginSuccess(data[0]);
        }
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div
      className="w-full overflow-hidden
      rounded-[26px]
      border border-[#E8D7AE]
      bg-[#fcf8ef]
      shadow-[0_10px_40px_rgba(122,17,36,0.08)]"
    >
      <div
        className="flex flex-col xl:flex-row
xl:max-h-[620px]"
      >

        {/* LEFT IMAGE */}
        <div
          className="hidden xl:block
          lg:w-[48%] relative"
        >
          <img
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop"
            alt=""
            className="w-full h-[240px]
            md:h-full object-cover"
          />

          {/* OVERLAY */}
          <div
            className="absolute inset-0
            bg-gradient-to-t
            from-black/70 via-black/20 to-transparent"
          />

          {/* TEXT */}
          <div
            className="absolute bottom-8 left-8
            text-white max-w-[320px]"
          >
            <p
              className="uppercase
              tracking-[4px]
              text-[11px]
              text-[#f3d7b4]"
            >
              UMR Jewellers
            </p>

            <h2
              className="mt-3
              text-[32px] md:text-[38px]
              leading-[1.05]
              font-semibold"
            >
              Elegance
              Crafted For You
            </h2>

            <p
              className="mt-4 text-white/80
              text-[14px]
              leading-relaxed"
            >
              Discover timeless jewellery
              collections inspired by
              luxury and celebration.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="w-full xl:w-[52%]
          bg-[#fffafa]
          flex items-center justify-center
          px-5 py-7 md:px-8"
        >
          <div className="w-full max-w-[380px]">

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <div
                className="w-11 h-11 rounded-2xl
                bg-[#C9A14A]
                flex items-center justify-center
                shadow-lg"
              >
                <Sparkles
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <h2
                  className="text-[22px]
                  font-semibold text-[#2a1a1a]"
                >
                  UMR Jewellers
                </h2>

                <p
                  className="text-[12px]
                  text-[#7B6A47]"
                >
                  Luxury Jewellery Store
                </p>
              </div>

            </div>

            {/* FEATURE CARDS */}
            <div
              className="grid grid-cols-3
              gap-3 mt-7"
            >

              <div
                className="bg-white rounded-2xl
                border border-[#eee]
                py-3 flex flex-col
                items-center shadow-sm"
              >
                <ShieldCheck
                  size={17}
                  color={theme}
                />

                <span
                  className="mt-2
                  text-[11px]
                  text-[#5f4b4b]"
                >
                  Trusted
                </span>
              </div>

              <div
                className="bg-white rounded-2xl
                border border-[#eee]
                py-3 flex flex-col
                items-center shadow-sm"
              >
                <Truck
                  size={17}
                  color={theme}
                />

                <span
                  className="mt-2
                  text-[11px]
                  text-[#5f4b4b]"
                >
                  Delivery
                </span>
              </div>

              <div
                className="bg-white rounded-2xl
                border border-[#eee]
                py-3 flex flex-col
                items-center shadow-sm"
              >
                <Sparkles
                  size={17}
                  color={theme}
                />

                <span
                  className="mt-2
                  text-[11px]
                  text-[#5f4b4b]"
                >
                  Premium
                </span>
              </div>

            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                {/* HEADING */}
                <div className="mt-8">

                  <h1
                    className="text-[34px]
                    md:text-[38px]
                    leading-[1.1]
                    font-semibold
                    text-[#3A2B13]"
                  >
                    Login
                    <br />
                    To Continue
                  </h1>

                  <p
                    className="mt-3
                    text-[14px]
                    text-[#7B6A47]
                    leading-relaxed"
                  >
                    Enter your phone number
                    to access your jewellery
                    collections and orders.
                  </p>

                </div>

                {/* PHONE INPUT */}
                <div className="mt-8 relative">

                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter your phone number"
                  onChange={(e) =>
  setPhone(
    e.target.value
      .replace(/\D/g, "")
      .slice(0, 10)
  )
}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter"
                      ) {
                        sendOtp();
                      }
                    }}
                    className="w-full h-12
                    rounded-2xl
                    border border-[#E8D7AE]
                    bg-white
                    pl-5 pr-14
                    text-[15px]
                    outline-none
                    focus:border-[#C9A14A]
                    transition"
                  />

                  <button
                    onClick={sendOtp}
                    className="absolute
                    right-1.5 top-1/2
                    -translate-y-1/2
                    w-9 h-9
                    rounded-xl
                   bg-[#C9A14A]
                    text-white
                    flex items-center
                    justify-center
                    hover:bg-[#B58B2F]
                    transition"
                  >
                    <ArrowRight size={16} />
                  </button>

                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="mt-8">

                {/* HEADING */}
                <div>
                  <h2
                    className="text-[30px]
                    font-semibold
                   text-[#3A2B13]"
                  >
                    Verify OTP
                  </h2>

                  <p
                    className="mt-2
                    text-[14px]
                    text-[#7B6A47]
                    leading-relaxed"
                  >
                    Enter the verification
                    code sent to
                    <span
                      className="font-semibold
                      text-[#3A2B13]"
                    >
                      {" "}
                      +91 {phone}
                    </span>
                  </p>

                  <button
                    onClick={() =>
                      setStep(1)
                    }
                    className="mt-2
                    text-[13px]
                    text-[#C9A14A]
                    font-medium"
                  >
                    Change Number
                  </button>
                </div>

                {/* OTP BOXES */}
                <div
                  className="flex justify-between
                  gap-2 mt-7"
                >

                  {[0, 1, 2, 3].map(
                    (_, index) => (
                      <input
                        key={index}
                        autoFocus={
                          index === 0
                        }
                        type="text"
                        maxLength={1}
                        value={
                          otp[index] || ""
                        }
                        onChange={(e) => {
                          const newOtp =
                            otp.split("");

                          newOtp[index] =
                            e.target.value;

                          setOtp(
                            newOtp.join("")
                          );

                          if (
                            e.target
                              .nextSibling &&
                            e.target.value
                          ) {
                            e.target.nextSibling.focus();
                          }
                        }}
                        className="w-[58px]
                        h-[58px]
                        sm:w-[65px]
                        sm:h-[65px]
                        rounded-2xl
                        border border-[#E8D7AE]
                        bg-white
                        text-center text-xl
                        outline-none
                        focus:border-[#c8a24b]
                        transition"
                      />
                    )
                  )}

                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-7">

                  <button
                    onClick={sendOtp}
                    disabled={timer > 0}
                    className={`flex-1 h-12
                    rounded-2xl
                    border text-[13px]
                    flex items-center
                    justify-center gap-2
                    transition
                    ${
                      timer > 0
                        ? "bg-[#f5f2f2] text-gray-400 border-[#eee]"
                        : "bg-white text-[#2a1a1a] border-[#eadede]"
                    }`}
                  >
                    <RotateCcw size={15} />

                    {timer > 0
                      ? `${timer}s`
                      : "Resend"}
                  </button>

                  <button
                    onClick={verifyOtp}
                    className="flex-1 h-12
                    rounded-2xl
                    bg-[#C9A14A]
                    text-white
                    text-[14px]
                    font-medium
                    hover:bg-[#B58B2F]
                    transition"
                  >
                    Continue
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
export default Login;