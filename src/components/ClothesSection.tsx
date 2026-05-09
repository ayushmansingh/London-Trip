import { motion } from "framer-motion";
import { OUTFITS } from "../data/clothes";
import { CITIES, type CityKey } from "../data/locations";

export default function ClothesSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <p className="font-display italic text-sepia tracking-[0.3em] uppercase text-xs mb-3">
          what to wear
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight">
          Sixteen days,
          <br />
          <em>two suitcases.</em>
        </h2>
      </motion.div>

      {/* Desktop column headers */}
      <div className="hidden md:grid grid-cols-[4rem_1fr_1fr] gap-5 mb-4 border-b border-ink-faded/30 pb-2">
        <div />
        <div className="font-display italic text-xs tracking-[0.2em] uppercase text-ink-faded">
          Ayushman
        </div>
        <div className="font-display italic text-xs tracking-[0.2em] uppercase text-ink-faded">
          Dhwani
        </div>
      </div>

      <div className="space-y-0">
        {OUTFITS.map((outfit, i) => {
          const cityData = outfit.city !== "Flight"
            ? CITIES[outfit.city as CityKey]
            : null;
          const accentColor = cityData?.color ?? "#5a4a35";

          return (
            <motion.div
              key={outfit.date}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[4rem_1fr_1fr] gap-3 md:gap-5 py-3 border-b border-ink-faded/15"
            >
              {/* Day label */}
              <div className="flex flex-col items-end pt-0.5">
                <span className="font-display italic text-sm text-ink leading-tight">
                  {outfit.dayLabel}
                </span>
                <span
                  className="font-display italic text-[10px] tracking-wide mt-0.5"
                  style={{ color: accentColor }}
                >
                  {cityData?.label ?? "Flight"}
                </span>
              </div>

              {/* Ayushman */}
              <div className="md:border-r md:border-ink-faded/15 md:pr-5">
                <span className="font-display italic text-[10px] tracking-[0.2em] uppercase text-ink-faded block mb-0.5 md:hidden">
                  Ayushman
                </span>
                <p className="font-body text-sm text-ink leading-relaxed">
                  {outfit.ayushman}
                </p>
                {outfit.note && (
                  <span className="inline-block mt-1 text-[10px] font-display italic text-burgundy bg-burgundy/10 px-2 py-0.5 rounded-sm">
                    {outfit.note}
                  </span>
                )}
              </div>

              {/* Dhwani - stacks below on mobile */}
              <div className="col-start-2 md:col-start-3">
                <span className="font-display italic text-[10px] tracking-[0.2em] uppercase text-ink-faded block mb-0.5 md:hidden">
                  Dhwani
                </span>
                <p className="font-body text-sm text-ink-soft leading-relaxed">
                  {outfit.dhwani}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
