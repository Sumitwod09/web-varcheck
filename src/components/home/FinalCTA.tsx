import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT_CHANNELS } from "@/lib/constants";

const FinalCTA = () => {
  return (
    <section className="section-dark relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="container-main px-6 py-24 md:py-32 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display-xl text-varcheck-dark-text">
            Ready to build something{" "}
            <span className="text-varcheck-accent">great?</span>
          </h2>
          <p className="mt-4 font-body text-lg text-varcheck-dark-muted max-w-xl mx-auto">
            Tell us about your project. We'll get back to you within 24 hours with a clear plan and honest quote.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-varcheck-accent hover:bg-varcheck-accent-light text-primary-foreground font-body text-base font-medium px-7 py-3.5 rounded-lg transition-all duration-200 glow-accent"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${CONTACT_CHANNELS.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-varcheck-whatsapp text-varcheck-dark font-body text-base font-medium px-7 py-3.5 rounded-lg transition-all duration-200 hover:opacity-90"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
