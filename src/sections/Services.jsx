import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewport } from '../animations'
import {
  IconCompass,
  IconBuilding,
  IconWrench,
  IconClipboard,
  IconPalette,
  IconLeaf,
} from '../components/Icons'

const services = [
  {
    icon: IconCompass,
    title: 'Architectural Design',
    desc: 'Concept sketches through construction-ready drawings, space planning, and 3D visualization.',
  },
  {
    icon: IconBuilding,
    title: 'General Construction',
    desc: 'Full-service ground-up construction with in-house crews and vetted trade partners.',
  },
  {
    icon: IconWrench,
    title: 'Renovation & Remodeling',
    desc: 'Transforming existing residential and commercial spaces without the guesswork.',
  },
  {
    icon: IconClipboard,
    title: 'Project Management',
    desc: 'A single point of accountability from permitting through the final walkthrough.',
  },
  {
    icon: IconPalette,
    title: 'Interior Design',
    desc: 'Material selection, finishes, and space planning matched to how you actually use the space.',
  },
  {
    icon: IconLeaf,
    title: 'Sustainable Building',
    desc: 'Energy-efficient methods and materials that lower long-term operating costs.',
  },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="section-header"
        >
          <span className="eyebrow">What we do</span>
          <h2 className="section-title">Design and construction, under one roof</h2>
          <p className="section-lead">
            From the first sketch to the final punch list, our in-house team
            handles every phase so nothing falls through the cracks between
            designer and builder.
          </p>
        </motion.div>

        <motion.div
          className="grid services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} className="service-card" variants={staggerItem}>
              <span className="service-icon">
                <Icon width={26} height={26} />
              </span>
              <h3 className="service-title">{title}</h3>
              <p className="service-desc">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
