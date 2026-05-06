import { motion } from "framer-motion";
import { ITINERARY } from "../data/itinerary";
import { totalRailKm } from "../lib/routeGeometry";
import { CITIES } from "../data/locations";
import { TOURS } from "../data/tours";

export default function PassportStamp() {
  const cityKeys = Array.from(new Set(ITINERARY.map((d) => d.stay).filter((s) => s !== "Flight")));
  const km = Math.round(totalRailKm());

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-4xl mx-auto"
    >
      <div className="bg-paper-dark/40 border-2 border-double border-ink-faded/50 rounded-md p-10 md:p-14 relative overflow-hidden">
        {/* Stamps in corners */}
        <span className="stamp absolute top-6 left-6 hidden md:inline-block">
          Heathrow · 16 May
        </span>
        <span className="stamp absolute bottom-6 right-6 hidden md:inline-block" style={{ transform: "rotate(8deg)" }}>
          Departing · 31 May 2026
        </span>

        <p className="font-display italic text-sepia tracking-[0.3em] uppercase text-xs mb-3 text-center">
          the itinerary, in brief
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-ink text-center leading-tight mb-8">
          A trip is made<br />
          <em>of the small things ahead.</em>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat n={ITINERARY.length} label="Days planned" />
          <Stat n={cityKeys.length} label="Cities to sleep in" />
          <Stat n={km} label="Kilometres by rail" suffix=" km" />
          <Stat n={TOURS.length} label="Tours booked" />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {cityKeys.map((k) => {
            const c = CITIES[k as keyof typeof CITIES];
            return (
              <div key={k} className="flex items-center gap-2 font-display italic text-ink-soft">
                <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                {c.label}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ n, label, suffix = "" }: { n: number; label: string; suffix?: string }) {
  return (
    <div>
      <div className="font-numeral text-4xl md:text-5xl text-ink leading-none">
        {n}
        {suffix}
      </div>
      <div className="font-display italic text-xs tracking-[0.25em] uppercase text-ink-faded mt-2">
        {label}
      </div>
    </div>
  );
}
