import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT_CHANNELS } from "@/lib/constants";

const Hero = () => {
  return (
    <section className="section-dark relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 gradient-mesh" />

      <div className="container-main px-6 relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-varcheck-accent mb-6 px-3 py-1 rounded-full border border-varcheck-dark-border bg-varcheck-dark-surface">
              Software Development Agency
            </span>
          </motion.div>

          <motion.h1
            className="text-display-2xl text-varcheck-dark-text leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Your idea.{" "}
            <span className="text-varcheck-accent">Shipped fast.</span>
            <br />
            Built to last.
          </motion.h1>

          <motion.p
            className="mt-6 font-body text-lg md:text-xl text-varcheck-dark-muted max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We build apps, websites, and custom software for startups, SMBs, and enterprises.
            India-based team, global delivery standards.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-varcheck-accent hover:bg-varcheck-accent-light text-primary-foreground font-body text-base font-medium px-7 py-3.5 rounded-lg transition-all duration-200 glow-accent hover:shadow-xl"
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
            <Link
              to="/work"
              className="inline-flex items-center gap-2 border border-varcheck-dark-border text-varcheck-dark-text font-body text-base font-medium px-7 py-3.5 rounded-lg transition-all duration-200 hover:border-varcheck-accent hover:text-varcheck-accent"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
