const data = [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 25 },
    { month: "Mar", value: 30 },
    { month: "Apr", value: 15 },
    { month: "May", value: 40 },
  ];
  const canvas = document.getElementById("line-chart");
  const ctx = canvas.getContext("2d");
  const chartWidth = canvas.width;
  const chartHeight = canvas.height;
  const padding = 40;
  const maxDataValue = Math.max(...data.map((item) => item.value));
  // Calculate the scaling factors for the chart
  const xScale = (chartWidth - 2 * padding) / (data.length - 1);
  const yScale = (chartHeight - 2 * padding) / maxDataValue;

  // Function to draw the data points and lines
  function drawLineChart() {
    ctx.clearRect(0, 0, chartWidth, chartHeight);

    // Draw the data points and lines
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding + index * xScale;
      const y = chartHeight - padding - point.value * yScale;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      ctx.arc(x, y, 2, 0, Math.PI * 2);
    });
    ctx.stroke();
  }

  // Call the drawLineChart function to render the chart
  drawLineChart();