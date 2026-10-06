import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import Gallery from './components/Gallery.jsx';
import FinalCta from './components/FinalCta.jsx';
import Footer from './components/Footer.jsx';
import useReveal from './hooks/useReveal.js';
import { SECTIONS } from './data/content.js';

/**
 * ClearView landing page.
 *
 * Order: header, hero, the five product sections, the full screenshot strip,
 * closing call to action and the footer. All copy and screenshot metadata come
 * from src/data/content.js.
 */
export default function App() {
  // Wires up the scroll-reveal fade-ups for every [data-reveal] element.
  useReveal();

  return (
    <>
      <Header />

      <main>
        <Hero />

        {SECTIONS.map((section) => (
          <Section key={section.id} section={section} />
        ))}

        <Gallery />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
