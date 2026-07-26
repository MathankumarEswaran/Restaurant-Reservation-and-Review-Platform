import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { SearchBar } from "../../components/restaurant/SearchBar";
import { RestaurantCard } from "../../components/restaurant/RestaurantCard";
import { CategoryCard } from "../../components/restaurant/CategoryCard";
import { SectionHeading } from "../../components/common/SectionHeading";
import { RatingStars } from "../../components/common/RatingStars";
import { ButtonLink } from "../../components/common/Button";
import { restaurants } from "../../data/restaurants";
import { categories } from "../../data/categories";
import { testimonials } from "../../data/testimonials";
import heroImage from "../../assets/background.jpg";
import categoriesBgImage from "../../assets/restaurants/dosa-tray.jpg";
import featuredBgImage from "../../assets/restaurants/thali-1.jpg";
import topRatedBgImage from "../../assets/restaurants/filter-coffee.jpg";
import trendingBgImage from "../../assets/restaurants/vada-plate.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const featured = restaurants.filter((r) => r.isFeatured).slice(0, 8);
const topRated = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 4);
const trending = restaurants.filter((r) => r.isTrending).slice(0, 4);

export function Home() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed! Look out for our next newsletter.");
    setEmail("");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              The best of Chennai & Coimbatore, all in one place
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find your table, <span className="text-primary">right now.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base text-text-subtle sm:text-lg">
              Discover top-rated restaurants, read real reviews, and reserve your table in seconds.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-10 max-w-3xl"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="relative overflow-hidden py-20">
        <img src={categoriesBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 blur-[1px]" />
        <div className="absolute inset-0 bg-surface/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Explore" title="Popular Categories" description="Browse restaurants by the cuisine you're craving." />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="relative overflow-hidden py-20">
        <img src={featuredBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 blur-[1px]" />
        <div className="absolute inset-0 bg-white/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Handpicked"
            title="Featured Restaurants"
            description="Our editorial team's favorite spots this month."
            action={
              <ButtonLink to="/restaurants" variant="outline" icon={<FiArrowRight />} iconPosition="right">
                View All
              </ButtonLink>
            }
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((restaurant, idx) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="relative overflow-hidden py-20">
        <img src={topRatedBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 blur-[1px]" />
        <div className="absolute inset-0 bg-surface/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Community Favorites" title="Top Rated Restaurants" description="Loved by thousands of diners just like you." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topRated.map((restaurant, idx) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="relative overflow-hidden py-20">
        <img src={trendingBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 blur-[1px]" />
        <div className="absolute inset-0 bg-white/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Right Now" title="Trending This Week" description="The spots everyone's talking about." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((restaurant, idx) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Testimonials"
            title="What Our Diners Say"
            description="Real feedback from people who use BookMyBite every week."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm"
              >
                <RatingStars rating={t.rating} size={14} />
                <p className="mt-4 text-sm leading-relaxed text-text-subtle">&ldquo;{t.message}&rdquo;</p>
                <div className="mt-5">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-text-subtle">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-6 py-14 text-center sm:px-16">
          <FiCheckCircle className="mx-auto mb-4 text-white" size={32} />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Never miss a great meal</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/85">
            Subscribe for curated restaurant picks, exclusive offers, and new openings near you.
          </p>
          <form onSubmit={handleSubscribe} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border-none px-4 py-3 text-sm text-text outline-none placeholder:text-text-subtle"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-light cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
