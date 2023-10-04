import React from "react";

function Chart(props) {
  const data = props.data;
  const padding = 40;
  const minChartWidth = 400; // Minimum chart width to avoid it being too small
  const width = Math.max(minChartWidth, padding * 2 + data.length * 80);
  const height = 200;

  let xScale;
  if (data.length === 1) {
    // Handle the case where there's only one data point
    xScale = (width - 2 * padding) / 1; // Set a reasonable scale for one point
  } else {
    xScale = (width - 2 * padding) / (data.length - 1);
  }
  const yMax = Math.max(
    ...data.map((item) => Math.max(item.temp, item.feelsLike))
  );
  const yScale = (height - 2 * padding - 80) / yMax;
  const fyScale = (height - padding - 60) / yMax;
  const rectWidth = 40; // Width of the rectangle background
  const rectHeight = 20; // Height of the rectangle background
  return (
    <svg width={width} height={height}>
      {data.map((point, index) => {
        const x = padding + index * xScale;
        const y = height - padding - point.temp * yScale;
        const fy = height - padding - point.feelsLike * fyScale;
        const circleRadius = 4;
        const labelOffset = 10;
        const rectX = x - rectWidth / 2; // Center the rectangle
        const rectY = fy - rectHeight / 2; // Center the rectangle
        // Draw data point (circle) and label it with time
        const circle = (
          <g key={index}>
            <circle cx={x} cy={y} r={circleRadius} fill="white" />
            <text x={x} y={height - padding + 20} textAnchor="middle" fill="white">
              {point.time}
            </text>
            <text x={x} y={y - circleRadius - labelOffset} textAnchor="middle" fill="white">
              {Math.round(point.temp)}
              {point.icon}
            </text>
          </g>
        );

        // Draw lines to connect circles (except for the first one)
        let line = null;
        if (index > 0) {
          const prevX = padding + (index - 1) * xScale;
          const prevY = height - padding - data[index - 1].temp * yScale;
          const prevfY = height - padding - data[index - 1].feelsLike * fyScale;
          line = (
            <>
              <line x1={prevX} y1={prevY} x2={x} y2={y} stroke="white" />
            </>
          );
        }
        const rectBackground = (
          <g>
            <rect
              x={rectX}
              y={rectY}
              width={rectWidth}
              height={rectHeight}
              fill="white"
            ></rect>
          </g>
        );

        return (
          <g key={index}>
            {line}
            {circle}
            {rectBackground}
            <text x={x} y={fy} textAnchor="middle" dominantBaseline="middle">
              {Math.round(point.feelsLike)}
              {point.icon}
                <title>Feels Like</title>
            
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default Chart;
