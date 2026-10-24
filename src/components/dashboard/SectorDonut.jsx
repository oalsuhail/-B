import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { sectorAllocation } from '../../data/investmentData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: '#1e293b', border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 8, padding: '10px 14px',
    }}>
      <p style={{ color: '#f1f5f9', fontWeight: 600, margin: 0 }}>{d.sector}</p>
      <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: 13 }}>Weight: <b style={{ color: '#e2e8f0' }}>{d.weight}%</b></p>
      <p style={{ color: '#94a3b8', margin: '2px 0 0', fontSize: 13 }}>YTD: <b style={{ color: '#10b981' }}>+{d.ytdReturn}%</b></p>
      <p style={{ color: '#94a3b8', margin: '2px 0 0', fontSize: 13 }}>Outlook: <b style={{ color: '#f59e0b' }}>{d.outlook}</b></p>
    </div>
  );
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {(percent * 100).toFixed(1)}%
    </text>
  );
};

export default function SectorDonut() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24 }}>
      <h3 style={{ color: '#f1f5f9', margin: '0 0 20px', fontSize: 15, fontWeight: 600 }}>Sector Allocation</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={sectorAllocation}
            dataKey="weight"
            nameKey="sector"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={2}
            labelLine={false}
            label={renderCustomLabel}
          >
            {sectorAllocation.map((entry) => (
              <Cell key={entry.sector} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
