import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { performanceHistory } from '../../data/investmentData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: '#94a3b8', margin: '0 0 6px', fontSize: 12 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color, margin: '2px 0', fontSize: 13, fontWeight: 600 }}>
          {p.name}: {(p.value - 100).toFixed(1) >= 0 ? '+' : ''}{(p.value - 100).toFixed(1)}%
        </p>
      ))}
    </div>
  );
};

export default function PerformanceChart() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ color: '#f1f5f9', margin: 0, fontSize: 15, fontWeight: 600 }}>Portfolio vs Benchmark (Jul 2025 – Jun 2026)</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {['1M','3M','6M','1Y'].map(t => (
            <button key={t} style={{
              background: t === '1Y' ? '#6366f1' : 'rgba(255,255,255,0.06)',
              border: 'none', borderRadius: 6, color: '#e2e8f0',
              fontSize: 12, padding: '4px 10px', cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={performanceHistory} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={v => `${(v - 100).toFixed(0)}%`} domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={100} stroke="rgba(255,255,255,0.1)" />
          <Legend formatter={v => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
          <Line type="monotone" dataKey="portfolio" name="Portfolio" stroke="#6366f1" strokeWidth={2.5}
            dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
          <Line type="monotone" dataKey="benchmark" name="MSCI World" stroke="#475569" strokeWidth={1.5}
            strokeDasharray="5 3" dot={false} activeDot={{ r: 4, fill: '#475569' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
