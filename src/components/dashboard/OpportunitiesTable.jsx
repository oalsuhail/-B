import { topOpportunities } from '../../data/investmentData';

const riskColor = {
  'Low-Medium': '#10b981',
  'Medium': '#f59e0b',
  'Medium-High': '#f97316',
  'High': '#ef4444',
};

const convictionBg = {
  High: 'rgba(99,102,241,0.2)',
  Medium: 'rgba(245,158,11,0.15)',
  Low: 'rgba(100,116,139,0.15)',
};

export default function OpportunitiesTable() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24 }}>
      <h3 style={{ color: '#f1f5f9', margin: '0 0 20px', fontSize: 15, fontWeight: 600 }}>
        Top Investment Opportunities
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Opportunity','Sector','Region','Exp. Return','Risk','Horizon','Conviction'].map(h => (
                <th key={h} style={{
                  color: '#64748b', fontWeight: 500, textAlign: 'left',
                  padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topOpportunities.map((opp, i) => (
              <tr key={opp.id} style={{
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}
              >
                <td style={{ padding: '12px', color: '#e2e8f0', fontWeight: 500 }}>
                  <div>{opp.name}</div>
                  <div style={{ color: '#64748b', fontSize: 11, marginTop: 2, maxWidth: 260 }}>{opp.rationale}</div>
                </td>
                <td style={{ padding: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{opp.sector}</td>
                <td style={{ padding: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{opp.region}</td>
                <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>+{opp.expectedReturn}%</span>
                </td>
                <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                  <span style={{ color: riskColor[opp.riskRating], fontWeight: 500 }}>{opp.riskRating}</span>
                </td>
                <td style={{ padding: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{opp.timeHorizon}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: convictionBg[opp.conviction],
                    color: opp.conviction === 'High' ? '#818cf8' : '#f59e0b',
                    fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
                  }}>{opp.conviction}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
