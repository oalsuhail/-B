import { motion } from 'framer-motion'
import { scaleIn, viewport } from '../animations'
import { IconArrowRight } from '../components/Icons'

export default function CTA() {
  return (
    <section className="section section--tight">
      <div className="container">
        <motion.div
          className="cta-banner"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">Have a project in mind? Let&rsquo;s build it right.</h2>
            <p className="cta-banner-sub">
              Tell us about your site, budget, and timeline. We&rsquo;ll follow up
              within one business day with next steps.
            </p>
          </div>
          <div className="cta-banner-actions">
            <a href="#contact" className="btn btn-primary">
              Request a Consultation
              <IconArrowRight width={18} height={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
