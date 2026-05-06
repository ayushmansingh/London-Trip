import { motion } from "framer-motion";
import { CITIES } from "../data/locations";
import type { Day } from "../data/itinerary";
import { STAY_NIGHTS } from "../data/stays";
import { formatINRk } from "../lib/format";

interface Props {
  day: Day;
  idx: number;
  active: boolean;
  onActivate: () => void;
}

export default function DayCard({ day, idx, active, onActivate }: Props) {
  const city = day.stay === "Flight" ? null : CITIES[day.stay];
  const stayNight = STAY_NIGHTS[idx];

  return (
    <motion.article
      data-day-idx={idx}
      onViewportEnter={onActivate}
      viewport={{ amount: 0.6, margin: "-30% 0px -30% 0px" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative py-16 transition-all ${active ? "opacity-100" : "opacity-50"}`}
    >
      <div className="flex items-start gap-5">
        <div className="font-display italic text-burgundy text-sm tracking-[0.2em] mt-1 w-8 text-right">
          {String(idx + 1).padStart(2, "0")}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="font-display text-3xl md:text-4xl text-ink">{day.dayLabel}</h3>
            {city && (
              <span
                className="font-display italic text-sm tracking-wide"
                style={{ color: city.color }}
              >
                · {city.label}
              </span>
            )}
            {day.stay === "Flight" && (
              <span className="font-display italic text-sm text-ink-faded">· Flight home</span>
            )}
          </div>

          <p className="font-body text-lg text-ink mb-3">{day.plan}</p>

          {day.comment && (
            <p className="font-display italic text-ink-soft mb-3 border-l-2 border-sepia pl-3">
              {day.comment}
            </p>
          )}

          {city?.blurb && (
            <p className="text-sm text-ink-faded font-body italic mb-3">{city.blurb}</p>
          )}

          <div className="flex gap-6 mt-4 text-sm font-numeral text-ink-soft">
            {stayNight && stayNight.actual > 0 && (
              <Stat label="Booked" value={formatINRk(stayNight.actual)} />
            )}
            {stayNight && stayNight.budgeted !== stayNight.actual && stayNight.budgeted > 0 && (
              <Stat
                label="Budgeted"
                value={formatINRk(stayNight.budgeted)}
                muted
              />
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Stat({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={muted ? "opacity-60" : ""}>
      <span className="font-display italic text-xs tracking-[0.2em] uppercase text-ink-faded mr-1.5">
        {label}
      </span>
      <span className="text-base">{value}</span>
    </div>
  );
}
