export type CityKey =
  | "London"
  | "Manchester"
  | "Glasgow"
  | "Inverness"
  | "Skye"
  | "Edinburgh"
  | "Glenfinnan"
  | "Cotswold"
  | "Oxford"
  | "Moreton";

export interface City {
  key: CityKey;
  label: string;
  lat: number;
  lng: number;
  color: string;
  blurb?: string;
}

export const CITIES: Record<CityKey, City> = {
  London:     { key: "London",     label: "London",                  lat: 51.5074, lng: -0.1278, color: "#1f3a5f", blurb: "Home base. Office days, Tube cards, late-night chai." },
  Manchester: { key: "Manchester", label: "Manchester",              lat: 53.4808, lng: -2.2426, color: "#8b3a3a", blurb: "Etihad Stadium pilgrimage." },
  Glasgow:    { key: "Glasgow",    label: "Glasgow",                 lat: 55.8642, lng: -4.2518, color: "#5a4a35", blurb: "A platform, a tea, and a connecting train." },
  Inverness:  { key: "Inverness",  label: "Inverness",               lat: 57.4778, lng: -4.2247, color: "#4a5c3a", blurb: "Gateway to Skye and the Highlands." },
  Skye:       { key: "Skye",       label: "Isle of Skye",            lat: 57.2730, lng: -6.2154, color: "#4a5c3a", blurb: "Mist, ferries, and impossible cliffs." },
  Edinburgh:  { key: "Edinburgh",  label: "Edinburgh",               lat: 55.9533, lng: -3.1883, color: "#8b3a3a", blurb: "Cobblestones, castles, and the Royal Mile." },
  Glenfinnan: { key: "Glenfinnan", label: "Glenfinnan Viaduct",      lat: 56.8722, lng: -5.4346, color: "#4a5c3a", blurb: "The Hogwarts bridge — in the rain, of course." },
  Cotswold:   { key: "Cotswold",   label: "Cotswolds",               lat: 51.8330, lng: -1.8433, color: "#a0723a", blurb: "Honey-stone villages and quiet hedgerows." },
  Oxford:     { key: "Oxford",     label: "Oxford",                  lat: 51.7520, lng: -1.2577, color: "#a0723a", blurb: "Spires, libraries, and a quick connection." },
  Moreton:    { key: "Moreton",    label: "Moreton-in-Marsh",        lat: 51.9907, lng: -1.7014, color: "#a0723a", blurb: "Cotswolds rail stop." },
};

export const cityList = Object.values(CITIES);
