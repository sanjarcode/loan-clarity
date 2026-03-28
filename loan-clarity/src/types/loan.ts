export interface LoanParams {
  principal: number;        // Original loan amount in ₹
  annualRate: number;       // Annual interest rate e.g. 8.5
  tenureYears: number;      // Repayment tenure in years (post-moratorium)
  moratoriumMonths: number; // 0 if no moratorium
}

export interface RepaymentRow {
  month: number;
  emi: number;
  principalComponent: number;
  interestComponent: number;
  outstandingBalance: number;
}

export interface LoanResult {
  emi: number;
  effectivePrincipal: number;
  moratoriumInterest: number;
  totalRepayment: number;
  totalInterest: number;
  schedule: RepaymentRow[];
}
