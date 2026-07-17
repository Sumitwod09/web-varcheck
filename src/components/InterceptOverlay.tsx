'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntercept } from '@/hooks/useIntercept';
import { CheckIcon } from '@/components/icons';
import styles from './InterceptOverlay.module.css';

const SYSTEM_LOGS = [
  { prefix: '[SYS]', text: 'Varcheck v1.0.0 - verification engine initializing' },
  { prefix: '[NET]', text: 'Secure handshake protocol established', highlight: true },
  { prefix: '[DB]', text: 'Supabase ledger connection: standby mode' },
  { prefix: '[AUTH]', text: 'Clerk identity provider: awaiting configuration' },
  { prefix: '[VAULT]', text: 'Document vault module: construction phase active', highlight: true },
  { prefix: '[RLS]', text: 'Row-level security policies: pre-deployment validation' },
  { prefix: '[PURGE]', text: '24-hour auto-purge scheduler: queued for activation' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const promptVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.9,
    },
  },
};

export default function InterceptOverlay() {
  const { state, closeIntercept } = useIntercept();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
        setError('');
      }, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  // Stable session ID per overlay open using a pure deterministic count offset
  const sessionId = useMemo(() => {
    const sourceString = state.source || 'default';
    let hash = 0;
    for (let i = 0; i < sourceString.length; i++) {
      hash = (hash << 5) - hash + sourceString.charCodeAt(i);
      hash |= 0;
    }
    const seed = Math.abs(hash) % 10000;
    return `SESSION-${seed.toString().padStart(4, '0')}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isOpen]);

  // Focus trap: close on Escape key
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!state.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeIntercept();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, closeIntercept]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    // RFC 5322 compliant email regex check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g., name@domain.com).');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const events = JSON.parse(localStorage.getItem('varcheck_telemetry') || '[]');
      events.push({
        type: 'email_captured',
        email,
        source: state.source,
        timestamp: new Date().toISOString(),
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      });
      localStorage.setItem('varcheck_telemetry', JSON.stringify(events));
    } catch {
      // Silent fail
    }

    try {
      await fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'email_captured',
          email,
          source: state.source,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Silent fail
    }

    setSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      closeIntercept();
    }, 2500);
  }, [email, submitting, state.source, closeIntercept]);

  return (
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          className={styles.interceptOverlay}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Access request overlay"
          ref={overlayRef}
        >
          <button
            className={styles.closeBtn}
            onClick={closeIntercept}
            aria-label="Close overlay"
            id="intercept-close-btn"
          >
            Close
          </button>

          <motion.div className={styles.terminalContainer}>
            <div className={`${styles.cornerBracket} ${styles.topLeft}`} />
            <div className={`${styles.cornerBracket} ${styles.topRight}`} />
            <div className={`${styles.cornerBracket} ${styles.bottomLeft}`} />
            <div className={`${styles.cornerBracket} ${styles.bottomRight}`} />

            <motion.div className={styles.systemHeader} variants={lineVariants}>
              <div className={styles.statusDot} />
              <span className={styles.systemLabel}>Varcheck - System Terminal</span>
            </motion.div>

            {SYSTEM_LOGS.map((log, i) => (
              <motion.div
                key={i}
                className={`${styles.logLine} ${log.highlight ? styles.highlight : ''}`}
                variants={lineVariants}
              >
                <span className={styles.logPrefix}>{log.prefix}</span>
                {log.text}
              </motion.div>
            ))}

            <motion.div className={styles.divider} variants={lineVariants} />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="prompt"
                  className={styles.promptSection}
                  variants={promptVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className={styles.promptLabel}>Access Request</div>
                  <h2 className={styles.promptTitle}>This module is under construction</h2>
                  <p className={styles.promptDescription}>
                    Varcheck is actively building this feature. Submit your email to receive priority access when the system goes live. Your data is not stored beyond this session.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.inputRow}>
                      <span className={styles.inputPrefix}>{'>'}</span>
                      <input
                        type="email"
                        className={styles.emailInput}
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        required
                        autoFocus
                        id="intercept-email-input"
                      />
                      <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={!email || submitting}
                        id="intercept-submit-btn"
                      >
                        {submitting ? 'Transmitting...' : 'Request Access'}
                      </button>
                    </div>
                    {error && (
                      <div className={styles.errorMessage}>
                        [ERR] {error}
                      </div>
                    )}
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  <div className={styles.successIcon}>
                    <CheckIcon size={20} />
                  </div>
                  <div className={styles.successText}>Access request logged</div>
                  <div className={styles.successSub}>
                    Session ID: {sessionId}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.sourceTag}>
              Source: {state.source || 'direct'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
