import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Currently from "./components/Currently";
import Journey from "./components/Journey";
import Blog from "./components/Blog";
import Collaborate from "./components/Collaborate";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ede8dc] text-foreground selection:bg-[#d8ceb8] selection:text-[#171717]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Currently />
        <Journey />
        <Blog />
        <Collaborate />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
