import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Smartphone, Monitor, Code, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import SectionHeading from "@/components/shared/SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={28} />,
  Monitor: <Monitor size={28} />,
  Code: <Code size={28} />,
};

const ServicesSection = () => {
  return (
    <section className="section-light section-padding">
      <div className="container-main">
        <SectionHeading
          badge="What We Do"
          title="Three services. One team. Zero handoffs."
          description="From mobile apps to enterprise platforms, we handle the full stack so you can focus on growing your business."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={`/services/${service.slug}`} className="card-light block h-full group">
                <div className="text-varcheck-accent mb-4">
                  {iconMap[service.icon]}
                </div>
                <h3 className="font-display text-display-md text-varcheck-light-text">{service.shortTitle}</h3>
                <p className="mt-3 font-body text-sm text-varcheck-light-muted leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 font-body text-sm font-medium text-varcheck-accent group-hover:gap-3 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
