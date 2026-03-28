# CHOSEN PROBLEM: STEM Education Loan Transparency Tool

> **Problem**: Why do STEM students face education loan anxiety from unclear costs in 2026?
>
> **Solution**: A zero-friction, web-first loan transparency calculator that shows students the full picture — EMI, total interest, moratorium impact, and repayment timeline — instantly, with no signup.

---

## Hat 1: Founder — Market Research & Opportunity

### The Indian Context (Why This Itch Exists)

India has 43 million students in higher education (AISHE 2024). STEM seats — engineering, medicine, pharmacy, data science — are expensive and demand-heavy. A 4-year B.Tech at a private college costs ₹6–20 lakhs in tuition alone. Most families can't pay upfront. They borrow.

Education loan disbursements hit ₹28,000 crore in FY24, growing ~18% YoY. Yet the financial literacy around these loans is near zero. Students sign 10-year debt obligations without knowing what their total repayment will be. Banks are incentivized to hide this. No one fixes this.

### Market Size

| Segment | Number |
|---|---|
| Students enrolling in STEM annually (India) | ~3.5 million |
| Students needing financial aid | ~60% → 2.1 million/year |
| Active education loan borrowers (India) | ~11 million |
| Education loan outstanding (India, FY24) | ₹1.08 lakh crore (~$13B) |
| Global education loan market | ~$7 trillion (US $1.7T alone) |

The tool targets India first, but the calculator logic is universal.

### The Core Pain (User Interviews Proxy)

Banks and NBFCs quote the EMI. Students hear ₹8,000/month and feel okay. What they don't see:
1. **Moratorium capitalization**: Interest accrues during the study period (1–4 years) and gets added to the principal. A ₹10L loan at 9% over 24-month moratorium becomes ₹11.9L before a single EMI is paid.
2. **Total outflow**: On a ₹15L loan at 9.5% for 10 years, the student repays ₹23.2L — 55% more than borrowed.
3. **Hidden fees**: Processing fees (0.5–2%), loan insurance, documentation charges — never shown upfront.
4. **Comparison friction**: Comparing SBI vs HDFC vs Axis requires 3 branch visits or 3 separate calculator sessions.

This anxiety is real, paralyzing, and entirely solvable with a clean UI and correct math.

### Competitive Landscape

| Player | What They Do | Gap |
|---|---|---|
| BankBazaar / PaisaBazaar | Lead generation, show EMI | No total cost, no moratorium, no comparison |
| Bank EMI calculators | Single bank, basic EMI | No moratorium, no schedule, no comparison |
| NerdWallet (US) | Comprehensive but US-only | Not localized for India |
| Excel sheets (DIY) | Accurate but inaccessible | Not shareable, no UX |
| **Our tool** | Full lifecycle transparency, instant, shareable | — |

### Business Opportunity

**Phase 1 (0–6 months)**: Free tool. Build SEO and trust.
- "education loan calculator India" — 110K monthly searches, low competition on quality results.
- "SBI education loan EMI calculator" — 40K/month.

**Phase 2 (6–18 months)**: Affiliate revenue.
- Banks pay ₹500–₹2,000 per qualified loan lead (CPL model).
- At 5% conversion of 50K monthly users → 2,500 leads/month → ₹12.5–50L/month.

**Phase 3 (18+ months)**: Financial coaching layer, loan comparison with live rates API, scholarship offset planning.

**Why now?**
- RBI's 2024 directive on "Key Fact Statement" mandates lenders disclose total cost — but implementation is patchy and still confusing to students.
- Gen Z expects self-serve financial tools. They will not call a branch.
- Zero marginal cost product (pure frontend) means profitability from day one.

---

## Hat 2: Product Manager — Product Flow & Design

### Target Users

| Persona | Description | Job-to-be-done |
|---|---|---|
| **The Anxious Applicant** | 17–19 yr old, JEE/NEET qualified, researching colleges | "Tell me the real cost before I commit" |
| **The Worried Parent** | 40–55 yr old, co-signing the loan | "Show me what we're getting into, in plain numbers" |
| **The Active Borrower** | 20–25 yr old, already in moratorium | "Help me understand my repayment after graduation" |

### Core User Journey (MVP)

