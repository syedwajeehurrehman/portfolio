import { About } from './components/About'
import { Approach } from './components/Approach'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Services } from './components/Services'
import { Why } from './components/Why'
import { Work } from './components/Work'
import { nav } from './data/site'
import { useActiveSection } from './hooks/useActiveSection'
import { useReveal } from './hooks/useReveal'

const sectionIds = nav.map((n) => n.id)

export default function App() {
  useReveal()
  const active = useActiveSection(sectionIds)
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav active={active} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Work />
        <About />
        <Approach />
        <Why />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
