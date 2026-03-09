import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCommentDots, faPaperPlane, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { CONTACT_CHANNELS } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/shared/SectionHeading";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", service: "", budget: "", message: "" });
    }, 1500);
  };

  const channels = [
    { icon: <FontAwesomeIcon icon={faCommentDots} size={20} />, ...CONTACT_CHANNELS.whatsapp, href: `https://wa.me/${CONTACT_CHANNELS.whatsapp.number}`, color: "bg-varcheck-whatsapp" },
    { icon: <FontAwesomeIcon icon={faEnvelope} size={20} />, ...CONTACT_CHANNELS.email, href: `mailto:${CONTACT_CHANNELS.email.address}`, color: "bg-varcheck-accent" },
    { icon: <FontAwesomeIcon icon={faPhone} size={20} />, ...CONTACT_CHANNELS.phone, href: `tel:${CONTACT_CHANNELS.phone.number}`, color: "bg-varcheck-accent-dark" },
    { icon: <FontAwesomeIcon icon={faLinkedin} size={20} />, ...CONTACT_CHANNELS.linkedin, href: CONTACT_CHANNELS.linkedin.url, color: "bg-blue-600" },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="section-dark section-padding pt-32 md:pt-40">
          <div className="container-main">
            <SectionHeading
              badge="Get in Touch"
              title="Let's build something great together."
              description="Tell us about your project. We respond within 24 hours - usually much faster."
              dark
            />
          </div>
        </section>

        <section className="section-light section-padding">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Channels */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-display text-display-md text-varcheck-light-text mb-6">Reach us directly</h3>
                {channels.map((ch, i) => (
                  <motion.a
                    key={ch.label}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="card-light flex items-center gap-4 group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${ch.color} flex items-center justify-center text-primary-foreground`}>
                      {ch.icon}
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-varcheck-light-text">{ch.label}</p>
                      <p className="font-body text-xs text-varcheck-light-muted">{ch.description}</p>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} size={14} className="ml-auto text-varcheck-light-muted group-hover:text-varcheck-accent transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <form onSubmit={handleSubmit} className="card-light space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-body text-sm font-medium text-varcheck-light-text mb-2">Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-varcheck-light-border bg-varcheck-light font-body text-sm text-varcheck-light-text placeholder:text-varcheck-light-muted focus:outline-none focus:ring-2 focus:ring-varcheck-accent/50 focus:border-varcheck-accent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-varcheck-light-text mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-varcheck-light-border bg-varcheck-light font-body text-sm text-varcheck-light-text placeholder:text-varcheck-light-muted focus:outline-none focus:ring-2 focus:ring-varcheck-accent/50 focus:border-varcheck-accent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-body text-sm font-medium text-varcheck-light-text mb-2">Service</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-varcheck-light-border bg-varcheck-light font-body text-sm text-varcheck-light-text focus:outline-none focus:ring-2 focus:ring-varcheck-accent/50 focus:border-varcheck-accent transition-all"
                      >
                        <option value="">Select a service</option>
                        <option>App Development</option>
                        <option>Web Development</option>
                        <option>Custom Software</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-varcheck-light-text mb-2">Budget Range</label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-varcheck-light-border bg-varcheck-light font-body text-sm text-varcheck-light-text focus:outline-none focus:ring-2 focus:ring-varcheck-accent/50 focus:border-varcheck-accent transition-all"
                      >
                        <option value="">Select budget</option>
                        <option>Under ₹1 Lakh</option>
                        <option>₹1–3 Lakhs</option>
                        <option>₹3–10 Lakhs</option>
                        <option>₹10+ Lakhs</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-varcheck-light-text mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-varcheck-light-border bg-varcheck-light font-body text-sm text-varcheck-light-text placeholder:text-varcheck-light-muted focus:outline-none focus:ring-2 focus:ring-varcheck-accent/50 focus:border-varcheck-accent transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 bg-varcheck-accent hover:bg-varcheck-accent-light text-primary-foreground font-body text-base font-medium px-7 py-3.5 rounded-lg transition-all duration-200 glow-accent disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send Message"}
                    <FontAwesomeIcon icon={faPaperPlane} size={16} />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
