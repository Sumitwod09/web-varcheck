import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import { TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

const TestimonialsSection = () => {
  return (
    <section className="section-surface section-padding">
      <div className="container-main">
        <SectionHeading
          badge="Testimonials"
          title="What our clients say"
          description="Don't take our word for it — hear from the people we've built for."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-light"
            >
              <FontAwesomeIcon icon={faQuoteLeft} size={24} className="text-varcheck-accent/30 mb-4" />
              <p className="font-body text-sm text-varcheck-light-text leading-relaxed">
                "{item.quote}"
              </p>
              <div className="mt-6 pt-4 border-t border-varcheck-light-border">
                <p className="font-display text-sm font-bold text-varcheck-light-text">{item.name}</p>
                <p className="font-body text-xs text-varcheck-light-muted mt-1">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
