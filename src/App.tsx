import { Navbar } from "./components/Navbar";
import { ScrollVideo } from "./components/ScrollVideo";
import { SectionOne } from "./components/SectionOne";
import { SectionAbout } from "./components/SectionAbout";
import { SectionTwo } from "./components/SectionTwo";
import { SectionProjects } from "./components/SectionProjects";
import { SectionContact } from "./components/SectionContact";

function App() {
  return (
    <div className="relative">
      <ScrollVideo />
      <div className="relative z-10">
        <Navbar />
        <main>
          <SectionOne />
          <div className="h-[80vh]" aria-hidden="true" />
          <SectionAbout />
          <SectionTwo />
          <SectionProjects />
          <SectionContact />
        </main>
      </div>
    </div>
  );
}

export default App;
