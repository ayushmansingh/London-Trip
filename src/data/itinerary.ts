import type { CityKey } from "./locations";

export interface Day {
  date: string;
  dayLabel: string;
  plan: string;
  stay: CityKey | "Flight";
  comment?: string;
  /** Optional secondary city focus for the map (e.g. Skye on May 24). */
  focus?: CityKey;
}

export const ITINERARY: Day[] = [
  { date: "2026-05-16", dayLabel: "16 May", plan: "Arrival & dinner",                  stay: "London",                              comment: "Land at Heathrow, settle in." },
  { date: "2026-05-17", dayLabel: "17 May", plan: "London",                            stay: "London",                              comment: "Walk the Thames, find pubs." },
  { date: "2026-05-18", dayLabel: "18 May", plan: "Office",                            stay: "London" },
  { date: "2026-05-19", dayLabel: "19 May", plan: "Office",                            stay: "London" },
  { date: "2026-05-20", dayLabel: "20 May", plan: "Office",                            stay: "London" },
  { date: "2026-05-21", dayLabel: "21 May", plan: "Office",                            stay: "London" },
  { date: "2026-05-22", dayLabel: "22 May", plan: "Office",                            stay: "London" },
  { date: "2026-05-23", dayLabel: "23 May", plan: "Reach Inverness by evening",        stay: "Inverness", focus: "Manchester",      comment: "Man City tickets booked. Long rail day." },
  { date: "2026-05-24", dayLabel: "24 May", plan: "Skye tour",                         stay: "Inverness", focus: "Skye",            comment: "Skye tour booked." },
  { date: "2026-05-25", dayLabel: "25 May", plan: "Old Man of Storr & Kyle of Lochalsh", stay: "Inverness", focus: "Skye" },
  { date: "2026-05-26", dayLabel: "26 May", plan: "Glenfinnan Viaduct",                stay: "Edinburgh", focus: "Glenfinnan",      comment: "Glenfinnan tour booked." },
  { date: "2026-05-27", dayLabel: "27 May", plan: "Edinburgh",                         stay: "Edinburgh" },
  { date: "2026-05-28", dayLabel: "28 May", plan: "Edinburgh → London",                stay: "London" },
  { date: "2026-05-29", dayLabel: "29 May", plan: "Cotswolds",                         stay: "Cotswold",                            comment: "Honey-stone villages." },
  { date: "2026-05-30", dayLabel: "30 May", plan: "Cotswolds → London",                stay: "London",    focus: "Cotswold" },
  { date: "2026-05-31", dayLabel: "31 May", plan: "Flying back",                       stay: "Flight",                              comment: "Wheels up." },
];
