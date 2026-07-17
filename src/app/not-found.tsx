import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-white)',
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
          textTransform: 'uppercase' as const,
          color: 'var(--color-gray-label)',
          marginBottom: '2rem',
        }}
      >
        Error 404
      </div>

      <h1
        style={{
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'var(--color-black)',
          marginBottom: '1rem',
        }}
      >
        Page Not Found
      </h1>

      <p
        style={{
          fontSize: '1rem',
          color: 'var(--color-gray-label)',
          lineHeight: 1.65,
          maxWidth: '440px',
          marginBottom: '2.5rem',
        }}
      >
        The verification link you followed may have expired or the page has been relocated. All sessions are time-limited for security.
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--color-black)',
          color: 'var(--color-white)',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.025em',
          padding: '1rem 2rem',
          borderRadius: '4px',
          textDecoration: 'none',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Return to Terminal
      </Link>

      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          color: 'var(--color-gray-label)',
          opacity: 0.5,
        }}
      >
        Varcheck v1.0.0
      </div>
    </div>
  );
}
