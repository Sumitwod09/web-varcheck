import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBullseye, faHeart } from '@fortawesome/free-solid-svg-icons';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/shared/SectionHeading";
import FinalCTA from "@/components/home/FinalCTA";

const values = [
  { icon: <FontAwesomeIcon icon={faBullseye} size="xl" />, title: "Ship Fast", description: "We believe in speed-to-market. Your idea deserves to be in users' hands — not stuck in an endless development cycle." },
  { icon: <FontAwesomeIcon icon={faHeart} size="xl" />, title: "Stay Honest", description: "No hidden costs. No vague timelines. We tell you exactly what it takes and deliver exactly what we promise." },
  { icon: <FontAwesomeIcon icon={faUsers} size="xl" />, title: "Think Partnership", description: "We're not vendors. We're your extended tech team. Your success is our success — it's that simple." },
];

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-dark section-padding pt-32 md:pt-40">
          <div className="container-main">
            <SectionHeading
              badge="About Varcheck"
              title="The Solution that thinks like a startup, executes like an enterprise."
              description="We're a full-stack software development solution based in India, building apps, websites, and custom software for clients worldwide."
              dark
            />
          </div>
        </section>

        <section className="section-light section-padding">
          <div className="container-main max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-display-lg text-varcheck-light-text mb-6">Our Story</h2>
              <div className="space-y-4 font-body text-base text-varcheck-light-muted leading-relaxed">
                <p>
                  Varcheck was born from a simple observation: too many great ideas die because building software is expensive, slow, and confusing. Agencies overpromise, underdeliver, and charge a fortune for it.
                </p>
                <p>
                  We decided to do things differently. We keep our team lean, our processes transparent, and our pricing honest. Whether you're a solo founder bootstrapping an MVP or an enterprise scaling a platform — you get the same quality, the same commitment, the same results.
                </p>
                <p>
                  Based in India with clients across the globe, we combine local affordability with international delivery standards. No timezone excuses. No communication gaps. Just great software, shipped fast.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-surface section-padding">
          <div className="container-main">
            <SectionHeading badge="Our Values" title="What drives us" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-light text-center"
                >
                  <div className="inline-flex w-12 h-12 rounded-xl bg-varcheck-accent/10 items-center justify-center text-varcheck-accent mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-varcheck-light-text">{v.title}</h3>
                  <p className="mt-3 font-body text-sm text-varcheck-light-muted leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
