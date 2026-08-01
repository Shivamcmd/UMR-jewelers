import { useState } from "react";
import {  useEffect } from "react";
import { Gem, ShieldCheck, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const schemes = [
  {
    id: 1,
    name: "Classic Gold",
    amount: 1000,
    duration: "11 Months",
    desc: "Perfect for starting your jewellery savings.",
  },
  {
    id: 2,
    name: "Premium Gold",
    amount: 2000,
    duration: "11 Months",
    desc: "Most popular plan with better monthly savings.",
    popular: true,
  },
  {
    id: 3,
    name: "Elite Gold",
    amount: 5000,
    duration: "11 Months",
    desc: "Ideal for premium jewellery purchases.",
  },
];


export default function Schemes() {

const [selectedScheme, setSelectedScheme] = useState(null);
const [showModal, setShowModal] = useState(false);
const [user, setUser] = useState(null);
const [activeScheme, setActiveScheme] = useState(null);

const navigate = useNavigate();

useEffect(() => {
  const fetchUser = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) return;

    const res = await fetch(
      `https://umr-jewelers.onrender.com/users/${storedUser.id}`
    );

    const data = await res.json();

    setUser(data);
    setActiveScheme(data.activeScheme);
  };

  fetchUser();
}, []);

const handleSchemePayment = () => {
  console.log("Razorpay =", window.Razorpay);

if (!window.Razorpay) {
  toast.error("Razorpay SDK not loaded");
  return;
}
  if (!user) {
    toast.error("Please login first");
    return;
  }

  if (user.activeScheme) {
  toast.error("You already have an active Gold Scheme");
  return;
}

  const schemeOrder = {
    id: Date.now(),
    type: "scheme",
    schemeName: selectedScheme.name,
    monthlyAmount: selectedScheme.amount,
    duration: 11,
    installment: 1,
    paymentMethod: "razorpay",
    paymentStatus: "Paid",
    status: "Active",
    orderDate: new Date().toLocaleString(),
  };

  const options = {
    key: "rzp_test_SOgxbb6htrGWrX",
    amount: selectedScheme.amount * 100,
    currency: "INR",
    name: "UMR Jewellers",
    description: selectedScheme.name,

 handler: async function (response) {
  try {
    const res = await fetch(
      `https://umr-jewelers.onrender.com/users/${user.id}`
    );
    const userData = await res.json();

    const updatedScheme = {
      ...userData.activeScheme,
      installmentsPaid: userData.activeScheme.installmentsPaid + 1,
      installments: [
        ...userData.activeScheme.installments,
        {
          month: userData.activeScheme.installmentsPaid + 1,
          amount: userData.activeScheme.monthlyAmount,
          paymentId: response.razorpay_payment_id,
          date: new Date().toLocaleString(),
        },
      ],
    };

    // ONE PATCH only — this is the one that should persist
    await fetch(
      `https://umr-jewelers.onrender.com/users/${user.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeScheme: updatedScheme }),
      }
    );

    setActiveScheme(updatedScheme);
    setUser({ ...userData, activeScheme: updatedScheme });

    localStorage.setItem(
      "user",
      JSON.stringify({ ...userData, activeScheme: updatedScheme })
    );

    toast.success("Installment Paid Successfully 🎉");
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
},

    theme: {
      color: "#c8a24b",
    },
  };

  const razor = new window.Razorpay(options);

  razor.on("payment.failed", () => {
    toast.error("Payment Failed");
  });

  razor.open();
};

const handleInstallmentPayment = () => {
  if (!window.Razorpay) {
    toast.error("Razorpay SDK not loaded");
    return;
  }

  if (!activeScheme) {
    toast.error("No active scheme found");
    return;
  }

  const options = {
    key: "rzp_test_SOgxbb6htrGWrX",
    amount: activeScheme.monthlyAmount * 100,
    currency: "INR",
    name: "UMR Jewellers",
    description: `${activeScheme.schemeName} Installment`,

    handler: async function (response) {
      try {
        const res = await fetch(
  `https://umr-jewelers.onrender.com/users/${user.id}`
);

const userData = await res.json();

const updatedScheme = {
  ...userData.activeScheme,

  installmentsPaid:
    userData.activeScheme.installmentsPaid + 1,

  installments: [
    ...userData.activeScheme.installments,

    {
      month:
        userData.activeScheme.installmentsPaid + 1,

      amount: userData.activeScheme.monthlyAmount,

      paymentId: response.razorpay_payment_id,

      date: new Date().toLocaleString(),
    },
  ],
};
await fetch(
  `https://umr-jewelers.onrender.com/users/${user.id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activeScheme: updatedScheme,
    }),
  }
);

const patchRes = await fetch(
  `https://umr-jewelers.onrender.com/users/${user.id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activeScheme,
    }),
  }
);

console.log("PATCH STATUS:", patchRes.status);

const patchData = await patchRes.json();
console.log("PATCH RESPONSE:", patchData);

setActiveScheme(updatedScheme);

setUser({
  ...userData,
  activeScheme: updatedScheme,
});

localStorage.setItem(
  "user",
  JSON.stringify({
    ...userData,
    activeScheme: updatedScheme,
  })
);

toast.success("Installment Paid Successfully 🎉");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    },

    theme: {
      color: "#c8a24b",
    },
  };

  const razor = new window.Razorpay(options);

  razor.on("payment.failed", () => {
    toast.error("Payment Failed");
  });

  razor.open();
};
  return (
    <main className="bg-[#fbfaf8] min-h-screen">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7edd6] text-[#b8901f] font-medium">
          <Gem size={18} />
          UMR Gold Saving Scheme
        </div>

        <h1 className="mt-6 text-5xl font-semibold text-[#40372f]">
          Save Today. <br />
          Shine Tomorrow.
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-[#6f6559] text-lg">
          Start your jewellery savings from just ₹1000/month and
          enjoy a smarter way to buy your dream jewellery.
        </p>

      </section>

      {/* Plans */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

     


  <h2 className="text-3xl font-semibold text-center text-[#40372f] mb-12">
    Choose Your Scheme
  </h2>

  <div className="grid md:grid-cols-3 gap-8">
    {schemes.map((scheme) => {
      const isActive =
        activeScheme?.schemeName === scheme.name;

      return (
        // Card
        <div
  key={scheme.id}
  className={`
    rounded-3xl
    bg-white
    border
    p-8
    shadow-sm
    hover:shadow-xl
    transition
    ${
      isActive
        ? "border-green-500 ring-2 ring-green-200"
        : scheme.popular
        ? "border-[#c9a234] scale-105"
        : "border-[#ece5d8]"
    }
  `}
>
  {scheme.popular && !isActive && (
    <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#c9a234] text-white text-xs">
      MOST POPULAR
    </span>
  )}

  {isActive && (
    <span className="inline-block mb-4 px-3 py-1 rounded-full bg-green-600 text-white text-xs">
      ACTIVE
    </span>
  )}

  <h3 className="text-2xl font-semibold text-[#40372f]">
    {scheme.name}
  </h3>

  <div className="mt-5">
    <span className="text-4xl font-bold text-[#b8901f]">
      ₹{scheme.amount}
    </span>

    <span className="text-[#7d7468]">/month</span>
  </div>

  <p className="mt-2 text-[#7d7468]">
    {scheme.duration}
  </p>

  <p className="mt-6 text-[#6d6459]">
    {scheme.desc}
  </p>

  {isActive && (
    <>
      <div className="mt-6">
        <p>
          Status :
          <span className="text-green-600 font-semibold">
            {" "}
            {activeScheme.status}
          </span>
        </p>

        <p className="mt-2">
          Installments :
          <strong>
            {" "}
            {activeScheme.installmentsPaid}/11
          </strong>
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div
            className="bg-[#c9a234] h-3 rounded-full"
            style={{
              width: `${(activeScheme.installmentsPaid / 11) * 100}%`,
            }}
          />
        </div>
      </div>
    </>
  )}

  <div className="mt-8 space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <ShieldCheck size={16} className="text-[#b8901f]" />
      Secure Payments
    </div>

    <div className="flex items-center gap-2 text-sm">
      <ShieldCheck size={16} className="text-[#b8901f]" />
      Easy Redemption
    </div>

    <div className="flex items-center gap-2 text-sm">
      <ShieldCheck size={16} className="text-[#b8901f]" />
      Trusted Jewellery
    </div>
  </div>

  <button
    onClick={() => {
      if (isActive) {
        handleInstallmentPayment();
        return;
      }

      if (activeScheme) {
        toast.error("Complete your current scheme first");
        return;
      }

      setSelectedScheme(scheme);
      setShowModal(true);
    }}
    className={`mt-8 w-full h-12 rounded-xl text-white font-medium ${
      isActive ? "bg-green-600" : "bg-[#c9a234]"
    }`}
  >
    {isActive ? "Pay Next Installment" : "Join Scheme"}
  </button>
</div>
      );
    })}
  </div>


      </section>
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-8 w-[90%] max-w-md">

      <h2 className="text-2xl font-semibold text-[#40372f]">
        Join {selectedScheme?.name}
      </h2>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">
          <span>Monthly Amount</span>
          <span className="font-semibold">
            ₹{selectedScheme?.amount}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Duration</span>
          <span>{selectedScheme?.duration}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Savings</span>
          <span className="font-semibold text-[#c9a234]">
            ₹{selectedScheme?.amount * 11}
          </span>
        </div>

      </div>

      <div className="flex gap-3 mt-8">

        <button
          onClick={() => setShowModal(false)}
          className="flex-1 border rounded-xl h-11"
        >
          Cancel
        </button>

        <button
          onClick={handleSchemePayment}
          className="flex-1 bg-[#c9a234] text-white rounded-xl h-11"
        >
          Continue
        </button>

      </div>

    </div>

  </div>
)}
    </main>
  );
}