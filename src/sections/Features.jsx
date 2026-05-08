import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewport } from '../animations'

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Optimized for performance from day one. Sub-second load times, smooth 60fps animations, no compromises.',
  },
  {
    icon: '🎨',
    title: 'Design Systems',
    desc: 'Tokens, components, and patterns built to scale. Every pixel intentional, every interaction considered.',
  },
  {
    icon: '🔮',
    title: 'Motion Language',
    desc: 'Consistent animation vocabulary that communicates hierarchy, feedback, and brand personality.',
  },
  {
    icon: '📱',
    title: 'Responsive First',
    desc: 'Fluid layouts that adapt beautifully across every screen size without breakpoint hacks.',
  },
  {
    icon: '♿',
    title: 'Accessible',
    desc: 'WCAG 2.1 AA compliant. Motion respects prefers-reduced-motion. Screen reader friendly.',
  },
  {
    icon: '🚀',
    title: 'Ship Fast',
    desc: 'Design-to-code pipelines that cut handoff friction. From Figma to production in days, not weeks.',
  },
]

export default function Features() {
  return (
    <section id="features" style={styles.section}>
      <style>{css}</style>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="section-header"
      >
        <span className="section-tag">What we do</span>
        <h2 className="section-title">
          Everything you need to
          <br />
          ship with confidence
        </h2>
      </motion.div>

      <motion.div
        className="features-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </motion.div>
    </section>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      className="feature-card"
      variants={staggerItem}
      whileHover={{
        y: -6,
        borderColor: 'rgba(124,58,237,0.5)',
        boxShadow: '0 20px 40px rgba(124,58,237,0.12)',
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
    >
      <motion.span
        className="feature-icon"
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
      >
        {icon}
      </motion.span>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </motion.div>
  )
}

const styles = { section: { padding: '7rem 2rem', maxWidth: '1200px', margin: '0 auto' } }

const css = `
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
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
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.25rem;
  }
  .feature-card {
    background: #13131a;
    border: 1px solid #1e1e2e;
    border-radius: 16px;
    padding: 2rem;
    cursor: default;
  }
  .feature-icon {
    display: block;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .feature-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 0.6rem;
  }
  .feature-desc {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.65;
  }
`
