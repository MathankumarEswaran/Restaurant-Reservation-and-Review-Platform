import { motion } from "framer-motion";
import { GiKnifeFork } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import { ButtonLink } from "../../components/common/Button";

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <GiKnifeFork size={48} />
      </motion.div>
      <h1 className="mt-8 text-6xl font-bold text-text">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-text">This table doesn't exist</h2>
      <p className="mt-2 max-w-sm text-text-muted">
        The page you're looking for may have been moved or deleted. Let's get you back to something delicious.
      </p>
      <ButtonLink to="/" size="lg" icon={<FiHome />} className="mt-8">
        Return Home
      </ButtonLink>
    </div>
  );
}
