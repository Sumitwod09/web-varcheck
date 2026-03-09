import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Smartphone, Monitor, Code, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/shared/SectionHeading";
import FinalCTA from "@/components/home/FinalCTA";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={32} />,
  Monitor: <Monitor size={32} />,
  Code: <Code size={32} />,
};

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-dark section-padding pt-32 md:pt-40">
          <div className="container-main">
            <SectionHeading
              badge="Our Services"
              title="Three services. One team. Zero handoffs."
              description="Everything you need to take your product from idea to launch and beyond."
              dark
            />
          </div>
        </section>

        <section className="section-light section-padding">
          <div className="container-main space-y-12">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-light grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <div className="text-varcheck-accent mb-4">{iconMap[service.icon]}</div>
                  <h3 className="text-display-lg text-varcheck-light-text">{service.title}</h3>
                  <p className="mt-4 font-body text-base text-varcheck-light-muted leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 mt-6 font-body text-sm font-medium text-varcheck-accent hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-varcheck-light-text mb-4 uppercase tracking-wider">What's included</h4>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 font-body text-sm text-varcheck-light-muted">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-varcheck-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
