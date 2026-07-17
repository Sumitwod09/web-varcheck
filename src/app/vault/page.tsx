'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldIcon, CheckIcon, WarningIcon } from '@/components/icons';
import styles from './page.module.css';

interface Loop {
  id: string;
  clientName: string;
  address: string;
  status: 'Pending Upload' | 'Processing OCR' | 'Completed' | 'Purged';
  purgeTime: string;
  requiredDocs: string[];
}

function VaultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const txId = searchParams.get('tx') || 'TX-83921';
  const clientName = searchParams.get('client') || 'Bob Miller';
  const address = searchParams.get('addr') || '88 Yorkville Ave';

  const [step, setStep] = useState(0);

  // Camera states
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [flash, setFlash] = useState(false);

  // File Upload states
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const triggerShutter = () => {
    setFlash(true);
    setCapturing(true);
    setTimeout(() => setFlash(false), 300);

    setTimeout(() => {
      setCapturing(false);
      setCaptured(true);
    }, 2000);
  };

  const handleFileUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  const completeVerification = () => {
    // Update local loops list to "Completed"
    try {
      const savedLoops = localStorage.getItem('varcheck_loops');
      if (savedLoops) {
        const loops: Loop[] = JSON.parse(savedLoops);
        const index = loops.findIndex((l) => l.id === txId);
        if (index !== -1) {
          loops[index].status = 'Completed';
          loops[index].purgeTime = 'Expires in 23h 59m';
          localStorage.setItem('varcheck_loops', JSON.stringify(loops));
        } else {
          // If transaction was opened directly, prepend a new loop as Completed
          const newLoop: Loop = {
            id: txId,
            clientName,
            address,
            status: 'Completed',
            purgeTime: 'Expires in 23h 59m',
            requiredDocs: ['ID Documents'],
          };
          localStorage.setItem('varcheck_loops', JSON.stringify([newLoop, ...loops]));
        }
      }
    } catch {
      // Storage unavailable
    }
    setStep(3);
  };

  return (
    <div className={styles.vaultPage}>
      <div className={styles.simulatorContainer}>
        {/* PROMO DETAILS (shown on desktop only) */}
        <div className={styles.promoPanel}>
          <h2 className={styles.promoTitle}>Isolated Mobile Browser Vault</h2>
          <p className={styles.promoDesc}>
            This simulator demonstrates what an unrepresented buyer experiences when opening a secure link on their mobile device. 
            No logins, passwords, or app installations are required.
          </p>

          <div className={styles.promoStep}>
            <div className={styles.promoStepNum}>1</div>
            <div className={styles.promoStepText}>
              <strong>Secure Handshake</strong>: Buyer opens the unique link sent via SMS/WhatsApp and consents to verify.
            </div>
          </div>

          <div className={styles.promoStep}>
            <div className={styles.promoStepNum}>2</div>
            <div className={styles.promoStepText}>
              <strong>Document Capture</strong>: The browser initiates access to the device camera. Identity documents are scanned locally.
            </div>
          </div>

          <div className={styles.promoStep}>
            <div className={styles.promoStepNum}>3</div>
            <div className={styles.promoStepText}>
              <strong>Auto-Purge Ledger</strong>: Standardized compliance records compile instantly. Raw images and personal records purge within 24 hours.
            </div>
          </div>
        </div>

        {/* MOBILE PHONE SIMULATOR FRAME */}
        <div className={styles.mobileFrame}>
          <div className={styles.notch} />
          
          <div className={styles.phoneScreen}>
            {/* VENDOR HEADER */}
            <div className={styles.vaultHeader}>
              <div className={styles.vaultLogo}>
                <ShieldIcon size={14} />
                <span>Varcheck Vault</span>
              </div>
              <div className={styles.securityBadge}>
                <span>AES-256</span>
              </div>
            </div>

            {/* STEP 0: WELCOME INTAKE */}
            {step === 0 && (
              <>
                <h3 className={styles.stepTitle}>Compliance Request</h3>
                <p className={styles.stepDesc}>
                  Secure pass-through verification required to complete high-value transaction compliance requirements.
                </p>

                <div className={styles.metadataCard}>
                  <div className={styles.metadataRow}>
                    <span className={styles.metadataLabel}>Transaction</span>
                    <span className={styles.metadataValue}>{txId}</span>
                  </div>
                  <div className={styles.metadataRow}>
                    <span className={styles.metadataLabel}>Property</span>
                    <span className={styles.metadataValue}>{address}</span>
                  </div>
                  <div className={styles.metadataRow}>
                    <span className={styles.metadataLabel}>Client</span>
                    <span className={styles.metadataValue}>{clientName}</span>
                  </div>
                </div>

                <div className={styles.stepDesc} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <WarningIcon size={16} className={styles.warningIcon} style={{ flexShrink: 0, color: '#ffcc00', marginTop: '2px' }} />
                  <div>
                    <strong>Notice:</strong> Your identity documents are uploaded directly to the secure processing vault. Raw files are immediately compiled into an archived compliance pack and deleted. Listing agents never have access to raw records.
                  </div>
                </div>

                <button className={styles.beginBtn} onClick={() => setStep(1)}>
                  Begin Secure Intake ➔
                </button>
              </>
            )}

            {/* STEP 1: PHOTO CAPTURE VIEWPORT */}
            {step === 1 && (
              <>
                <h3 className={styles.stepTitle}>Scan Identity Document</h3>
                <p className={styles.stepDesc}>
                  Place the photo page of your Passport or front of your Driver&apos;s License inside the viewport frame.
                </p>

                <div className={styles.viewfinder}>
                  {flash && <div className={styles.flashEffect} />}
                  {!captured && (
                    <>
                      <div className={styles.viewfinderLine} />
                      <div className={styles.cameraScanline} />
                      <div className={styles.cameraPreviewText}>
                        {capturing ? 'Processing scan...' : 'Awaiting document align...'}
                      </div>
                    </>
                  )}

                  {captured && (
                    <div className={styles.cameraPreviewText} style={{ color: '#00ff66', fontSize: '12px' }}>
                      ✓ Document Scan Complete
                    </div>
                  )}
                </div>

                {!captured ? (
                  <button 
                    className={styles.shutterBtn} 
                    onClick={triggerShutter}
                    disabled={capturing}
                    title="Capture document photo"
                  >
                    <div className={styles.shutterBtnInner} />
                  </button>
                ) : (
                  <>
                    <div className={styles.ocrPreview}>
                      <div className={styles.ocrTitle}>Extracted OCR Metadata</div>
                      <div className={styles.metadataRow}>
                        <span className={styles.metadataLabel}>Legal Name</span>
                        <span className={styles.metadataValue}>{clientName}</span>
                      </div>
                      <div className={styles.metadataRow}>
                        <span className={styles.metadataLabel}>Doc Type</span>
                        <span className={styles.metadataValue}>Passport (Verified)</span>
                      </div>
                      <div className={styles.metadataRow}>
                        <span className={styles.metadataLabel}>Status</span>
                        <span className={styles.metadataValue} style={{ color: '#00ff66' }}>Match (100%)</span>
                      </div>
                    </div>

                    <button className={styles.beginBtn} onClick={() => setStep(2)}>
                      Confirm & Continue ➔
                    </button>
                  </>
                )}
              </>
            )}

            {/* STEP 2: OPTIONAL BENEFICIAL OWNERSHIP FILE UPLOAD */}
            {step === 2 && (
              <>
                <h3 className={styles.stepTitle}>Supplementary Artifacts</h3>
                <p className={styles.stepDesc}>
                  Upload corporate registry or proof of funds if representing an entity. Otherwise, you can submit the package now.
                </p>

                <div className={styles.uploadZone} onClick={handleFileUpload}>
                  {uploading ? (
                    <div className={styles.uploadTitle}>Uploading file...</div>
                  ) : uploaded ? (
                    <div className={styles.uploadTitle} style={{ color: '#00ff66' }}>✓ corporate_registry.pdf Uploaded</div>
                  ) : (
                    <>
                      <div className={styles.uploadTitle}>Click to upload corporate registry</div>
                      <div className={styles.uploadSub}>PDF, PNG or JPG files up to 10MB</div>
                    </>
                  )}
                </div>

                <button className={styles.beginBtn} onClick={completeVerification}>
                  Submit Compliance Package
                </button>
              </>
            )}

            {/* STEP 3: SUCCESS & PURGE TIMER */}
            {step === 3 && (
              <>
                <div className={styles.successCircle}>
                  <CheckIcon size={32} />
                </div>
                <h3 className={styles.stepTitle} style={{ textAlign: 'center' }}>Intake Complete</h3>
                <p className={styles.stepDesc} style={{ textAlign: 'center' }}>
                  Your identity verification has been processed and compiled.
                </p>

                <div className={styles.timeline}>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineCheck}>✓</span>
                    <div>
                      <div className={styles.timelineLabel}>Compliance Pack Generated</div>
                      <div className={styles.timelineSub}>Intake ledger archived under token {txId}</div>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <span className={styles.timelineCheck}>✓</span>
                    <div>
                      <div className={styles.timelineLabel}>Dispatched to Broker Portal</div>
                      <div className={styles.timelineSub}>Sent to compliance operations queue</div>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <span className={styles.timelineCheck}>✓</span>
                    <div>
                      <div className={styles.timelineLabel}>Auto-Purge Triggered</div>
                      <div className={styles.timelineSub} style={{ color: '#ffcc00' }}>
                        Raw files scheduler: 23h 59m remaining until deletion
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  className={styles.beginBtn} 
                  style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', marginTop: '2rem' }}
                  onClick={() => router.push('/workspace')}
                >
                  Return to Workspace
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default function VaultPage() {
  return (
    <Suspense fallback={<div className={styles.vaultPage}>Loading Vault...</div>}>
      <VaultContent />
    </Suspense>
  );
}
