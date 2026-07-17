import { useEffect, useMemo, useState } from "react";
import MetalCards from "../components/GoldRates/MetalCards";
import CityRatesTable from "../components/GoldRates/CityRatesTable";
import GoldCalculator from "../components/GoldRates/GoldCalculator";

export default function GoldRates() {

  const [metalPrice, setMetalPrice] = useState(null);
  const [cityRates, setCityRates] = useState([]);
  const [search, setSearch] = useState("");
  const [weight, setWeight] = useState(10);
  const [purity, setPurity] = useState("22k");
  const [selectedCity, setSelectedCity] = useState("Delhi");

  useEffect(() => {

    fetch("https://umr-jewelers.onrender.com/metalPrices")
  .then((res) => res.json())
  .then(setMetalPrice)
  .catch(console.error);

    fetch("https://umr-jewelers.onrender.com/cityRates")
      .then((res) => res.json())
      .then(setCityRates);

  }, []);

  const filteredCities = useMemo(() => {
    return cityRates.filter((city) =>
      city.city.toLowerCase().includes(search.toLowerCase())
    );
  }, [cityRates, search]);

  const cityData = cityRates.find(
    (c) => c.city === selectedCity
  );

  let rate = 0;

  if (cityData) {
    if (purity === "24k") rate = cityData.gold24;
    if (purity === "22k") rate = cityData.gold22;
    if (purity === "18k") rate = cityData.gold18;
  }

  const total = rate * weight;
if (!metalPrice) {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      Loading Gold Rates...
    </div>
  );
}

return (
  <div className="min-h-screen bg-[#faf8f5] py-10">

    <div className="max-w-7xl mx-auto px-4">

    

  {/* Hero */}

<div className="relative overflow-hidden rounded-[28px] border border-[#eadfce] bg-gradient-to-br from-white via-[#fffaf8] to-[#f8f4ee] shadow-sm mb-10">

  {/* Background Glow */}

  <div className="absolute -top-24 right-0 w-64 h-64 rounded-full bg-[#bf6f32]/10 blur-3xl"></div>

  <div className="absolute -bottom-24 -left-10 w-64 h-64 rounded-full bg-yellow-300/10 blur-3xl"></div>

  <div className="relative px-6 md:px-10 py-8">

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

      {/* Left */}

      <div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200">

          <span className="relative flex h-2.5 w-2.5">

            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-70"></span>

            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>

          </span>

          <span className="text-xs font-semibold tracking-wide text-green-700 uppercase">

            Live Market

          </span>

        </div>

        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-[#222]">

          Gold & Silver

          <span className="block text-[#bf6f32]">

            Market Prices

          </span>

        </h1>

        <p className="mt-3 text-gray-600 max-w-xl">

          Track today's 18K, 22K & 24K gold prices across major Indian cities
          and instantly calculate your estimated jewellery value.

        </p>

      </div>

      {/* Right */}

      <div className="grid grid-cols-2 gap-4 min-w-[280px]">

        <div className="bg-white rounded-2xl border border-[#ece5d8] p-4">

          <p className="text-xs uppercase tracking-wider text-gray-500">

            Updated

          </p>

          <h3 className="mt-2 font-bold text-[#222]">

            {metalPrice?.updatedAt}

          </h3>

        </div>

        <div className="bg-white rounded-2xl border border-[#ece5d8] p-4">

          <p className="text-xs uppercase tracking-wider text-gray-500">

            Coverage

          </p>

          <h3 className="mt-2 font-bold">

            India 🇮🇳

          </h3>

        </div>

        <div className="bg-white rounded-2xl border border-[#ece5d8] p-4">

          <p className="text-xs uppercase tracking-wider text-gray-500">

            Gold Types

          </p>

          <h3 className="mt-2 font-bold">

            18K • 22K • 24K

          </h3>

        </div>

        <div className="bg-white rounded-2xl border border-[#ece5d8] p-4">

          <p className="text-xs uppercase tracking-wider text-gray-500">

            Calculator

          </p>

          <h3 className="mt-2 font-bold text-[#bf6f32]">

            Live Estimate

          </h3>

        </div>

      </div>

    </div>

  </div>

</div>

      <MetalCards metalPrice={metalPrice} />

    <CityRatesTable
  cityRates={filteredCities}
  search={search}
  setSearch={setSearch}
  selectedCity={selectedCity}
  setSelectedCity={setSelectedCity}
/>

      <GoldCalculator
        cityRates={cityRates}
        weight={weight}
        setWeight={setWeight}
        purity={purity}
        setPurity={setPurity}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        total={total}
      />

    </div>

  </div>
);

}