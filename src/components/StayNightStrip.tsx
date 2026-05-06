import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { STAY_NIGHTS } from "../data/stays";
import { CITIES } from "../data/locations";
import { formatINRk } from "../lib/format";

export default function StayNightStrip() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 880;
    const height = 280;
    const margin = { top: 24, right: 16, bottom: 50, left: 36 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");

    const data = STAY_NIGHTS;
    const x = d3.scaleBand<string>().domain(data.map((d) => d.date)).range([0, innerW]).padding(0.18);
    const y = d3.scaleLinear().domain([0, d3.max(data, (d) => Math.max(d.budgeted, d.actual))! * 1.1]).range([innerH, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Axes — minimal
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((d) => d3.timeFormat("%-d %b")(new Date(d)))
          .tickSize(0)
          .tickPadding(8),
      )
      .call((sel) => sel.select(".domain").attr("stroke", "#8b7a5e").attr("stroke-dasharray", "2 3"))
      .selectAll("text")
      .attr("font-family", "EB Garamond, serif")
      .attr("font-size", 10)
      .attr("fill", "#5a4a35")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    g.append("g")
      .call(d3.axisLeft(y).ticks(4).tickSize(-innerW).tickFormat((d) => `${d}`))
      .call((sel) => sel.select(".domain").remove())
      .call((sel) => sel.selectAll(".tick line").attr("stroke", "#8b7a5e").attr("stroke-opacity", 0.25).attr("stroke-dasharray", "1 3"))
      .selectAll("text")
      .attr("font-family", "EB Garamond, serif")
      .attr("font-size", 10)
      .attr("fill", "#5a4a35");

    // Budget line (faint)
    g.selectAll(".budget-line")
      .data(data)
      .join("line")
      .attr("x1", (d) => x(d.date)! + 1)
      .attr("x2", (d) => x(d.date)! + x.bandwidth() - 1)
      .attr("y1", (d) => y(d.budgeted))
      .attr("y2", (d) => y(d.budgeted))
      .attr("stroke", "#8b3a3a")
      .attr("stroke-width", 1.4)
      .attr("stroke-dasharray", "3 3")
      .attr("opacity", 0)
      .transition()
      .delay(900)
      .duration(500)
      .attr("opacity", 0.7);

    // Actual bars
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.date)!)
      .attr("y", innerH)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("rx", 1.5)
      .attr("fill", (d) => (d.city === "Flight" ? "#d8c89e" : CITIES[d.city as keyof typeof CITIES]?.color ?? "#5a4a35"))
      .attr("opacity", 0.86)
      .transition()
      .duration(700)
      .delay((_, i) => i * 35)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.actual))
      .attr("height", (d) => innerH - y(d.actual));

    // Labels above bars when actual > 0
    g.selectAll(".bar-label")
      .data(data.filter((d) => d.actual > 0))
      .join("text")
      .attr("x", (d) => x(d.date)! + x.bandwidth() / 2)
      .attr("y", (d) => y(d.actual) - 4)
      .attr("text-anchor", "middle")
      .attr("font-family", "EB Garamond, serif")
      .attr("font-size", 9)
      .attr("fill", "#2b2419")
      .attr("opacity", 0)
      .text((d) => formatINRk(d.actual))
      .transition()
      .delay((_, i) => 800 + i * 35)
      .duration(400)
      .attr("opacity", 0.85);

    // Legend
    const legend = svg.append("g").attr("transform", `translate(${margin.left},${height - 14})`);
    legend
      .append("line")
      .attr("x1", 0)
      .attr("x2", 14)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#8b3a3a")
      .attr("stroke-dasharray", "3 3")
      .attr("stroke-width", 1.4);
    legend
      .append("text")
      .attr("x", 18)
      .attr("y", 3)
      .attr("font-family", "Lora, serif")
      .attr("font-style", "italic")
      .attr("font-size", 10)
      .attr("fill", "#5a4a35")
      .text("Budgeted per night    ·    bar = booked    ·    bar colour = stay city");
  }, []);

  return <svg ref={ref} className="w-full h-auto" />;
}
