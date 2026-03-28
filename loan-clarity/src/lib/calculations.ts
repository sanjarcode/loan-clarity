import type { LoanParams, LoanResult, RepaymentRow } from '../types/loan';

export function calculateLoan(params: LoanParams): LoanResult {
  const { principal, annualRate, tenureYears, moratoriumMonths } = params;

  if (!principal || !annualRate || !tenureYears) {
    return {
      emi: 0,
      effectivePrincipal: principal,
      moratoriumInterest: 0,
      totalRepayment: 0,
      totalInterest: 0,
      schedule: [],
    };
  }

  const r = annualRate / 100 / 12;
  const n = tenureYears * 12;

  // Moratorium capitalization: interest compounds during study period
  const effectivePrincipal = moratoriumMonths > 0
    ? principal * Math.pow(1 + r, moratoriumMonths)
    : principal;
  const moratoriumInterest = effectivePrincipal - principal;

  // EMI on effective principal
  const emi = (effectivePrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  // Amortization schedule
  const schedule: RepaymentRow[] = [];
  let balance = effectivePrincipal;

  for (let month = 1; month <= n; month++) {
    const interestComponent = parseFloat((balance * r).toFixed(2));
    const principalComponent = parseFloat((emi - interestComponent).toFixed(2));
    balance = parseFloat(Math.max(0, balance - principalComponent).toFixed(2));
    schedule.push({
      month,
      emi: parseFloat(emi.toFixed(2)),
      principalComponent,
      interestComponent,
      outstandingBalance: balance,
    });
  }

  const totalRepayment = parseFloat((emi * n).toFixed(2));
  const totalInterest = parseFloat((totalRepayment - principal).toFixed(2));

  return {
    emi: parseFloat(emi.toFixed(2)),
    effectivePrincipal: parseFloat(effectivePrincipal.toFixed(2)),
    moratoriumInterest: parseFloat(moratoriumInterest.toFixed(2)),
    totalRepayment,
    totalInterest,
    schedule,
  };
}

export function buildChartData(result: LoanResult, tenureYears: number) {
  const data = [];
  const monthsPerPoint = Math.max(1, Math.floor((tenureYears * 12) / 60));

  for (let i = 0; i < result.schedule.length; i += monthsPerPoint) {
    const row = result.schedule[i];
    data.push({
      month: row.month,
      principal: parseFloat(row.outstandingBalance.toFixed(0)),
      interestPaid: parseFloat((result.emi * row.month - (result.effectivePrincipal - row.outstandingBalance)).toFixed(0)),
    });
  }
  // ensure last point
  if (result.schedule.length > 0) {
    const last = result.schedule[result.schedule.length - 1];
    data.push({ month: last.month, principal: 0, interestPaid: result.totalInterest });
  }
  return data;
}
