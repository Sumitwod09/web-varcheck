'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ShieldIcon,
  LinkIcon,
  ScanIcon,
  ClockIcon,
  ArrowIcon,
  CheckIcon,
  LockIcon,
} from '@/components/icons';
import WireframeLoader from '@/components/WireframeLoader';
import styles from './page.module.css';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// Animated counter component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <div ref={ref} className={styles.telemetryValue}>{count.toLocaleString()}{suffix}</div>;
}

export default function LandingPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.96]);

  // Navbar scroll state
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Defer 3D Canvas loading to reduce TBT and improve initial LCP
  const [load3D, setLoad3D] = useState(false);
  useEffect(() => {
    const triggerLoad = () => {
      setLoad3D(true);
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener('scroll', triggerLoad);
      window.removeEventListener('mousemove', triggerLoad);
      window.removeEventListener('touchstart', triggerLoad);
    };
    window.addEventListener('scroll', triggerLoad, { passive: true });
    window.addEventListener('mousemove', triggerLoad, { passive: true });
    window.addEventListener('touchstart', triggerLoad, { passive: true });

    const timer = setTimeout(triggerLoad, 4000);
    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Section refs for scroll animations
  const problemRef = useRef(null);
  const howRef = useRef(null);
  const priceRef = useRef(null);
  const telemetryRef = useRef(null);

  const problemInView = useInView(problemRef, { once: true, margin: '-100px' });
  const howInView = useInView(howRef, { once: true, margin: '-100px' });
  const priceInView = useInView(priceRef, { once: true, margin: '-100px' });
  const telemetryInView = useInView(telemetryRef, { once: true, margin: '-100px' });

  return (
    <main>
      {/* ============ NAVIGATION ============ */}
      <nav
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}
        id="main-nav"
      >
        <div className={styles.navbarInner}>
          <button
            className={`${styles.navBrand} ${!scrolled ? styles.navBrandTransparent : ''}`}
            onClick={() => scrollTo('hero-section')}
          >
            Varcheck
          </button>
          <ul className={styles.navLinks}>
            <li>
              <button className={styles.navLink} onClick={() => scrollTo('problem-section')}>
                Problem
              </button>
            </li>
            <li>
              <button className={styles.navLink} onClick={() => scrollTo('how-section')}>
                How It Works
              </button>
            </li>
            <li>
              <button className={styles.navLink} onClick={() => scrollTo('pricing-section')}>
                Pricing
              </button>
            </li>
            <li>
              <button className={styles.navLink} onClick={() => scrollTo('telemetry-section')}>
                Telemetry
              </button>
            </li>
            <li>
              <button
                className={styles.navCta}
                onClick={() => router.push('/sign-in')}
                id="nav-cta-btn"
              >
                Get Access
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className={styles.hero} id="hero-section">
        {load3D && <WireframeLoader />}

        <motion.div style={{ opacity: heroOpacity, scale: heroScale, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'center', flex: 1 }}>

        <div className={styles.heroContent}>
          <div className={styles.heroTag}>
            <div className={styles.heroTagDot} />
            <span>Verification Engine v1.0</span>
          </div>

          <h1 className={styles.heroTitle}>
            Varcheck
            <span className={styles.heroTitleAccent}>
              Ad-hoc verification for luxury real estate
            </span>
          </h1>

          <p className={styles.heroDescription}>
            Generate secure intake links from any device. Unrepresented parties upload compliance documents via an isolated mobile vault. Standardized PDF packages transmit directly to your broker - raw data purges within 24 hours.
          </p>

          <button
            className={styles.heroCta}
            onClick={() => router.push('/sign-in')}
            id="hero-cta-btn"
          >
            <span>Generate Verification Link</span>
            <ArrowIcon size={16} />
          </button>
        </div>

        <div className={styles.heroScroll}>
          <span className={styles.heroScrollLabel}>Scroll</span>
          <div className={styles.heroScrollLine} />
        </div>
        </motion.div>
      </section>

      {/* ============ PROBLEM STATEMENT ============ */}
      <motion.section
        className={styles.problem}
        ref={problemRef}
        initial="hidden"
        animate={problemInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        id="problem-section"
      >
        <div className={styles.problemInner}>
          <motion.div className={styles.sectionTag} variants={fadeInUp}>The Compliance Gap</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Enterprise platforms fail luxury agents handling unrepresented parties
          </motion.h2>

          <motion.div className={styles.problemGrid} variants={staggerContainer}>
            <motion.div className={styles.problemCard} variants={fadeInUp}>
              <div className={styles.problemCardIcon}>
                <LockIcon size={20} />
              </div>
              <h3 className={styles.problemCardTitle}>Institutional Friction</h3>
              <p className={styles.problemCardText}>
                Managing brokers block complex, top-down software suite integration due to institutional liability exposure. Agents cannot deploy enterprise compliance tools without corporate IT approval cycles.
              </p>
            </motion.div>

            <motion.div className={styles.problemCard} variants={fadeInUp}>
              <div className={styles.problemCardIcon}>
                <ShieldIcon size={20} />
              </div>
              <h3 className={styles.problemCardTitle}>Privacy Resistance</h3>
              <p className={styles.problemCardText}>
                High-net-worth buyers decline to surrender physical passports or corporate wealth verification letters to an opposing broker for capture on personal devices. Trust barriers kill deal velocity.
              </p>
            </motion.div>

            <motion.div className={styles.problemCard} variants={fadeInUp}>
              <div className={styles.problemCardIcon}>
                <ClockIcon size={20} />
              </div>
              <h3 className={styles.problemCardTitle}>Regulatory Exposure</h3>
              <p className={styles.problemCardText}>
                Agents face immediate tracking and regulatory liability when executing transactions with unrepresented parties. Manual document collection creates audit trail gaps and compliance risk.
              </p>
            </motion.div>

            <motion.div className={styles.problemCard} variants={fadeInUp}>
              <div className={styles.problemCardIcon}>
                <ScanIcon size={20} />
              </div>
              <h3 className={styles.problemCardTitle}>Data Retention Risk</h3>
              <p className={styles.problemCardText}>
                Standard platforms store sensitive identity data indefinitely, creating long-term privacy vulnerabilities. No existing solution offers automatic purging within a defined compliance window.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============ HOW IT WORKS ============ */}
      <motion.section
        className={styles.howItWorks}
        ref={howRef}
        initial="hidden"
        animate={howInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        id="how-section"
      >
        <div className={styles.howItWorksInner}>
          <motion.div className={styles.sectionTag} variants={fadeInUp}>System Architecture</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Three-step pass-through verification
          </motion.h2>

          <motion.div className={styles.stepsContainer} variants={staggerContainer}>
            <motion.div className={styles.step} variants={fadeInUp}>
              <div className={styles.stepIndicator}>
                <div className={styles.stepNumber}>01</div>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <LinkIcon size={20} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>Generate Secure Link</h3>
                <p className={styles.stepText}>
                  From your mobile browser or desktop terminal at an active showing, generate a unique, time-limited intake transaction link. Each link maps to a single property address and session record with row-level security.
                </p>
              </div>
            </motion.div>

            <motion.div className={styles.step} variants={fadeInUp}>
              <div className={styles.stepIndicator}>
                <div className={styles.stepNumber}>02</div>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <ScanIcon size={20} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>Buyer Uploads via Mobile Vault</h3>
                <p className={styles.stepText}>
                  The unrepresented party opens the link on their own device. HTML5 native camera integration captures identity documents directly into an isolated encrypted vault. No app download required.
                </p>
              </div>
            </motion.div>

            <motion.div className={styles.step} variants={fadeInUp}>
              <div className={styles.stepIndicator}>
                <div className={styles.stepNumber}>03</div>
              </div>
              <div className={styles.stepContent}>
                <ShieldIcon size={20} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>Broker Receives PDF Package</h3>
                <p className={styles.stepText}>
                  The system verifies data completeness, compiles a standardized compliance PDF, and transmits it directly to the broker workflow. Raw identity records purge from the database within 24 hours.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============ PRICE MATRIX ============ */}
      <motion.section
        className={styles.priceMatrix}
        ref={priceRef}
        initial="hidden"
        animate={priceInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        id="pricing-section"
      >
        <div className={styles.priceMatrixInner}>
          <motion.div className={styles.priceSectionTag} variants={fadeInUp}>Price Matrix</motion.div>
          <motion.h2 className={styles.priceSectionTitle} variants={fadeInUp}>
            Transparent per-transaction pricing
          </motion.h2>

          <motion.div className={styles.priceGrid} variants={staggerContainer}>
            <motion.div className={styles.priceCard} variants={fadeInUp}>
              <div className={styles.priceTierLabel}>tier_standard</div>
              <h3 className={styles.priceTierName}>Standard Verification</h3>
              <div className={styles.priceAmount}>
                $29 <span className={styles.priceUnit}>/ transaction</span>
              </div>
              <p className={styles.priceDescription}>
                Single-session compliance pass for standard residential transactions with unrepresented buyers.
              </p>
              <ul className={styles.priceFeatures}>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>Secure link generation</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>Mobile document vault</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>Standardized PDF compilation</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>24-hour auto-purge</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>Email delivery to broker</span>
                </li>
              </ul>
              <button
                className={`${styles.priceBtn} ${styles.priceBtnSecondary}`}
                onClick={() => router.push('/sign-in')}
                id="pricing-standard-btn"
              >
                Select Standard
              </button>
            </motion.div>

            <motion.div className={`${styles.priceCard} ${styles.priceCardFeatured}`} variants={fadeInUp}>
              <div className={styles.popularBadge}>Recommended</div>
              <div className={styles.priceTierLabel}>tier_velocity</div>
              <h3 className={styles.priceTierName}>Velocity Processing</h3>
              <div className={styles.priceAmount}>
                $79 <span className={styles.priceUnit}>/ transaction</span>
              </div>
              <p className={styles.priceDescription}>
                Priority compliance processing with expanded verification coverage for luxury transactions exceeding $2M.
              </p>
              <ul className={styles.priceFeatures}>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>All Standard features</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>Priority processing queue</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>OCR identity extraction</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>Wealth source verification letter</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>Dedicated compliance officer review</span>
                </li>
                <li className={styles.priceFeature}>
                  <CheckIcon size={14} className={styles.priceFeatureIcon} />
                  <span>Direct broker portal integration</span>
                </li>
              </ul>
              <button
                className={`${styles.priceBtn} ${styles.priceBtnPrimary}`}
                onClick={() => router.push('/sign-in')}
                id="pricing-velocity-btn"
              >
                Select Velocity
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============ NETWORK TELEMETRY ============ */}
      <motion.section
        className={styles.telemetry}
        ref={telemetryRef}
        initial="hidden"
        animate={telemetryInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        id="telemetry-section"
      >
        <div className={styles.telemetryInner}>
          <motion.div className={styles.sectionTag} variants={fadeInUp}>Network Telemetry</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Live system metrics
          </motion.h2>

          <motion.div className={styles.telemetryGrid} variants={staggerContainer}>
            <motion.div className={styles.telemetryCard} variants={fadeInUp}>
              <AnimatedCounter target={1247} />
              <div className={styles.telemetryLabel}>Sessions Initiated</div>
            </motion.div>

            <motion.div className={styles.telemetryCard} variants={fadeInUp}>
              <AnimatedCounter target={89} />
              <div className={styles.telemetryLabel}>Active Verifications</div>
              <div className={styles.telemetryStatus}>
                <div className={styles.telemetryStatusDot} />
                <span>Processing</span>
              </div>
            </motion.div>

            <motion.div className={styles.telemetryCard} variants={fadeInUp}>
              <AnimatedCounter target={99} suffix="%" />
              <div className={styles.telemetryLabel}>System Uptime</div>
            </motion.div>

            <motion.div className={styles.telemetryCard} variants={fadeInUp}>
              <AnimatedCounter target={342} />
              <div className={styles.telemetryLabel}>Records Purged</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============ FOOTER ============ */}
      <footer className={styles.footer} id="footer">
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <span className={styles.footerBrand}>Varcheck</span>
            <span className={styles.footerCopy}>{new Date().getFullYear()} Varcheck Systems. All rights reserved.</span>
          </div>
          <div className={styles.footerStatus}>
            <div className={styles.footerStatusDot} />
            <span>All systems operational</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
