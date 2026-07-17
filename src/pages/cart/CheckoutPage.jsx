import {
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  Pencil,
  Trash2,
  Plus,

} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import toast from "react-hot-toast";

// import Nav from "../../components/Nav";

import {
  useCart,
} from "../../context/CartContext";

export default function CheckoutPage() {

  const navigate =
    useNavigate();

  const {
    cartItems,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
  useState("razorpay");

  const [placingOrder, setPlacingOrder] =
  useState(false);
  
  const [addresses, setAddresses] =
  useState([]);

const [selectedAddress, setSelectedAddress] =
  useState(null);

const [showForm, setShowForm] =
  useState(false);

const [editId, setEditId] =
  useState(null);

const [form, setForm] =
  useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

const user =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  ) || {};

useEffect(() => {

  const fetchAddresses =
    async () => {

      try {

        const res =
          await fetch(
            `https://umr-jewelers.onrender.com/users/${user?.id}`
          );

        const data =
          await res.json();

        setAddresses(
          data.savedAddresses || []
        );

        if (
          data.savedAddresses?.length > 0
        ) {

          setSelectedAddress(
            data.savedAddresses[0].id
          );
        }

      } catch (err) {

        console.log(err);

        toast.error(
          "Failed to fetch addresses"
        );
      }
    };

  if (!user?.id) return;

  fetchAddresses();

}, [user?.id]);

const handleSaveAddress =
  async () => {

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {

      toast.error(
        "Please fill all details"
      );

      return;
    }

if (!/^[A-Za-z\s]+$/.test(form.name)) {

  toast.error(
    "Name should contain only letters"
  );

  return;
}

if (!/^\d{10}$/.test(form.phone)) {

  toast.error(
    "Phone number must be 10 digits"
  );

  return;
}

if (!/^[A-Za-z\s]+$/.test(form.city)) {

  toast.error(
    "City should contain only letters"
  );

  return;
}

if (!/^\d{6}$/.test(form.pincode)) {

  toast.error(
    "Pincode must be 6 digits"
  );

  return;
}

    try {

      const res =
        await fetch(
          `https://umr-jewelers.onrender.com/users/${user?.id}`
        );

      const userData =
        await res.json();

      let updatedAddresses =
        [];

      if (editId) {

  updatedAddresses =
  (userData.savedAddresses || []).map(
    (a) =>
      a.id === editId
        ? {
            ...a,
            ...form,
          }
        : a
  );

        toast.success(
          "Address updated ✨"
        );

      } else {

        const newAddress = {
          id: Date.now(),
          ...form,
        };

        updatedAddresses = [
          ...(
            userData.savedAddresses ||
            []
          ),
          newAddress,
        ];

        setSelectedAddress(
          newAddress.id
        );

        toast.success(
          "Address added ✨"
        );
      }

    const patchRes = await fetch(
  `https://umr-jewelers.onrender.com/users/${user.id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      savedAddresses: updatedAddresses,
    }),
  }
);

console.log("PATCH STATUS:", patchRes.status);

const patchData = await patchRes.json();
console.log("PATCH RESPONSE:", patchData);;

      setAddresses(
        updatedAddresses
      );

      setShowForm(false);

      setEditId(null);

      setForm({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
      });

    } catch (err) {

      console.log(err);

      toast.error(
        "Something went wrong"
      );
    }
};

const handleDeleteAddress =
  async (id) => {

    try {

      const updated =
        addresses.filter(
          (a) => a.id !== id
        );

      await fetch(
        `https://umr-jewelers.onrender.com/users/${user.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            savedAddresses:
              updated,
          }),
        }
      );

      setAddresses(updated);

      toast.success(
        "Address removed"
      );

      if (
        selectedAddress === id
      ) {

        setSelectedAddress(
          updated[0]?.id ||
            null
        );
      }

    }
   catch (err) {

  console.log(err);

  toast.error(
    "Failed to remove address"
  );
}
};

