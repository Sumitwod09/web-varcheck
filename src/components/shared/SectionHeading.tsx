import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

const SectionHeading = ({ badge, title, description, align = "center", dark = false }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center max-w-2xl mx-auto" : ""}`}
    >
      {badge && (
        <span className={`inline-block font-mono text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-full border ${
          dark
            ? "text-varcheck-accent border-varcheck-dark-border bg-varcheck-dark-surface"
            : "text-varcheck-accent border-varcheck-light-border bg-varcheck-light"
        }`}>
          {badge}
        </span>
      )}
      <h2 className="text-display-xl">{title}</h2>
      {description && (
        <p className={`mt-4 font-body text-lg leading-relaxed ${
          dark ? "text-varcheck-dark-muted" : "text-varcheck-light-muted"
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
