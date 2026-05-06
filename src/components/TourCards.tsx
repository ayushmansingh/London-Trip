import { motion } from "framer-motion";
import { TOURS } from "../data/tours";
import { CITIES } from "../data/locations";
import { formatINRk } from "../lib/format";

const ICONS: Record<string, string> = {
  "Man City Stadium": "⚽",
  "Skye Tour": "🏔",
  "Old Man of the Storr": "🥾",
  "Glenfinnan Viaduct": "🚂",
};

export default function TourCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {TOURS.map((t, i) => {
        const city = CITIES[t.city];
        return (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="bg-paper-dark/60 border border-ink-faded/30 rounded-md p-5 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: city.color }}
            />
            <div className="text-3xl mb-3 grayscale opacity-90">
              {ICONS[t.name] ?? "✦"}
            </div>
            <h4 className="font-display text-xl text-ink leading-tight">{t.name}</h4>
            <p className="font-display italic text-sm text-ink-faded mt-1">{city.label}</p>
            <div className="mt-4 pt-3 border-t border-dotted border-ink-faded/40 flex items-baseline justify-between">
              <span className="font-display italic text-xs uppercase tracking-[0.2em] text-ink-faded">
                {t.cost > 0 ? "Cost" : "Free"}
              </span>
              <span className="font-numeral text-lg text-ink">
                {t.cost > 0 ? formatINRk(t.cost) : "—"}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
