import type { StyleSpecification } from "maplibre-gl";

/**
 * If VITE_STADIA_KEY is set, returns the Stamen Watercolor + Toner Lines style
 * for that hand-painted vintage look. Otherwise returns a free OSM-raster
 * style; the caller should add the `.map-sepia` class to the container so
 * CSS sepia filter approximates the watercolor feel.
 */
export function getMapStyle(): { style: StyleSpecification; needsSepiaFilter: boolean } {
  const key = (import.meta as any).env?.VITE_STADIA_KEY as string | undefined;

  const glyphs = "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf";

  if (key) {
    return {
      needsSepiaFilter: false,
      style: {
        version: 8,
        glyphs,
        sources: {
          watercolor: {
            type: "raster",
            tiles: [`https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=${key}`],
            tileSize: 256,
            attribution:
              "&copy; <a href='https://stadiamaps.com/'>Stadia Maps</a> &copy; <a href='https://stamen.com/'>Stamen Design</a> &copy; OpenStreetMap",
          },
          tonerLines: {
            type: "raster",
            tiles: [`https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}.png?api_key=${key}`],
            tileSize: 256,
          },
        },
        layers: [
          { id: "watercolor", type: "raster", source: "watercolor" },
          { id: "tonerLines", type: "raster", source: "tonerLines", paint: { "raster-opacity": 0.45 } },
        ],
      } as StyleSpecification,
    };
  }

  return {
    needsSepiaFilter: true,
    style: {
      version: 8,
      glyphs,
      sources: {
        osm: {
          type: "raster",
          tiles: [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution: "&copy; OpenStreetMap contributors",
          maxzoom: 19,
        },
      },
      layers: [
        { id: "background", type: "background", paint: { "background-color": "#f4ead5" } },
        { id: "osm", type: "raster", source: "osm", paint: { "raster-opacity": 0.95, "raster-saturation": -0.25 } },
      ],
    } as StyleSpecification,
  };
}
