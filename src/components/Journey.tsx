import { useState } from "react";
import { ITINERARY } from "../data/itinerary";
import JourneyMap from "./JourneyMap";
import DayCard from "./DayCard";

export default function Journey() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative">
      {/* Mobile: sticky map on top, cards scroll underneath */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-10 h-[42vh] w-full overflow-hidden border-b border-ink-faded/30 shadow-md relative">
          <JourneyMap activeIdx={activeIdx} />
          <div className="absolute top-3 left-3 bg-paper/90 backdrop-blur-sm border border-ink-faded/30 px-3 py-1.5 rounded-sm">
            <span className="font-display italic text-xs tracking-[0.25em] uppercase text-ink-faded">
              {ITINERARY[activeIdx]?.dayLabel}
            </span>
          </div>
        </div>
        <div className="px-4 pt-4 pb-8">
          <div className="font-display italic text-sepia tracking-[0.3em] uppercase text-xs mb-4">
            Sixteen Days
          </div>
          <div className="space-y-2">
            {ITINERARY.map((day, idx) => (
              <DayCard
                key={day.date}
                day={day}
                idx={idx}
                active={idx === activeIdx}
                onActivate={() => setActiveIdx(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: side-by-side sticky map + scrolling cards */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-[1.1fr_1fr] gap-10">
          <div>
            <div className="sticky top-0 h-screen flex items-center">
              <div className="relative w-full h-[88vh] rounded-md overflow-hidden border border-ink-faded/30 shadow-md">
                <JourneyMap activeIdx={activeIdx} />
                <div className="absolute top-3 left-3 bg-paper/90 backdrop-blur-sm border border-ink-faded/30 px-3 py-1.5 rounded-sm">
                  <span className="font-display italic text-xs tracking-[0.25em] uppercase text-ink-faded">
                    {ITINERARY[activeIdx]?.dayLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="font-display italic text-sepia tracking-[0.3em] uppercase text-xs mb-6">
              Sixteen Days
            </div>
            <div className="space-y-2">
              {ITINERARY.map((day, idx) => (
                <DayCard
                  key={day.date}
                  day={day}
                  idx={idx}
                  active={idx === activeIdx}
                  onActivate={() => setActiveIdx(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
