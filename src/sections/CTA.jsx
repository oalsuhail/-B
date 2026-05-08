import { motion } from 'framer-motion'
import { scaleIn, staggerContainer, staggerItem, viewport } from '../animations'

export default function CTA() {
  return (
    <section style={{ padding: '7rem 2rem 5rem' }}>
      <style>{css}</style>

      <motion.div
        className="cta-box"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {/* Animated background gradient */}
        <motion.div
          className="cta-glow"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="cta-content"
        >
          <motion.h2 variants={staggerItem} className="cta-title">
            Ready to build something
            <br />
            <span className="gradient-text">extraordinary?</span>
          </motion.h2>

          <motion.p variants={staggerItem} className="cta-sub">
            Let's talk about your project. We take on a select number of
            <br />
            engagements each quarter to give every client our best.
          </motion.p>

          <motion.div variants={staggerItem} className="cta-actions">
            <motion.button
              className="cta-btn"
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 48px rgba(124,58,237,0.6)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Start a project
            </motion.button>
            <motion.button
              className="cta-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View pricing
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="footer"
      >
        <span>© 2025 Studio · Built with motion in mind</span>
        <div className="footer-links">
          {['Twitter', 'Dribbble', 'LinkedIn', 'GitHub'].map((l) => (
            <motion.a
              key={l}
              href="#"
              className="footer-link"
              whileHover={{ color: '#a78bfa', y: -1 }}
              transition={{ duration: 0.15 }}
            >
              {l}
            </motion.a>
          ))}
        </div>
      </motion.footer>
    </section>
  )
}

const css = `
  .cta-box {
    max-width: 900px;
    margin: 0 auto 5rem;
    background: #13131a;
    border: 1px solid #1e1e2e;
    border-radius: 24px;
    padding: 5rem 3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cta-glow {
    position: absolute;
    inset: -2px;
    background: linear-gradient(270deg, #7c3aed, #3b82f6, #10b981, #7c3aed);
    background-size: 400% 400%;
    border-radius: 24px;
    opacity: 0.12;
    z-index: 0;
    pointer-events: none;
  }
  .cta-content { position: relative; z-index: 1; }
  .cta-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #f1f5f9;
    line-height: 1.1;
    margin-bottom: 1.25rem;
  }
  .gradient-text {
    background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cta-sub {
    font-size: 1rem;
    color: #64748b;
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }
  .cta-actions { display: flex; gap: 1rem; justify-content: center; }
  .cta-btn {
    padding: 1rem 2.5rem;
    background: #7c3aed;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
  }
  .cta-secondary {
    padding: 1rem 2rem;
    background: transparent;
    color: #94a3b8;
    border: 1px solid #1e1e2e;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: border-color 0.2s, color 0.2s;
  }
  .cta-secondary:hover { border-color: #7c3aed; color: #e2e8f0; }
  .footer {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #475569;
    padding-top: 1.5rem;
    border-top: 1px solid #1e1e2e;
  }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-link {
    color: #475569;
    text-decoration: none;
    font-size: 0.8rem;
    display: inline-block;
  }
`
