import { useState, useEffect } from 'react';
import './index.css';
import { LoanInputForm } from './components/LoanInputForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ShareButton } from './components/ShareButton';
import { calculateLoan } from './lib/calculations';
import { paramsFromURL, paramsToURL } from './lib/urlState';
import type { LoanParams } from './types/loan';

function App() {
  const [params, setParams] = useState<LoanParams>(paramsFromURL);

  const handleChange = (p: LoanParams) => {
    setParams(p);
    paramsToURL(p);
  };

  // Sync from URL on back/forward navigation
  useEffect(() => {
    const onPop = () => setParams(paramsFromURL());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const result = calculateLoan(params);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        position: 'sticky',
        top: 0,
        background: 'var(--bg)',
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>LoanClarity</span>
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            background: 'var(--surface2)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '2px 6px', color: 'var(--muted)', fontWeight: 600,
          }}>STEM</span>
        </div>
        <ShareButton />
      </header>

      {/* Hero */}
      <div style={{
        padding: '48px 24px 32px',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <p style={{
          fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--muted)', fontWeight: 600, margin: '0 0 12px',
        }}>
          Education Loan Transparency Tool
        </p>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          margin: '0 0 12px',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}>
          Know what your loan<br />
          <span style={{ color: 'var(--amber)' }}>actually costs.</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0, maxWidth: 520, lineHeight: 1.6 }}>
          Banks show you the EMI. We show you the full picture — including the interest that silently compounds during your study period.
        </p>
      </div>

      {/* Main layout */}
      <main style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 24px 80px',
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 380px) 1fr',
        gap: 24,
        alignItems: 'start',
      }}>
        <div style={{ position: 'sticky', top: 72 }}>
          <LoanInputForm params={params} onChange={handleChange} />
        </div>
        <ResultsDashboard result={result} params={params} />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '20px 24px',
        textAlign: 'center',
        color: 'var(--muted)',
        fontSize: '0.72rem',
        letterSpacing: '0.05em',
      }}>
        Numbers are estimates. Always verify with your bank. No data is stored or sent anywhere.
      </footer>
    </div>
  );
}

export default App;
