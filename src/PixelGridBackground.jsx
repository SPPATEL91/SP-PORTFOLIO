import React, { useEffect, useRef } from "react";

/**
 * PixelGridBackground
 * High-performance HTML5 Canvas interactive pixel grid tuned for Light & Dark Contrast Sections:
 * - Refined light grid structure on #F7F9FC
 * - Fine-pointer and reduced-motion detection
 * - Cursor proximity illumination using #2563EB (Primary Blue) and #06B6D4 (Cyan)
 * - 0% CPU overhead when cursor is stationary
 */
export function PixelGridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isInteractive = finePointer && !reducedMotion;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const CELL_SIZE = 36;

    let gridEnergy = new Float32Array(0);

    let targetX = -1000;
    let targetY = -1000;
    let curX = -1000;
    let curY = -1000;
    let spotX = -1000;
    let spotY = -1000;
    let isMouseOver = false;

    // Config for Light Engineering Background
    let currentConfig = {
      radius: 180,
      intensity: 0.65,
      color: "37, 99, 235", // Primary Accent Blue (#2563EB)
      accentColor: "6, 182, 212", // Secondary Accent Cyan (#06B6D4)
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / CELL_SIZE) + 1;
      rows = Math.ceil(height / CELL_SIZE) + 1;
      gridEnergy = new Float32Array(cols * rows);

      renderFrame(false);
      wakeLoop();
    };

    let rafId = null;
    let isSleeping = false;

    const wakeLoop = () => {
      if (!isInteractive) return;
      if (isSleeping) {
        isSleeping = false;
        rafId = requestAnimationFrame(loop);
      }
    };

    const drawBaseGrid = () => {
      ctx.clearRect(0, 0, width, height);

      // Crisp, ultra-subtle base grid lines for light theme
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(11, 18, 32, 0.035)";

      ctx.beginPath();
      for (let x = 0; x <= width; x += CELL_SIZE) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += CELL_SIZE) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      // Intersection micro-dots
      ctx.fillStyle = "rgba(11, 18, 32, 0.05)";
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          ctx.fillRect(c * CELL_SIZE - 0.5, r * CELL_SIZE - 0.5, 1.2, 1.2);
        }
      }
    };

    const renderFrame = (animate = true) => {
      drawBaseGrid();

      if (!animate || !isInteractive) return;

      const { radius, intensity, color, accentColor } = currentConfig;
      const cellRadius = radius / CELL_SIZE;

      const mouseSpeed = Math.hypot(targetX - curX, targetY - curY);
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      spotX += (curX - spotX) * 0.12;
      spotY += (curY - spotY) * 0.12;

      // Cursor spotlight ambient glow
      if (isMouseOver && spotX > -50 && spotY > -50) {
        const spotRadius = radius * 1.35;
        const spotGrad = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotRadius);
        spotGrad.addColorStop(0, `rgba(${accentColor}, ${0.05 * intensity})`);
        spotGrad.addColorStop(0.5, `rgba(${color}, ${0.02 * intensity})`);
        spotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(spotX, spotY, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      const curCol = curX / CELL_SIZE;
      const curRow = curY / CELL_SIZE;

      let maxActiveEnergy = 0;

      const minC = Math.max(0, Math.floor(curCol - cellRadius - 1));
      const maxC = Math.min(cols - 1, Math.ceil(curCol + cellRadius + 1));
      const minR = Math.max(0, Math.floor(curRow - cellRadius - 1));
      const maxR = Math.min(rows - 1, Math.ceil(curRow + cellRadius + 1));

      if (isMouseOver && curX > -50 && curY > -50) {
        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            const cellCenterX = (c + 0.5) * CELL_SIZE;
            const cellCenterY = (r + 0.5) * CELL_SIZE;
            const dist = Math.hypot(cellCenterX - curX, cellCenterY - curY);

            if (dist < radius) {
              const normDist = dist / radius;
              const targetEnergy = Math.pow(Math.max(0, 1 - normDist), 2.2) * intensity;
              const idx = r * cols + c;
              if (targetEnergy > gridEnergy[idx]) {
                gridEnergy[idx] = Math.min(1, targetEnergy);
              }
            }
          }
        }
      }

      // Draw active grid cells
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          let energy = gridEnergy[idx];
          if (energy > 0.003) {
            if (energy > maxActiveEnergy) maxActiveEnergy = energy;

            const x = c * CELL_SIZE;
            const y = r * CELL_SIZE;

            const isCore = energy > 0.38;
            const activeRgb = isCore ? accentColor : color;

            const fillAlpha = energy * 0.09;
            const strokeAlpha = energy * 0.32;

            ctx.fillStyle = `rgba(${activeRgb}, ${fillAlpha})`;
            ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);

            ctx.strokeStyle = `rgba(${activeRgb}, ${strokeAlpha})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);

            if (energy > 0.22) {
              const dotSize = 1.3 + energy * 1.8;
              ctx.fillStyle = `rgba(${accentColor}, ${energy * 0.6})`;
              ctx.fillRect(
                x + CELL_SIZE / 2 - dotSize / 2,
                y + CELL_SIZE / 2 - dotSize / 2,
                dotSize,
                dotSize
              );
            }

            gridEnergy[idx] *= 0.925;
          } else {
            gridEnergy[idx] = 0;
          }
        }
      }

      if (!isMouseOver && maxActiveEnergy < 0.005 && mouseSpeed < 0.4) {
        isSleeping = true;
      }
    };

    const loop = () => {
      renderFrame(true);
      if (!isSleeping) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const handlePointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isMouseOver = true;
      wakeLoop();
    };

    const handlePointerLeave = () => {
      isMouseOver = false;
      targetX = -1000;
      targetY = -1000;
      wakeLoop();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    if (isInteractive) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("mouseleave", handlePointerLeave);
      isSleeping = false;
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (isInteractive) {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("mouseleave", handlePointerLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="pixel-grid-canvas"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}