import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BrandMark, IconClose, IconMenu, IconPhone } from './Icons'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#projects', label: 'Projects' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

const PHONE = '+1 (555) 010-2020'

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 60], ['rgba(11,18,32,0)', 'rgba(11,18,32,0.96)'])
  const borderColor = useTransform(scrollY, [0, 60], ['rgba(36,48,74,0)', 'rgba(36,48,74,1)'])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      style={{ background: bg, borderBottom: '1px solid', borderColor }}
      className="nav"
    >
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="ABC Company home">
          <span className="nav-logo-mark" aria-hidden="true">
            <BrandMark width={22} height={22} />
          </span>
          <span>
            <span className="nav-logo-text">ABC Company</span>
            <span className="nav-logo-sub">Design &amp; Construction</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-phone" href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}>
            <IconPhone width={18} height={18} />
            {PHONE}
          </a>
          <a href="#contact" className="btn btn-primary">
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          className="icon-btn nav-toggle"
          style={{ color: '#f8fafc', borderColor: 'rgba(248,250,252,0.25)' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div id="mobile-menu" className={`nav-mobile ${open ? 'is-open' : ''}`}>
        <div className="nav-mobile-inner">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="nav-mobile-phone" href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}>
            <IconPhone width={18} height={18} />
            {PHONE}
          </a>
          <a href="#contact" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
            Get a Quote
          </a>
        </div>
      </div>
    </motion.header>
  )
}
