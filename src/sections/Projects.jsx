import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewport } from '../animations'
import { IconBuilding, IconCrane, IconMapPin, IconWrench } from '../components/Icons'

const projects = [
  {
    title: 'Riverside Family Residence',
    tag: 'Residential',
    location: 'Riverton, ST',
    colors: ['#1e293b', '#334155'],
    icon: IconBuilding,
  },
  {
    title: 'Harbor View Office Complex',
    tag: 'Commercial',
    location: 'Port Aldis, ST',
    colors: ['#7c2d12', '#c2410c'],
    icon: IconCrane,
  },
  {
    title: 'Midtown Retail Renovation',
    tag: 'Renovation',
    location: 'Riverton, ST',
    colors: ['#374151', '#6b7280'],
    icon: IconWrench,
  },
  {
    title: 'Cedar Grove Multi-Family',
    tag: 'Residential',
    location: 'Cedar Grove, ST',
    colors: ['#1e293b', '#475569'],
    icon: IconBuilding,
  },
  {
    title: 'Northgate Distribution Center',
    tag: 'Industrial',
    location: 'Northgate, ST',
    colors: ['#78350f', '#b45309'],
    icon: IconCrane,
  },
  {
    title: 'Oakline Medical Center',
    tag: 'Commercial',
    location: 'Oakline, ST',
    colors: ['#1e3a5f', '#2563eb'],
    icon: IconBuilding,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="section-header"
        >
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">Projects we&rsquo;re proud of</h2>
          <p className="section-lead">
            A sample of the residential, commercial, and industrial work our
            team has designed and built end to end.
          </p>
        </motion.div>

        <motion.div
          className="grid projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {projects.map((p) => (
            <motion.article key={p.title} className="project-card" variants={staggerItem}>
              <div
                className="project-visual"
                style={{ '--c1': p.colors[0], '--c2': p.colors[1] }}
              >
                <span className="project-tag">{p.tag}</span>
                <p.icon className="project-icon" width={28} height={28} />
              </div>
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <span className="project-meta">
                  <IconMapPin width={15} height={15} />
                  {p.location}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