```
[Landing Page]
  "Know exactly what your education loan will really cost."
        ↓
[Input Panel — live, no submit button]
  ├─ Loan Amount         (slider + text, ₹1L – ₹50L)
  ├─ Interest Rate       (slider + text, 6% – 16%)
  ├─ Repayment Tenure    (slider + text, 1 – 15 years)
  └─ Moratorium Period   (slider + text, 0 – 60 months)
        ↓ (results update on every keystroke)
[Results Dashboard]
  ├─ Monthly EMI                  → big, bold
  ├─ Total Interest Paid          → highlighted in amber (the "ouch" number)
  ├─ Total Amount Repaid          → shown vs. principal borrowed
  ├─ Interest During Moratorium   → the hidden cost, called out explicitly
  └─ Repayment Chart              → stacked area: principal vs. interest over time
        ↓
[Repayment Schedule Table]        → month-by-month breakdown (collapsible)
        ↓
[Compare Mode Toggle]             → add a second scenario side-by-side
        ↓
[Share Button]                    → copies URL (all state encoded in query params)
```

### Feature List: MVP vs Post-MVP

#### MVP (Build in ~30 minutes)
- [x] EMI calculation with moratorium capitalization
- [x] Total cost breakdown (principal vs. interest vs. moratorium interest)
- [x] Repayment timeline chart (Recharts area chart)
- [x] Year-by-year / month-by-month schedule table
- [x] Side-by-side comparison of two loan scenarios
- [x] Shareable URL (all state in query params)
- [x] Indian number formatting (lakhs, crores)

#### Post-MVP
- [ ] Bank rate presets (SBI 8.15%, HDFC 9.55%, Axis 13.7% — updated periodically)
- [ ] Prepayment / lump-sum impact calculator
- [ ] Scholarship/grant offset ("what if I get ₹2L scholarship?")
- [ ] PDF export of full amortization schedule
- [ ] Loan eligibility estimator (based on income/co-signer salary)

### Success Metrics

| Metric | Target (Month 3) |
|---|---|
| Time-to-first-result | < 10 seconds |
| Avg. session duration | > 3 minutes |
| Share rate | > 5% of sessions |
| Return visit rate | > 20% |
| Organic search impressions | > 50K/month |
| Bounce rate | < 40% |

### Design Principles

1. **Zero friction**: No login, no signup, no cookie banners, no ads on day 1.
2. **Live feedback**: Results recompute on every keystroke. No "calculate" button.
3. **Plain language**: Every financial term has an inline tooltip. No jargon.
4. **The "ouch" moment**: Total interest paid is shown in amber/red so students viscerally feel the cost — this drives the anxious action (comparing, planning, prepaying early).
5. **Shareable by default**: Students naturally share with parents. URL sharing is the viral loop.

---

## Hat 3: Staff Engineer — High Level Design

### Architecture Decision: Pure Frontend, Zero Backend

**Chosen approach**: React SPA, statically hosted, state in URL.

**Rationale**:
- No PII is collected → zero compliance overhead (no GDPR, DPDP Act implications).
- Infinitely scalable at zero cost — Vercel CDN serves the same static bundle globally.
- URL-encoded state means shareability without a database, without sessions, without infra.
- The entire "backend" is math — pure deterministic functions. No server needed.
- Time to production: < 1 hour including deployment.

### Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | React + TypeScript (Vite) | Fast build, strong typing for financial logic |
| Styling | Tailwind CSS | No custom CSS overhead, rapid iteration |
| Charts | Recharts | React-native, lightweight, composable |
| Hosting | Vercel | Git-push-to-deploy, free tier, global CDN |
| State | URL query params | No Redux, no Context — URL is the database |
| Testing | Vitest | Co-located with Vite, fast unit tests for calc engine |

### System Diagram

