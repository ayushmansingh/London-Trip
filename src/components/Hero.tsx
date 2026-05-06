import HeroMap from "./HeroMap";
import StatsTicker from "./StatsTicker";
import { ITINERARY } from "../data/itinerary";
import { BUDGET_TOTAL } from "../data/budget";
import { totalRailKm } from "../lib/routeGeometry";
import { motion } from "framer-motion";

const cities = new Set(
  ITINERARY.map((d) => d.stay).filter((s) => s !== "Flight")
);

function daysUntil(dateStr: string): number {
  // Calendar-day difference, timezone-agnostic.
  const [y, m, d] = dateStr.split("-").map(Number);
  const target = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((target - today) / (1000 * 60 * 60 * 24)));
}

export default function Hero() {
  const km = Math.round(totalRailKm());
  const daysToDepart = daysUntil(ITINERARY[0].date);

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <HeroMap />

      {/* Vignette to make text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(244,234,213,0) 38%, rgba(244,234,213,0.85) 95%)",
        }}
      />

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute top-6 left-0 right-0 text-center"
      >
        <div className="font-display italic tracking-[0.4em] text-xs text-ink-faded uppercase">
          Departing 16 May 2026
          {daysToDepart > 0 && (
            <span className="text-burgundy"> · {daysToDepart} {daysToDepart === 1 ? "day" : "days"} to go</span>
          )}
        </div>
      </motion.div>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.0 }}
        className="absolute left-1/2 -translate-x-1/2 top-[18vh] text-center px-6"
      >
        <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight text-ink">
          London,&nbsp;<em className="text-burgundy">with love.</em>
        </h1>
        <p className="font-display italic mt-3 text-lg md:text-xl text-ink-soft max-w-2xl mx-auto">
          Sixteen days through England &amp; Scotland — by rail,
          on foot, and over what will surely be a great many cups of tea.
        </p>
      </motion.div>

      {/* Stats ticker block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1.0 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[min(960px,92vw)]"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-paper/80 backdrop-blur-sm border border-ink-faded/30 rounded-md px-6 py-5 shadow-sm">
          <Stat label="Days planned" value={<StatsTicker value={ITINERARY.length} />} />
          <Stat label="Cities ahead" value={<StatsTicker value={cities.size} />} />
          <Stat label="Rail kilometres" value={<StatsTicker value={km} suffix=" km" />} />
          <Stat label="Booked so far" value={<StatsTicker value={BUDGET_TOTAL.actual} prefix="₹" suffix="k" decimals={1} />} />
        </div>
        <div className="text-center font-display italic text-xs tracking-[0.3em] text-ink-faded mt-4 uppercase">
          ↓ scroll to begin the journey
        </div>
      </motion.div>

      {/* Compass rose, top-right */}
      <CompassRose className="absolute top-6 right-6 w-16 h-16 opacity-60" />
    </section>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-display text-ink leading-none">
        {value}
      </div>
      <div className="font-display italic text-xs tracking-[0.25em] uppercase text-ink-faded mt-2">
        {label}
      </div>
    </div>
  );
}

function CompassRose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="#5a4a35" strokeWidth="0.7">
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="38" strokeDasharray="1 2" />
      <g>
        <path d="M50 6 L54 50 L50 94 L46 50 Z" fill="#2b2419" stroke="none" />
        <path d="M6 50 L50 46 L94 50 L50 54 Z" fill="#a0723a" stroke="none" opacity="0.7" />
      </g>
      <text x="50" y="14" textAnchor="middle" fontSize="7" fill="#2b2419" fontFamily="Cormorant Garamond, serif" fontStyle="italic">N</text>
      <text x="50" y="92" textAnchor="middle" fontSize="7" fill="#5a4a35" fontFamily="Cormorant Garamond, serif" fontStyle="italic">S</text>
      <text x="92" y="53" textAnchor="middle" fontSize="7" fill="#5a4a35" fontFamily="Cormorant Garamond, serif" fontStyle="italic">E</text>
      <text x="8" y="53" textAnchor="middle" fontSize="7" fill="#5a4a35" fontFamily="Cormorant Garamond, serif" fontStyle="italic">W</text>
    </svg>
  );
}
