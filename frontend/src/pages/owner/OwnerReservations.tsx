import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiX, FiCalendar } from "react-icons/fi";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { EmptyState } from "../../components/common/EmptyState";
import { Select } from "../../components/common/Select";
import { getReservationsByRestaurant } from "../../data/reservations";
import { formatDate } from "../../utils/format";
import { OWNER_RESTAURANT_ID } from "./ownerConstants";
import type { Reservation } from "../../types";

export function OwnerReservations() {
  const [reservations, setReservations] = useState<Reservation[]>(getReservationsByRestaurant(OWNER_RESTAURANT_ID));
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all" ? reservations : reservations.filter((r) => r.status === statusFilter);

  const updateStatus = (id: string, status: Reservation["status"]) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Reservation ${status}`);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Reservations</h1>
          <p className="mt-1 text-slate-500">Manage incoming table reservations.</p>
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

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState icon={<FiCalendar size={26} />} title="No reservations found" message="Reservations will appear here as customers book." />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Guest</th>
                    <th className="px-5 py-3 font-medium">Date & Time</th>
                    <th className="px-5 py-3 font-medium">Guests</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-slate-50 last:border-none">
                      <td className="px-5 py-4">
                        <p className="font-medium text-secondary">{r.userName}</p>
                        {r.specialRequest && <p className="mt-0.5 max-w-xs text-xs italic text-slate-400 line-clamp-1">"{r.specialRequest}"</p>}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {formatDate(r.date)} · {r.time}
                      </td>
                      <td className="px-5 py-4 text-slate-600">{r.guests}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-5 py-4">
                        {r.status === "upcoming" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(r.id, "completed")}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent-dark hover:bg-accent/20 cursor-pointer"
                              aria-label="Mark completed"
                            >
                              <FiCheck size={14} />
                            </button>
                            <button
                              onClick={() => updateStatus(r.id, "cancelled")}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer"
                              aria-label="Cancel"
                            >
                              <FiX size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
