export default function GoldCalculator({
  cityRates,
  weight,
  setWeight,
  purity,
  setPurity,
  selectedCity,
  setSelectedCity,
  total,
}) {
  return (
    <section className="mt-14">

      <div className="bg-white rounded-2xl shadow-sm border border-[#ece5d8] p-5 sm:p-6 lg:p-8">

        <div className="mb-8">

<h2 className="text-2xl sm:text-3xl font-bold text-[#2d2d2d]">
            Gold Price Calculator
          </h2>

<p className="text-sm sm:text-base text-gray-500 mt-2">
            Calculate today's estimated gold value instantly.
          </p>

        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

          {/* Weight */}

          <div>

            <label className="block text-sm sm:text-base font-semibold mb-2">
              Weight (grams)
            </label>

            <input
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
               py-3 text-sm sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-[#bf6f32]
              "
            />

          </div>

          {/* Purity */}

          <div>

            <label className="block text-sm sm:text-base font-semibold mb-2">
              Gold Purity
            </label>

            <select
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
               py-3 text-sm sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-[#bf6f32]
              "
            >

              <option value="24k">24K</option>

              <option value="22k">22K</option>

              <option value="18k">18K</option>

            </select>

          </div>

          {/* City */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Select City
            </label>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-[#bf6f32]
              "
            >

              {cityRates.map((city) => (

                <option
                  key={city.id}
                  value={city.city}
                >
                  {city.city}
                </option>

              ))}

            </select>

          </div>

        </div>
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-8 mb-6">

    <div>

      

        <p className="text-gray-500">

            Based on today's rates

        </p>

    </div>

    <span className="self-start sm:self-auto px-4 py-2 text-sm rounded-full bg-[#fff7ea] text-[#bf6f32] font-semibold">

        {selectedCity}

    </span>

</div>

        {/* Result */}
<div className="mt-8 rounded-2xl bg-gradient-to-r from-[#bf6f32] to-[#d39a4d] text-white p-5 sm:p-6 lg:p-8">

    <p className="uppercase text-sm tracking-widest opacity-80">

        Estimated Value

    </p>

<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 break-all">

        ₹{total.toLocaleString("en-IN")}

    </h1>

<div className="flex flex-wrap gap-2 sm:gap-3 mt-5 sm:mt-6">

        <span className="bg-white/20 px-3 sm:px-4 py-2 rounded-full text-sm">

            {weight} gm

        </span>

        <span className="bg-white/20 px-3 sm:px-4 py-2 rounded-full text-sm">

            {purity.toUpperCase()}

        </span>

        <span className="bg-white/20 px-3 sm:px-4 py-2 rounded-full text-sm">

            {selectedCity}

        </span>

    </div>

</div>

      </div>

    </section>
  );
}