import { FiUsers, FiHome, FiCalendar, FiDollarSign } from "react-icons/fi";
import { StatCard } from "../../components/dashboard/StatCard";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { users } from "../../data/users";
import { restaurants } from "../../data/restaurants";
import { reservations } from "../../data/reservations";
import { formatCurrency, formatDate } from "../../utils/format";

export function AdminOverview() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Platform Overview</h1>
      <p className="mt-1 text-text-muted">A snapshot of everything happening on BookMyBite.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={users.length.toLocaleString()} icon={FiUsers} tone="primary" trend={{ value: "14%", positive: true }} />
        <StatCard label="Total Restaurants" value={restaurants.length.toLocaleString()} icon={FiHome} tone="secondary" trend={{ value: "6%", positive: true }} />
        <StatCard label="Total Reservations" value={reservations.length.toLocaleString()} icon={FiCalendar} tone="accent" trend={{ value: "22%", positive: true }} />
        <StatCard label="Platform Revenue" value={formatCurrency(11200000)} icon={FiDollarSign} tone="primary" trend={{ value: "9%", positive: true }} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 font-semibold text-text">Recent Reservations</h2>
          <div className="space-y-3">
            {reservations.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-text">{r.userName}</p>
                  <p className="text-xs text-text-muted">
                    {r.restaurantName} · {formatDate(r.date)}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 font-semibold text-text">Newest Users</h2>
          <div className="space-y-3">
            {[...users]
              .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
              .slice(0, 5)
              .map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-text">{u.name}</p>
                      <p className="text-xs text-text-muted">{formatDate(u.joinedAt)}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium capitalize text-text-muted">{u.role}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
