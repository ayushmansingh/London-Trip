import { useEffect, useRef } from "react";
import maplibregl, { Map as MapLibreMap, Marker } from "maplibre-gl";
import { getMapStyle } from "../lib/mapStyle";
import { railLineGeoJSON, railSegmentFeatures } from "../lib/routeGeometry";
import { CITIES, type CityKey } from "../data/locations";
import { ITINERARY } from "../data/itinerary";

interface Props {
  activeIdx: number;
}

const ZOOM_BY_FOCUS: Partial<Record<CityKey, number>> = {
  Skye: 8.4,
  Glenfinnan: 8.6,
  Cotswold: 8.5,
  Manchester: 8.5,
};

export default function JourneyMap({ activeIdx }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const readyRef = useRef(false);

  // mount once
  useEffect(() => {
    if (!containerRef.current) return;
    const { style, needsSepiaFilter } = getMapStyle();
    if (needsSepiaFilter) containerRef.current.classList.add("map-sepia");

    const map = new maplibregl.Map({
      container: containerRef.current,
      style,
      center: [-2.5, 54.5],
      zoom: 5.2,
      pitch: 20,
      attributionControl: false,
      interactive: false,
    });
    mapRef.current = map;

    map.on("load", () => {
      // Full route as ghost
      map.addSource("route", { type: "geojson", lineMetrics: true, data: railLineGeoJSON() });
      map.addLayer({
        id: "route-ghost",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#a0723a",
          "line-width": 1.4,
          "line-opacity": 0.32,
          "line-dasharray": [1, 2.2],
        },
        layout: { "line-cap": "round", "line-join": "round" },
      });

      // Per-segment highlight layer
      map.addSource("segments", {
        type: "geojson",
        data: { type: "FeatureCollection", features: railSegmentFeatures() },
      });
      map.addLayer({
        id: "active-segment",
        type: "line",
        source: "segments",
        paint: {
          "line-color": "#8b3a3a",
          "line-width": 3,
          "line-opacity": ["case", ["==", ["get", "idx"], -1], 0, 0.9],
        },
        layout: { "line-cap": "round", "line-join": "round" },
      });

      readyRef.current = true;
    });

    return () => {
      map.remove();
      mapRef.current = null;
      readyRef.current = false;
    };
  }, []);

  // react to active day
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const apply = () => {
      const day = ITINERARY[activeIdx];
      if (!day) return;
      const focusKey = (day.focus ?? day.stay) as CityKey;
      if (focusKey === ("Flight" as unknown as CityKey)) {
        map.flyTo({ center: [-3.5, 50.0], zoom: 4.3, pitch: 28, duration: 1800, essential: true });
        return;
      }
      const city = CITIES[focusKey];
      if (!city) return;
      const targetZoom = ZOOM_BY_FOCUS[focusKey] ?? 7.4;

      map.flyTo({
        center: [city.lng, city.lat],
        zoom: targetZoom,
        pitch: 30,
        bearing: -6,
        duration: 1800,
        essential: true,
      });

      // Active segment highlight: any rail segment whose endpoint matches stay city today
      const features = railSegmentFeatures();
      let activeSegmentIdx = -1;
      // Find a segment that ends at the focus or stay today and starts where we were yesterday
      const prevDay = ITINERARY[activeIdx - 1];
      if (prevDay && prevDay.stay !== day.stay) {
        const prevKey = prevDay.stay as CityKey;
        const matched = features.find(
          (f) =>
            (f.properties as any).label?.includes?.(`${CITIES[prevKey]?.label} →`) ||
            (f.properties as any).label?.includes?.(`→ ${CITIES[focusKey]?.label}`),
        );
        if (matched) activeSegmentIdx = (matched.properties as any).idx;
      }

      if (map.getLayer("active-segment")) {
        map.setPaintProperty("active-segment", "line-opacity", [
          "case",
          ["==", ["get", "idx"], activeSegmentIdx],
          0.95,
          0,
        ]);
      }

      // Drop a custom marker at the focus city
      if (markerRef.current) markerRef.current.remove();
      const el = document.createElement("div");
      el.style.cssText = `
        width: 16px; height: 16px; border-radius: 50%;
        background: ${city.color}; border: 2px solid #f4ead5;
        box-shadow: 0 0 0 4px ${city.color}33, 0 2px 6px rgba(0,0,0,0.2);
        transform: translate(-50%, -50%);
      `;
      const ring = document.createElement("div");
      ring.style.cssText = `
        position: absolute; inset: -8px; border: 1.5px dashed ${city.color}; border-radius: 50%;
        animation: spin 18s linear infinite; opacity: 0.55;
      `;
      el.appendChild(ring);
      markerRef.current = new maplibregl.Marker({ element: el }).setLngLat([city.lng, city.lat]).addTo(map);
    };

    if (readyRef.current) apply();
    else map.once("load", apply);
  }, [activeIdx]);

  return (
    <>
      <style>{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
    </>
  );
}
