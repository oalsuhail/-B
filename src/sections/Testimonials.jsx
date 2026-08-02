import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewport } from '../animations'
import { IconStar } from '../components/Icons'

const testimonials = [
  {
    name: 'Dana R.',
    role: 'Restaurant Owner',
    quote: 'ABC Company took our restaurant from a napkin sketch to open-for-business in under seven months. Every deadline was met.',
  },
  {
    name: 'Marcus T.',
    role: 'Facilities Director',
    quote: 'The design team caught issues before they became change orders. That alone saved us weeks on the schedule.',
  },
  {
    name: 'Priya K.',
    role: 'Property Developer',
    quote: 'Clear communication throughout the build. We always knew exactly where the budget and schedule stood.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="section-header section-header--center"
        >
          <span className="eyebrow">Client feedback</span>
          <h2 className="section-title">Trusted by people who build for a living</h2>
        </motion.div>

        <motion.div
          className="grid testimonials-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {testimonials.map((t) => (
            <motion.blockquote key={t.name} className="testimonial-card" variants={staggerItem}>
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} width={16} height={16} />
                ))}
              </div>
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <footer className="testimonial-author">
                <span className="testimonial-avatar" aria-hidden="true">
                  {t.name[0]}
                </span>
                <span>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
