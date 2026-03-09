import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

const ProcessSection = () => {
  return (
    <section className="section-surface section-padding">
      <div className="container-main">
        <SectionHeading
          badge="Our Process"
          title="How we work"
          description="A simple, transparent process that keeps you in control at every stage."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-light relative"
            >
              <span className="font-mono text-5xl font-bold text-varcheck-accent/10 absolute top-4 right-4">
                {step.step}
              </span>
              <h3 className="font-display text-lg font-bold text-varcheck-light-text mt-6">{step.title}</h3>
              <p className="mt-3 font-body text-sm text-varcheck-light-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
