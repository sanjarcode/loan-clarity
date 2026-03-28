interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  tooltip?: string;
}

export function SliderInput({ label, value, min, max, step, onChange, format, tooltip }: SliderInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--muted)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            {label}
          </span>
          {tooltip && (
            <div className="relative group">
              <span style={{
                width: 16, height: 16, borderRadius: '50%',
                border: '1px solid var(--border)', color: 'var(--muted)',
                fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'help'
              }}>?</span>
              <div style={{
                position: 'absolute', left: 0, top: '120%', zIndex: 10,
                background: 'var(--surface2)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '8px 12px', width: 220,
                fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.5,
                pointerEvents: 'none', opacity: 0, transition: 'opacity 0.15s',
              }} className="group-hover:opacity-100">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
          }}
          className="mono"
          style={{
            background: 'var(--surface2)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '2px 8px', color: 'var(--text)',
            fontSize: '0.875rem', width: 90, textAlign: 'right',
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.7rem' }}
        className="mono">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
