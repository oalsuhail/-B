import KPICard from '../components/dashboard/KPICard';
import SectorDonut from '../components/dashboard/SectorDonut';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import OpportunitiesTable from '../components/dashboard/OpportunitiesTable';
import RiskChart from '../components/dashboard/RiskChart';
import RegionBar from '../components/dashboard/RegionBar';
import { portfolioKPIs, sectorAllocation } from '../data/investmentData';

const grid = (cols, gap = 20) => ({
  display: 'grid',
  gridTemplateColumns: cols,
  gap,
});

export default function Dashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b1120',
      color: '#f1f5f9',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: '0 0 60px',
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '18px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        background: 'rgba(11,17,32,0.95)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#6366f1,#22d3ee)', borderRadius: 6 }} />
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>InvestIQ Research</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {['Overview','Sectors','Opportunities','Risk','Reports'].map(item => (
            <span key={item} style={{
              color: item === 'Overview' ? '#818cf8' : '#64748b',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              borderBottom: item === 'Overview' ? '1px solid #818cf8' : 'none',
              paddingBottom: 2,
            }}>{item}</span>
          ))}
          <div style={{
            background: 'rgba(99,102,241,0.2)', color: '#818cf8',
            fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 6,
          }}>
            Q2 2026 Report
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 32px 0' }}>
        {/* Title row */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em' }}>
            Multi-Sector Investment Dashboard
          </h1>
          <p style={{ color: '#64748b', margin: '6px 0 0', fontSize: 13 }}>
            As of 30 June 2026 · Total AUM: $4.82B · Period: Jul 2025 – Jun 2026
          </p>
        </div>

        {/* KPI strip */}
        <div style={grid('repeat(7, 1fr)', 14)}>
          <KPICard label="Total AUM"     value="$4.82" unit="B"  sub="vs $4.21B prior year" trend={14.5} color="#6366f1" />
          <KPICard label="YTD Return"    value="+14.7" unit="%"  sub="vs MSCI +8.3%"        trend={6.4}  color="#10b981" />
          <KPICard label="Alpha"         value="+3.2"  unit="%"  sub="annualised"            trend={3.2}  color="#22d3ee" />
          <KPICard label="Sharpe Ratio"  value="1.84"  unit=""   sub="vs 1.12 benchmark"                  color="#8b5cf6" />
          <KPICard label="Beta"          value="0.91"  unit=""   sub="vs MSCI World"                       color="#f59e0b" />
          <KPICard label="Volatility"    value="11.4"  unit="%"  sub="annualised"                          color="#f97316" />
          <KPICard label="Max Drawdown"  value="-8.3"  unit="%"  sub="Jan 2026 trough"                     color="#ef4444" />
        </div>

        {/* Row 2: performance + sector donut */}
        <div style={{ ...grid('1fr 380px', 20), marginTop: 20 }}>
          <PerformanceChart />
          <SectorDonut />
        </div>

        {/* Row 3: sector bars */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: 24, marginTop: 20,
        }}>
          <h3 style={{ color: '#f1f5f9', margin: '0 0 18px', fontSize: 15, fontWeight: 600 }}>
            Sector Returns vs. Weight
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sectorAllocation.map(s => (
              <div key={s.sector} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 60px 80px', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#94a3b8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  {s.sector}
                </span>
                <div style={{ position: 'relative', height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${s.weight / 30 * 100}%`, background: s.color, borderRadius: 3, opacity: 0.8 }} />
                </div>
                <span style={{ color: '#64748b', fontSize: 12, textAlign: 'right' }}>{s.weight}%</span>
                <span style={{
                  background: s.ytdReturn > 15 ? 'rgba(16,185,129,0.15)' : s.ytdReturn > 10 ? 'rgba(245,158,11,0.15)' : 'rgba(100,116,139,0.1)',
                  color: s.ytdReturn > 15 ? '#10b981' : s.ytdReturn > 10 ? '#f59e0b' : '#94a3b8',
                  fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4, textAlign: 'center',
                }}>
                  +{s.ytdReturn}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 4: opportunities table */}
        <div style={{ marginTop: 20 }}>
          <OpportunitiesTable />
        </div>

        {/* Row 5: risk + region */}
        <div style={{ ...grid('1fr 1fr', 20), marginTop: 20 }}>
          <RiskChart />
          <RegionBar />
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 32, padding: '16px 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          color: '#475569', fontSize: 11, lineHeight: 1.6,
        }}>
          <p style={{ margin: 0 }}>
            <b style={{ color: '#64748b' }}>Disclaimer:</b> This dashboard is for informational purposes only and does not constitute investment advice.
            Past performance is not indicative of future results. Expected returns are forward-looking estimates subject to material uncertainty.
            Data as of 30 June 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
