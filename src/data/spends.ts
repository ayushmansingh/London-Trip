export type Person = "Ayushman" | "Dhwani";

export interface Spend {
  label: string;
  ayushman: number; // INR thousands
  dhwani: number;   // INR thousands
  category: "Flight" | "Stay" | "Rail" | "Tour" | "Settle";
}

export const SPENDS: Spend[] = [
  { label: "Flight Tickets",     ayushman: 95,   dhwani: 0,    category: "Flight" },
  { label: "Train + Airbnb",     ayushman: 50,   dhwani: 0,    category: "Rail" },
  { label: "London 16th Stay",   ayushman: 17,   dhwani: 0,    category: "Stay" },
  { label: "London 28th Stay",   ayushman: 17,   dhwani: 0,    category: "Stay" },
  { label: "Inverness Stay",     ayushman: 0,    dhwani: 51,   category: "Stay" },
  { label: "Train Tickets",      ayushman: 0,    dhwani: 50,   category: "Rail" },
  { label: "London 30th Stay",   ayushman: 0,    dhwani: 16.8, category: "Stay" },
  { label: "Man City Tickets",   ayushman: 7.5,  dhwani: 0,    category: "Tour" },
  { label: "Ayushman Contri",    ayushman: 10,   dhwani: 0,    category: "Settle" },
  { label: "Glenfinnan",         ayushman: 18.2, dhwani: 0,    category: "Tour" },
  { label: "Paid to Ayushman",   ayushman: 0,    dhwani: 25,   category: "Settle" },
  { label: "Cotswold Stay",      ayushman: 0,    dhwani: 10,   category: "Stay" },
  { label: "Phantom of the Opera", ayushman: 12.4, dhwani: 0,  category: "Tour" },
];

export const SPEND_TOTALS = {
  ayushman: SPENDS.reduce((s, x) => s + x.ayushman, 0),
  dhwani:   SPENDS.reduce((s, x) => s + x.dhwani, 0),
  total:    SPENDS.reduce((s, x) => s + x.ayushman + x.dhwani, 0),
};
