import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { CITIES } from "../data/locations";
import { RAIL_SEGMENTS } from "../data/rail";
import { formatINR } from "../lib/format";

/**
 * A schematic UK rail network drawn over a true geographic projection.
 * Line thickness encodes ticket cost. Cities are pinned ink dots.
 */
export default function RailNetwork() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 560;
    const height = 640;
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");

    // Build projection that fits all cities
    const cityValues = Object.values(CITIES);
    const featureCol: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: cityValues.map((c) => ({
        type: "Feature",
        properties: { key: c.key },
        geometry: { type: "Point", coordinates: [c.lng, c.lat] },
      })),
    };

    const projection = d3
      .geoMercator()
      .fitExtent(
        [
          [40, 40],
          [width - 40, height - 60],
        ],
        featureCol,
      );

    // Faint grid (latitude lines)
    const grid = svg.append("g").attr("opacity", 0.18);
    [50, 52, 54, 56, 58].forEach((lat) => {
      grid
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", projection([0, lat])![1])
        .attr("y2", projection([0, lat])![1])
        .attr("stroke", "#8b7a5e")
        .attr("stroke-dasharray", "1 4");
    });

    // Cost scale → line width
    const segs = RAIL_SEGMENTS.filter((s) => s.from && s.to);
    const wScale = d3.scaleLinear().domain([0, d3.max(segs, (s) => s.cost)!]).range([1.5, 8]);

    // Hand-drawn-ish curve between two points
    const curve = (a: [number, number], b: [number, number]) => {
      const mx = (a[0] + b[0]) / 2;
      const my = (a[1] + b[1]) / 2;
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const off = 12; // gentle bow
      const nx = -dy / Math.hypot(dx, dy);
      const ny = dx / Math.hypot(dx, dy);
      return `M${a[0]},${a[1]} Q${mx + nx * off},${my + ny * off} ${b[0]},${b[1]}`;
    };

    const segGroup = svg.append("g");
    segs.forEach((seg, i) => {
      const a = projection([CITIES[seg.from!].lng, CITIES[seg.from!].lat])!;
      const b = projection([CITIES[seg.to!].lng, CITIES[seg.to!].lat])!;
      const path = segGroup
        .append("path")
        .attr("d", curve(a as [number, number], b as [number, number]))
        .attr("fill", "none")
        .attr("stroke", "#5a4a35")
        .attr("stroke-width", wScale(seg.cost))
        .attr("stroke-linecap", "round")
        .attr("opacity", 0.7);

      const len = (path.node() as SVGPathElement).getTotalLength();
      path
        .attr("stroke-dasharray", `${len} ${len}`)
        .attr("stroke-dashoffset", len)
        .transition()
        .delay(120 + i * 90)
        .duration(900)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);

      // cost label at midpoint
      const mid = curve(a as [number, number], b as [number, number]);
      void mid;
      const midX = (a[0] + b[0]) / 2;
      const midY = (a[1] + b[1]) / 2;
      segGroup
        .append("text")
        .attr("x", midX)
        .attr("y", midY)
        .attr("text-anchor", "middle")
        .attr("font-family", "EB Garamond, serif")
        .attr("font-size", 9)
        .attr("fill", "#2b2419")
        .attr("paint-order", "stroke")
        .attr("stroke", "#f4ead5")
        .attr("stroke-width", 3)
        .attr("opacity", 0)
        .text(formatINR(seg.cost))
        .transition()
        .delay(900 + i * 90)
        .duration(400)
        .attr("opacity", 0.95);
    });

    // City dots + labels
    const cityGroup = svg.append("g");
    Object.values(CITIES).forEach((c, i) => {
      const [cx, cy] = projection([c.lng, c.lat])!;
      cityGroup
        .append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", 0)
        .attr("fill", c.color)
        .attr("stroke", "#f4ead5")
        .attr("stroke-width", 2)
        .transition()
        .delay(80 + i * 60)
        .duration(500)
        .attr("r", 4.5);

      cityGroup
        .append("text")
        .attr("x", cx + 7)
        .attr("y", cy + 3)
        .attr("font-family", "Cormorant Garamond, serif")
        .attr("font-style", "italic")
        .attr("font-size", 12)
        .attr("fill", "#2b2419")
        .attr("paint-order", "stroke")
        .attr("stroke", "#f4ead5")
        .attr("stroke-width", 3)
        .attr("opacity", 0)
        .text(c.label)
        .transition()
        .delay(160 + i * 60)
        .duration(500)
        .attr("opacity", 1);
    });

    // Title block in the corner
    const title = svg.append("g").attr("transform", "translate(20,30)");
    title
      .append("text")
      .attr("font-family", "Cormorant Garamond, serif")
      .attr("font-style", "italic")
      .attr("font-size", 18)
      .attr("fill", "#2b2419")
      .text("The Rails");
    title
      .append("text")
      .attr("y", 18)
      .attr("font-family", "Lora, serif")
      .attr("font-style", "italic")
      .attr("font-size", 10)
      .attr("fill", "#8b7a5e")
      .text("line weight ∝ ticket cost");
  }, []);

  return <svg ref={ref} className="w-full h-auto" />;
}
