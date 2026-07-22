import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiHeart, FiShare2, FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { RatingStars } from "../../components/common/RatingStars";
import { Badge } from "../../components/common/Badge";
import { PageLoader } from "../../components/common/Loader";
import { ReservationForm } from "../../components/reservation/ReservationForm";
import { ReviewCard } from "../../components/review/ReviewCard";
import { ReviewForm } from "../../components/review/ReviewForm";
import { RestaurantCard } from "../../components/restaurant/RestaurantCard";
import { SectionHeading } from "../../components/common/SectionHeading";
import { useRestaurants } from "../../context/RestaurantContext";
import { getRestaurantBySlug, getRelatedRestaurants } from "../../data/restaurants";
import { menusByRestaurant } from "../../data/menus";
import { getReviewsByRestaurant } from "../../data/reviews";
import { cn } from "../../utils/cn";
import { formatCurrency, groupOpeningHours } from "../../utils/format";
import type { Review } from "../../types";

export function RestaurantDetails() {
  const { slug } = useParams<{ slug: string }>();
  const restaurant = slug ? getRestaurantBySlug(slug) : undefined;
  const { isFavorite, toggleFavorite } = useRestaurants();
  const [activeImage, setActiveImage] = useState(0);
  const [lastRestaurantId, setLastRestaurantId] = useState<string | undefined>(restaurant?.id);
  const [newReviews, setNewReviews] = useState<Review[]>([]);

  // Reset the active gallery image whenever we navigate to a different
  // restaurant (e.g. via a "Related Restaurants" link, which re-renders
  // this component without unmounting it).
  if (restaurant && restaurant.id !== lastRestaurantId) {
    setLastRestaurantId(restaurant.id);
    setActiveImage(0);
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [restaurant?.id]);

  const handleShare = async () => {
    if (!restaurant) return;
    const shareData = {
      title: restaurant.name,
      text: `Check out ${restaurant.name} on Chennai Traditions Reserved`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled the share sheet — no error toast needed
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  if (!slug) return <Navigate to="/404" replace />;
  if (!restaurant) return <PageLoader />;

  const reviews = [...newReviews, ...getReviewsByRestaurant(restaurant.id)];
  const menu = menusByRestaurant[restaurant.id] ?? [];
  const menuByCategory = menu.reduce<Record<string, typeof menu>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  const related = getRelatedRestaurants(restaurant);
  const favorite = isFavorite(restaurant.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Restaurants", to: "/restaurants" }, { label: restaurant.name }]} />

      {/* Gallery */}
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4 sm:grid-rows-2">
        <div className="sm:col-span-2 sm:row-span-2">
          <img
            src={restaurant.gallery[activeImage] ?? restaurant.coverImage}
            alt={restaurant.name}
            className="h-64 w-full rounded-2xl object-cover sm:h-full"
          />
        </div>
        {restaurant.gallery.slice(0, 4).map((img, idx) => (
          <button key={idx} onClick={() => setActiveImage(idx)} className="hidden overflow-hidden rounded-2xl sm:block">
            <img
              src={img}
              alt=""
              className={cn("h-full w-full object-cover transition-opacity", idx === activeImage ? "opacity-100" : "opacity-80 hover:opacity-100")}
            />
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {restaurant.cuisines.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
              <h1 className="mt-3 text-3xl font-bold text-text">{restaurant.name}</h1>
              <p className="mt-1 text-text-muted">{restaurant.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <RatingStars rating={restaurant.rating} showValue />
                <span className="text-text-subtle">({restaurant.reviewCount} reviews)</span>
                <span className="flex items-center gap-1 text-text-muted">
                  <FiMapPin size={14} /> {restaurant.location.address}, {restaurant.location.city}
                </span>
                <span className="font-semibold text-text-muted">{restaurant.priceRange}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFavorite(restaurant)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text-muted hover:text-red-500 cursor-pointer"
              >
                <FiHeart className={cn(favorite && "fill-red-500 text-red-500")} />
              </button>
              <button
                onClick={handleShare}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text-muted hover:text-primary cursor-pointer"
                aria-label="Share this restaurant"
              >
                <FiShare2 />
              </button>
            </div>
          </div>

          {/* About */}
          <div className="mt-8 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-text">About</h2>
            <p className="mt-2 leading-relaxed text-text-muted">{restaurant.description}</p>
          </div>

          {/* Facilities */}
          <div className="mt-8 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-text">Facilities</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {restaurant.facilities.map((facility) => (
                <div key={facility} className="flex items-center gap-2 text-sm text-text-muted">
                  <FiCheckCircle className="shrink-0 text-accent" size={15} />
                  {facility}
                </div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="mt-8 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-text">Menu</h2>
            <div className="mt-4 space-y-8">
              {Object.entries(menuByCategory).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{category}</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 rounded-xl border border-border p-3">
                        <img src={item.image} alt={item.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" loading="lazy" />
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-text line-clamp-1">{item.name}</p>
                            <span className="shrink-0 text-sm font-semibold text-primary">{formatCurrency(item.price)}</span>
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-xs text-text-muted">{item.description}</p>
                          <div className="mt-1.5 flex gap-1.5">
                            {item.isVeg && <Badge tone="accent">Veg</Badge>}
                            {item.isPopular && <Badge tone="primary">Popular</Badge>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="mt-8 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-text">Opening Hours</h2>
            <div className="mt-4 space-y-2">
              {groupOpeningHours(restaurant.openingHours).map((group) => (
                <div key={group.label} className="flex items-center justify-between border-b border-border py-1.5 text-sm">
                  <span className="flex items-center gap-2 text-text-muted">
                    <FiClock size={14} className="text-text-subtle" /> {group.label}
                  </span>
                  <span className="font-medium text-text">{group.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8 border-t border-border pt-8">
            <SectionHeading title={`Customer Reviews (${reviews.length})`} />
            <div className="mb-8">
              <ReviewForm restaurantSlug={restaurant.slug} onSubmitted={(review) => setNewReviews((prev) => [review, ...prev])} />
            </div>
            {reviews.length === 0 ? (
              <p className="text-sm text-text-muted">No reviews yet — be the first to share your experience!</p>
            ) : (
              <div>
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <ReservationForm restaurant={restaurant} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <SectionHeading title="You Might Also Like" description="Similar restaurants in this category." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
