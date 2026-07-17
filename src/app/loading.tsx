export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-white)',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          border: '1.5px solid var(--color-gray-mid)',
          borderTopColor: 'var(--color-black)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          color: 'var(--color-gray-label)',
        }}
      >
        Initializing
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
