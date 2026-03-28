interface MoratoriumCalloutProps {
  moratoriumMonths: number;
  moratoriumInterest: number;
  effectivePrincipal: number;
  principal: number;
}

const inr = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

export function MoratoriumCallout({ moratoriumMonths, moratoriumInterest, effectivePrincipal, principal }: MoratoriumCalloutProps) {
  if (moratoriumMonths === 0) return null;

  return (
    <div style={{
      background: 'var(--amber-dim)',
      border: '1px solid var(--amber)',
      borderRadius: 10,
      padding: '16px 20px',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>⚠️</span>
      <div>
        <p style={{ margin: 0, color: 'var(--amber)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
          Hidden Cost — Moratorium Capitalization
        </p>
        <p style={{ margin: 0, color: '#fcd34d', fontSize: '0.875rem', lineHeight: 1.6 }}>
          During your <strong>{moratoriumMonths}-month</strong> moratorium, <strong>{inr(moratoriumInterest)}</strong> in interest will be silently added to your loan.
          You start repayment on <strong>{inr(effectivePrincipal)}</strong> — not the <strong>{inr(principal)}</strong> you borrowed.
        </p>
      </div>
    </div>
  );
}
