import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen, faLaptop, faCode, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { SERVICES } from "@/lib/services";
import { CONTACT_CHANNELS } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <FontAwesomeIcon icon={faMobileScreen} size="2xl" />,
  Monitor: <FontAwesomeIcon icon={faLaptop} size="2xl" />,
  Code: <FontAwesomeIcon icon={faCode} size="2xl" />,
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="section-dark min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-display-xl text-varcheck-dark-text">Service not found</h1>
            <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-varcheck-accent font-body">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to services
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="section-dark section-padding pt-32 md:pt-40">
          <div className="container-main">
            <Link to="/services" className="inline-flex items-center gap-2 text-varcheck-dark-muted hover:text-varcheck-accent font-body text-sm mb-8 transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} /> All Services
            </Link>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="text-varcheck-accent mb-6">{iconMap[service.icon]}</div>
              <h1 className="text-display-2xl text-varcheck-dark-text">{service.title}</h1>
              <p className="mt-6 font-body text-lg text-varcheck-dark-muted max-w-2xl leading-relaxed">{service.description}</p>
            </motion.div>
          </div>
        </section>

        <section className="section-light section-padding">
          <div className="container-main max-w-3xl">
            <h2 className="text-display-lg text-varcheck-light-text mb-8">What's included</h2>
            <div className="space-y-4">
              {service.features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card-light flex items-start gap-4"
                >
                  <span className="mt-1 w-2 h-2 rounded-full bg-varcheck-accent flex-shrink-0" />
                  <span className="font-body text-base text-varcheck-light-text">{f}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-display-md text-varcheck-light-text mb-4">Interested in this service?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-varcheck-accent hover:bg-varcheck-accent-light text-primary-foreground font-body text-base font-medium px-7 py-3.5 rounded-lg transition-all glow-accent"
                >
                  Get a Quote <FontAwesomeIcon icon={faArrowRight} size="lg" />
                </Link>
                <a
                  href={`https://wa.me/${CONTACT_CHANNELS.whatsapp.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-varcheck-whatsapp text-varcheck-dark font-body text-base font-medium px-7 py-3.5 rounded-lg hover:opacity-90 transition-all"
                >
                  <FontAwesomeIcon icon={faWhatsapp} size="lg" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetailPage;
