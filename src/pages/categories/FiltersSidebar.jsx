import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";

import { useState } from "react";
export default function FilterSidebar({
  filters,
  setFilters,
}) {
  // DROPDOWN STATES
  const [openSection, setOpenSection] = useState({
    category: true,
    collections:false,
    price: false,
    material: false,
    occasion: false,
    rating: false,
  });

  const toggleSection = (key) => {
    setOpenSection((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <aside
      className="w-full 
      bg-[#fffdf8]
      rounded-[28px]
      border border-[#ead7ad]
      p-4 h-fit sticky top-24
      shadow-[0_10px_35px_rgba(212,175,55,0.12)]
      "
    >
      {/* HEADER */}
     <div className="flex items-start justify-between mb-5">
  <div>
    <h2 className="text-[25px] font-semibold text-[#8b6b1d]">
      Filters
    </h2>

    {/* RESET BUTTON */}
   <button
  onClick={() =>
    setFilters({
      collections:"",
      price: 50000,
      material: "",
      occasion: "",
      rating: 0,
    })
  }
  className="mt-2 text-[12px]
      text-[#b8860b]
      hover:text-[#9c7200]
      transition font-medium"
    >
    <u> Reset All</u> 
    </button>
  </div>

  <div
    className="w-9 h-9 rounded-xl
    bg-[#f9f1df]
    border border-[#ecd8a5]
    flex items-center justify-center"
  >
    <SlidersHorizontal
      size={17}
      className="text-[#b8860b]"
    />
  </div>
</div>


      {/* PRICE */}
      <div className="border-b border-[#f1e4c6] pb-5 mb-5">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-semibold text-[#5f4712]">
            Price Range
          </h3>

          {openSection.price ? (
            <ChevronUp
              size={18}
              className="text-[#b8860b]"
            />
          ) : (
            <ChevronDown
              size={18}
              className="text-[#b8860b]"
            />
          )}
        </button>

        {openSection.price && (
          <div className="mt-5">
         <input
  type="range"
  min="1000"
  max="50000"
  value={filters.price}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      price: Number(e.target.value),
    }))
  }
  className="w-full accent-[#c89b2c]"
/>

            <div
              className="flex justify-between mt-3
              text-[13px] text-[#9b8251]"
            >
              <span>₹1k</span>
              <span>₹50k</span>
            </div>
          </div>
        )}
      </div>

{/* COLLECTIONS */}
<div className="border-b border-[#f1e4c6] pb-5 mb-5">
  <button
    onClick={() => toggleSection("collections")}
    className="w-full flex items-center justify-between"
  >
    <h3 className="font-semibold text-[#5f4712]">
      Collections 
    </h3>

    {openSection.collections ? (
      <ChevronUp
        size={18}
        className="text-[#b8860b]"
      />
    ) : (
      <ChevronDown
        size={18}
        className="text-[#b8860b]"
      />
    )}
  </button>

  {openSection.collections && (
    <div className="flex flex-wrap gap-2 mt-4">

      {[
        "Mens",
        "Womens",
        "Kids"
      ].map((item, i) => (

        <button
          key={i}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              collections:
                prev.collections === item
                  ? ""
                  : item,
            }))
          }

          className={`px-4 py-2 rounded-full
          border text-[12px]
          transition

          ${
            filters.collections === item
              ? "bg-[#c89b2c] text-white border-[#c89b2c]"
              : "bg-[#fdf5e6] border-[#ecd8a5] text-[#a17408]"
          }`}
        >
          {item}
        </button>

      ))}

    </div>
  )}
</div>

      {/* MATERIAL */}
      <div className="border-b border-[#f1e4c6] pb-5 mb-5">
        <button
          onClick={() => toggleSection("material")}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-semibold text-[#5f4712]">
            Material
          </h3>

          {openSection.material ? (
            <ChevronUp
              size={18}
              className="text-[#b8860b]"
            />
          ) : (
            <ChevronDown
              size={18}
              className="text-[#b8860b]"
            />
          )}
        </button>

        {openSection.material && (
          <div className="flex flex-wrap gap-2 mt-4">
           
    {[
"Kundan",
"Alloy & Stone",
"Pearl",
].map((item,i)=>(

<button
key={i}

onClick={()=>
setFilters(prev=>({

...prev,

material:
prev.material===item
?
""
:
item

}))
}

className={`

px-4
py-2
rounded-full
border
text-[12px]
transition

${
filters.material===item

?

"bg-[#c89b2c] text-white border-[#c89b2c]"

:

"bg-[#fffaf0] border-[#ead7ad] text-[#7a6229]"
}

`}
>

{item}

</button>

))}
          </div>
        )}
      </div>

      {/* OCCASION */}
      <div className="border-b border-[#f1e4c6] pb-5 mb-5">
        <button
          onClick={() => toggleSection("occasion")}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-semibold text-[#5f4712]">
            Occasion
          </h3>

          {openSection.occasion ? (
            <ChevronUp
              size={18}
              className="text-[#b8860b]"
            />
          ) : (
            <ChevronDown
              size={18}
              className="text-[#b8860b]"
            />
          )}
        </button>

        {openSection.occasion && (
          <div className="flex flex-wrap gap-2 mt-4">
          {[
  "Wedding",
  "Bridal",
  "Party Wear",
].map((item, i) => (

  <button
    key={i}

    onClick={() =>
      setFilters((prev) => ({
        ...prev,

        occasion:
          prev.occasion === item
            ? ""
            : item,
      }))
    }

    className={`px-4 py-2 rounded-full
    border text-[12px]
    transition

    ${
      filters.occasion === item

        ? "bg-[#c89b2c] text-white border-[#c89b2c]"

        : "bg-[#fdf5e6] border-[#ecd8a5] text-[#a17408]"
    }`}
  >
    {item}
  </button>

))}
          </div>
        )}
      </div>

      {/* RATING */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection("rating")}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-semibold text-[#5f4712]">
            Ratings
          </h3>

          {openSection.rating ? (
            <ChevronUp
              size={18}
              className="text-[#b8860b]"
            />
          ) : (
            <ChevronDown
              size={18}
              className="text-[#b8860b]"
            />
          )}
        </button>

        {openSection.rating && (
          <div className="space-y-3 mt-4">
            {[4, 3].map((rating, i) => (
              <label
                key={i}
                className="flex items-center gap-3 cursor-pointer"
              >
             <input
  type="radio"
  name="rating"
  checked={filters.rating === rating}
  onChange={() =>
    setFilters((prev) => ({
      ...prev,
      rating,
    }))
  }
                  className="accent-[#c89b2c]"
                />

                <div className="flex gap-1">
                  {Array(rating)
                    .fill()
                    .map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className="fill-[#d4af37] text-[#d4af37]"
                      />
                    ))}
                </div>

                <span className="text-[13px] text-[#7b6540]">
                  & above
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

    
    </aside>
  );
}