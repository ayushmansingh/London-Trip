import { useState } from "react";
import { ITINERARY } from "../data/itinerary";
import JourneyMap from "./JourneyMap";
import DayCard from "./DayCard";

export default function Journey() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10">
        {/* Sticky map */}
        <div className="hidden lg:block">
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

        {/* On mobile, show a simplified static map up top */}
        <div className="lg:hidden h-[60vh] mb-6 relative rounded-md overflow-hidden border border-ink-faded/30">
          <JourneyMap activeIdx={activeIdx} />
        </div>

        {/* Cards stream */}
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
    </section>
  );
}
