import type { CityKey } from "./locations";

export interface Day {
  date: string;
  dayLabel: string;
  plan: string;
  stay: CityKey | "Flight";
  comment?: string;
  /** Optional secondary city focus for the map (e.g. Skye on May 24). */
  focus?: string;
  /** Per-day blurb override. Falls back to the city blurb if omitted. */
  blurb?: string;
}

export const ITINERARY: Day[] = [
  { date: "2026-05-16", dayLabel: "16 May", plan: "Arrival & Dinner",                  stay: "London",                              comment: "Land at Heathrow, Nice tight Hug, Settle in." },
  { date: "2026-05-17", dayLabel: "17 May", plan: "Stroll Around London",              stay: "London",                              comment: "Walk the Thames, Date Night?" },
  { date: "2026-05-18", dayLabel: "18 May", plan: "Office",                            stay: "London",                              comment: "Dhwani's First Day at Work, Ayushman explores London" },
  { date: "2026-05-19", dayLabel: "19 May", plan: "Conference",                        stay: "London",                              comment: "Conference Day, Ayushman goes to Museum" },
  { date: "2026-05-20", dayLabel: "20 May", plan: "Office",                            stay: "London",                              comment: "Work Continues, so does Ayushman's adventures" },
  { date: "2026-05-21", dayLabel: "21 May", plan: "Office",                            stay: "London",                              comment: "Almost Weekend" },
  { date: "2026-05-22", dayLabel: "22 May", plan: "Office",                            stay: "London",                              comment: "Weekend's Here, switch Hotels do Laundry" },
  { date: "2026-05-23", dayLabel: "23 May", plan: "Manchester → Glasgow -> Inverness", stay: "Inverness", focus: "Manchester",      comment: "Man City Tickets booked. Long rail day." },
  { date: "2026-05-24", dayLabel: "24 May", plan: "Skye Tour",                         stay: "Inverness", focus: "Skye",            comment: "Skye tour booked. (Fairy Pools, Dunvegan Castle)" },
  { date: "2026-05-25", dayLabel: "25 May", plan: "Old Man of Storr",                  stay: "Inverness", focus: "Old Man of the Storr", comment: "THE DAY!" },
  { date: "2026-05-26", dayLabel: "26 May", plan: "Glenfinnan Viaduct",                stay: "Edinburgh", focus: "Glenfinnan",      comment: "Nessie, the Viaduct and a Steam Train" },
  { date: "2026-05-27", dayLabel: "27 May", plan: "Edinburgh",                         stay: "Edinburgh",                           comment: "Cobblestone Wynds and Historic Heights" },
  { date: "2026-05-28", dayLabel: "28 May", plan: "Edinburgh → London",                stay: "London",                              comment: "We come back to the south.", blurb: "London Again" },
  { date: "2026-05-29", dayLabel: "29 May", plan: "Cotswolds",                         stay: "Cotswold",                            comment: "Honey-stone villages." },
  { date: "2026-05-30", dayLabel: "30 May", plan: "Cotswolds → London",                stay: "London",    focus: "Cotswold",         blurb: "Honey-stone villages and quiet hedgerows." },
  { date: "2026-05-31", dayLabel: "31 May", plan: "Flying back",                       stay: "Flight",                              comment: "Wheels up." },
];
