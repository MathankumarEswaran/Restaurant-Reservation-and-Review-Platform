import { useEffect, useState } from "react";
import { FiStar, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { RatingStars } from "../../components/common/RatingStars";
import { EmptyState } from "../../components/common/EmptyState";
import { ButtonLink } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import * as reviewService from "../../services/reviewService";
import type { ReviewWithRestaurant } from "../../services/reviewService";
import { formatDate } from "../../utils/format";

export function CustomerReviews() {
  const { user } = useAuth();
  const [myReviews, setMyReviews] = useState<ReviewWithRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = user ? reviewService.fetchReviewsByUserWithRestaurant(user.id, user) : Promise.resolve([]);
    load
      .then((data) => {
        if (!cancelled) setMyReviews(data);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Review History</h1>
      <p className="mt-1 text-slate-500">Reviews you've written for restaurants.</p>

      <div className="mt-6">
        {!isLoading && myReviews.length === 0 ? (
          <EmptyState
            icon={<FiStar size={26} />}
            title="No reviews yet"
            message="Visit a restaurant page to share your experience."
            action={<ButtonLink to="/restaurants">Browse Restaurants</ButtonLink>}
          />
        ) : (
          <div className="space-y-4">
            {myReviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={review.restaurant.coverImage} alt={review.restaurant.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-secondary">{review.restaurant.name}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <RatingStars rating={review.rating} size={13} />
                        <span className="text-xs text-slate-400">{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.success("Review deleted")}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer"
                    aria-label="Delete review"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
                <h4 className="mt-3 font-medium text-secondary">{review.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{review.comment}</p>
                {review.ownerReply && (
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                    <span className="font-semibold text-secondary">Owner reply: </span>
                    {review.ownerReply.message}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
