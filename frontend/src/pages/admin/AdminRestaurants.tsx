import { useState } from "react";
import toast from "react-hot-toast";
import { FiSearch, FiSlash, FiCheckCircle, FiStar } from "react-icons/fi";
import { Input } from "../../components/common/Input";
import { restaurants as initialRestaurants } from "../../data/restaurants";
import { cn } from "../../utils/cn";
import type { Restaurant } from "../../types";

export function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState<(Restaurant & { suspended?: boolean })[]>(initialRestaurants);
  const [search, setSearch] = useState("");

  const filtered = restaurants.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.location.city.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSuspend = (id: string) => {
    setRestaurants((prev) => prev.map((r) => (r.id === id ? { ...r, suspended: !r.suspended } : r)));
    const target = restaurants.find((r) => r.id === id);
    toast.success(target?.suspended ? "Restaurant reactivated" : "Restaurant suspended");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Restaurants</h1>
      <p className="mt-1 text-slate-500">Moderate restaurant listings across the platform.</p>

      <div className="mt-6">
        <Input icon={<FiSearch size={16} />} placeholder="Search by name or city" value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Restaurant</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-none">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={r.coverImage} alt={r.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-secondary">{r.name}</p>
                        <p className="text-xs text-slate-500">{r.location.city}, {r.location.state}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{r.category}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-slate-600">
                      <FiStar className="text-amber-400" size={14} /> {r.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", r.suspended ? "bg-red-100 text-red-600" : "bg-accent/10 text-accent-dark")}>
                      {r.suspended ? "Suspended" : "Live"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleSuspend(r.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer",
                        r.suspended ? "bg-accent/10 text-accent-dark hover:bg-accent/20" : "bg-red-50 text-red-500 hover:bg-red-100"
                      )}
                    >
                      {r.suspended ? <FiCheckCircle size={13} /> : <FiSlash size={13} />}
                      {r.suspended ? "Reactivate" : "Suspend"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
