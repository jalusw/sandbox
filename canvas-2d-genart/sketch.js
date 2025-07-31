const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#0a0015";
    context.fillRect(0, 0, width, height);

    const colors = [
      "#00ffff",
      "#00ccdd",
      "#0099bb",
      "#006699",
      "#004477",
      "#88ffff",
      "#44ddff",
    ];

    const gridSize = 16;
    const cellSize = width / gridSize;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const centerX = x * cellSize + cellSize / 2;
        const centerY = y * cellSize + cellSize / 2;

        // Random pattern selection
        const pattern = Math.floor(Math.random() * 5);
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Set glow effect
        context.shadowColor = color;
        context.shadowBlur = 20;

        context.strokeStyle = color;
        context.lineWidth = 2;
        context.fillStyle = color;
        context.globalAlpha = 0.6;

        switch (pattern) {
          case 0: // Triangles
            drawTriangle(context, centerX, centerY, cellSize * 0.3);
            break;
          case 1: // Circles
            drawCircle(context, centerX, centerY, cellSize * 0.25);
            break;
          case 2: // Diamonds
            drawDiamond(context, centerX, centerY, cellSize * 0.3);
            break;
          case 3: // Lines
            drawLines(context, centerX, centerY, cellSize * 0.4);
            break;
          case 4: // Hexagons
            drawHexagon(context, centerX, centerY, cellSize * 0.25);
            break;
        }
      }
    }

    // Reset shadow and alpha
    context.shadowBlur = 0;
    context.globalAlpha = 1;

    // Add large central geometric elements
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw main focal elements with stronger glow
    context.shadowBlur = 40;

    // Large central diamond
    context.strokeStyle = colors[0];
    context.lineWidth = 8;
    context.shadowColor = colors[0];
    drawDiamond(context, centerX, centerY, 200);

    // Overlapping circles
    context.strokeStyle = colors[1];
    context.shadowColor = colors[1];
    context.lineWidth = 6;
    drawCircle(context, centerX - 100, centerY - 100, 80);
    drawCircle(context, centerX + 100, centerY + 100, 80);

    context.shadowBlur = 10;
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = Math.random() * 200 + 50;
      const angle = Math.random() * Math.PI * 2;

      context.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
      context.lineWidth = Math.random() * 4 + 1;
      context.globalAlpha = 0.8;

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(
        x + Math.cos(angle) * length,
        y + Math.sin(angle) * length
      );
      context.stroke();
    }

    context.shadowBlur = 0;
    context.globalAlpha = 1;
  };

  function drawTriangle(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
    ctx.stroke();
  }

  function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawDiamond(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size, y);
    ctx.closePath();
    ctx.stroke();
  }

  function drawLines(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.moveTo(x + size, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.stroke();
  }

  function drawHexagon(ctx, x, y, radius) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const hx = x + radius * Math.cos(angle);
      const hy = y + radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(hx, hy);
      } else {
        ctx.lineTo(hx, hy);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
};

canvasSketch(sketch, settings);
