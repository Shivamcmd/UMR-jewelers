import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save, Trash2, RefreshCw, Plus, Gem } from "lucide-react";

const API_BASE = "https://umr-jewelers.onrender.com";

export default function AdminSchemes() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [search, setSearch] = useState("");

  // ================= FETCH DATA =================
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Only users who have joined a scheme at some point
  const schemeUsers = users.filter((u) => u.activeScheme);

  const filteredUsers = schemeUsers.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.activeScheme?.schemeName?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= HANDLERS =================
  const handleFieldChange = (userId, field, value) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, activeScheme: { ...u.activeScheme, [field]: value } }
          : u
      )
    );
  };

  const addManualInstallment = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;

        const scheme = u.activeScheme;
        const nextMonth = (scheme.installmentsPaid || 0) + 1;

        const updatedScheme = {
          ...scheme,
          installmentsPaid: nextMonth,
          installments: [
            ...(scheme.installments || []),
            {
              month: nextMonth,
              amount: scheme.monthlyAmount,
              paymentId: "MANUAL_ADMIN_ENTRY",
              date: new Date().toLocaleString(),
            },
          ],
        };

        return { ...u, activeScheme: updatedScheme };
      })
    );
  };

  const saveUserScheme = async (user) => {
    setSavingId(user.id);
    try {
      const res = await fetch(`${API_BASE}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeScheme: user.activeScheme }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success(`${user.name}'s scheme updated`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update scheme");
    } finally {
      setSavingId(null);
    }
  };

  const cancelScheme = async (user) => {
    if (!window.confirm(`Cancel/remove ${user.name}'s scheme?`)) return;

    try {
      const res = await fetch(`${API_BASE}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeScheme: null }),
      });

      if (!res.ok) throw new Error("Failed");

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, activeScheme: null } : u))
      );

      toast.success(`${user.name}'s scheme removed`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove scheme");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-sm sm:text-base">
        Loading Schemes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#222] flex items-center gap-2">
              <Gem size={24} className="text-[#c8a24a]" />
              Gold Schemes — Admin Panel
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {schemeUsers.length} customer{schemeUsers.length !== 1 ? "s" : ""} enrolled
            </p>
          </div>

          <button
            onClick={fetchUsers}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#eadfce] bg-white hover:bg-[#faf5ea] text-sm font-medium w-full sm:w-auto"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            placeholder="Search by customer name or scheme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-[#e9dece] bg-white outline-none text-sm shadow-sm"
          />
        </div>

        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#eadfce] p-8 text-center text-gray-500 text-sm">
            No customers with active/past schemes found.
          </div>
        ) : (
          <>
            {/* ===== DESKTOP TABLE ===== */}
            <div className="hidden md:block bg-white rounded-3xl border border-[#eadfce] p-6 shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-[#eee3d2]">
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Scheme</th>
                    <th className="py-2 pr-4">₹/Month</th>
                    <th className="py-2 pr-4">Installments</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => {
                    const scheme = user.activeScheme;
                    return (
                      <tr key={user.id} className="border-b border-[#f3ece1] align-top">
                        <td className="py-3 pr-4">
                          <p className="font-medium text-[#40372f]">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </td>

                        <td className="py-3 pr-4">{scheme.schemeName}</td>

                        <td className="py-3 pr-4">₹{scheme.monthlyAmount}</td>

                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={0}
                              max={11}
                              value={scheme.installmentsPaid}
                              onChange={(e) =>
                                handleFieldChange(
                                  user.id,
                                  "installmentsPaid",
                                  Number(e.target.value)
                                )
                              }
                              className="w-16 h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                            />
                            <span className="text-gray-400">/ 11</span>
                          </div>

                          <div className="w-28 h-2 rounded-full bg-gray-200 mt-2">
                            <div
                              className="h-2 rounded-full bg-[#c8a24a]"
                              style={{
                                width: `${(scheme.installmentsPaid / 11) * 100}%`,
                              }}
                            />
                          </div>

                          <button
                            onClick={() => addManualInstallment(user.id)}
                            className="mt-2 flex items-center gap-1 text-xs text-[#b8901f] hover:underline"
                          >
                            <Plus size={12} />
                            Add manual installment
                          </button>
                        </td>

                        <td className="py-3 pr-4">
                          <select
                            value={scheme.status}
                            onChange={(e) =>
                              handleFieldChange(user.id, "status", e.target.value)
                            }
                            className="h-9 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none"
                          >
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-3 pr-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveUserScheme(user)}
                              disabled={savingId === user.id}
                              className="p-2 rounded-lg bg-[#c8a24a] text-white disabled:opacity-60"
                              title="Save"
                            >
                              <Save size={14} />
                            </button>
                            <button
                              onClick={() => cancelScheme(user)}
                              className="p-2 rounded-lg bg-red-500 text-white"
                              title="Remove Scheme"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ===== MOBILE CARD LIST ===== */}
            <div className="md:hidden space-y-4">
              {filteredUsers.map((user) => {
                const scheme = user.activeScheme;
                return (
                  <div
                    key={user.id}
                    className="bg-white rounded-2xl border border-[#eadfce] p-4 shadow-sm"
                  >
                    <div className="mb-3">
                      <p className="font-semibold text-[#40372f]">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>

                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Scheme</span>
                      <span className="font-medium">{scheme.schemeName}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-500">Monthly Amount</span>
                      <span className="font-medium">₹{scheme.monthlyAmount}</span>
                    </div>

                    <div className="mb-3">
                      <label className="text-xs text-gray-500">Installments Paid</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          min={0}
                          max={11}
                          value={scheme.installmentsPaid}
                          onChange={(e) =>
                            handleFieldChange(
                              user.id,
                              "installmentsPaid",
                              Number(e.target.value)
                            )
                          }
                          className="w-20 h-10 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none text-sm"
                        />
                        <span className="text-gray-400 text-sm">/ 11</span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-gray-200 mt-2">
                        <div
                          className="h-2 rounded-full bg-[#c8a24a]"
                          style={{
                            width: `${(scheme.installmentsPaid / 11) * 100}%`,
                          }}
                        />
                      </div>

                      <button
                        onClick={() => addManualInstallment(user.id)}
                        className="mt-2 flex items-center gap-1 text-xs text-[#b8901f]"
                      >
                        <Plus size={12} />
                        Add manual installment
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="text-xs text-gray-500">Status</label>
                      <select
                        value={scheme.status}
                        onChange={(e) =>
                          handleFieldChange(user.id, "status", e.target.value)
                        }
                        className="mt-1 w-full h-10 px-2 rounded-lg border border-[#e9dece] bg-[#fcfbf8] outline-none text-sm"
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => saveUserScheme(user)}
                        disabled={savingId === user.id}
                        className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-[#c8a24a] text-white text-sm font-medium disabled:opacity-60"
                      >
                        <Save size={14} />
                        Save
                      </button>
                      <button
                        onClick={() => cancelScheme(user)}
                        className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-red-500 text-white text-sm font-medium"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}