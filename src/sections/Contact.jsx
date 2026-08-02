import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeLeft, fadeRight, viewport } from '../animations'
import { IconCheckCircle, IconClock, IconMail, IconMapPin, IconPhone } from '../components/Icons'

const info = [
  {
    icon: IconPhone,
    label: 'Call us',
    value: '+1 (555) 010-2020',
    href: 'tel:+15550102020',
  },
  {
    icon: IconMail,
    label: 'Email us',
    value: 'hello@abccompany.com',
    href: 'mailto:hello@abccompany.com',
  },
  {
    icon: IconMapPin,
    label: 'Visit us',
    value: '420 Ironworks Ave, Suite 100, Riverton, ST 55021',
  },
  {
    icon: IconClock,
    label: 'Office hours',
    value: 'Mon–Fri, 8:00 AM – 5:00 PM',
  },
]

const initialForm = { name: '', email: '', phone: '', projectType: 'Residential', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <div className="section-header section-header--center" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <span className="eyebrow">Get in touch</span>
          <h2 className="section-title">Let&rsquo;s talk about your project</h2>
          <p className="section-lead">
            Share a few details and a project lead will reach out to schedule a
            walkthrough or a call.
          </p>
        </div>

        <div className="contact-layout">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewport}>
            {info.map(({ icon: Icon, label, value, href }) => (
              <div className="contact-info-item" key={label}>
                <span className="contact-info-icon">
                  <Icon width={20} height={20} />
                </span>
                <div>
                  <div className="contact-info-label">{label}</div>
                  <div className="contact-info-value">
                    {href ? <a href={href}>{value}</a> : value}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewport}>
            {submitted ? (
              <div className="form-success" role="status">
                <IconCheckCircle width={22} height={22} />
                <span>
                  Thanks — your message has been received. A project lead will
                  reach out within one business day.
                </span>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="name">Full name</label>
                    <input
                      className="form-input"
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input
                      className="form-input"
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="email">Email address</label>
                  <input
                    className="form-input"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="projectType">Project type</label>
                  <select
                    className="form-select"
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Renovation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="message">Project details</label>
                  <textarea
                    className="form-textarea"
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
