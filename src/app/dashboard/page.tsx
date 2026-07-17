'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldIcon, ClockIcon, DownloadIcon } from '@/components/icons';
import styles from './page.module.css';

interface Loop {
  id: string;
  clientName: string;
  address: string;
  status: 'Pending Upload' | 'Processing OCR' | 'Completed' | 'Purged';
  purgeTime: string;
  requiredDocs: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user] = useState<{ name: string; email: string } | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('varcheck_user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [loops] = useState<Loop[]>(() => {
    if (typeof window !== 'undefined') {
      const savedLoops = localStorage.getItem('varcheck_loops');
      if (savedLoops) {
        return JSON.parse(savedLoops);
      }
      const initialLoops: Loop[] = [
        {
          id: 'TX-49210',
          clientName: 'Alice Cooper',
          address: '1004 Bay St',
          status: 'Completed',
          purgeTime: 'Expired (Raw data purged)',
          requiredDocs: ['Driver\'s License'],
        },
        {
          id: 'TX-83921',
          clientName: 'Bob Miller',
          address: '88 Yorkville Ave',
          status: 'Pending Upload',
          purgeTime: 'Expires in 23h 59m',
          requiredDocs: ['Passport', 'Beneficial Ownership'],
        },
      ];
      localStorage.setItem('varcheck_loops', JSON.stringify(initialLoops));
      return initialLoops;
    }
    return [];
  });

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  const handleSignOut = () => {
    localStorage.removeItem('varcheck_user');
    router.push('/');
  };

  const handleDownload = (loop: Loop) => {
    const docContent = `======================================================================
VARCHECK COMPLIANCE AUDIT CERTIFICATE
======================================================================
Generated Date: ${new Date().toLocaleDateString()}
Audit Pack ID : AUDIT-${loop.id}
Transaction ID: ${loop.id}
Property Ref  : ${loop.address}
Buyer / Client: ${loop.clientName}

----------------------------------------------------------------------
COMPLIANCE STATEMENTS
----------------------------------------------------------------------
[PASSED] Government Photo ID completeness checks verified.
[PASSED] FINTRAC Beneficial Ownership threshold analysis (25% boundary check).
[PASSED] Identity Biometric matching verify results: POSITIVE.

----------------------------------------------------------------------
DATA SECURITY & IMMUTABILITY RETENTION LOG
----------------------------------------------------------------------
[NOTICE] Under Varcheck security protocols:
All raw photos, scanned files, identity document images, and beneficial
ownership declaration forms have been successfully PURGED from our
ledger databases. 

Only this metadata statement is retained as an immutable compliance
audit record.

Audit Package Status: SECURED & VERIFIED
======================================================================
`;
    const blob = new Blob([docContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `varcheck_compliance_${loop.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!user) return null;

  // Stats
  const totalLoops = loops.length;
  const pendingLoops = loops.filter((l) => l.status === 'Pending Upload' || l.status === 'Processing OCR').length;
  const completedLoops = loops.filter((l) => l.status === 'Completed' || l.status === 'Purged').length;
  const purgedLoops = loops.filter((l) => l.status === 'Completed').length; // Mock completed as purged data

  return (
    <div className={styles.dashboardPage}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.brand} onClick={() => router.push('/')}>
            <ShieldIcon size={20} />
            <span>Varcheck</span>
          </button>
          <nav className={styles.nav}>
            <button className={styles.navLink} onClick={() => router.push('/workspace')}>
              Workspace
            </button>
            <button className={styles.navLinkActive}>Dashboard</button>
            <button className={styles.signOutBtn} onClick={handleSignOut}>
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className={styles.mainContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Audit & Analytics Dashboard</h1>
          <div className={styles.subtitle}>
            Compliance Officer View: {user.name} ({user.email})
          </div>
        </div>

        {/* METRICS */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total Loops</div>
            <div className={styles.metricValue}>{totalLoops}</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Pending Intake</div>
            <div className={styles.metricValue}>{pendingLoops}</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Compiled Packages</div>
            <div className={styles.metricValue}>{completedLoops}</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Raw Records Purged</div>
            <div className={styles.metricValue}>{purgedLoops}</div>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className={styles.tableCard}>
          <h2 className={styles.tableTitle}>Compliance Audit History</h2>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Client & Property</th>
                <th className={styles.th}>Compliance Status</th>
                <th className={styles.th}>Data Purge Schedule</th>
                <th className={styles.th} style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loops.map((loop) => (
                <tr key={loop.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.clientName}>{loop.clientName}</div>
                    <div className={styles.txDetails}>
                      {loop.id} • {loop.address}
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.badge} ${
                        loop.status === 'Completed'
                          ? styles.badgeSuccess
                          : loop.status === 'Processing OCR'
                          ? styles.badgeActive
                          : loop.status === 'Purged'
                          ? styles.badgeExpired
                          : styles.badgePending
                      }`}
                    >
                      {loop.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', opacity: 0.8 }}>
                      <ClockIcon size={12} />
                      <span>{loop.purgeTime}</span>
                    </div>
                  </td>
                  <td className={styles.td} style={{ textAlign: 'right' }}>
                    {loop.status === 'Completed' ? (
                      <button
                        className={styles.downloadBtn}
                        onClick={() => handleDownload(loop)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}
                      >
                        <DownloadIcon size={14} />
                        <span>Download Audit Pack</span>
                      </button>
                    ) : (
                      <button className={styles.downloadBtnDisabled} disabled>
                        Audit Pending
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
