import type { LoanResult, LoanParams } from '../types/loan';
import { StatCard } from './StatCard';
import { MoratoriumCallout } from './MoratoriumCallout';
import { RepaymentChart } from './RepaymentChart';
import { ScheduleTable } from './ScheduleTable';

const inr = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

interface ResultsDashboardProps {
  result: LoanResult;
  params: LoanParams;
}

export function ResultsDashboard({ result, params }: ResultsDashboardProps) {
  const payMoreThan = result.totalRepayment > 0
    ? `${Math.round(((result.totalRepayment - params.principal) / params.principal) * 100)}% more than borrowed`
    : '';

  const { moratoriumMonths } = params;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Primary stat */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
          Monthly EMI
        </span>
        <span className="mono" style={{ fontSize: '2.75rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1 }}>
          {inr(result.emi)}
        </span>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 4 }}>
          for {params.tenureYears * 12} months, starting after moratorium
        </span>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <StatCard
          label="Total You'll Repay"
          value={inr(result.totalRepayment)}
          sub={payMoreThan}
          accent="default"
        />
        <StatCard
          label="Total Interest Paid"
          value={inr(result.totalInterest)}
          sub="this is the bank's profit"
          accent="amber"
        />
        <StatCard
          label="You Borrowed"
          value={inr(params.principal)}
          accent="green"
        />
        <StatCard
          label="Effective Principal"
          value={inr(result.effectivePrincipal)}
          sub={moratoriumMonths > 0 ? 'after moratorium' : 'no moratorium'}
          accent={result.moratoriumInterest > 0 ? 'amber' : 'default'}
        />
      </div>

      {/* Moratorium callout */}
      <MoratoriumCallout
        moratoriumMonths={moratoriumMonths}
        moratoriumInterest={result.moratoriumInterest}
        effectivePrincipal={result.effectivePrincipal}
        principal={params.principal}
      />

      {/* Chart */}
      <RepaymentChart result={result} tenureYears={params.tenureYears} />

      {/* Schedule table */}
      {result.schedule.length > 0 && <ScheduleTable schedule={result.schedule} />}
    </div>
  );
}
