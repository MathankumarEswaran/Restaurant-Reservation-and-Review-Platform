import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiImage, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { RatingStars } from "../common/RatingStars";
import { Input } from "../common/Input";
import { Textarea } from "../common/Textarea";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { submitReview } from "../../services/reviewService";
import { resolveRestaurantIdBySlug } from "../../services/restaurantService";
import type { Review } from "../../types";

interface ReviewFormValues {
  title: string;
  comment: string;
}

export function ReviewForm({ restaurantSlug, onSubmitted }: { restaurantSlug: string; onSubmitted?: (review: Review) => void }) {
  const [rating, setRating] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>();

  const onSubmit = async (data: ReviewFormValues) => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!isAuthenticated || !user) {
      toast("Please sign in to leave a review", { icon: "🔒" });
      navigate("/login");
      return;
    }
    try {
      const restaurantId = await resolveRestaurantIdBySlug(restaurantSlug);
      const review = await submitReview({ restaurantId, rating, title: data.title, comment: data.comment }, user);
      toast.success("Review submitted — thank you!");
      reset();
      setRating(0);
      setImagePreview(null);
      onSubmitted?.(review);
    } catch {
      toast.error("Couldn't submit your review. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border bg-surface-raised p-6 shadow-sm">
      <div>
        <p className="mb-2 text-sm font-medium text-text">Your Rating</p>
        <RatingStars rating={rating} interactive onChange={setRating} size={26} />
      </div>

      <Input
        label="Review Title"
        placeholder="Summarize your experience"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
      />

      <Textarea
        label="Your Review"
        placeholder="Tell others about your experience..."
        {...register("comment", { required: "Please write a comment", minLength: { value: 10, message: "Please write at least 10 characters" } })}
        error={errors.comment?.message}
      />

      <div>
        <p className="mb-2 text-sm font-medium text-text">Add Photo (optional)</p>
        {imagePreview ? (
          <div className="relative inline-block">
            <img src={imagePreview} alt="Preview" className="h-24 w-24 rounded-xl object-cover" />
            <button
              type="button"
              onClick={() => setImagePreview(null)}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white cursor-pointer"
            >
              <FiX size={13} />
            </button>
          </div>
        ) : (
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border-strong text-text-subtle hover:border-primary hover:text-primary">
            <FiImage size={22} />
            <span className="text-[11px]">Upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImagePreview(URL.createObjectURL(file));
              }}
            />
          </label>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Submit Review
      </Button>
    </form>
  );
}
