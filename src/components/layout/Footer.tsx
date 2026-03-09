import { Link } from "react-router-dom";
import { FOOTER_LINKS, CONTACT_CHANNELS } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-dark border-t border-varcheck-dark-border">
      <div className="container-main px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold text-varcheck-dark-text tracking-tight">
              VARCHECK
            </Link>
            <p className="mt-4 font-body text-sm text-varcheck-dark-muted leading-relaxed">
              The agency that thinks like a startup, executes like an enterprise.
            </p>
            <a
              href={`https://wa.me/${CONTACT_CHANNELS.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-varcheck-whatsapp text-varcheck-dark font-body text-sm font-medium px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold text-varcheck-dark-text mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="font-body text-sm text-varcheck-dark-muted hover:text-varcheck-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-sm font-bold text-varcheck-dark-text mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="font-body text-sm text-varcheck-dark-muted hover:text-varcheck-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-varcheck-dark-text mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="font-body text-sm text-varcheck-dark-muted">
                {CONTACT_CHANNELS.email.address}
              </li>
              <li className="font-body text-sm text-varcheck-dark-muted">
                {CONTACT_CHANNELS.phone.number}
              </li>
              <li>
                <a
                  href={CONTACT_CHANNELS.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-varcheck-dark-muted hover:text-varcheck-accent transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-varcheck-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-varcheck-dark-muted">
            © {new Date().getFullYear()} Varcheck. All rights reserved.
          </p>
          <p className="font-body text-xs text-varcheck-dark-muted">
            Built with conviction in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
