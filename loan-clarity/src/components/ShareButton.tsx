import { useState } from 'react';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      style={{
        background: copied ? 'var(--green)' : 'var(--surface2)',
        border: `1px solid ${copied ? 'var(--green)' : 'var(--border)'}`,
        borderRadius: 8,
        padding: '10px 20px',
        color: copied ? '#000' : 'var(--text)',
        cursor: 'pointer',
        fontSize: '0.78rem',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span>{copied ? '✓' : '↗'}</span>
      {copied ? 'Link copied' : 'Share this calculation'}
    </button>
  );
}
