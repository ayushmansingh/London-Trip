import { useEffect, useRef } from "react";
import maplibregl, { Map as MapLibreMap } from "maplibre-gl";
import { getMapStyle } from "../lib/mapStyle";
import { railLineGeoJSON } from "../lib/routeGeometry";
import { CITIES } from "../data/locations";

/**
 * Full-bleed UK map. Animates the rail route drawing from London upward,
 * then drops city pins one by one.
 */
export default function HeroMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const { style, needsSepiaFilter } = getMapStyle();
    if (needsSepiaFilter) containerRef.current.classList.add("map-sepia");

    const map = new maplibregl.Map({
      container: containerRef.current,
      style,
      center: [-3.5, 55.5],
      zoom: 4.6,
      pitch: 28,
      bearing: -8,
      attributionControl: false,
      interactive: false,
      maxZoom: 9,
      minZoom: 3,
    });
    mapRef.current = map;

    map.on("load", () => {
      // Route line source
      map.addSource("route", {
        type: "geojson",
        lineMetrics: true,
        data: railLineGeoJSON(),
      });

      // The base "ghost" of the route — faint, dotted
      map.addLayer({
        id: "route-ghost",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#a0723a",
          "line-width": 1.4,
          "line-opacity": 0.25,
          "line-dasharray": [1, 2.2],
        },
        layout: { "line-cap": "round", "line-join": "round" },
      });

      // The animated overlay line, fades in then animates dasharray
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#2b2419",
          "line-width": 2.4,
          "line-opacity": 0,
        },
        layout: { "line-cap": "round", "line-join": "round" },
      });

      // City pins (hidden initially via opacity 0 in feature props)
      const pinFeatures = Object.values(CITIES)
        .filter((c) => c.key !== "Skye" && c.key !== "Glenfinnan" && c.key !== "Manchester" && c.key !== "Glasgow" && c.key !== "Moreton")
        .map((c) => ({
          type: "Feature" as const,
          properties: { label: c.label, color: c.color },
          geometry: { type: "Point" as const, coordinates: [c.lng, c.lat] },
        }));

      map.addSource("pins", {
        type: "geojson",
        data: { type: "FeatureCollection", features: pinFeatures },
      });

      map.addLayer({
        id: "pin-circles",
        type: "circle",
        source: "pins",
        paint: {
          "circle-radius": 0,
          "circle-color": ["get", "color"],
          "circle-stroke-color": "#f4ead5",
          "circle-stroke-width": 2,
        },
      });

      map.addLayer({
        id: "pin-halos",
        type: "circle",
        source: "pins",
        paint: {
          "circle-radius": 0,
          "circle-color": ["get", "color"],
          "circle-opacity": 0.18,
        },
      });

      // Animate route reveal over ~3s, then pulse pins
      const start = performance.now();
      const drawDur = 3200;
      const pinStart = drawDur - 600;
      const pinDur = 1400;

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / drawDur);
        const eased = 1 - Math.pow(1 - t, 3);

        if (map.getLayer("route")) {
          map.setPaintProperty("route", "line-opacity", eased);
          // Subtle dasharray ease-in for some "drawing" feel
          map.setPaintProperty("route", "line-dasharray", [Math.max(0.001, 50 * eased), Math.max(0.001, 50 * (1 - eased) + 0.5)]);
        }

        if (elapsed > pinStart) {
          const pt = Math.min(1, (elapsed - pinStart) / pinDur);
          const pe = 1 - Math.pow(1 - pt, 3);
          if (map.getLayer("pin-circles")) {
            map.setPaintProperty("pin-circles", "circle-radius", 5 * pe);
          }
          if (map.getLayer("pin-halos")) {
            map.setPaintProperty("pin-halos", "circle-radius", 14 * pe);
          }
        }

        if (elapsed < drawDur + pinDur) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
