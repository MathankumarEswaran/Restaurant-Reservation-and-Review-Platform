import { FiBell, FiCalendar, FiStar, FiGift, FiInfo } from "react-icons/fi";
import { EmptyState } from "../../components/common/EmptyState";
import { Button } from "../../components/common/Button";
import { useNotifications } from "../../context/NotificationContext";
import { formatRelativeTime } from "../../utils/format";
import { cn } from "../../utils/cn";
import type { Notification } from "../../types";

const iconMap: Record<Notification["type"], typeof FiBell> = {
  reservation: FiCalendar,
  review: FiStar,
  promo: FiGift,
  system: FiInfo,
};

export function CustomerNotifications() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Notifications</h1>
          <p className="mt-1 text-slate-500">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="mt-6">
        {notifications.length === 0 ? (
          <EmptyState icon={<FiBell size={26} />} title="You're all caught up" message="No notifications right now." />
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => {
              const Icon = iconMap[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-2xl border p-4 text-left shadow-sm transition-colors cursor-pointer",
                    n.isRead ? "border-slate-100 bg-white" : "border-primary/20 bg-primary/5"
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={17} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-secondary">{n.title}</p>
                      {!n.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">{n.message}</p>
                    <p className="mt-1.5 text-xs text-slate-400">{formatRelativeTime(n.createdAt)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
