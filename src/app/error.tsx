'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-black)',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.4)',
          marginBottom: '2rem',
        }}
      >
        [SYS] Runtime Exception
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 600,
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          color: 'var(--color-white)',
          marginBottom: '0.75rem',
        }}
      >
        Something went wrong
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.35)',
          lineHeight: 1.65,
          maxWidth: '480px',
          marginBottom: '2rem',
        }}
      >
        {error.message || 'An unexpected error occurred in the verification engine.'}
      </p>

      <button
        onClick={reset}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--color-black)',
          background: 'var(--color-white)',
          padding: '0.75rem 1.5rem',
          borderRadius: '2px',
          border: 'none',
          cursor: 'pointer',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Retry Connection
      </button>

      {error.digest && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.15)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '2rem',
          }}
        >
          Digest: {error.digest}
        </div>
      )}
    </div>
  );
}
