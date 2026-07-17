import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function MetalCards({ metalPrice }) {
  if (!metalPrice) return null;

const cards = [
  {
    title: "24K Gold",
    value: metalPrice.gold?.["24k"],
    change: "+₹25",
    positive: true,
    image: "/src/assets/24kgold.jpg",
    color: "text-[#bf6f32]",
    bg: "bg-[#fff8ef]",
    border: "border-[#ecd8b0]",
  },
  {
    title: "22K Gold",
    value: metalPrice.gold?.["22k"],
    change: "+₹18",
    positive: true,
    image: "/src/assets/24kgold.jpg",
    color: "text-[#bf6f32]",
    bg: "bg-[#fff8ef]",
    border: "border-[#ecd8b0]",
  },
  {
    title: "18K Gold",
    value: metalPrice.gold?.["18k"],
    change: "+₹12",
    positive: true,
    image: "/src/assets/24kgold.jpg",
    color: "text-[#bf6f32]",
    bg: "bg-[#fff8ef]",
    border: "border-[#ecd8b0]",
  },
  {
    title: "Silver",
    value: metalPrice.silver,
    change: "-₹1",
    positive: false,
    image: "/src/assets/silver.jpg",
    color: "text-gray-700",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
         className={`
${card.bg}
${card.border}
rounded-2xl sm:rounded-3xl
border
p-4 sm:p-5 lg:p-6
shadow-sm
hover:shadow-xl
hover:-translate-y-2
transition-all
duration-300
`}
        >
          

<div className="flex justify-between items-start">

    <div className="flex items-center gap-3">

        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100">
  <img
    src={card.image}
    alt={card.title}
    className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
  />
</div>

        <div>
            <p className="text-sm sm:text-base text-gray-500">
                {card.title}
            </p>

            <span className="text-[11px] sm:text-xs text-gray-400">
                Price per gram
            </span>
        </div>

    </div>

    <div className="px-2.5 sm:px-3 py-1 rounded-full bg-green-100">
        <span className="text-[10px] sm:text-xs font-semibold text-green-700">
            LIVE
        </span>
    </div>

</div>

<div className="mt-5">
  <h3 className={`text-2xl sm:text-3xl font-bold ${card.color}`}>
    ₹
    {card.value
      ? Number(card.value).toLocaleString("en-IN")
      : "--"}
  </h3>

  <p className="text-xs sm:text-sm text-gray-500 mt-1">
    Per Gram
  </p>
</div>

<div className="mt-5 flex items-center justify-between gap-2">

    <div
        className={`flex items-center gap-1 font-semibold ${
            card.positive ? "text-green-600" : "text-red-500"
        }`}
    >
        {card.positive ? (
            <ArrowUpRight size={18} />
        ) : (
            <ArrowDownRight size={18} />
        )}

        {card.change}
    </div>

    <span className="text-xs text-gray-500">
        Updated Today
    </span>

</div>

        </div>
      ))}

    </div>
  );
}