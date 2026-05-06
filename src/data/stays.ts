import type { CityKey } from "./locations";

export interface StayNight {
  date: string;
  city: CityKey | "Flight";
  budgeted: number; // in INR thousands
  actual: number;   // in INR thousands
}

export const STAY_NIGHTS: StayNight[] = [
  { date: "2026-05-16", city: "London",    budgeted: 15, actual: 17 },
  { date: "2026-05-17", city: "London",    budgeted: 1,  actual: 1 },
  { date: "2026-05-18", city: "London",    budgeted: 1,  actual: 1 },
  { date: "2026-05-19", city: "London",    budgeted: 1,  actual: 1 },
  { date: "2026-05-20", city: "London",    budgeted: 1,  actual: 1 },
  { date: "2026-05-21", city: "London",    budgeted: 1,  actual: 1 },
  { date: "2026-05-22", city: "London",    budgeted: 15, actual: 16.8 },
  { date: "2026-05-23", city: "Inverness", budgeted: 22, actual: 17.5 },
  { date: "2026-05-24", city: "Inverness", budgeted: 22, actual: 40 },
  { date: "2026-05-25", city: "Inverness", budgeted: 22, actual: 17.5 },
  { date: "2026-05-26", city: "Inverness", budgeted: 25, actual: 17.5 },
  { date: "2026-05-27", city: "Edinburgh", budgeted: 25, actual: 13.6 },
  { date: "2026-05-28", city: "London",    budgeted: 20, actual: 12 },
  { date: "2026-05-29", city: "Cotswold",  budgeted: 25, actual: 16.5 },
  { date: "2026-05-30", city: "London",    budgeted: 20, actual: 17 },
  { date: "2026-05-31", city: "Flight",    budgeted: 0,  actual: 0 },
];

export const STAY_TOTAL = {
  budgeted: STAY_NIGHTS.reduce((s, n) => s + n.budgeted, 0),
  actual: STAY_NIGHTS.reduce((s, n) => s + n.actual, 0),
};
