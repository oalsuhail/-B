import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { regionBreakdown } from '../../data/investmentData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: '#f1f5f9', margin: 0, fontWeight: 600 }}>{payload[0].payload.region}</p>
      <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: 13 }}>Weight: <b style={{ color: '#e2e8f0' }}>{payload[0].value}%</b></p>
    </div>
  );
};

export default function RegionBar() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24 }}>
      <h3 style={{ color: '#f1f5f9', margin: '0 0 20px', fontSize: 15, fontWeight: 600 }}>Regional Exposure</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={regionBreakdown} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
          <YAxis type="category" dataKey="region" width={100} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="weight" radius={[0, 4, 4, 0]} barSize={18}>
            {regionBreakdown.map(entry => (
              <Cell key={entry.region} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
