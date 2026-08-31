import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Currently from "./components/Currently";
import Certifications from "./components/Certifications";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GithubActivity from "./components/GithubActivity";
import Journey from "./components/Journey";
import Collaborate from "./components/Collaborate";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-surface-subtle selection:text-foreground page-enter">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Currently />
        <Certifications />
        <Skills />
        <Projects />
        <GithubActivity />
        <Journey />
        <Collaborate />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
