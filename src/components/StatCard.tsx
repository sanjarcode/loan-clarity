interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: 'amber' | 'green' | 'red' | 'default';
  large?: boolean;
}

export function StatCard({ label, value, sub, accent = 'default', large }: StatCardProps) {
  const accentColor = accent === 'amber' ? 'var(--amber)'
    : accent === 'green' ? 'var(--green)'
    : accent === 'red' ? 'var(--red)'
    : 'var(--text)';

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '20px 20px',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
        {label}
      </span>
      <span className="mono" style={{
        fontSize: large ? '1.75rem' : '1.25rem',
        fontWeight: 500,
        color: accentColor,
        lineHeight: 1.1,
      }}>
        {value}
      </span>
      {sub && (
        <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{sub}</span>
      )}
    </div>
  );
}
