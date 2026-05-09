import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Numbers from "./components/Numbers";
import Travelers from "./components/Travelers";
import ClothesSection from "./components/ClothesSection";

export default function App() {
  return (
    <main className="grain min-h-screen relative">
      <Hero />
      <ActDivider numeral="II" caption="The Journey" />
      <Journey />
      <ActDivider numeral="III" caption="The Numbers" />
      <Numbers />
      <ActDivider numeral="IV" caption="The Wardrobe" />
      <ClothesSection />
      <ActDivider numeral="V" caption="Two Travelers" />
      <Travelers />
      <Footer />
    </main>
  );
}

function ActDivider({ numeral, caption }: { numeral: string; caption: string }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
      <div className="divider-fleur">
        <span className="text-xs tracking-[0.4em]">ACT&nbsp;{numeral}&nbsp;·&nbsp;{caption}</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-6 py-16 text-center font-display italic text-ink-faded">
      <div className="divider-fleur mb-6"><span>bon voyage.</span></div>
      <p className="text-sm">A trip imagined, in numbers and ink.</p>
    </footer>
  );
}
