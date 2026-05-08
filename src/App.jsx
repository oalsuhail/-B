import Hero from './sections/Hero'
import Features from './sections/Features'
import Work from './sections/Work'
import Testimonials from './sections/Testimonials'
import CTA from './sections/CTA'
import Nav from './components/Nav'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Work />
        <Testimonials />
        <CTA />
      </main>
    </>
  )
}
