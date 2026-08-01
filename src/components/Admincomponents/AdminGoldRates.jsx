import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save, Plus, Trash2, RefreshCw } from "lucide-react";

const API_BASE = "https://umr-jewelers.onrender.com";

export default function AdminGoldRates() {
  const [metalPrice, setMetalPrice] = useState(null);
  const [cityRates, setCityRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingMetal, setSavingMetal] = useState(false);
  const [savingCityId, setSavingCityId] = useState(null);

  const [newCity, setNewCity] = useState({
    city: "",
    gold24: "",
    gold22: "",
    gold18: "",
  });

  // ================= FETCH DATA =================
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [mpRes, crRes] = await Promise.all([
        fetch(`${API_BASE}/metalPrices`),
        fetch(`${API_BASE}/cityRates`),
      ]);

      const mpData = await mpRes.json();
      const crData = await crRes.json();

      setMetalPrice(mpData);
      setCityRates(crData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ================= METAL PRICE HANDLERS =================
  const handleMetalChange = (path, value) => {
    // path like "gold.24k" or "silver"
    setMetalPrice((prev) => {
      const updated = { ...prev };
      if (path.startsWith("gold.")) {
        const key = path.split(".")[1];
        updated.gold = { ...updated.gold, [key]: value };
      } else {
        updated[path] = value;
      }
      return updated;
    });
  };

  const saveMetalPrice = async () => {
    setSavingMetal(true);
    try {
      const payload = {
        ...metalPrice,
        updatedAt: new Date().toLocaleString(),
      };

      const res = await fetch(`${API_BASE}/metalPrices`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setMetalPrice(data);
      toast.success("Metal prices updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update metal prices");
    } finally {
      setSavingMetal(false);
    }
  };

  // ================= CITY RATES HANDLERS =================
  const handleCityFieldChange = (id, field, value) => {
    setCityRates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const saveCityRow = async (city) => {
    setSavingCityId(city.id);
    try {
      const res = await fetch(`${API_BASE}/cityRates/${city.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: city.city,
          gold24: Number(city.gold24),
          gold22: Number(city.gold22),
          gold18: Number(city.gold18),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success(`${city.city} rates updated`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update city rate");
    } finally {
      setSavingCityId(null);
    }
  };

  const deleteCityRow = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    try {
      const res = await fetch(`${API_BASE}/cityRates/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");

      setCityRates((prev) => prev.filter((c) => c.id !== id));
      toast.success(`${name} deleted`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete city");
    }
  };

  const addCityRow = async () => {
    if (!newCity.city.trim()) {
      toast.error("Enter a city name");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/cityRates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: newCity.city,
          gold24: Number(newCity.gold24) || 0,
          gold22: Number(newCity.gold22) || 0,
          gold18: Number(newCity.gold18) || 0,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      const created = await res.json();
      setCityRates((prev) => [...prev, created]);
      setNewCity({ city: "", gold24: "", gold22: "", gold18: "" });
      toast.success("City added");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add city");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#222]">
            Gold Rates — Admin Panel
          </h1>

          <button
            onClick={fetchAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#eadfce] bg-white hover:bg-[#faf5ea] text-sm font-medium"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* ================= METAL PRICES ================= */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-[#222] mb-5">
            Metal Prices (per gram)
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <label className="text-sm text-gray-500">24K Gold (₹)</label>
              <input
                type="number"
                value={metalPrice?.gold?.["24k"] ?? ""}
                onChange={(e) =>
                  handleMetalChange("gold.24k", e.target.value)
                }
                className="mt-1 w-full h-11 px-3 rounded-xl border border-[#e9dece] bg-[#fcfbf8] outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">22K Gold (₹)</label>
              <input
                type="number"
                value={metalPrice?.gold?.["22k"] ?? ""}
                onChange={(e) =>
                  handleMetalChange("gold.22k", e.target.value)
                }
                className="mt-1 w-full h-11 px-3 rounded-xl border border-[#e9dece] bg-[#fcfbf8] outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">18K Gold (₹)</label>
              <input
                type="number"
                value={metalPrice?.gold?.["18k"] ?? ""}
                onChange={(e) =>
                  handleMetalChange("gold.18k", e.target.value)
                }
                className="mt-1 w-full h-11 px-3 rounded-xl border border-[#e9dece] bg-[#fcfbf8] outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Silver (₹)</label>
              <input
                type="number"
                value={metalPrice?.silver ?? ""}
                onChange={(e) => handleMetalChange("silver", e.target.value)}
                className="mt-1 w-full h-11 px-3 rounded-xl border border-[#e9dece] bg-[#fcfbf8] outline-none"
              />
            </div>
          </div>

          <button
            onClick={saveMetalPrice}
            disabled={savingMetal}
            className="mt-6 flex items-center gap-2 px-6 h-11 rounded-xl bg-[#c8a24a] text-white font-medium disabled:opacity-60"
          >
            <Save size={16} />
            {savingMetal ? "Saving..." : "Save Metal Prices"}
          </button>
        </div>

        {/* ================= CITY RATES ================= */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#222] mb-5">
            City-wise Rates
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-[#eee3d2]">
                  <th className="py-2 pr-4">City</th>
                  <th className="py-2 pr-4">24K</th>
                  <th className="py-2 pr-4">22K</th>
                  <th className="py-2 pr-4">18K</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cityRates.map((city) => (
                  <tr key={city.id} className="border-b border-[#f3ece1]">
                    <td className="py-2 pr-4">
                      <input
                        value={city.city}
                        onChange={(e) =>
                          handleCityFieldChange(
                            city.id,
                            "city",
                            e.target.value
                          )
                        }
                        className="w-full h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        type="number"
                        value={city.gold24}
                        onChange={(e) =>
                          handleCityFieldChange(
                            city.id,
                            "gold24",
                            e.target.value
                          )
                        }
                        className="w-24 h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        type="number"
                        value={city.gold22}
                        onChange={(e) =>
                          handleCityFieldChange(
                            city.id,
                            "gold22",
                            e.target.value
                          )
                        }
                        className="w-24 h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        type="number"
                        value={city.gold18}
                        onChange={(e) =>
                          handleCityFieldChange(
                            city.id,
                            "gold18",
                            e.target.value
                          )
                        }
                        className="w-24 h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                      />
                    </td>
                    <td className="py-2 pr-4 flex gap-2">
                      <button
                        onClick={() => saveCityRow(city)}
                        disabled={savingCityId === city.id}
                        className="p-2 rounded-lg bg-[#c8a24a] text-white disabled:opacity-60"
                        title="Save"
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={() => deleteCityRow(city.id, city.city)}
                        className="p-2 rounded-lg bg-red-500 text-white"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* ADD NEW ROW */}
                <tr>
                  <td className="py-3 pr-4">
                    <input
                      placeholder="New city"
                      value={newCity.city}
                      onChange={(e) =>
                        setNewCity({ ...newCity, city: e.target.value })
                      }
                      className="w-full h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <input
                      type="number"
                      placeholder="24k"
                      value={newCity.gold24}
                      onChange={(e) =>
                        setNewCity({ ...newCity, gold24: e.target.value })
                      }
                      className="w-24 h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <input
                      type="number"
                      placeholder="22k"
                      value={newCity.gold22}
                      onChange={(e) =>
                        setNewCity({ ...newCity, gold22: e.target.value })
                      }
                      className="w-24 h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <input
                      type="number"
                      placeholder="18k"
                      value={newCity.gold18}
                      onChange={(e) =>
                        setNewCity({ ...newCity, gold18: e.target.value })
                      }
                      className="w-24 h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={addCityRow}
                      className="p-2 rounded-lg bg-green-600 text-white"
                      title="Add City"
                    >
                      <Plus size={14} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}