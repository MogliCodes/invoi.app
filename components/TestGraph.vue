<script setup lang="ts">
import * as d3 from "d3";

type Props = {
  values: Array<{ month: string; y: number }>;
};
const props = defineProps<Props>();

onMounted(() => {
  if (props.values) {
    setupGraph();
  }
});

function setupGraph() {
  // Set up the SVG
  const svg = d3.select("svg");
  const margin = { top: 40, right: 60, bottom: 50, left: 60 };
  const width = parseInt(svg.style("width")) - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // Define the scales and axes
  const xScale = d3
    .scalePoint()
    .domain(props.values?.map((d) => d.month))
    .range([0, width])
    .padding(0);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(props.values, (d) => formatCentToAmount(d.y))])
    .range([height, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickFormat((d) => `${d}€`);

  // Line generator
  const line = d3
    .line()
    .x((d) => xScale(d.month))
    .y((d) => yScale(formatCentToAmount(d.y)))
    .curve(d3.curveMonotoneX); // Smooth the line with curveMonotoneX

  // Area generator
  const area = d3
    .area()
    .x((d) => xScale(d.month))
    .y0(height)
    .y1((d) => yScale(formatCentToAmount(d.y)))
    .curve(d3.curveMonotoneX); // Smooth the area with curveMonotoneX

  // Append a group element for margin convention
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Draw the area
  g.append("path").datum(props.values).attr("class", "area").attr("d", area);

  // Draw the line
  g.append("path").datum(props.values).attr("class", "line").attr("d", line);

  // Add dashed vertical lines for each month
  g.selectAll(".vertical-line")
    .data(props.values)
    .enter()
    .append("line")
    .attr("class", "vertical-line")
    .attr("x1", (d) => xScale(d.month))
    .attr("y1", 0)
    .attr("x2", (d) => xScale(d.month))
    .attr("y2", height)
    .style("stroke", "lightgray")
    .style("stroke-width", 1)
    .style("stroke-dasharray", "4,4");

  // Add the X-axis
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .selectAll("path, line")
    .attr("stroke", "lightgray")
    .attr("stroke-width", 0); // Set the thickness of the axis lines and ticks

  // Style the X-axis labels
  g.selectAll("text").style("fill", "lightgray"); // Set the color of the axis labels

  // Add the Y-axis
  g.append("g")
    .call(yAxis)
    .selectAll("path, line")
    .attr("stroke", "lightgray")
    .attr("stroke-width", 0); // Set the thickness of the axis lines and ticks

  // Style the Y-axis labels
  g.selectAll("text")
    .style("fill", "gray")
    .style("font-size", "15px") // Set the color of the axis labels
    .style("font-family", "IBM Plex Sans"); // Set the color of the axis labels

  // Add horizontal grid lines
  g.selectAll(".horizontal-line")
    .data(yScale.ticks(5))
    .enter()
    .append("line")
    .attr("class", "grid-line")
    .attr("x1", 0)
    .attr("y1", (d) => yScale(d))
    .attr("x2", width)
    .attr("y2", (d) => yScale(d))
    .style("stroke", "lightgray")
    .style("stroke-opacity", 0.5);

  // Draw dots
  g.selectAll(".dot")
    .data(props.values)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => xScale(d.month) + xScale.bandwidth() / 2) // Adjust to center points
    .attr("cy", (d) => yScale(formatCentToAmount(d.y)))
    .attr("r", 4)
    .on("mouseover", (event, d) => {
      // Show tooltip on mouseover
      const tooltip = g
        .append("text")
        .attr("class", "tooltip")
        .attr("x", xScale(d.month) + xScale.bandwidth() / 2)
        .attr("y", yScale(formatCentToAmount(d.y)) - 10)
        .style("text-anchor", "middle")
        .html(`${formatCurrencyAmount(formatCentToAmount(d.y))}`);

      // Remove tooltip on mouseout
      d3.select(event.target).on("mouseout", () => tooltip.remove());
    });
}
</script>

<template>
  <div class="container mx-auto">
    <svg width="100%" height="500"></svg>
  </div>
</template>

<style>
.line {
  fill: none;
  stroke: #56e39f;
  stroke-width: 3px;
}

.dot {
  fill: #1a4530;
  position: relative;
  z-index: 999;
}

.area {
  fill: #56e39f;
}
</style>
