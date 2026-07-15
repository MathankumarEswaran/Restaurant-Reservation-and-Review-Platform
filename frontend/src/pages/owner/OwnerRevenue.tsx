import { FiDollarSign, FiTrendingUp, FiCreditCard, FiCalendar } from "react-icons/fi";
import { StatCard } from "../../components/dashboard/StatCard";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { formatCurrency, formatDate } from "../../utils/format";
import { getReservationsByRestaurant } from "../../data/reservations";
import { OWNER_RESTAURANT_ID } from "./ownerConstants";

const monthlyRevenue = [
  { month: "Feb", value: 490000 },
  { month: "Mar", value: 580000 },
  { month: "Apr", value: 530000 },
  { month: "May", value: 670000 },
  { month: "Jun", value: 765000 },
  { month: "Jul", value: 620000 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

export function OwnerRevenue() {
  const reservations = getReservationsByRestaurant(OWNER_RESTAURANT_ID);
  const transactions = reservations.map((r, idx) => ({
    id: r.id,
    guest: r.userName,
    date: r.date,
    amount: 2500 + idx * 700,
    status: r.status === "cancelled" ? "refunded" : r.status === "completed" ? "paid" : "pending",
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Revenue</h1>
      <p className="mt-1 text-slate-500">Track your restaurant's earnings over time.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="This Month" value={formatCurrency(620000)} icon={FiDollarSign} tone="primary" trend={{ value: "8%", positive: true }} />
        <StatCard label="Avg. Order Value" value={formatCurrency(3200)} icon={FiTrendingUp} tone="accent" trend={{ value: "4%", positive: true }} />
        <StatCard label="Pending Payouts" value={formatCurrency(74000)} icon={FiCreditCard} tone="secondary" />
        <StatCard label="Total Bookings" value={String(reservations.length)} icon={FiCalendar} tone="primary" />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-6 font-semibold text-secondary">Monthly Revenue</h2>
        <div className="flex h-52 items-end gap-4 sm:gap-6">
          {monthlyRevenue.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-40 w-full items-end">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary-light"
                  style={{ height: `${(m.value / maxRevenue) * 100}%` }}
                  title={formatCurrency(m.value)}
                />
              </div>
              <span className="text-xs text-slate-500">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-secondary">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Guest</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-slate-50 last:border-none">
                  <td className="px-5 py-4 font-medium text-secondary">{t.guest}</td>
                  <td className="px-5 py-4 text-slate-600">{formatDate(t.date)}</td>
                  <td className="px-5 py-4 text-slate-600">{formatCurrency(t.amount)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={t.status} />
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
