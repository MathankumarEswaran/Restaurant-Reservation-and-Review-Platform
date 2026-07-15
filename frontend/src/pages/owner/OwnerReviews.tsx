import { useState } from "react";
import toast from "react-hot-toast";
import { FiCornerDownRight, FiSend } from "react-icons/fi";
import { RatingStars } from "../../components/common/RatingStars";
import { EmptyState } from "../../components/common/EmptyState";
import { getReviewsByRestaurant } from "../../data/reviews";
import { formatDate } from "../../utils/format";
import { OWNER_RESTAURANT_ID } from "./ownerConstants";
import type { Review } from "../../types";

export function OwnerReviews() {
  const [reviews, setReviews] = useState<Review[]>(getReviewsByRestaurant(OWNER_RESTAURANT_ID));
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const submitReply = (reviewId: string) => {
    const message = replyDrafts[reviewId]?.trim();
    if (!message) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, ownerReply: { message, createdAt: new Date().toISOString() } } : r))
    );
    setReplyDrafts((prev) => ({ ...prev, [reviewId]: "" }));
    toast.success("Reply posted");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Reviews</h1>
      <p className="mt-1 text-slate-500">Respond to feedback from your customers.</p>

      <div className="mt-6">
        {reviews.length === 0 ? (
          <EmptyState title="No reviews yet" message="Reviews from customers will show up here." />
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <img src={review.userAvatar} alt={review.userName} className="h-11 w-11 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-secondary">{review.userName}</p>
                      <span className="text-xs text-slate-400">{formatDate(review.createdAt)}</span>
                    </div>
                    <RatingStars rating={review.rating} size={13} className="mt-1" />
                    <h4 className="mt-2 font-medium text-secondary">{review.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{review.comment}</p>

                    {review.ownerReply ? (
                      <div className="mt-4 flex gap-2.5 rounded-xl bg-slate-50 p-4">
                        <FiCornerDownRight className="mt-0.5 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm font-semibold text-secondary">Your response</p>
                          <p className="mt-1 text-sm text-slate-600">{review.ownerReply.message}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 flex gap-2">
                        <input
                          value={replyDrafts[review.id] ?? ""}
                          onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [review.id]: e.target.value }))}
                          placeholder="Write a reply..."
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none focus:border-primary"
                        />
                        <button
                          onClick={() => submitReply(review.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white cursor-pointer"
                          aria-label="Send reply"
                        >
                          <FiSend size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
