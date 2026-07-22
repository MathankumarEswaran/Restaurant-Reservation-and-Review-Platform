import { motion } from "framer-motion";
import { FiTarget, FiEye, FiAward } from "react-icons/fi";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import aboutHeroImage from "../../assets/restaurants/thali-1.jpg";
import missionBgImage from "../../assets/restaurants/sambar.jpg";
import statsBgImage from "../../assets/restaurants/idli-coffee.jpg";

const stats = [
  { label: "Restaurants Listed", value: "6" },
  { label: "Reservations Made", value: "12K+" },
  { label: "Verified Reviews", value: "3.6K+" },
  { label: "Cities Covered", value: "2" },
];

export function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-secondary py-20">
        <img src={aboutHeroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "About" }]} />
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">About Chennai Traditions Reserved</h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-subtle">
            We're on a mission to connect diners with the authentic flavors of Tamil Nadu — one reservation at a time.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <img src={missionBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 blur-[1px]" />
        <div className="absolute inset-0 bg-surface/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-surface-raised p-8 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiTarget size={22} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-text">Our Mission</h2>
              <p className="mt-2 leading-relaxed text-text-muted">
                To make discovering and booking great restaurants effortless, transparent, and enjoyable for everyone —
                while helping restaurants thrive through honest reviews and smart tools.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-surface-raised p-8 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-dark">
                <FiEye size={22} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-text">Our Vision</h2>
              <p className="mt-2 leading-relaxed text-text-muted">
                A world where every dining experience — from a decades-old neighborhood mess to a celebrated culinary
                institution — is one search away, backed by a community that genuinely cares about good food.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <img src={statsBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 blur-[1px]" />
        <div className="absolute inset-0 bg-white/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="text-center"
              >
                <FiAward className="mx-auto mb-2 text-primary" size={22} />
                <p className="text-3xl font-bold text-text">{stat.value}</p>
                <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
