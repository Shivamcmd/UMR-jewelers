import { useEffect, useState } from "react";

export default function CityRatesTable({
  cityRates,
  search,
  setSearch,
  selectedCity,
  setSelectedCity,
})


{

const [showAllCities, setShowAllCities] = useState(false);

const ITEMS_PER_PAGE = 10;
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  setCurrentPage(1);
}, [search]);

 const popularCities = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Noida",
  "Gurugram",
  "Faridabad",
  "Ghaziabad",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Surat",
  "Nagpur",
  "Patna",
  "Kanpur",
  "Varanasi",
  "Agra",
  "Meerut",
  "Ludhiana",
  "Amritsar",
  "Jodhpur",
  "Udaipur",
  "Kochi",
  "Visakhapatnam",
];

const displayedCities = showAllCities
  ? popularCities
  : popularCities.slice(0, 8);

  const totalPages = Math.ceil(cityRates.length / ITEMS_PER_PAGE);

const paginatedCities = cityRates.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

  return (
    <section className="mt-10 sm:mt-12 lg:mt-14">

{/* Popular Cities */}

<div className="mb-8">

  <p className="text-sm font-semibold text-gray-500 mb-3">
    Popular Cities
  </p>

<div className="flex gap-2 sm:gap-3 overflow-x-auto sm:flex-wrap pb-2 no-scrollbar">

    {displayedCities.map((city) => (

      <button
        key={city}
        onClick={() => {
          setSearch(city);
          setSelectedCity(city);
        }}
        className={`
          px-4 sm:px-5
py-2
text-xs sm:text-sm
whitespace-nowrap
flex-shrink-0
          rounded-full
          border
          font-medium
          transition-all
          duration-300

          ${
            selectedCity === city
              ? "bg-[#bf6f32] text-white border-[#bf6f32]"
              : "bg-white border-[#e5d7c0] text-gray-700 hover:border-[#bf6f32] hover:text-[#bf6f32]"
          }
        `}
      >

        {city}

      </button>

    ))}

  </div>
   <div className="mt-5">

    <button
      onClick={() => setShowAllCities(!showAllCities)}
      className="text-[#bf6f32] font-semibold hover:underline transition "
    >
      {showAllCities ? "Show Less ↑" : "View All Cities ↓"}
    </button>

  </div>

</div>

      {/* Heading */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

<h2 className="text-2xl sm:text-3xl font-bold text-[#2d2d2d]">
            Gold & Silver Rates by City
          </h2>

<p className="text-sm sm:text-base text-gray-500 mt-1">
            Search your city to view today's prices.
          </p>

        </div>

        <input
          type="text"
          placeholder="🔍 Search City..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        className="
w-full
md:w-80
px-4
py-3
text-sm sm:text-base
rounded-xl
border
border-gray-300
focus:outline-none
focus:ring-2
focus:ring-[#bf6f32]
"
        />

      </div>

<p className="text-xs sm:text-sm text-gray-500 mb-3">
  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -
  {Math.min(currentPage * ITEMS_PER_PAGE, cityRates.length)} of{" "}
  {cityRates.length} cities
</p>

      {/* Table */}

<div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-[#ece5d8] shadow-sm bg-white">

  <table className="min-w-[650px] w-full">

          <thead className="bg-[#bf6f32] text-white">

            <tr>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-left">
                City
              </th>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">
                24K
              </th>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">
                22K
              </th>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">
                18K
              </th>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">
                Silver
              </th>

            </tr>

          </thead>

          <tbody>

            {cityRates.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >

                  No city found.

                </td>

              </tr>

            ) : (

             paginatedCities.map((city) => (

              <tr
  key={city.id}
  onClick={() => {
    setSelectedCity(city.city);
    setSearch(city.city);
  }}
className={`
border-b
last:border-none
cursor-pointer
transition-all
duration-300

${
selectedCity===city.city
?
"bg-[#fff6ea]"
:
"hover:bg-[#faf8f5]"
}
`}
>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold whitespace-nowrap">

                    📍 {city.city}

                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">

                    ₹{city.gold24.toLocaleString("en-IN")}

                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">

                    ₹{city.gold22.toLocaleString("en-IN")}

                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">

                    ₹{city.gold18.toLocaleString("en-IN")}

                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">

                    ₹{city.silver}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

{totalPages > 1 && (
  <div className="flex justify-center items-center gap-1 sm:gap-2 py-6 flex-wrap">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className="w-8 h-8 sm:w-10 sm:h-10 text-sm rounded-xl border bg-white disabled:opacity-40"
    >
      ←
    </button>

    {Array.from({ length: totalPages }).map((_, index) => {
      const page = index + 1;

      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 rounded-xl transition font-semibold
          ${
            currentPage === page
              ? "bg-[#bf6f32] text-white"
              : "bg-white border hover:border-[#bf6f32]"
          }`}
        >
          {page}
        </button>
      );
    })}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      className="w-10 h-10 rounded-xl border bg-white disabled:opacity-40"
    >
      →
    </button>

  </div>
)}
    </section>
  );
}