```
┌─────────────────────────────────────────┐
│              User's Browser             │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │        React SPA (static)        │  │
│  │                                  │  │
│  │  ┌────────────┐  ┌────────────┐  │  │
│  │  │ Input Form │→ │ URL Params │  │  │
│  │  └────────────┘  └─────┬──────┘  │  │
│  │                        │         │  │
│  │                        ↓         │  │
│  │              ┌──────────────────┐ │  │
│  │              │ Calculation      │ │  │
│  │              │ Engine (pure fn) │ │  │
│  │              └────────┬─────────┘ │  │
│  │                       │           │  │
│  │         ┌─────────────┴──────┐   │  │
│  │         ↓                    ↓   │  │
│  │  ┌─────────────┐   ┌──────────┐  │  │
│  │  │  Dashboard  │   │  Chart   │  │  │
│  │  └─────────────┘   └──────────┘  │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
         ↑ Served from Vercel CDN
```

### Data Flow (Unidirectional)

```
User interaction
    → URL params updated (replaceState, debounced)
    → Component reads URL params on render
    → LoanParams object constructed + validated
    → calculateLoan(params) → LoanResult
    → UI renders LoanResult
    → Share button = copy window.location.href
```

### Non-Functional Requirements

| NFR | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s (Lighthouse green) |
| Lighthouse Performance | > 90 |
| Bundle size | < 200KB gzipped |
| Offline capability | Serviceable after first load (PWA, optional) |
| Accessibility | WCAG AA (keyboard nav, screen reader labels) |
| Privacy | No analytics, no trackers in MVP |

### Deployment Pipeline

```
git push main
    → Vercel CI triggered
    → vite build (< 30s)
    → deploy to Vercel CDN
    → live globally in < 60s
```

### Scalability Ceiling

Static files served from CDN. The tool can handle 10M requests/day with zero backend work and zero cost on Vercel's free tier. There is no scaling problem for this architecture.

---

## Hat 4: Senior Engineer — Low Level Design

### The Math (Most Important Part)

#### EMI Formula
```
EMI = P × r × (1 + r)^n
      ─────────────────────
         (1 + r)^n − 1

Where:
  P = Effective principal (after moratorium capitalization)
  r = Monthly interest rate = (annualRate / 100) / 12
  n = Repayment tenure in months
```

#### Moratorium Capitalization
During the study/moratorium period, interest accrues on the original principal and is added to it before repayment begins:
```
P_effective = P_original × (1 + r)^moratoriumMonths
```
This is the single most important and least-understood part of education loans. The tool must surface this number prominently.

#### Amortization Schedule (per month)
```
interestComponent = outstandingBalance × r
principalComponent = EMI − interestComponent
outstandingBalance = outstandingBalance − principalComponent
```

### Data Models

```typescript
// Input to the calculation engine
interface LoanParams {
  principal: number;         // Original loan amount in ₹
  annualRate: number;        // Annual interest rate, e.g. 8.5 (not 0.085)
  tenureYears: number;       // Repayment period in years (post-moratorium)
  moratoriumMonths: number;  // 0 if no moratorium
}

// Output of the calculation engine
interface LoanResult {
  emi: number;                      // Monthly EMI in ₹
  effectivePrincipal: number;       // Principal after moratorium capitalization
  moratoriumInterest: number;       // Interest accrued during moratorium
  totalRepayment: number;           // Total amount paid back
  totalInterest: number;            // Total interest paid (incl. moratorium)
  schedule: RepaymentRow[];         // Full amortization schedule
}

// One row of the repayment schedule
interface RepaymentRow {
  month: number;
  emi: number;
  principalComponent: number;
  interestComponent: number;
  outstandingBalance: number;
}
```

### Calculation Engine: `src/lib/calculations.ts`

```typescript
export function calculateLoan(params: LoanParams): LoanResult {
  const { principal, annualRate, tenureYears, moratoriumMonths } = params;
  const r = annualRate / 100 / 12;
  const n = tenureYears * 12;

  // Step 1: Moratorium capitalization
  const effectivePrincipal = principal * Math.pow(1 + r, moratoriumMonths);
  const moratoriumInterest = effectivePrincipal - principal;

  // Step 2: EMI on effective principal
  const emi = (effectivePrincipal * r * Math.pow(1 + r, n))
              / (Math.pow(1 + r, n) - 1);

  // Step 3: Generate amortization schedule
  const schedule: RepaymentRow[] = [];
  let balance = effectivePrincipal;

  for (let month = 1; month <= n; month++) {
    const interestComponent = balance * r;
    const principalComponent = emi - interestComponent;
    balance = Math.max(0, balance - principalComponent);
    schedule.push({ month, emi, principalComponent, interestComponent, outstandingBalance: balance });
  }

  const totalRepayment = emi * n;
  const totalInterest = totalRepayment - principal; // vs original principal, not effective

  return { emi, effectivePrincipal, moratoriumInterest, totalRepayment, totalInterest, schedule };
}
```

