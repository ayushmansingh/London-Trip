import { CITIES } from "../data/locations";
import { RAIL_SEGMENTS } from "../data/rail";
import { haversineKm } from "./format";

/** All rail segments as a single LineString GeoJSON, in travel order. */
export function railLineGeoJSON(): GeoJSON.Feature<GeoJSON.LineString> {
  const coords: [number, number][] = [];
  for (const seg of RAIL_SEGMENTS) {
    if (!seg.from || !seg.to) continue;
    const a = CITIES[seg.from];
    const b = CITIES[seg.to];
    if (coords.length === 0) coords.push([a.lng, a.lat]);
    coords.push([b.lng, b.lat]);
  }
  return {
    type: "Feature",
    properties: {},
    geometry: { type: "LineString", coordinates: coords },
  };
}

/** Total kilometres travelled, summed across rail segments. */
export function totalRailKm(): number {
  let km = 0;
  for (const seg of RAIL_SEGMENTS) {
    if (!seg.from || !seg.to) continue;
    km += haversineKm(CITIES[seg.from], CITIES[seg.to]);
  }
  return km;
}

/** Per-segment GeoJSON features for individual highlight. */
export function railSegmentFeatures(): GeoJSON.Feature<GeoJSON.LineString>[] {
  return RAIL_SEGMENTS.filter((s) => s.from && s.to).map((seg, idx) => {
    const a = CITIES[seg.from!];
    const b = CITIES[seg.to!];
    return {
      type: "Feature",
      properties: { idx, label: seg.label, cost: seg.cost },
      geometry: {
        type: "LineString",
        coordinates: [
          [a.lng, a.lat],
          [b.lng, b.lat],
        ],
      },
    };
  });
}
