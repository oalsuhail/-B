import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../animations'
import { IconArrowRight } from '../components/Icons'

const stats = [
  ['15+', 'Years in business'],
  ['340+', 'Projects completed'],
  ['2.4M+', 'Sq ft built'],
  ['98%', 'On-time delivery'],
]

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <motion.div
        className="hero-inner"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={staggerItem} className="hero-badge">
          Licensed General Contractor &amp; Design Studio
        </motion.span>

        <motion.h1 variants={staggerItem} className="hero-title">
          We design. We build. <span className="accent">We deliver.</span>
        </motion.h1>

        <motion.p variants={staggerItem} className="hero-sub">
          ABC Company is a full-service design and construction firm delivering
          architecture, engineering, and general contracting for residential,
          commercial, and industrial projects — on time and on budget.
        </motion.p>

        <motion.div variants={staggerItem} className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Start Your Project
            <IconArrowRight width={18} height={18} />
          </a>
          <a href="#projects" className="btn btn-outline">
            View Our Work
          </a>
        </motion.div>

        <motion.div variants={staggerItem} className="hero-stats">
          {stats.map(([num, label]) => (
            <div key={label}>
              <span className="hero-stat-num">{num}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
