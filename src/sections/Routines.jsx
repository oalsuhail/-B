import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewport } from '../animations'

const routines = {
  Morning: [
    { time: '06:00', icon: '🌅', title: 'Wake & Hydrate', desc: 'Start with 500ml of water and 5 minutes of deep breathing to activate focus.', color: '#f59e0b', duration: '10 min' },
    { time: '06:30', icon: '🏃', title: 'Movement', desc: 'Light jog or yoga flow to energise the body before a demanding creative day.', color: '#10b981', duration: '30 min' },
    { time: '07:15', icon: '📓', title: 'Morning Pages', desc: 'Three pages of uncensored stream-of-consciousness writing to clear mental noise.', color: '#3b82f6', duration: '20 min' },
    { time: '08:00', icon: '☕', title: 'Deep Work Block', desc: 'Phone off, inbox closed. Tackle the single most important creative task of the day.', color: '#7c3aed', duration: '90 min' },
  ],
  Afternoon: [
    { time: '12:00', icon: '🥗', title: 'Mindful Lunch', desc: 'Step away from the screen. Eat without distractions to reset cognitive energy.', color: '#10b981', duration: '45 min' },
    { time: '13:00', icon: '🔁', title: 'Review & Iterate', desc: 'Revisit morning's work with fresh eyes. Refine, critique, and push further.', color: '#3b82f6', duration: '60 min' },
    { time: '14:30', icon: '🤝', title: 'Collaboration', desc: 'Meetings, feedback sessions, and async replies all batched into one window.', color: '#ec4899', duration: '90 min' },
    { time: '16:00', icon: '📐', title: 'Craft Time', desc: 'Prototype, experiment, and explore without output pressure. Pure creative play.', color: '#f59e0b', duration: '60 min' },
  ],
  Evening: [
    { time: '17:30', icon: '📋', title: 'Daily Wrap-up', desc: 'Log completed tasks, capture loose threads, and write tomorrow's top 3 priorities.', color: '#7c3aed', duration: '20 min' },
    { time: '18:00', icon: '🍳', title: 'Cook & Disconnect', desc: 'Preparing a real meal is a deliberate act of switching off — no screens allowed.', color: '#f59e0b', duration: '45 min' },
    { time: '20:00', icon: '📚', title: 'Learning Hour', desc: 'Books, courses, or deep-dive articles. Invest in the craft with no agenda.', color: '#10b981', duration: '60 min' },
    { time: '21:30', icon: '🌙', title: 'Wind Down', desc: 'Dim lights, light stretch, journaling. Signal to the brain that the day is done.', color: '#3b82f6', duration: '30 min' },
  ],
}

const tabs = Object.keys(routines)

export default function Routines() {
  const [active, setActive] = useState('Morning')

  return (
    <section id="routines" style={styles.section}>
      <style>{css}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="section-header"
        >
          <span className="section-tag">Daily structure</span>
          <h2 className="section-title">
            Routines that fuel
            <br />
            <span className="gradient-text">great creative work</span>
          </h2>
          <p className="routines-sub">
            Intentional habits, stacked deliberately. The foundation every high-output creative day is built on.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          className="tabs"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn${active === tab ? ' active' : ''}`}
              onClick={() => setActive(tab)}
            >
              {tab === 'Morning' && '🌅 '}
              {tab === 'Afternoon' && '☀️ '}
              {tab === 'Evening' && '🌙 '}
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Routine cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="routines-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          >
            {routines[active].map((r, i) => (
              <RoutineCard key={r.title} {...r} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function RoutineCard({ time, icon, title, desc, color, duration }) {
  return (
    <motion.div
      className="routine-card"
      variants={staggerItem}
      whileHover={{
        y: -4,
        borderColor: `${color}55`,
        boxShadow: `0 16px 40px ${color}18`,
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
    >
      <div className="card-left">
        <span className="card-time">{time}</span>
        <div className="card-line" style={{ background: color }} />
      </div>

      <div className="card-body">
        <div className="card-header-row">
          <motion.span
            className="card-icon"
            whileHover={{ rotate: [0, -12, 12, 0], transition: { duration: 0.4 } }}
          >
            {icon}
          </motion.span>
          <span className="card-duration" style={{ color, borderColor: `${color}40` }}>
            {duration}
          </span>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
      </div>

      <motion.div
        className="card-accent"
        style={{ background: color }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

const styles = {
  section: {
    padding: '7rem 2rem',
    background: '#0d0d14',
  },
}

const css = `
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  .section-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a78bfa;
    margin-bottom: 1rem;
  }
  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #f1f5f9;
    line-height: 1.15;
  }
  .gradient-text {
    background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .routines-sub {
    font-size: 1rem;
    color: #64748b;
    margin-top: 1rem;
    line-height: 1.7;
  }
  .tabs {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 2.5rem;
  }
  .tab-btn {
    padding: 0.5rem 1.4rem;
    border-radius: 100px;
    border: 1px solid #1e1e2e;
    background: transparent;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
  }
  .tab-btn:hover {
    color: #a78bfa;
    border-color: rgba(124,58,237,0.4);
  }
  .tab-btn.active {
    background: rgba(124,58,237,0.15);
    border-color: rgba(124,58,237,0.5);
    color: #a78bfa;
  }
  .routines-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }
  .routine-card {
    position: relative;
    background: #13131a;
    border: 1px solid #1e1e2e;
    border-radius: 16px;
    padding: 1.75rem;
    display: flex;
    gap: 1.25rem;
    overflow: hidden;
    cursor: default;
  }
  .card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  .card-time {
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .card-line {
    width: 2px;
    flex: 1;
    border-radius: 2px;
    min-height: 40px;
    opacity: 0.5;
  }
  .card-body {
    flex: 1;
    min-width: 0;
  }
  .card-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.6rem;
  }
  .card-icon {
    font-size: 1.6rem;
    display: block;
  }
  .card-duration {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid;
    border-radius: 100px;
    padding: 0.2rem 0.6rem;
  }
  .card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 0.4rem;
  }
  .card-desc {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.65;
  }
  .card-accent {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    transform-origin: top;
    border-radius: 0 2px 2px 0;
    opacity: 0.7;
  }
  @media (max-width: 600px) {
    .tabs { flex-wrap: wrap; }
    .routines-grid { grid-template-columns: 1fr; }
  }
`
