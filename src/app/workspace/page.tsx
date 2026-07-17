'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldIcon, LinkIcon, ClockIcon } from '@/components/icons';
import styles from './page.module.css';

interface Loop {
  id: string;
  clientName: string;
  address: string;
  status: 'Pending Upload' | 'Processing OCR' | 'Completed' | 'Purged';
  purgeTime: string;
  requiredDocs: string[];
}

export default function WorkspacePage() {
  const router = useRouter();
  const [user] = useState<{ name: string; email: string } | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('varcheck_user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [loops, setLoops] = useState<Loop[]>(() => {
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

  // Form states
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [reqId, setReqId] = useState(true);
  const [reqBo, setReqBo] = useState(false);
  const [reqPof, setReqPof] = useState(false);

  // Link generation states
  const [generating, setGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedTxId, setGeneratedTxId] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  const handleSignOut = () => {
    localStorage.removeItem('varcheck_user');
    router.push('/');
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !address) return;

    setGenerating(true);
    setLogs([]);
    setGeneratedLink('');

    const txId = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedTxId(txId);

    const logSteps = [
      'Establishing secure end-to-end ledger session...',
      'Generating isolated mobile vault endpoint...',
      'Attaching 24h automatic metadata purge trigger...',
      'Encryption keys generated and bound to session...',
      'Loop initialized successfully.',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setLogs((prev) => [...prev, logSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        const link = `${window.location.origin}/vault?tx=${txId}&client=${encodeURIComponent(clientName)}&addr=${encodeURIComponent(address)}`;
        setGeneratedLink(link);
        setGenerating(false);

        // Add to active loops
        const selectedDocs = [];
        if (reqId) selectedDocs.push("ID Documents");
        if (reqBo) selectedDocs.push("Beneficial Ownership");
        if (reqPof) selectedDocs.push("Proof of Funds");

        const newLoop: Loop = {
          id: txId,
          clientName,
          address,
          status: 'Pending Upload',
          purgeTime: 'Expires in 24h',
          requiredDocs: selectedDocs,
        };

        const updatedLoops = [newLoop, ...loops];
        setLoops(updatedLoops);
        localStorage.setItem('varcheck_loops', JSON.stringify(updatedLoops));

        // Reset inputs
        setClientName('');
        setAddress('');
      }
    }, 450);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return null;

  return (
    <div className={styles.workspacePage}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.brand} onClick={() => router.push('/')}>
            <ShieldIcon size={20} />
            <span>Varcheck</span>
          </button>
          <nav className={styles.nav}>
            <button className={styles.navLinkActive}>Workspace</button>
            <button className={styles.navLink} onClick={() => router.push('/dashboard')}>
              Dashboard
            </button>
            <button className={styles.signOutBtn} onClick={handleSignOut}>
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className={styles.mainContent}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Compliance Workspace</h1>
          <div className={styles.welcomeSubtitle}>
            Authenticated as: {user.name} ({user.email})
          </div>
        </div>

        <div className={styles.grid}>
          {/* LEFT: GENERATE LINK */}
          <div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <LinkIcon size={18} />
                Generate Verification Link
              </h2>

              <form onSubmit={handleGenerate}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Client / Buyer Name</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    placeholder="e.g. John Doe"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Transaction Address / ID</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    placeholder="e.g. 124 Ocean Drive"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Required Artifacts</label>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={reqId}
                        onChange={(e) => setReqId(e.target.checked)}
                      />
                      <span>Driver&apos;s License / Passport</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={reqBo}
                        onChange={(e) => setReqBo(e.target.checked)}
                      />
                      <span>Corporate Registry & beneficial-ownership</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={reqPof}
                        onChange={(e) => setReqPof(e.target.checked)}
                      />
                      <span>Proof of Funds / Wealth Source</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className={styles.generateBtn} disabled={generating}>
                  {generating ? 'Configuring Session...' : 'Generate Secure Link'}
                </button>
              </form>

              {/* Progress Console */}
              {logs.length > 0 && (
                <div className={styles.consoleLog}>
                  {logs.map((log, i) => (
                    <div
                      key={i}
                      className={`${styles.consoleLine} ${
                        log.includes('successfully') ? styles.consoleLineGreen : ''
                      }`}
                    >
                      [+] {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Output Link */}
              {generatedLink && (
                <div className={styles.linkOutput}>
                  <div className={styles.linkTitle}>
                    <span className={styles.consoleLineGreen}>●</span> Session Link Generated
                  </div>
                  <div className={styles.linkValRow}>
                    <div className={styles.linkVal}>{generatedLink}</div>
                    <button className={styles.copyBtn} onClick={copyToClipboard}>
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <button
                    className={styles.simulateBtn}
                    onClick={() => router.push(`/vault?tx=${generatedTxId}`)}
                  >
                    Open Vault Simulator ➔
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: LOOPS LIST */}
          <div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <ClockIcon size={18} />
                Active Compliance Loops
              </h2>

              <div className={styles.loopsList}>
                {loops.length === 0 ? (
                  <div style={{ textAlign: 'center', opacity: 0.4, padding: '2rem' }}>
                    No active compliance loops. Generate a link to get started.
                  </div>
                ) : (
                  loops.map((loop) => (
                    <div key={loop.id} className={styles.loopCard}>
                      <div className={styles.loopInfo}>
                        <div className={styles.loopClient}>{loop.clientName}</div>
                        <div className={styles.loopDetails}>
                          {loop.id} • {loop.address}
                        </div>
                        <div className={styles.loopDetails} style={{ fontSize: '10px' }}>
                          Needs: {loop.requiredDocs.join(', ')}
                        </div>
                      </div>

                      <div className={styles.loopMeta}>
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
                        <div className={styles.purgeTimer}>
                          <ClockIcon size={10} />
                          <span>{loop.purgeTime}</span>
                        </div>
                        {loop.status === 'Completed' && (
                          <button
                            className={styles.actionBtn}
                            onClick={() => router.push('/dashboard')}
                          >
                            View Audit Pack
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