const handleEditAddress =
  (addr) => {

    setForm(addr);

    setEditId(addr.id);

    setShowForm(true);
};

const handleOrder = async () => {

  if (placingOrder) return;

  setPlacingOrder(true);

  if (!selectedAddress) {

    toast.error(
      "Select delivery Address"
    );

    setPlacingOrder(false);

    return;
  }

  const selectedAddr =
    addresses.find(
      (a) =>
        a.id === selectedAddress
    );

  const orderData = {

    id: Date.now(),

    items: cartItems,

    total: totalPrice,

    totalItems,

    paymentMethod,

    paymentStatus:
      paymentMethod === "cod"
        ? "Pending"
        : "Paid",

    orderDate:
      new Date().toLocaleString(),

    expectedDelivery:
      new Date(
        Date.now() +
        5 * 24 * 60 * 60 * 1000
      ).toLocaleString(),

    receiverDetails:
      selectedAddr,
  };

  // COD

 if (paymentMethod === "cod") {

  try {

    const res = await fetch(
      `https://umr-jewelers.onrender.com/users/${user.id}`
    );

    const userData = await res.json();

    const updatedOrders = [
      ...(userData.orders || []),
      orderData,
    ];

    await fetch(
      `https://umr-jewelers.onrender.com/users/${user.id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          orders: updatedOrders,
        }),
      }
    );



localStorage.setItem(
  "reviewOrder",
  JSON.stringify(orderData)
);

clearCart();

navigate("/orders", {
  state: {
    successMessage:
      "Order placed successfully 🎉",
  },
});

  } catch (err) {

    console.log(err);

    toast.error("Order failed");

  } 
 finally {

  setPlacingOrder(false);
}

  return;
}

  // RAZORPAY

  const options = {

    key: "rzp_test_SOgxbb6htrGWrX",

    amount:
      totalPrice * 100,

    currency: "INR",

    name: "UMR Jewellers",

    description:
      "Luxury Jewellery Order",

    handler: async function (
      response
    ) {

      try {

        const res =
          await fetch(
            `https://umr-jewelers.onrender.com/users/${user.id}`
          );

        const userData =
          await res.json();

        const updatedOrders = [
          ...(userData.orders || []),

          {
            ...orderData,

            razorpayPaymentId:
              response.razorpay_payment_id,
          },
        ];

        await fetch(
          `https://umr-jewelers.onrender.com/users/${user.id}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              orders:
                updatedOrders,
            }),
          }
        );



localStorage.setItem(
  "reviewOrder",
  JSON.stringify({
    ...orderData,
    razorpayPaymentId:
      response.razorpay_payment_id,
  })
);

clearCart();

navigate("/orders", {
  state: {
    successMessage:
      "Payment Successful 🎉",
  }
});
setPlacingOrder(false);

      } catch (err) {

        console.log(err);

        toast.error(
          "Something went wrong"
        );

        setPlacingOrder(false);
      }
    },

    theme: {
      color: "#c8a24b",
    },
  };

  const razor =
  new window.Razorpay(
    options
  );

  razor.on(
  "payment.failed",
  () => {

    toast.error(
      "Payment failed"
    );

    setPlacingOrder(false);
  }
);
try {

  razor.open();

} catch (err) {

  toast.error(
    "Razorpay failed to load"
  );

  setPlacingOrder(false);
}
};

  return (
    <>
      {/* <Nav /> */}

      <div
     className="min-h-screen
bg-[#faf8f7]
px-3 sm:px-4
py-4 sm:py-8"
      >

        <div
        className="max-w-[1400px]
mx-auto
grid
grid-cols-1
lg:grid-cols-[1fr_420px]
gap-5 lg:gap-8"
        >

          {/* LEFT */}

          <div
            className="bg-gradient-to-b
from-white
to-[#fff8f2]
border border-[#f3e5d4]
rounded-[24px] md:rounded-[36px]
p-4 sm:p-6 md:p-8"
          >

            {/* TITLE */}

            <div
              className="flex
items-center
gap-3
mb-6"
            >

              <div
                className="w-12 h-12
rounded-2xl
bg-gradient-to-br
from-[#c8a24b]
to-[#d4b044]
text-white
shadow-md
 flex items-center
justify-center"
              >
                <MapPin size={22} />
              </div>

              <div>

                <h1
                className="text-2xl
sm:text-3xl
md:text-4xl
font-bold
text-[#2a1a1a]"
                >
                  Checkout
                </h1>

                <p
                  className="text-[#7d6d6d]
                  mt-1"
                >
                  Complete your luxury order
                </p>

              </div>

            </div>

            {/* FORM */}

            {/* ADDRESS HEADER */}

<div
 className="flex
flex-col sm:flex-row
items-start sm:items-center
justify-between
gap-4
mb-6"
>

  <h2
    className="text-2xl
    font-semibold"
  >
    Delivery Address
  </h2>

  <button
    onClick={() => {

  if (!user?.id) {
    toast.error("Please login first");
    return;
  }

  setEditId(null);

  setForm({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  setShowForm(true);
}}
    className="
w-full sm:w-auto
h-11 px-5
rounded-2xl
bg-gradient-to-r
from-[#c8a24b]
to-[#d4b044]
text-white
flex items-center
gap-2
hover:scale-[1.03]
transition"
  >
    <Plus size={18} />

    Add Address
  </button>

</div>

{/* ADDRESS LIST */}

<div
  className="space-y-5"
>

{
  addresses.length === 0 && (

    <div
      className="text-center
      py-10 text-[#7d6d6d]"
    >
      No saved addresses yet
    </div>

  )
}
  {addresses.map((addr) => (

    <div
      key={addr.id}
      className={`rounded-[30px]
      border p-6
      transition
      ${
       selectedAddress === addr.id
? "border-[#d4b044] bg-[#fffaf2]"
          : "border-[#f1e4d8] bg-white"
      }`}
    >

      <div
       className="flex
flex-col sm:flex-row
justify-between
gap-5"
      >

        <div
          className="flex gap-4"
        >

          <button
            onClick={() =>
              setSelectedAddress(
                addr.id
              )
            }
            className={`mt-1
            w-6 h-6
            rounded-full
            border-2
            flex items-center
            justify-center
            ${
              selectedAddress ===
              addr.id
                ? "border-[#d4b044]"
                : "border-gray-300"
            }`}
          >

            {selectedAddress ===
              addr.id && (

              <div
                className="w-3 h-3
                rounded-full
                bg-[#d4b044]"
              />

            )}

          </button>

          <div>

            <div
              className="flex
              items-center gap-2"
            >

              <h3
                className="text-lg
                font-semibold"
              >
                {addr.name}
              </h3>

              {selectedAddress ===
                addr.id && (

                <span
                  className="text-xs
                  px-2 py-1
                  rounded-full
                  bg-[#d4b044]
                  text-white"
                >
                  Selected
                </span>

              )}

            </div>

            <p
              className="mt-2
              text-[#7d6d6d]"
            >
              {addr.address}
            </p>

            <p
              className="text-[#7d6d6d]"
            >
              {addr.city} -
              {" "}
              {addr.pincode}
            </p>

            <p
              className="mt-2
              font-medium"
            >
              +91 {addr.phone}
            </p>

          </div>

        </div>

        {/* ACTIONS */}

        <div
        className="flex
justify-end sm:justify-start
gap-3"
        >

          <button
            onClick={() =>
              handleEditAddress(
                addr
              )
            }
            className="w-10 h-10
            rounded-2xl
            bg-[#fff4ea]
            text-[#d4b044]
            flex items-center
            justify-center"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() =>
              handleDeleteAddress(
                addr.id
              )
            }
            className="w-10 h-10
            rounded-2xl
            bg-[#fff1f1]
            text-[#d4b044]
            flex items-center
            justify-center"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

    </div>
  ))}

</div>

{/* ADDRESS FORM */}

{showForm && (

  <div
    className="mt-8
    border border-[#f1e4d8]
    rounded-[32px]
    p-6 bg-white"
  >

    <h3
      className="text-2xl
      font-semibold
      mb-6"
    >

      {editId
        ? "Edit Address"
        : "Add New Address"}

    </h3>

    <div
     className="grid
grid-cols-1
md:grid-cols-2
gap-4"
    >

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
       onChange={(e) =>
  setForm({
    ...form,
    name: e.target.value.replace(
      /[^A-Za-z\s]/g,
      ""
    ),
  })
}
        className="h-14
        px-5 rounded-2xl
        border border-[#eaded1]
        outline-none"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={form.phone}
       onChange={(e) =>
  setForm({
    ...form,
    phone: e.target.value
      .replace(/\D/g, "")
      .slice(0, 10),
  })
}
        className="h-14
        px-5 rounded-2xl
        border border-[#eaded1]
        outline-none"
      />

      <textarea
        placeholder="Full Address"
        value={form.address}
        onChange={(e) =>
          setForm({
            ...form,
            address: e.target.value,
          })
        }
        className="md:col-span-2
        h-32 pt-4
        px-5 rounded-2xl
        border border-[#eaded1]
        outline-none"
      />

      <input
        type="text"
        placeholder="City"
        value={form.city}
       onChange={(e) =>
  setForm({
    ...form,
    city: e.target.value.replace(
      /[^A-Za-z\s]/g,
      ""
    ),
  })
}
        className="h-14
        px-5 rounded-2xl
        border border-[#eaded1]
        outline-none"
      />

      <input
        type="text"
        placeholder="Pincode"
        value={form.pincode}
       onChange={(e) =>
  setForm({
    ...form,
    pincode: e.target.value
      .replace(/\D/g, "")
      .slice(0, 6),
  })
}
        className="h-14
        px-5 rounded-2xl
        border border-[#eaded1]
        outline-none"
      />

    </div>

    <button
      onClick={
        handleSaveAddress
      }
      className="mt-6
      h-14 px-8
      rounded-2xl
      bg-gradient-to-r
     from-[#c8a24b]
to-[#d4b044]
      text-white
      font-medium"
    >

      {editId
        ? "Update Address"
        : "Save Address"}

    </button>

  </div>

)}

            {/* PAYMENT */}
<div className="mt-5 space-y-4">

  {/* RAZORPAY */}

  <div
    onClick={() =>
      setPaymentMethod("razorpay")
    }
    className={`bg-white
    border rounded-3xl
    p-5 flex
    items-center
    justify-between
    cursor-pointer
    ${
      paymentMethod === "razorpay"
        ? "border-[#c8a24b]"
        : "border-[#f1e4d8]"
    }`}
  >

    <div className="flex items-center gap-4">

      <div
        className="w-12 h-12
        rounded-2xl
        bg-[#fff4ea]
        text-[#c8a24a]
        flex items-center
        justify-center"
      >
        <CreditCard size={22} />
      </div>

      <div>

        <h3 className="font-semibold">
          Razorpay
        </h3>

        <p
          className="text-sm
          text-[#7d6d6d]"
        >
          Pay securely online
        </p>

      </div>

    </div>

    <input
      type="radio"
      checked={
        paymentMethod ===
        "razorpay"
      }
      readOnly
    />

  </div>

  {/* COD */}

  <div
    onClick={() =>
      setPaymentMethod("cod")
    }
    className={`bg-white
    border rounded-3xl
    p-5 flex
    items-center
    justify-between
    cursor-pointer
    ${
      paymentMethod === "cod"
        ? "border-[#c8a24b]"
        : "border-[#f1e4d8]"
    }`}
  >

    <div className="flex items-center gap-4">

      <div
        className="w-12 h-12
        rounded-2xl
        bg-[#fff4ea]
        text-[#c8a24b]
        flex items-center
        justify-center"
      >
        <Truck size={22} />
      </div>

      <div>

        <h3 className="font-semibold">
          Cash On Delivery
        </h3>

        <p
          className="text-sm
          text-[#7d6d6d]"
        >
          Pay after delivery
        </p>

      </div>

    </div>

    <input
      type="radio"
      checked={
        paymentMethod === "cod"
      }
      readOnly
    />

  </div>

</div>
          </div>

          {/* RIGHT */}
<div
className="
space-y-6
order-last

"
>

            {/* SUMMARY */}

            <div
              className="bg-gradient-to-b
              from-[#fffdf9]
              to-[#fff7f0]
             rounded-[24px] md:rounded-[36px]
              border border-[#f3e5d4]
             p-4 sm:p-6 md:p-8
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              lg:sticky lg:top-20"
            >

              <h2
                className="text-3xl
                font-semibold"
              >
                Order Summary
              </h2>

              {/* ITEMS */}

              <div
                className="mt-6
                space-y-5
                max-h-[320px]
                overflow-y-auto
                hide-scrollbar"
              >

{cartItems?.length === 0 && (

  <div
    className="text-center
    py-10 text-[#7d6d6d]"
  >
    No items in checkout
  </div>

)}
                {cartItems?.map(
                  (item) => (

                    <div
                      key={item.id}
                      className="flex
                      gap-4"
                    >

                      <div
                        className="w-20 h-20
                        rounded-2xl
                        bg-[#fffaf3]
                        border border-[#f3e5d4]
                        overflow-hidden"
                      >

                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                          className="w-full
                          h-full
                          object-contain"
                        />

                      </div>

                      <div
                        className="flex-1"
                      >

                        <h3
                          className="font-semibold
                          line-clamp-1"
                        >
                          {item.name}
                        </h3>

                        <p
                          className="text-sm
                          text-[#7d6d6d]
                          mt-1"
                        >
                          Qty:
                          {" "}
                          {item.qty}
                        </p>

                        <p
                          className="mt-2
                          font-semibold"
                        >
                          ₹
                          {item.price}
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* PRICE */}

              <div
                className="mt-8
                space-y-4"
              >

                <div
                  className="flex
                  justify-between"
                >
                  <span>
                    Total Items
                  </span>

                  <span>
                    {totalItems || 0}
                  </span>
                </div>

                <div
                  className="flex
                  justify-between"
                >
                  <span>
                    Delivery
                  </span>

                  <span
                    className="text-green-600"
                  >
                    Free
                  </span>
                </div>

                <div
                  className="border-t
                  border-[#eaded1]
                  pt-5 flex
                  justify-between
                  text-2xl font-bold"
                >

                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {totalPrice || 0}
                  </span>

                </div>

              </div>

              {/* SECURITY */}

              <div
                className="mt-8
                flex items-center
                gap-3
                text-sm
                text-[#7d6d6d]"
              >

                <ShieldCheck
                  size={18}
                  className="text-green-600"
                />

                100% Secure Checkout

              </div>

              <div
                className="mt-3
                flex items-center
                gap-3
                text-sm
                text-[#7d6d6d]"
              >

                <Truck
                  size={18}
                  className="text-[#7a1124]"
                />

                Free Delivery Across India

              </div>

              {/* BUTTON */}

              <button
                onClick={
                  handleOrder
                }
                disabled={
  placingOrder ||
  cartItems.length === 0
}
             className={`w-full
mt-8 h-14
rounded-2xl
bg-gradient-to-r
from-[#c8a24b]
to-[#d4b044]
hover:from-[#b88a1d]
hover:to-[#c89a2c]
text-white
text-lg
font-medium
transition duration-300
shadow-lg
${
  placingOrder ||
  cartItems.length === 0
    ? "opacity-60 cursor-not-allowed"
    : "hover:scale-[1.02]"
}`}
>
               
                  {
  placingOrder
    ? "Processing..."
    : "Place Order"
}
                
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}