import { Link } from "react-router-dom";
import { FiCalendar, FiDollarSign, FiStar, FiUsers, FiArrowRight } from "react-icons/fi";
import { StatCard } from "../../components/dashboard/StatCard";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { RatingStars } from "../../components/common/RatingStars";
import { getRestaurantById } from "../../data/restaurants";
import { getReservationsByRestaurant } from "../../data/reservations";
import { getReviewsByRestaurant } from "../../data/reviews";
import { formatDate, formatCurrency } from "../../utils/format";
import { OWNER_RESTAURANT_ID } from "./ownerConstants";

export function OwnerOverview() {
  const restaurant = getRestaurantById(OWNER_RESTAURANT_ID)!;
  const reservations = getReservationsByRestaurant(restaurant.id);
  const reviews = getReviewsByRestaurant(restaurant.id);
  const upcoming = reservations.filter((r) => r.status === "upcoming");
  const estRevenue = reservations.filter((r) => r.status === "completed").length * 210 + upcoming.length * 180;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface-raised p-5 shadow-sm">
        <img src={restaurant.coverImage} alt={restaurant.name} className="h-16 w-16 rounded-xl object-cover" />
        <div>
          <h1 className="text-xl font-bold text-text">{restaurant.name}</h1>
          <p className="text-sm text-text-muted">{restaurant.location.city}, {restaurant.location.state}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming Reservations" value={String(upcoming.length)} icon={FiCalendar} tone="primary" trend={{ value: "12%", positive: true }} />
        <StatCard label="Est. Monthly Revenue" value={formatCurrency(estRevenue)} icon={FiDollarSign} tone="accent" trend={{ value: "8%", positive: true }} />
        <StatCard label="Average Rating" value={restaurant.rating.toFixed(1)} icon={FiStar} tone="secondary" />
        <StatCard label="Total Reviews" value={String(reviews.length)} icon={FiUsers} tone="primary" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-text">Recent Reservations</h2>
            <Link to="/owner/reservations" className="flex items-center gap-1 text-sm font-medium text-primary">
              View all <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {reservations.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-text">{r.userName}</p>
                  <p className="text-xs text-text-muted">
                    {formatDate(r.date)} · {r.time} · {r.guests} guests
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-text">Recent Reviews</h2>
            <Link to="/owner/reviews" className="flex items-center gap-1 text-sm font-medium text-primary">
              View all <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-text">{review.userName}</p>
                  <RatingStars rating={review.rating} size={12} />
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-text-muted">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
