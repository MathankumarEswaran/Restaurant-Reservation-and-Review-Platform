import { FiDollarSign, FiTrendingUp, FiRefreshCw, FiCreditCard } from "react-icons/fi";
import { StatCard } from "../../components/dashboard/StatCard";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { reservations } from "../../data/reservations";
import { formatCurrency, formatDate } from "../../utils/format";

const payments = reservations.map((r, idx) => ({
  id: `pay-${idx + 1}`,
  guest: r.userName,
  restaurant: r.restaurantName,
  date: r.date,
  amount: 2200 + idx * 900,
  status: r.status === "cancelled" ? "refunded" : r.status === "completed" ? "paid" : "pending",
}));

export function AdminPayments() {
  const totalRevenue = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const refunded = payments.filter((p) => p.status === "refunded").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Payments</h1>
      <p className="mt-1 text-slate-500">Track platform-wide transactions and payouts.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon={FiDollarSign} tone="primary" trend={{ value: "11%", positive: true }} />
        <StatCard label="Platform Fees (10%)" value={formatCurrency(totalRevenue * 0.1)} icon={FiTrendingUp} tone="accent" />
        <StatCard label="Refunded" value={formatCurrency(refunded)} icon={FiRefreshCw} tone="secondary" />
        <StatCard label="Pending Payouts" value={formatCurrency(185000)} icon={FiCreditCard} tone="primary" />
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-secondary">Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Guest</th>
                <th className="px-5 py-3 font-medium">Restaurant</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 last:border-none">
                  <td className="px-5 py-4 font-medium text-secondary">{p.guest}</td>
                  <td className="px-5 py-4 text-slate-600">{p.restaurant}</td>
                  <td className="px-5 py-4 text-slate-600">{formatDate(p.date)}</td>
                  <td className="px-5 py-4 text-slate-600">{formatCurrency(p.amount)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={p.status} />
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
