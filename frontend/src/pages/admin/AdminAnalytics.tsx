import { FiTrendingUp } from "react-icons/fi";
import { categories } from "../../data/categories";

const bookingsTrend = [
  { label: "Feb", value: 1240 },
  { label: "Mar", value: 1480 },
  { label: "Apr", value: 1390 },
  { label: "May", value: 1720 },
  { label: "Jun", value: 2010 },
  { label: "Jul", value: 1860 },
];

const maxBookings = Math.max(...bookingsTrend.map((b) => b.value));
const maxCategoryCount = Math.max(...categories.map((c) => c.restaurantCount));

export function AdminAnalytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Analytics</h1>
      <p className="mt-1 text-slate-500">Platform-wide growth and engagement trends.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-semibold text-secondary">Booking Growth</h2>
            <span className="flex items-center gap-1 text-xs font-semibold text-accent-dark">
              <FiTrendingUp size={13} /> +22% vs last period
            </span>
          </div>
          <div className="flex h-52 items-end gap-4 sm:gap-6">
            {bookingsTrend.map((b) => (
              <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-secondary to-secondary-light"
                    style={{ height: `${(b.value / maxBookings) * 100}%` }}
                    title={String(b.value)}
                  />
                </div>
                <span className="text-xs text-slate-500">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-6 font-semibold text-secondary">Top Categories</h2>
          <div className="space-y-4">
            {categories.slice(0, 6).map((c) => (
              <div key={c.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-600">{c.name}</span>
                  <span className="font-medium text-secondary">{c.restaurantCount}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${(c.restaurantCount / maxCategoryCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { label: "Avg. Session Duration", value: "4m 32s" },
          { label: "Conversion Rate", value: "6.8%" },
          { label: "Repeat Booking Rate", value: "38%" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
            <p className="text-2xl font-bold text-secondary">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