All functions are **pure** (no side effects, no I/O) → trivially unit testable with Vitest.

### URL State: `src/lib/urlState.ts`

```typescript
const DEFAULTS: LoanParams = {
  principal: 1000000,   // ₹10L
  annualRate: 9.0,
  tenureYears: 10,
  moratoriumMonths: 24,
};

export function paramsFromURL(): LoanParams { /* read URLSearchParams */ }
export function paramsToURL(params: LoanParams): void { /* replaceState, debounced 300ms */ }
```

### Component Tree

```
<App>
  ├── <Header>                     — logo, tagline, "How it works" link
  ├── <main>
  │    ├── <LoanInputForm>         — controlled form, updates URL on change
  │    │    ├── <SliderInput>      — slider + number input, synchronized
  │    │    └── <Tooltip>          — explains each term inline
  │    ├── <ResultsDashboard>      — reads LoanResult, renders summary cards
  │    │    ├── <StatCard>         — reusable: label + value + optional sub-label
  │    │    ├── <MoratoriumCallout>— highlighted box: "₹X added to principal during study period"
  │    │    └── <RepaymentChart>   — Recharts AreaChart (principal vs. interest stacked)
  │    ├── <ScheduleTable>         — collapsible month-by-month table
  │    └── <ComparisonPanel>       — toggled by "Compare" button
  │         ├── <LoanInputForm>    — second scenario (Scenario B)
  │         └── <ResultsDashboard> — side-by-side with Scenario A
  └── <ShareButton>                — copies window.location.href, shows "Copied!" toast
```

### File Structure

```
src/
├── components/
│    ├── LoanInputForm.tsx
│    ├── SliderInput.tsx
│    ├── ResultsDashboard.tsx
│    ├── StatCard.tsx
│    ├── MoratoriumCallout.tsx
│    ├── RepaymentChart.tsx
│    ├── ScheduleTable.tsx
│    ├── ComparisonPanel.tsx
│    └── ShareButton.tsx
├── lib/
│    ├── calculations.ts     ← pure math, no React
│    └── urlState.ts         ← encode/decode URL params
├── types/
│    └── loan.ts             ← LoanParams, LoanResult, RepaymentRow
├── App.tsx
└── main.tsx
```

### Key Implementation Notes

1. **Indian number formatting**: Use `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })` — renders ₹12,34,567 (not ₹1,234,567).

2. **Debounce URL writes**: Push URL state updates at 300ms debounce to avoid flooding browser history on slider drag.

3. **Input validation**: Guard against `rate = 0`, `principal = 0`, `tenure = 0` — these cause division-by-zero in EMI formula. Show a friendly message.

4. **The moratorium callout is non-negotiable**: This is the #1 hidden cost students miss. Render it in a visually distinct amber/orange callout box: *"During your 24-month moratorium, ₹1,90,000 in interest will be added to your loan. You start repayment on ₹11,90,000, not ₹10,00,000."*

5. **Floating point rounding**: Round EMI and schedule values to 2 decimal places throughout. Don't accumulate floating-point drift in the schedule loop.

6. **Chart readability**: Use two stacked areas (principal reduction + interest component) colored green and amber respectively. Makes the "interest burden" visceral.

---

## Summary

| Dimension | Decision |
|---|---|
| Problem | STEM education loan opacity causing financial anxiety |
| Solution | Transparent, full-lifecycle loan calculator |
| Platform | Web (pure frontend, zero backend) |
| Stack | React + TypeScript + Tailwind + Recharts, hosted on Vercel |
| MVP scope | Calculator + comparison + shareable URL |
| Time to build | ~30 minutes |
| Time to production | < 1 hour |
| Monetization path | SEO → trust → affiliate loan leads |
| Moat | Best-in-class UX, moratorium transparency, shareable URLs |
