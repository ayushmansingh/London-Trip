import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { STAY_NIGHTS } from "../data/stays";
import { TOURS } from "../data/tours";
import { ITINERARY } from "../data/itinerary";
import { formatINRk } from "../lib/format";

/**
 * Cumulative actual-spend area chart over the 16 days.
 * Stay + tour costs accrue per day, with a budgeted target line overlaid.
 */
export default function DailySpendChart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 720;
    const height = 320;
    const margin = { top: 28, right: 24, bottom: 40, left: 50 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");

    // build daily totals
    const data = ITINERARY.map((day, i) => {
      const stay = STAY_NIGHTS[i];
      const dayTours = TOURS.filter((t) => t.date === day.date).reduce((s, t) => s + t.cost, 0);
      const stayActual = stay?.actual ?? 0;
      const stayBudget = stay?.budgeted ?? 0;
      const tourBudget = day.date === "2026-05-23" ? 7.5 : day.date === "2026-05-24" ? 22.3 : day.date === "2026-05-26" ? 18.2 : 0;
      // running cumulative
      return { date: day.date, dailyActual: stayActual + dayTours, dailyBudget: stayBudget + tourBudget };
    });
    let cumA = 0, cumB = 0;
    const cumData = data.map((d) => {
      cumA += d.dailyActual;
      cumB += d.dailyBudget;
      return { date: d.date, cumA, cumB };
    });

    const x = d3.scalePoint<string>().domain(cumData.map((d) => d.date)).range([0, innerW]).padding(0.5);
    const y = d3.scaleLinear().domain([0, d3.max(cumData, (d) => Math.max(d.cumA, d.cumB))! * 1.1]).range([innerH, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // area
    const area = d3
      .area<typeof cumData[number]>()
      .x((d) => x(d.date)!)
      .y0(innerH)
      .y1((d) => y(d.cumA))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const grad = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "grad-spend")
      .attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 1);
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#a0723a").attr("stop-opacity", 0.55);
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#a0723a").attr("stop-opacity", 0.05);

    g.append("path")
      .datum(cumData)
      .attr("d", area)
      .attr("fill", "url(#grad-spend)")
      .attr("opacity", 0)
      .transition()
      .delay(150)
      .duration(900)
      .attr("opacity", 1);

    // actual line
    const line = d3
      .line<typeof cumData[number]>()
      .x((d) => x(d.date)!)
      .y((d) => y(d.cumA))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const linePath = g
      .append("path")
      .datum(cumData)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "#2b2419")
      .attr("stroke-width", 2);
    const lineLen = (linePath.node() as SVGPathElement).getTotalLength();
    linePath
      .attr("stroke-dasharray", `${lineLen} ${lineLen}`)
      .attr("stroke-dashoffset", lineLen)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    // budget line (dashed)
    const budgetLine = d3
      .line<typeof cumData[number]>()
      .x((d) => x(d.date)!)
      .y((d) => y(d.cumB));
    g.append("path")
      .datum(cumData)
      .attr("d", budgetLine)
      .attr("fill", "none")
      .attr("stroke", "#8b3a3a")
      .attr("stroke-width", 1.4)
      .attr("stroke-dasharray", "4 4")
      .attr("opacity", 0)
      .transition()
      .delay(1100)
      .duration(700)
      .attr("opacity", 0.85);

    // axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues(cumData.filter((_, i) => i % 2 === 0).map((d) => d.date))
          .tickFormat((d) => d3.timeFormat("%-d %b")(new Date(d as string)))
          .tickSize(0)
          .tickPadding(8),
      )
      .call((sel) => sel.select(".domain").attr("stroke", "#8b7a5e").attr("stroke-dasharray", "2 3"))
      .selectAll("text")
      .attr("font-family", "EB Garamond, serif")
      .attr("font-size", 10)
      .attr("fill", "#5a4a35");

    g.append("g")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-innerW)
          .tickFormat((d) => formatINRk(+d as number)),
      )
      .call((sel) => sel.select(".domain").remove())
      .call((sel) =>
        sel
          .selectAll(".tick line")
          .attr("stroke", "#8b7a5e")
          .attr("stroke-opacity", 0.25)
          .attr("stroke-dasharray", "1 3"),
      )
      .selectAll("text")
      .attr("font-family", "EB Garamond, serif")
      .attr("font-size", 10)
      .attr("fill", "#5a4a35");

    // end-point label
    const last = cumData[cumData.length - 1];
    g.append("text")
      .attr("x", x(last.date)! - 8)
      .attr("y", y(last.cumA) - 10)
      .attr("text-anchor", "end")
      .attr("font-family", "Cormorant Garamond, serif")
      .attr("font-style", "italic")
      .attr("font-size", 14)
      .attr("fill", "#2b2419")
      .attr("opacity", 0)
      .text(`Booked ${formatINRk(last.cumA)}`)
      .transition()
      .delay(1700)
      .duration(500)
      .attr("opacity", 1);

    g.append("text")
      .attr("x", x(last.date)! - 8)
      .attr("y", y(last.cumB) - 10)
      .attr("text-anchor", "end")
      .attr("font-family", "Lora, serif")
      .attr("font-style", "italic")
      .attr("font-size", 10)
      .attr("fill", "#8b3a3a")
      .attr("opacity", 0)
      .text(`Budgeted ${formatINRk(last.cumB)}`)
      .transition()
      .delay(1900)
      .duration(500)
      .attr("opacity", 0.9);
  }, []);

  return <svg ref={ref} className="w-full h-auto" />;
}
