import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { BUDGET } from "../data/budget";
import { formatINRk } from "../lib/format";

export default function BudgetTreemap() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 720;
    const height = 360;
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");

    const root = d3
      .hierarchy({ children: BUDGET } as any)
      .sum((d: any) => d.budgeted ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    d3.treemap<any>().size([width, height]).paddingInner(4).round(true)(root);

    const cells = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);

    cells
      .append("rect")
      .attr("width", 0)
      .attr("height", 0)
      .attr("rx", 3)
      .attr("fill", (d: any) => d.data.color)
      .attr("opacity", 0.86)
      .transition()
      .duration(900)
      .delay((_, i) => i * 60)
      .ease(d3.easeCubicOut)
      .attr("width", (d: any) => Math.max(0, d.x1 - d.x0))
      .attr("height", (d: any) => Math.max(0, d.y1 - d.y0));

    // dashed under/over indicator
    cells
      .append("rect")
      .attr("rx", 3)
      .attr("fill", "none")
      .attr("stroke", "#f4ead5")
      .attr("stroke-dasharray", "2 4")
      .attr("stroke-width", 1)
      .attr("width", (d: any) => Math.max(0, d.x1 - d.x0 - 6))
      .attr("height", (d: any) => Math.max(0, d.y1 - d.y0 - 6))
      .attr("x", 3)
      .attr("y", 3)
      .attr("opacity", 0)
      .transition()
      .delay((_, i) => 700 + i * 60)
      .duration(500)
      .attr("opacity", 0.55);

    cells
      .append("text")
      .attr("x", 12)
      .attr("y", 24)
      .attr("font-family", "Cormorant Garamond, serif")
      .attr("font-style", "italic")
      .attr("fill", "#f4ead5")
      .attr("font-size", 18)
      .attr("opacity", 0)
      .text((d: any) => d.data.name)
      .transition()
      .delay((_, i) => 800 + i * 60)
      .duration(500)
      .attr("opacity", 1);

    cells
      .append("text")
      .attr("x", 12)
      .attr("y", 50)
      .attr("font-family", "EB Garamond, serif")
      .attr("fill", "#f4ead5")
      .attr("font-size", 22)
      .attr("opacity", 0)
      .text((d: any) =>
        d.data.actual != null
          ? `${formatINRk(d.data.actual)} / ${formatINRk(d.data.budgeted)}`
          : `${formatINRk(d.data.budgeted)}`,
      )
      .transition()
      .delay((_, i) => 900 + i * 60)
      .duration(500)
      .attr("opacity", 0.95);

    cells
      .append("text")
      .attr("x", 12)
      .attr("y", 70)
      .attr("font-family", "Lora, serif")
      .attr("font-style", "italic")
      .attr("fill", "#f4ead5")
      .attr("font-size", 11)
      .attr("opacity", 0)
      .text((d: any) => {
        if (d.data.actual == null) return "not yet booked";
        const remaining = d.data.budgeted - d.data.actual;
        if (remaining > 0.05) return `${formatINRk(remaining)} still to spend`;
        if (remaining < -0.05) return `${formatINRk(Math.abs(remaining))} over budget`;
        return "fully booked";
      })
      .transition()
      .delay((_, i) => 1000 + i * 60)
      .duration(500)
      .attr("opacity", 0.85);
  }, []);

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
    </div>
  );
}
