import "./index.css";
import { CustomCursor }    from "./components/CustomCursor";
import { ScrollProgress }  from "./components/ScrollProgress";
import { Navbar }          from "./components/Navbar";
import { Hero }            from "./components/Hero";
import { About }           from "./components/About";
import { Experience }      from "./components/Experience";
import { Certifications }  from "./components/Certifications";
import { Skills }          from "./components/Skills";
import { Contact }         from "./components/Contact";
import { Footer }          from "./components/Footer";

export default function App() {
  return (
    <>
      {/* Global overlays */}
      <CustomCursor />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Certifications />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
