import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Process from './sections/Process'
import Projects from './sections/Projects'
import WhyUs from './sections/WhyUs'
import Testimonials from './sections/Testimonials'
import CTA from './sections/CTA'
import Contact from './sections/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#top" className="skip-link">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <Projects />
        <WhyUs />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
