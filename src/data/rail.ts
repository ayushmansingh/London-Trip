import type { CityKey } from "./locations";

export interface RailSegment {
  label: string;
  from?: CityKey;
  to?: CityKey;
  cost: number; // in INR (NOT thousands — this tab is in raw rupees)
  isCard?: boolean;
}

export const RAIL_SEGMENTS: RailSegment[] = [
  { label: "Railcard",       cost: 4401, isCard: true },
  { label: "London → Manchester",  from: "London",    to: "Manchester", cost: 2563 },
  { label: "Manchester → Glasgow", from: "Manchester", to: "Glasgow",   cost: 4329 },
  { label: "Glasgow → Inverness",  from: "Glasgow",    to: "Inverness", cost: 5364 },
  { label: "Inverness → Edinburgh", from: "Inverness", to: "Edinburgh", cost: 626 },
  { label: "Inverness → Edinburgh (2)", from: "Inverness", to: "Edinburgh", cost: 4672 },
  { label: "Edinburgh → London",   from: "Edinburgh",  to: "London",    cost: 6300 },
  { label: "London → Oxford",      from: "London",     to: "Oxford",    cost: 3911 },
  { label: "Oxford → Moreton",     from: "Oxford",     to: "Moreton",   cost: 1933 },
  { label: "Moreton → Oxford",     from: "Moreton",    to: "Oxford",    cost: 1933 },
  { label: "Oxford → London",      from: "Oxford",     to: "London",    cost: 2596 },
];

export const RAIL_TOTAL_RUPEES = RAIL_SEGMENTS.reduce((s, x) => s + x.cost, 0);
/** Convert to INR-thousands so it composes with the rest of the data. */
export const RAIL_TOTAL_K = RAIL_TOTAL_RUPEES / 1000;
