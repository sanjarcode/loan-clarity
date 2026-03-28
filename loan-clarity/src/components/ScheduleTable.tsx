import { useState } from 'react';
import type { RepaymentRow } from '../types/loan';

const inr = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

interface ScheduleTableProps {
  schedule: RepaymentRow[];
}

export function ScheduleTable({ schedule }: ScheduleTableProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'var(--surface)', border: 'none', cursor: 'pointer',
          padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: 'var(--text)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          fontWeight: 600, fontFamily: 'Syne, sans-serif',
        }}
      >
        <span>Month-by-Month Schedule ({schedule.length} payments)</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--muted)' }}>▾</span>
      </button>

      {open && (
        <div style={{ maxHeight: 400, overflowY: 'auto', background: 'var(--bg)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: 'DM Mono, monospace' }}>
            <thead>
              <tr style={{ position: 'sticky', top: 0, background: 'var(--surface2)' }}>
                {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px', textAlign: 'right', color: 'var(--muted)',
                    fontWeight: 500, borderBottom: '1px solid var(--border)', letterSpacing: '0.05em',
                    fontSize: '0.68rem', textTransform: 'uppercase',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr key={row.month} style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--surface)' }}>
                  <td style={{ padding: '8px 16px', textAlign: 'right', color: 'var(--muted)' }}>{row.month}</td>
                  <td style={{ padding: '8px 16px', textAlign: 'right', color: 'var(--text)' }}>{inr(row.emi)}</td>
                  <td style={{ padding: '8px 16px', textAlign: 'right', color: '#10b981' }}>{inr(row.principalComponent)}</td>
                  <td style={{ padding: '8px 16px', textAlign: 'right', color: '#f59e0b' }}>{inr(row.interestComponent)}</td>
                  <td style={{ padding: '8px 16px', textAlign: 'right', color: 'var(--text)' }}>{inr(row.outstandingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
