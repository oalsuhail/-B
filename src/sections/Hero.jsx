import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { staggerContainer, staggerItem } from '../animations'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} style={styles.section}>
      <style>{css}</style>

      {/* Parallax background orbs */}
      <motion.div style={{ y, opacity }} className="hero-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </motion.div>

      <motion.div
        className="hero-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem} className="hero-badge">
          ✦ Design · Motion · Code
        </motion.div>

        <motion.h1 variants={staggerItem} className="hero-title">
          Build things that
          <br />
          <span className="gradient-text">feel alive</span>
        </motion.h1>

        <motion.p variants={staggerItem} className="hero-sub">
          Crafting digital experiences with intentional motion,
          <br />
          precise interaction, and obsessive attention to detail.
        </motion.p>

        <motion.div variants={staggerItem} className="hero-actions">
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(124,58,237,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            View our work
          </motion.button>
          <motion.button
            className="btn-ghost"
            whileHover={{ scale: 1.04, color: '#e2e8f0' }}
            whileTap={{ scale: 0.97 }}
          >
            Learn more →
          </motion.button>
        </motion.div>

        <motion.div variants={staggerItem} className="hero-stats">
          {[['120+', 'Projects'], ['8yr', 'Experience'], ['98%', 'Satisfaction']].map(([n, l]) => (
            <div key={l} className="stat">
              <span className="stat-num">{n}</span>
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '80px',
  },
}

const css = `
  .hero-orbs {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.25;
  }
  .orb-1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, #7c3aed, transparent);
    top: -100px; left: -100px;
  }
  .orb-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #2563eb, transparent);
    bottom: -50px; right: -80px;
  }
  .hero-content {
    text-align: center;
    position: relative;
    z-index: 1;
    max-width: 780px;
    padding: 2rem;
  }
  .hero-badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(124, 58, 237, 0.15);
    border: 1px solid rgba(124, 58, 237, 0.3);
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #a78bfa;
    margin-bottom: 1.5rem;
  }
  .hero-title {
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    color: #f1f5f9;
  }
  .gradient-text {
    background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: 1.125rem;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }
  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 3rem;
  }
  .btn-primary {
    padding: 0.875rem 2rem;
    background: #7c3aed;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
  }
  .btn-ghost {
    padding: 0.875rem 2rem;
    background: transparent;
    color: #94a3b8;
    border: 1px solid #1e1e2e;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: border-color 0.2s;
  }
  .btn-ghost:hover { border-color: #7c3aed; }
  .hero-stats {
    display: flex;
    gap: 3rem;
    justify-content: center;
  }
  .stat { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
  .stat-num {
    font-size: 1.75rem;
    font-weight: 700;
    color: #f1f5f9;
  }
  .stat-label {
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`
