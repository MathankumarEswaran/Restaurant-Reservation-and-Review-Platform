import { FiThumbsUp, FiCornerDownRight } from "react-icons/fi";
import type { Review } from "../../types";
import { RatingStars } from "../common/RatingStars";
import { Avatar } from "../common/Avatar";
import { formatDate } from "../../utils/format";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border-b border-border py-6 last:border-none">
      <div className="flex items-start gap-3">
        <Avatar name={review.userName} src={review.userAvatar || undefined} size={44} />
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-text">{review.userName}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <RatingStars rating={review.rating} size={13} />
                <span className="text-xs text-text-subtle">{formatDate(review.createdAt)}</span>
              </div>
            </div>
          </div>
          <h4 className="mt-2.5 font-semibold text-text">{review.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">{review.comment}</p>

          {review.images && review.images.length > 0 && (
            <div className="mt-3 flex gap-2">
              {review.images.map((img, idx) => (
                <img key={idx} src={img} alt="Review" className="h-20 w-20 rounded-lg object-cover" loading="lazy" />
              ))}
            </div>
          )}

          <button className="mt-3 flex items-center gap-1.5 text-xs font-medium text-text-subtle hover:text-primary cursor-pointer">
            <FiThumbsUp size={13} /> Helpful ({review.helpfulCount})
          </button>

          {review.ownerReply && (
            <div className="mt-4 flex gap-2.5 rounded-xl bg-surface-sunken p-4">
              <FiCornerDownRight className="mt-0.5 shrink-0 text-primary" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-text">Response from the owner</p>
                  <span className="text-xs text-text-subtle">{formatDate(review.ownerReply.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{review.ownerReply.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
