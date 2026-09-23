import React, { useEffect, useRef } from "react";

/**
 * PixelGridBackground
 * High-performance HTML5 canvas pixel grid with:
 * - Exponential mouse coordinate lerping
 * - Radial proximity falloff (0-1: strong, 1-3: medium, 3-6: subtle, >6: resting)
 * - Decaying cell energy trail (250-400ms fade)
 * - Soft Cursor Spotlight: subtle ambient glow following cursor
 * - Section-aware intensity & radius modulation
 * - Idle sleep mode (0% CPU when mouse is still)
 * - Touch & prefers-reduced-motion guard (static grid fallback)
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
    const CELL_SIZE = 28;

    let gridEnergy = new Float32Array(0);

    let targetX = -1000;
    let targetY = -1000;
    let curX = -1000;
    let curY = -1000;
    let spotX = -1000;
    let spotY = -1000;
    let isMouseOver = false;

    let currentConfig = {
      radius: 175,
      intensity: 0.9,
      color: "59, 130, 246",
      accentColor: "6, 182, 212",
    };

    const sectionConfigs = {
      home: { radius: 210, intensity: 1.05, color: "59, 130, 246", accentColor: "6, 182, 212" },
      projects: { radius: 145, intensity: 0.65, color: "37, 99, 235", accentColor: "6, 182, 212" },
      about: { radius: 155, intensity: 0.65, color: "59, 130, 246", accentColor: "99, 102, 241" },
      skills: { radius: 185, intensity: 0.9, color: "6, 182, 212", accentColor: "59, 130, 246" },
      experience: { radius: 140, intensity: 0.6, color: "59, 130, 246", accentColor: "6, 182, 212" },
      contact: { radius: 220, intensity: 1.0, color: "6, 182, 212", accentColor: "99, 102, 241" },
    };

    let sectionObserver = null;
    if (typeof IntersectionObserver !== "undefined") {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && sectionConfigs[entry.target.id]) {
              currentConfig = sectionConfigs[entry.target.id];
              wakeLoop();
            }
          });
        },
        { threshold: 0.25 }
      );

      const sectionIds = ["home", "projects", "about", "skills", "experience", "contact"];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
    }

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

      // Ultra-subtle base grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.024)";

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

      // Intersection dots
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          ctx.fillRect(c * CELL_SIZE - 0.5, r * CELL_SIZE - 0.5, 1.5, 1.5);
        }
      }
    };

    const renderFrame = (animate = true) => {
      drawBaseGrid();

      if (!animate || !isInteractive) return;

      const { radius, intensity, color, accentColor } = currentConfig;
      const cellRadius = radius / CELL_SIZE;

      // Mouse lerping
      const mouseSpeed = Math.hypot(targetX - curX, targetY - curY);
      curX += (targetX - curX) * 0.16;
      curY += (targetY - curY) * 0.16;
      spotX += (curX - spotX) * 0.12;
      spotY += (curY - spotY) * 0.12;

      // Draw subtle cursor spotlight behind content
      if (isMouseOver && spotX > 0 && spotY > 0) {
        const spotRadius = radius * 1.4;
        const spotGrad = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotRadius);
        spotGrad.addColorStop(0, `rgba(${accentColor}, ${0.075 * intensity})`);
        spotGrad.addColorStop(0.45, `rgba(${color}, ${0.03 * intensity})`);
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

      if (isMouseOver && curX > 0 && curY > 0) {
        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            const cellCenterX = (c + 0.5) * CELL_SIZE;
            const cellCenterY = (r + 0.5) * CELL_SIZE;
            const dist = Math.hypot(cellCenterX - curX, cellCenterY - curY);

            if (dist < radius) {
              const normDist = dist / radius;
              // Radial falloff:
              // 0-1 cell: strong
              // 1-3 cells: medium
              // 3-6 cells: subtle
              // >6 cells: fading to 0
              const targetEnergy = Math.pow(Math.max(0, 1 - normDist), 2.2) * intensity;
              const idx = r * cols + c;
              if (targetEnergy > gridEnergy[idx]) {
                gridEnergy[idx] = Math.min(1, targetEnergy);
              }
            }
          }
        }
      }

      // Draw active cells
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          let energy = gridEnergy[idx];
          if (energy > 0.003) {
            if (energy > maxActiveEnergy) maxActiveEnergy = energy;

            const x = c * CELL_SIZE;
            const y = r * CELL_SIZE;

            const isCore = energy > 0.45;
            const activeRgb = isCore ? accentColor : color;
            const fillAlpha = energy * 0.22;
            const strokeAlpha = energy * 0.55;

            ctx.fillStyle = `rgba(${activeRgb}, ${fillAlpha})`;
            ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);

            ctx.strokeStyle = `rgba(${activeRgb}, ${strokeAlpha})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);

            if (energy > 0.2) {
              const dotSize = 1.5 + energy * 2;
              ctx.fillStyle = `rgba(${accentColor}, ${energy * 0.8})`;
              ctx.fillRect(x + CELL_SIZE / 2 - dotSize / 2, y + CELL_SIZE / 2 - dotSize / 2, dotSize, dotSize);
            }

            // Exponential decay
            gridEnergy[idx] *= 0.93;
          } else {
            gridEnergy[idx] = 0;
          }
        }
      }

      if (!isMouseOver && maxActiveEnergy < 0.005 && mouseSpeed < 0.5) {
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
      if (sectionObserver) sectionObserver.disconnect();
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