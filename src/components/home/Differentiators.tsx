import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faShieldHalved, faLayerGroup, faGlobe } from '@fortawesome/free-solid-svg-icons';

import { DIFFERENTIATORS } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <FontAwesomeIcon icon={faBolt} size={24} />,
  Shield: <FontAwesomeIcon icon={faShieldHalved} size={24} />,
  Layers: <FontAwesomeIcon icon={faLayerGroup} size={24} />,
  Globe: <FontAwesomeIcon icon={faGlobe} size={24} />,
};

const Differentiators = () => {
  return (
    <section className="section-light section-padding">
      <div className="container-main">
        <SectionHeading
          badge="Why Varcheck"
          title="Built different. Delivered better."
          description="Four pillars that set us apart from every other solution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-light flex gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-varcheck-accent/10 flex items-center justify-center text-varcheck-accent">
                {iconMap[item.icon]}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-varcheck-light-text">{item.title}</h3>
                <p className="mt-2 font-body text-sm text-varcheck-light-muted leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
