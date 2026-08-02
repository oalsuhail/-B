import { BrandMark, IconMail, IconMapPin, IconPhone } from './Icons'

const serviceLinks = [
  'Architectural Design',
  'General Construction',
  'Renovation & Remodeling',
  'Project Management',
  'Interior Design',
]

const companyLinks = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Our Process' },
  { href: '#projects', label: 'Projects' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
]

const social = [
  { label: 'LinkedIn', d: 'M4.5 3.5A1.5 1.5 0 1 0 4.5 6.5 1.5 1.5 0 1 0 4.5 3.5zM3.3 8.7h2.4V20H3.3V8.7zM9 8.7h2.3v1.6h.03c.32-.6 1.1-1.24 2.27-1.24 2.43 0 2.88 1.6 2.88 3.68V20h-2.4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V20H9V8.7z' },
  { label: 'Instagram', d: 'M12 3.2c2.4 0 2.7 0 3.6.05 2.4.11 3.5 1.24 3.6 3.6.05.9.06 1.17.06 3.6s0 2.7-.06 3.6c-.1 2.36-1.2 3.49-3.6 3.6-.9.05-1.17.06-3.6.06s-2.7 0-3.6-.06c-2.4-.11-3.5-1.25-3.6-3.6-.05-.9-.06-1.17-.06-3.6s0-2.7.06-3.6c.1-2.36 1.2-3.49 3.6-3.6.9-.05 1.17-.05 3.6-.05zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2zm4.2-6.8a.93.93 0 1 1 0-1.87.93.93 0 0 1 0 1.87z' },
  { label: 'Facebook', d: 'M13.5 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.85.24-1.43 1.46-1.43H16.5V4.9c-.25-.03-1.1-.1-2.1-.1-2.1 0-3.5 1.28-3.5 3.63v2.28H8.4v2.9h2.5V21h2.6z' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid footer-grid">
          <div>
            <a href="#top" className="nav-logo" aria-label="ABC Company home">
              <span className="nav-logo-mark" aria-hidden="true">
                <BrandMark width={22} height={22} />
              </span>
              <span>
                <span className="nav-logo-text">ABC Company</span>
                <span className="nav-logo-sub">Design &amp; Construction</span>
              </span>
            </a>
            <p className="footer-blurb">
              Full-service design and construction for residential, commercial,
              and industrial clients — from first sketch to final walkthrough.
            </p>
            <div className="footer-social">
              {social.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Company</h3>
            <div className="footer-links">
              {companyLinks.map((l) => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Services</h3>
            <div className="footer-links">
              {serviceLinks.map((s) => (
                <a key={s} href="#services">{s}</a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Contact</h3>
            <div className="footer-links">
              <a href="tel:+15550102020">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IconPhone width={16} height={16} /> +1 (555) 010-2020
                </span>
              </a>
              <a href="mailto:hello@abccompany.com">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IconMail width={16} height={16} /> hello@abccompany.com
                </span>
              </a>
              <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <IconMapPin width={16} height={16} style={{ marginTop: 2 }} />
                420 Ironworks Ave, Suite 100
                <br />
                Riverton, ST 55021
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ABC Company. All rights reserved.</span>
          <span>Licensed General Contractor · License #GC-000000</span>
        </div>
      </div>
    </footer>
  )
}
