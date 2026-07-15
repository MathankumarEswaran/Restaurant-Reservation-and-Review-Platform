import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Category } from "../../types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/restaurants?cuisine=${encodeURIComponent(category.name)}`}
        className="group relative block h-36 overflow-hidden rounded-2xl shadow-sm"
      >
        <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-semibold text-white">{category.name}</h3>
          <p className="text-xs text-white/75">{category.restaurantCount} places</p>
        </div>
      </Link>
    </motion.div>
  );
}
