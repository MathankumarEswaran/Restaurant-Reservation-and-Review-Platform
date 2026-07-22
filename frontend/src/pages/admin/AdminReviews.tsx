import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { RatingStars } from "../../components/common/RatingStars";
import { reviews as initialReviews } from "../../data/reviews";
import { getRestaurantById } from "../../data/restaurants";
import { formatDate } from "../../utils/format";

export function AdminReviews() {
  const [reviews, setReviews] = useState(initialReviews);

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Review removed");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Reviews</h1>
      <p className="mt-1 text-text-muted">Moderate reviews submitted across the platform.</p>

      <div className="mt-6 space-y-4">
        {reviews.map((review) => {
          const restaurant = getRestaurantById(review.restaurantId);
          return (
            <div key={review.id} className="flex items-start gap-4 rounded-2xl border border-border bg-surface-raised p-5 shadow-sm">
              <img src={review.userAvatar} alt={review.userName} className="h-11 w-11 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-text">{review.userName}</p>
                    <p className="text-xs text-text-muted">
                      on <span className="font-medium">{restaurant?.name}</span> · {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <RatingStars rating={review.rating} size={13} />
                </div>
                <h4 className="mt-2 font-medium text-text">{review.title}</h4>
                <p className="mt-1 text-sm text-text-muted">{review.comment}</p>
              </div>
              <button
                onClick={() => deleteReview(review.id)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-subtle hover:bg-red-50 hover:text-red-500 cursor-pointer"
                aria-label="Delete review"
              >
                <FiTrash2 size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
