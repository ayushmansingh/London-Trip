import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SPENDS, SPEND_TOTALS } from "../data/spends";
import { formatINRk } from "../lib/format";

/**
 * A simplified Sankey-ish flow: two source columns (Ayushman, Dhwani)
 * and N category sinks on the right. Ribbon thickness = amount.
 * No external sankey lib — drawn with manually-crafted bezier paths.
 */
export default function PaymentFlow() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 880;
    const height = 380;
    const margin = { top: 30, right: 200, bottom: 30, left: 200 };
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");

    // Aggregate by (person, category)
    type Flow = { from: "Ayushman" | "Dhwani"; to: string; value: number };
    const flows: Flow[] = [];
    const cats = ["Flight", "Stay", "Rail", "Tour", "Settle"] as const;

    cats.forEach((cat) => {
      const a = SPENDS.filter((s) => s.category === cat).reduce((s, x) => s + x.ayushman, 0);
      const d = SPENDS.filter((s) => s.category === cat).reduce((s, x) => s + x.dhwani, 0);
      if (a > 0) flows.push({ from: "Ayushman", to: cat, value: a });
      if (d > 0) flows.push({ from: "Dhwani", to: cat, value: d });
    });

    // Person blocks
    const personY = (p: "Ayushman" | "Dhwani") =>
      p === "Ayushman" ? margin.top + 10 : margin.top + 180;
    const personHeight = (p: "Ayushman" | "Dhwani") =>
      ((p === "Ayushman" ? SPEND_TOTALS.ayushman : SPEND_TOTALS.dhwani) /
        Math.max(SPEND_TOTALS.ayushman, SPEND_TOTALS.dhwani)) *
      150;
    const personColor = (p: "Ayushman" | "Dhwani") =>
      p === "Ayushman" ? "#1f3a5f" : "#8b3a3a";

    // Category blocks (right side)
    const catTotals: Record<string, number> = {};
    cats.forEach((c) => {
      catTotals[c] = SPENDS.filter((s) => s.category === c).reduce(
        (s, x) => s + x.ayushman + x.dhwani,
        0,
      );
    });
    const catSpace = (height - margin.top - margin.bottom);
    const catScale = catSpace / Object.values(catTotals).reduce((s, v) => s + v, 0);
    let catY: Record<string, number> = {};
    let cursor = margin.top;
    cats.forEach((c) => {
      catY[c] = cursor;
      cursor += catTotals[c] * catScale + 10;
    });

    const colorFor = (cat: string) => {
      switch (cat) {
        case "Flight": return "#8b3a3a";
        case "Stay":   return "#1f3a5f";
        case "Rail":   return "#a0723a";
        case "Tour":   return "#4a5c3a";
        case "Settle": return "#5a4a35";
      }
      return "#5a4a35";
    };

    // Draw person source rects
    const personGroup = svg.append("g");
    (["Ayushman", "Dhwani"] as const).forEach((p) => {
      personGroup
        .append("rect")
        .attr("x", margin.left - 12)
        .attr("y", personY(p))
        .attr("width", 12)
        .attr("height", personHeight(p))
        .attr("fill", personColor(p))
        .attr("opacity", 0)
        .transition()
        .duration(700)
        .attr("opacity", 0.9);

      personGroup
        .append("text")
        .attr("x", margin.left - 22)
        .attr("y", personY(p) + personHeight(p) / 2 + 5)
        .attr("text-anchor", "end")
        .attr("font-family", "Cormorant Garamond, serif")
        .attr("font-size", 22)
        .attr("font-style", "italic")
        .attr("fill", "#2b2419")
        .text(p);
      personGroup
        .append("text")
        .attr("x", margin.left - 22)
        .attr("y", personY(p) + personHeight(p) / 2 + 22)
        .attr("text-anchor", "end")
        .attr("font-family", "EB Garamond, serif")
        .attr("font-size", 13)
        .attr("fill", "#5a4a35")
        .text(formatINRk(p === "Ayushman" ? SPEND_TOTALS.ayushman : SPEND_TOTALS.dhwani));
    });

    // Draw category sinks
    const catGroup = svg.append("g");
    cats.forEach((c) => {
      const h = catTotals[c] * catScale;
      catGroup
        .append("rect")
        .attr("x", width - margin.right)
        .attr("y", catY[c])
        .attr("width", 12)
        .attr("height", h)
        .attr("fill", colorFor(c))
        .attr("opacity", 0)
        .transition()
        .delay(200)
        .duration(700)
        .attr("opacity", 0.9);

      catGroup
        .append("text")
        .attr("x", width - margin.right + 22)
        .attr("y", catY[c] + h / 2 + 5)
        .attr("font-family", "Cormorant Garamond, serif")
        .attr("font-style", "italic")
        .attr("font-size", 18)
        .attr("fill", "#2b2419")
        .text(c);
      catGroup
        .append("text")
        .attr("x", width - margin.right + 22)
        .attr("y", catY[c] + h / 2 + 22)
        .attr("font-family", "EB Garamond, serif")
        .attr("font-size", 12)
        .attr("fill", "#5a4a35")
        .text(formatINRk(catTotals[c]));
    });

    // Draw ribbons (sorted so larger flows render first/back)
    const sortedFlows = [...flows].sort((a, b) => b.value - a.value);

    // Track running offset on each side
    const leftOffsets: Record<string, number> = { Ayushman: 0, Dhwani: 0 };
    const rightOffsets: Record<string, number> = {};
    cats.forEach((c) => (rightOffsets[c] = 0));

    sortedFlows.forEach((flow, i) => {
      const sourceY = personY(flow.from) + leftOffsets[flow.from];
      const ribbonHL = (flow.value / Math.max(SPEND_TOTALS.ayushman, SPEND_TOTALS.dhwani)) * 150;
      leftOffsets[flow.from] += ribbonHL;

      const targetY = catY[flow.to] + rightOffsets[flow.to];
      const ribbonHR = flow.value * catScale;
      rightOffsets[flow.to] += ribbonHR;

      const x0 = margin.left;
      const x1 = width - margin.right;
      const cx = (x0 + x1) / 2;

      // Build ribbon as filled bezier
      const path = `
        M ${x0} ${sourceY}
        C ${cx} ${sourceY}, ${cx} ${targetY}, ${x1} ${targetY}
        L ${x1} ${targetY + ribbonHR}
        C ${cx} ${targetY + ribbonHR}, ${cx} ${sourceY + ribbonHL}, ${x0} ${sourceY + ribbonHL}
        Z
      `;

      svg
        .append("path")
        .attr("d", path)
        .attr("fill", colorFor(flow.to))
        .attr("opacity", 0)
        .transition()
        .delay(400 + i * 90)
        .duration(700)
        .attr("opacity", flow.from === "Ayushman" ? 0.32 : 0.45);
    });
  }, []);

  return <svg ref={ref} className="w-full h-auto" />;
}
