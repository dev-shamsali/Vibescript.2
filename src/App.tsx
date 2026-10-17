import { Nav } from "./components/Nav";
import { HeroWordmark, HeroBody } from "./components/Hero";
import { Statement } from "./components/Statement";
import { Services } from "./components/Services";
import { AiAutomation } from "./components/AiAutomation";
import { WordField } from "./components/WordField";
import { Process } from "./components/Process";
import { Work } from "./components/Work";
import { Faq } from "./components/Faq";
import { Founder } from "./components/Founder";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <div className="swiss">
      <HeroWordmark />
      <Nav />
      <main>
        <HeroBody />
        <Statement />
        <Services />
        <AiAutomation />
        <WordField />
        <Process />
        <Work />
        <Faq />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <ThemeToggle className="swiss-link fixed bottom-4 left-4 z-40 px-1 text-[0.78rem] text-[#fff] mix-blend-difference hover:!text-[#fff]" />
    </div>
  );
}

export default App;
