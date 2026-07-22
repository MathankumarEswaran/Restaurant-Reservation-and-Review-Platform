import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiCalendar, FiUsers, FiX } from "react-icons/fi";
import { EmptyState } from "../../components/common/EmptyState";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { ButtonLink, Button } from "../../components/common/Button";
import { useReservations } from "../../context/ReservationContext";
import { formatDate } from "../../utils/format";
import { cn } from "../../utils/cn";

type Tab = "upcoming" | "completed" | "cancelled";

export function CustomerReservations() {
  const { reservations, cancelReservation } = useReservations();
  const [tab, setTab] = useState<Tab>("upcoming");

  const myReservations = reservations;
  const filtered = myReservations.filter((r) => r.status === tab);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">My Reservations</h1>
      <p className="mt-1 text-text-muted">View and manage all your bookings.</p>

      <div className="mt-6 flex gap-2 border-b border-border">
        {(["upcoming", "completed", "cancelled"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "border-b-2 px-4 py-2.5 text-sm font-medium capitalize cursor-pointer",
              tab === t ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text"
            )}
          >
            {t} ({myReservations.filter((r) => r.status === t).length})
          </button>
        ))}
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FiCalendar size={26} />}
            title={`No ${tab} reservations`}
            message="Explore restaurants and book your next table."
            action={<ButtonLink to="/restaurants">Browse Restaurants</ButtonLink>}
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <div key={r.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-raised p-4 shadow-sm sm:flex-row sm:items-center">
                <img src={r.restaurantImage} alt={r.restaurantName} className="h-20 w-full rounded-xl object-cover sm:h-16 sm:w-20" />
                <div className="flex-1">
                  <Link to={`/restaurants`} className="font-semibold text-text hover:text-primary">
                    {r.restaurantName}
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} /> {formatDate(r.date)} · {r.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers size={12} /> {r.guests} guests
                    </span>
                  </div>
                  {r.specialRequest && <p className="mt-1.5 text-xs italic text-text-subtle">"{r.specialRequest}"</p>}
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={r.status} />
                  {r.status === "upcoming" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<FiX size={14} />}
                      onClick={() => {
                        cancelReservation(r.id);
                        toast.success("Reservation cancelled");
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
