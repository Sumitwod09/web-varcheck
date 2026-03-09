import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

const StatsBar = () => {
  return (
    <section className="bg-varcheck-dark-surface border-y border-varcheck-dark-border">
      <div className="container-main px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-varcheck-accent">
                {stat.value}
              </div>
              <div className="mt-2 font-body text-sm text-varcheck-dark-muted">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
