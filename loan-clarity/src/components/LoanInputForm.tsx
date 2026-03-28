import { SliderInput } from './SliderInput';
import type { LoanParams } from '../types/loan';

interface LoanInputFormProps {
  params: LoanParams;
  onChange: (params: LoanParams) => void;
}

const inr = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

export function LoanInputForm({ params, onChange }: LoanInputFormProps) {
  const set = (key: keyof LoanParams) => (v: number) => onChange({ ...params, [key]: v });

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 32,
    }}>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
          Loan Parameters
        </h2>
      </div>

      <SliderInput
        label="Loan Amount"
        value={params.principal}
        min={100000}
        max={5000000}
        step={50000}
        onChange={set('principal')}
        format={inr}
        tooltip="The total amount you plan to borrow from the bank."
      />

      <SliderInput
        label="Interest Rate (% p.a.)"
        value={params.annualRate}
        min={6}
        max={16}
        step={0.1}
        onChange={set('annualRate')}
        format={v => `${v.toFixed(1)}%`}
        tooltip="Annual interest rate offered by the bank. SBI: ~8.15%, HDFC: ~9.55%, private banks: 11–14%."
      />

      <SliderInput
        label="Repayment Tenure (years)"
        value={params.tenureYears}
        min={1}
        max={15}
        step={1}
        onChange={set('tenureYears')}
        format={v => `${v}yr`}
        tooltip="Number of years to repay after your moratorium ends."
      />

      <SliderInput
        label="Moratorium Period (months)"
        value={params.moratoriumMonths}
        min={0}
        max={60}
        step={6}
        onChange={set('moratoriumMonths')}
        format={v => v === 0 ? 'None' : `${v}mo`}
        tooltip="Study period + 6 months grace. During this time, interest accrues and is added to your principal — this is the hidden cost most students miss."
      />
    </div>
  );
}
