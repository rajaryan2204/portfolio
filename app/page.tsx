import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Certifications from "./components/Certifications";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Collaborate from "./components/Collaborate";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-surface-subtle selection:text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Certifications />
        <Skills />
        <Projects />
        <Journey />
        <Collaborate />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
