import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import { riskMatrix } from '../../data/investmentData';

const catColor = {
  macro: '#ef4444',
  geopolitical: '#f97316',
  regulatory: '#f59e0b',
  commodity: '#10b981',
  fx: '#6366f1',
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: '#f1f5f9', margin: 0, fontWeight: 600 }}>{d.name}</p>
      <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: 13 }}>Probability: <b style={{ color: '#e2e8f0' }}>{d.probability}%</b></p>
      <p style={{ color: '#94a3b8', margin: '2px 0 0', fontSize: 13 }}>Impact: <b style={{ color: '#e2e8f0' }}>{d.impact}%</b></p>
    </div>
  );
};

export default function RiskChart() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24 }}>
      <h3 style={{ color: '#f1f5f9', margin: '0 0 8px', fontSize: 15, fontWeight: 600 }}>Risk Matrix</h3>
      <p style={{ color: '#64748b', fontSize: 12, margin: '0 0 16px' }}>Probability vs. Portfolio Impact</p>
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="probability" name="Probability" type="number" domain={[0, 70]}
            tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={v => `${v}%`} label={{ value: 'Probability →', position: 'insideBottom', offset: -2, fill: '#475569', fontSize: 11 }} />
          <YAxis dataKey="impact" name="Impact" type="number" domain={[0, 80]}
            tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={v => `${v}%`} label={{ value: 'Impact →', angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 11 }} />
          <ReferenceLine x={35} stroke="rgba(239,68,68,0.2)" strokeDasharray="4 2" />
          <ReferenceLine y={55} stroke="rgba(239,68,68,0.2)" strokeDasharray="4 2" />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={riskMatrix} name="Risks">
            {riskMatrix.map((entry) => (
              <Cell key={entry.name} fill={catColor[entry.category]} fillOpacity={0.85} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
        {Object.entries(catColor).map(([cat, color]) => (
          <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#94a3b8' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
