import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, staggerItem, viewport } from '../animations'

const projects = [
  { tag: 'Brand + Web', title: 'Lumina Finance', desc: 'End-to-end design system and marketing site for a Series B fintech startup.', color: '#3b82f6', num: '01' },
  { tag: 'Product', title: 'Orbit Dashboard', desc: 'Real-time analytics platform with complex data visualisations and micro-interactions.', color: '#10b981', num: '02' },
  { tag: 'E-commerce', title: 'Maison Noir', desc: 'High-fashion e-commerce experience with editorial photography and smooth transitions.', color: '#f59e0b', num: '03' },
  { tag: 'Mobile App', title: 'Pulse Health', desc: 'Wearable companion app with motion-forward onboarding and gesture navigation.', color: '#ec4899', num: '04' },
]

export default function Work() {
  return (
    <section id="work" style={{ padding: '7rem 2rem', background: '#0d0d14' }}>
      <style>{css}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="section-header"
        >
          <span className="section-tag">Selected work</span>
          <h2 className="section-title">Projects we're proud of</h2>
        </motion.div>

        <motion.div
          className="work-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.num} {...p} reverse={i % 2 === 1} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ tag, title, desc, color, num, reverse }) {
  return (
    <motion.div
      className={`project-card ${reverse ? 'reverse' : ''}`}
      variants={staggerItem}
      whileHover="hover"
    >
      <motion.div
        className="project-visual"
        style={{ '--c': color }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <motion.span
          className="project-num"
          initial={{ opacity: 0.15 }}
          whileHover={{ opacity: 0.4, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {num}
        </motion.span>
        {/* Animated accent line */}
        <motion.div
          className="accent-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ background: color }}
        />
      </motion.div>

      <div className="project-info">
        <span className="project-tag" style={{ color }}>{tag}</span>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{desc}</p>
        <motion.button
          className="project-link"
          style={{ '--c': color }}
          whileHover={{ x: 4, transition: { duration: 0.2 } }}
        >
          View case study →
        </motion.button>
      </div>
    </motion.div>
  )
}

const css = `
  .section-header { text-align: center; margin-bottom: 4rem; }
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
  .work-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .project-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    background: #13131a;
    border: 1px solid #1e1e2e;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
  }
  .project-card.reverse { direction: rtl; }
  .project-card.reverse > * { direction: ltr; }
  .project-visual {
    position: relative;
    background: linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.2)),
                linear-gradient(135deg, color-mix(in srgb, var(--c) 20%, #0a0a0f), #0a0a0f);
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .project-num {
    font-size: 8rem;
    font-weight: 900;
    color: var(--c);
    line-height: 1;
    user-select: none;
  }
  .accent-line {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    transform-origin: left;
  }
  .project-info {
    padding: 2.5rem 2rem 2.5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.75rem;
  }
  .project-card.reverse .project-info {
    padding: 2.5rem 0 2.5rem 2rem;
  }
  .project-tag {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .project-title {
    font-size: 1.6rem;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }
  .project-desc {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.65;
  }
  .project-link {
    background: transparent;
    border: none;
    color: var(--c);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    padding: 0;
    margin-top: 0.5rem;
    width: fit-content;
  }
  @media (max-width: 700px) {
    .project-card, .project-card.reverse {
      grid-template-columns: 1fr;
      direction: ltr;
    }
    .project-visual { min-height: 180px; }
    .project-info { padding: 1.5rem !important; }
  }
`
