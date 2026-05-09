import type { CityKey } from "./locations";

export interface Tour {
  date: string;
  name: string;
  city: CityKey;
  cost: number; // INR thousands (0 if free / not booked separately)
}

export const TOURS: Tour[] = [
  { date: "2026-05-22", name: "Phantom of the Opera",  city: "London",     cost: 12.4 },
  { date: "2026-05-23", name: "Man City Stadium",       city: "Manchester", cost: 7.5 },
  { date: "2026-05-24", name: "Skye Tour",              city: "Skye",       cost: 22.3 },
  { date: "2026-05-25", name: "Old Man of the Storr",   city: "Skye",       cost: 0 },
  { date: "2026-05-26", name: "Glenfinnan Viaduct",     city: "Glenfinnan", cost: 18.2 },
];

export const TOURS_TOTAL = {
  budgeted: 60,
  actual: TOURS.reduce((s, t) => s + t.cost, 0),
};
