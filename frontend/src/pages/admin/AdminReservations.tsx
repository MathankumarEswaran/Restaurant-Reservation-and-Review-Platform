import { useState } from "react";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { Select } from "../../components/common/Select";
import { reservations } from "../../data/reservations";
import { formatDate } from "../../utils/format";

export function AdminReservations() {
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = statusFilter === "all" ? reservations : reservations.filter((r) => r.status === statusFilter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Reservations</h1>
          <p className="mt-1 text-slate-500">All reservations across the platform.</p>
        </div>
        <div className="w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: "All Statuses", value: "all" },
              { label: "Upcoming", value: "upcoming" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
            ]}
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Restaurant</th>
                <th className="px-5 py-3 font-medium">Date & Time</th>
                <th className="px-5 py-3 font-medium">Guests</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-none">
                  <td className="px-5 py-4 font-medium text-secondary">{r.userName}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <img src={r.restaurantImage} alt={r.restaurantName} className="h-8 w-8 rounded-lg object-cover" />
                      <span className="text-slate-600">{r.restaurantName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {formatDate(r.date)} · {r.time}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{r.guests}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status} />
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
