import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewport } from '../animations'

const steps = [
  {
    title: 'Consultation',
    desc: 'We walk the site, learn your goals, and scope the budget before a single drawing is made.',
  },
  {
    title: 'Design & Planning',
    desc: 'Architectural drawings, structural engineering, and a permitting-ready plan set.',
  },
  {
    title: 'Permitting & Approvals',
    desc: 'We manage the paperwork and code compliance so your timeline stays intact.',
  },
  {
    title: 'Construction',
    desc: 'Licensed crews build to spec, with weekly progress updates and transparent cost tracking.',
  },
  {
    title: 'Handover & Support',
    desc: 'Final walkthrough, documentation, and warranty support after you move in.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section section--dark">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="section-header"
        >
          <span className="eyebrow">How we work</span>
          <h2 className="section-title">A process built for zero surprises</h2>
          <p className="section-lead">
            Every project follows the same five-stage process, so you always
            know what happens next and who is accountable for it.
          </p>
        </motion.div>

        <motion.ol
          className="process-list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {steps.map((s, i) => (
            <motion.li key={s.title} className="process-step" variants={staggerItem}>
              <span className="process-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
