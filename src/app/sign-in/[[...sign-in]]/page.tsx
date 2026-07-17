'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldIcon, LockIcon } from '@/components/icons';
import styles from '@/styles/auth.module.css';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Set test session
      localStorage.setItem('varcheck_user', JSON.stringify({
        email,
        name: email.split('@')[0],
        role: 'agent'
      }));
      router.push('/workspace');
    }, 800);
  };

  const handleDemoAccess = () => {
    setLoading(true);
    setTimeout(() => {
      // Set sandbox demo user session
      localStorage.setItem('varcheck_user', JSON.stringify({
        email: 'demo@varcheck.com',
        name: 'James Vance (Demo)',
        role: 'agent'
      }));
      router.push('/workspace');
    }, 500);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.logoArea}>
          <ShieldIcon size={32} />
          <h1 className={styles.logoTitle}>Varcheck</h1>
          <span className={styles.logoSub}>Compliance Portal v1.0.0</span>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>@</span>
              <input
                type="email"
                className={styles.input}
                placeholder="agent@brokerage.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <LockIcon size={16} />
              </span>
              <input
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.divider}>or</div>

        <button onClick={handleDemoAccess} className={styles.demoBtn} disabled={loading}>
          {loading ? 'Entering Sandbox...' : 'Access Test Sandbox (Demo Mode)'}
        </button>

        <div className={styles.footerText}>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className={styles.link}>
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
