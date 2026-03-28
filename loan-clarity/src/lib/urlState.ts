import type { LoanParams } from '../types/loan';

export const DEFAULTS: LoanParams = {
  principal: 1000000,
  annualRate: 9.0,
  tenureYears: 10,
  moratoriumMonths: 24,
};

export function paramsFromURL(): LoanParams {
  const p = new URLSearchParams(window.location.search);
  return {
    principal: Number(p.get('p')) || DEFAULTS.principal,
    annualRate: Number(p.get('r')) || DEFAULTS.annualRate,
    tenureYears: Number(p.get('t')) || DEFAULTS.tenureYears,
    moratoriumMonths: p.has('m') ? Number(p.get('m')) : DEFAULTS.moratoriumMonths,
  };
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function paramsToURL(params: LoanParams): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const p = new URLSearchParams({
      p: String(params.principal),
      r: String(params.annualRate),
      t: String(params.tenureYears),
      m: String(params.moratoriumMonths),
    });
    window.history.replaceState(null, '', `?${p.toString()}`);
  }, 300);
}
