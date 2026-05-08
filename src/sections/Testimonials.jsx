import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, viewport } from '../animations'

const testimonials = [
  { name: 'Sarah Chen', role: 'CPO · Lumina Finance', quote: 'The motion design elevated our brand perception overnight. Investors noticed. Users stayed.' },
  { name: 'Marcus Rivera', role: 'Founder · Orbit', quote: 'They made complexity feel effortless. Our dashboard went from intimidating to delightful.' },
  { name: 'Priya Nair', role: 'Head of Design · Maison Noir', quote: 'Every frame is considered. The attention to timing and easing is on another level.' },
  { name: 'Tom Wills', role: 'CTO · Pulse Health', quote: 'Shipped in 3 weeks, looked like 6 months of work. Our app store rating jumped to 4.9.' },
  { name: 'Elena Vogt', role: 'VP Product · Rune', quote: "The best investment we've made. Motion as a differentiator — finally someone who gets it." },
  { name: 'James Park', role: 'CEO · Verity', quote: 'Not just pretty. The interactions actually reduce cognitive load. Users complete flows faster.' },
]

// Infinitely scrolling ticker using useAnimationFrame
function Ticker({ items, speed = 40, reverse = false }) {
  const x = useMotionValue(0)
  const baseX = useMotionValue(0)
  const directionFactor = reverse ? -1 : 1
  const copyWidth = 1240 // approx width of one set

  useAnimationFrame((_, delta) => {
    const moveBy = directionFactor * speed * (delta / 1000)
    baseX.set(baseX.get() + moveBy)
  })

  const xWrapped = useTransform(baseX, (v) => `${wrap(-copyWidth, 0, v)}px`)

  return (
    <div style={{ overflow: 'hidden', width: '100%', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        style={{ x: xWrapped, display: 'flex', gap: '1rem', width: 'max-content' }}
      >
        {[...items, ...items].map((item, i) => (
          <TestimonialCard key={i} {...item} />
        ))}
      </motion.div>
    </div>
  )
}

function TestimonialCard({ name, role, quote }) {
  return (
    <motion.div
      className="t-card"
      whileHover={{
        y: -4,
        borderColor: 'rgba(124,58,237,0.4)',
        transition: { duration: 0.2 },
      }}
    >
      <style>{css}</style>
      <p className="t-quote">"{quote}"</p>
      <div className="t-author">
        <div className="t-avatar">{name[0]}</div>
        <div>
          <div className="t-name">{name}</div>
          <div className="t-role">{role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '7rem 0' }}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        style={{ textAlign: 'center', marginBottom: '3.5rem', padding: '0 2rem' }}
      >
        <span className="section-tag" style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '1rem' }}>
          Testimonials
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#f1f5f9', lineHeight: 1.15 }}>
          Trusted by teams who care
          <br />about every detail
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Ticker items={testimonials} speed={35} />
        <Ticker items={[...testimonials].reverse()} speed={28} reverse />
      </div>
    </section>
  )
}

const css = `
  .t-card {
    width: 380px;
    flex-shrink: 0;
    background: #13131a;
    border: 1px solid #1e1e2e;
    border-radius: 16px;
    padding: 1.75rem;
    cursor: default;
  }
  .t-quote {
    font-size: 0.925rem;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 1.25rem;
    font-style: italic;
  }
  .t-author { display: flex; align-items: center; gap: 0.75rem; }
  .t-avatar {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c3aed, #3b82f6);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.9rem; color: #fff;
    flex-shrink: 0;
  }
  .t-name { font-size: 0.875rem; font-weight: 600; color: #e2e8f0; }
  .t-role { font-size: 0.78rem; color: #64748b; margin-top: 2px; }
`
