import { motion, useScroll, useTransform } from 'framer-motion'

const links = ['Features', 'Work', 'Testimonials']

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 60], ['rgba(10,10,15,0)', 'rgba(10,10,15,0.95)'])
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1])

  return (
    <motion.nav
      style={{ background: bg }}
      className="nav"
    >
      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2.5rem;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(124, 58, 237, 0);
          transition: border-color 0.3s;
        }
        .nav-logo {
          font-weight: 700;
          font-size: 1.25rem;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .nav-links a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #e2e8f0; }
        .nav-cta {
          padding: 0.5rem 1.25rem;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
      `}</style>

      <motion.span
        className="nav-logo"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Studio
      </motion.span>

      <motion.ul
        className="nav-links"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </motion.ul>

      <motion.button
        className="nav-cta"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05, backgroundColor: '#6d28d9' }}
        whileTap={{ scale: 0.97 }}
      >
        Get started
      </motion.button>
    </motion.nav>
  )
}
