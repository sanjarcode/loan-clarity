import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import type { LoanResult } from '../types/loan';
import { buildChartData } from '../lib/calculations';

const inrCompact = (v: number) => {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${(v / 1000).toFixed(0)}K`;
};

interface RepaymentChartProps {
  result: LoanResult;
  tenureYears: number;
}

export function RepaymentChart({ result, tenureYears }: RepaymentChartProps) {
  const data = buildChartData(result, tenureYears);

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '20px',
    }}>
      <p style={{ margin: '0 0 16px', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
        Outstanding Balance over Time
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="gInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#555', fontSize: 11, fontFamily: 'DM Mono' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `M${v}`}
          />
          <YAxis
            tick={{ fill: '#555', fontSize: 11, fontFamily: 'DM Mono' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={inrCompact}
            width={56}
          />
          <Tooltip
            contentStyle={{
              background: '#111', border: '1px solid #2a2a2a',
              borderRadius: 8, fontFamily: 'DM Mono', fontSize: 12,
            }}
            labelStyle={{ color: '#888' }}
            formatter={(value, name) => [
              inrCompact(Number(value)),
              name === 'principal' ? 'Outstanding Principal' : 'Cumulative Interest',
            ]}
            labelFormatter={v => `Month ${v}`}
          />
          <Legend
            wrapperStyle={{ fontSize: '0.7rem', color: 'var(--muted)', paddingTop: 8 }}
            formatter={v => v === 'principal' ? 'Outstanding Principal' : 'Cumulative Interest'}
          />
          <Area type="monotone" dataKey="principal" stroke="#10b981" strokeWidth={1.5} fill="url(#gPrincipal)" />
          <Area type="monotone" dataKey="interestPaid" stroke="#f59e0b" strokeWidth={1.5} fill="url(#gInterest)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
