export default function KPICard({ label, value, unit, sub, trend, color = '#6366f1' }) {
  const isPositive = trend >= 0;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
        <span style={{ color: '#f1f5f9', fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </span>
        {unit && <span style={{ color: '#94a3b8', fontSize: 14 }}>{unit}</span>}
      </div>
      {sub && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          {trend !== undefined && (
            <span style={{
              fontSize: 12, fontWeight: 600,
              color: isPositive ? '#10b981' : '#ef4444',
              display: 'flex', alignItems: 'center', gap: 2,
            }}>
              {isPositive ? '▲' : '▼'} {Math.abs(trend)}%
            </span>
          )}
          <span style={{ color: '#64748b', fontSize: 12 }}>{sub}</span>
        </div>
      )}
      <div style={{
        height: 2,
        background: color,
        borderRadius: 2,
        marginTop: 8,
        opacity: 0.7,
      }} />
    </div>
  );
}
