import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiHeart, FiStar, FiClock, FiArrowRight } from "react-icons/fi";
import { StatCard } from "../../components/dashboard/StatCard";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { useReservations } from "../../context/ReservationContext";
import { useRestaurants } from "../../context/RestaurantContext";
import * as reviewService from "../../services/reviewService";
import { formatDate } from "../../utils/format";

export function CustomerHome() {
  const { user } = useAuth();
  const { reservations } = useReservations();
  const { favorites } = useRestaurants();
  const [myReviewCount, setMyReviewCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = user ? reviewService.fetchReviewsByUser(user.id, user) : Promise.resolve([]);
    load.then((reviews) => {
      if (!cancelled) setMyReviewCount(reviews.length);
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const myReservations = reservations;
  const upcoming = myReservations.filter((r) => r.status === "upcoming");

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Welcome back, {user?.name.split(" ")[0] ?? "Guest"} 👋</h1>
      <p className="mt-1 text-text-muted">Here's what's happening with your account.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming Reservations" value={String(upcoming.length)} icon={FiCalendar} tone="primary" />
        <StatCard label="Favorite Restaurants" value={String(favorites.length)} icon={FiHeart} tone="secondary" />
        <StatCard label="Reviews Written" value={String(myReviewCount)} icon={FiStar} tone="accent" />
        <StatCard label="Total Visits" value={String(myReservations.filter((r) => r.status === "completed").length)} icon={FiClock} tone="primary" />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface-raised p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-text">Upcoming Reservations</h2>
          <Link to="/dashboard/reservations" className="flex items-center gap-1 text-sm font-medium text-primary">
            View all <FiArrowRight size={14} />
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="py-6 text-center text-sm text-text-muted">No upcoming reservations yet.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-4 rounded-xl border border-border p-3">
                <img src={r.restaurantImage} alt={r.restaurantName} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-text">{r.restaurantName}</p>
                  <p className="text-xs text-text-muted">
                    {formatDate(r.date)} at {r.time} · {r.guests} guests
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface-raised p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 font-semibold text-text">Favorite Restaurants</h2>
        {favorites.length === 0 ? (
          <p className="py-6 text-center text-sm text-text-muted">You haven't added any favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {favorites.slice(0, 4).map((r) => (
              <Link key={r.id} to={`/restaurants/${r.slug}`} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-primary">
                <img src={r.coverImage} alt={r.name} className="h-12 w-12 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-medium text-text">{r.name}</p>
                  <p className="text-xs text-text-muted">{r.location.city}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
