import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewport } from '../animations'
import { IconShield, IconClock, IconUsers, IconClipboard } from '../components/Icons'

const points = [
  {
    icon: IconShield,
    title: 'Licensed & Insured',
    desc: 'Fully licensed general contractor carrying comprehensive insurance on every job.',
  },
  {
    icon: IconClock,
    title: 'On-Time, On-Budget',
    desc: 'Detailed scheduling and transparent cost tracking from day one, no change-order surprises.',
  },
  {
    icon: IconUsers,
    title: 'In-House Design Team',
    desc: 'Architects and engineers who work alongside our builders, not around them.',
  },
  {
    icon: IconClipboard,
    title: 'Dedicated Project Lead',
    desc: 'One point of contact from the first sketch through the final walkthrough.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="section section--dark">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="section-header"
        >
          <span className="eyebrow">Why ABC Company</span>
          <h2 className="section-title">Built on accountability</h2>
        </motion.div>

        <motion.div
          className="grid why-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {points.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} className="why-item" variants={staggerItem}>
              <span className="why-icon">
                <Icon width={22} height={22} />
              </span>
              <div>
                <h3 className="why-title">{title}</h3>
                <p className="why-desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
