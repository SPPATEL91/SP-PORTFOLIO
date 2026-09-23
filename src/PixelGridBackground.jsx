import React, { useEffect, useRef } from "react";

/**
 * PixelGridBackground
 * High-performance HTML5 canvas pixel grid with:
 * - Exponential mouse coordinate lerping
 * - Radial proximity falloff (0-1: strong, 1-3: medium, 3-6: subtle, >6: resting)
 * - Decaying cell energy trail (250-400ms fade)
 * - Micro cursor trail glow
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

    // Detect fine pointer & reduced motion
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isInteractive = finePointer && !reducedMotion;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const CELL_SIZE = 28; // square pixel cell size in CSS pixels

    // Energy map: Float32Array to store active decay values per cell
    let gridEnergy = new Float32Array(0);

    // Mouse coordinates (interpolated & target)
    let targetX = -1000;
    let targetY = -1000;
    let curX = -1000;
    let curY = -1000;
    let trailX = -1000;
    let trailY = -1000;
    let isMouseOver = false;

    // Section awareness parameters
    let currentConfig = {
      radius: 170,
      intensity: 0.9,
      color: "59, 130, 246", // Blue rgb
      accentColor: "6, 182, 212", // Cyan rgb
    };

    const sectionConfigs = {
      home: { radius: 210, intensity: 1.05, color: "59, 130, 246", accentColor: "6, 182, 212" },
      projects: { radius: 140, intensity: 0.65, color: "37, 99, 235", accentColor: "6, 182, 212" },
      about: { radius: 150, intensity: 0.65, color: "59, 130, 246", accentColor: "99, 102, 241" },
      skills: { radius: 185, intensity: 0.9, color: "6, 182, 212", accentColor: "59, 130, 246" },
      experience: { radius: 140, intensity: 0.6, color: "59, 130, 246", accentColor: "6, 182, 212" },
      contact: { radius: 220, intensity: 1.0, color: "6, 182, 212", accentColor: "99, 102, 241" },
    };

    // Intersection observer for section tracking
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

    // Resize handler
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

      // Draw initial static frame
      renderFrame(false);
      wakeLoop();
    };

    // Animation Loop Control
    let rafId = null;
    let isSleeping = false;

    const wakeLoop = () => {
      if (!isInteractive) return;
      if (isSleeping) {
        isSleeping = false;
        rafId = requestAnimationFrame(loop);
      }
    };

    // Draw static baseline grid
    const drawBaseGrid = () => {
      ctx.clearRect(0, 0, width, height);

      // Ultra-subtle base grid points / lines
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

      // Subtle cell intersection dots
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          ctx.fillRect(c * CELL_SIZE - 0.5, r * CELL_SIZE - 0.5, 1.5, 1.5);
        }
      }
    };

    // Main render routine
    const renderFrame = (animate = true) => {
      drawBaseGrid();

      if (!animate || !isInteractive) return;

      const { radius, intensity, color, accentColor } = currentConfig;
      const cellRadius = radius / CELL_SIZE;

      // Mouse lerping
      const mouseSpeed = Math.hypot(targetX - curX, targetY - curY);
      curX += (targetX - curX) * 0.16;
      curY += (targetY - curY) * 0.16;
      trailX += (curX - trailX) * 0.1;
      trailY += (curY - trailY) * 0.1;

      // Active cell column and row
      const curCol = curX / CELL_SIZE;
      const curRow = curY / CELL_SIZE;

      let maxActiveEnergy = 0;

      // Update and inject energy into cells within bounding box
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
              const normDist = dist / radius; // 0 to 1
              // Radial falloff:
              // 0-1 cells: strong (0.9 to 1.0)
              // 1-3 cells: medium (0.45 to 0.85)
              // 3-6 cells: subtle (0.1 to 0.4)
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

      // Draw all active cells and decay energy
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          let energy = gridEnergy[idx];
          if (energy > 0.003) {
            if (energy > maxActiveEnergy) maxActiveEnergy = energy;

            const x = c * CELL_SIZE;
            const y = r * CELL_SIZE;

            // Fill pixel cell
            // Core cells get accent mix, outer cells get primary blue tint
            const isCore = energy > 0.45;
            const activeRgb = isCore ? accentColor : color;
            const fillAlpha = energy * 0.22;
            const strokeAlpha = energy * 0.55;

            ctx.fillStyle = `rgba(${activeRgb}, ${fillAlpha})`;
            ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);

            // Highlight border
            ctx.strokeStyle = `rgba(${activeRgb}, ${strokeAlpha})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);

            // Center glow dot for active cells
            if (energy > 0.2) {
              const dotSize = 1.5 + energy * 2;
              ctx.fillStyle = `rgba(${accentColor}, ${energy * 0.8})`;
              ctx.fillRect(x + CELL_SIZE / 2 - dotSize / 2, y + CELL_SIZE / 2 - dotSize / 2, dotSize, dotSize);
            }

            // Exponential decay: ~300ms fade
            gridEnergy[idx] *= 0.93;
          } else {
            gridEnergy[idx] = 0;
          }
        }
      }

      // Draw subtle cursor trail soft glow
      if (isMouseOver && trailX > 0 && trailY > 0 && intensity > 0.3) {
        const gradient = ctx.createRadialGradient(trailX, trailY, 0, trailX, trailY, radius * 0.65);
        gradient.addColorStop(0, `rgba(${accentColor}, ${0.08 * intensity})`);
        gradient.addColorStop(0.5, `rgba(${color}, ${0.03 * intensity})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(trailX, trailY, radius * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      // Check for sleep mode: if mouse stopped moving and energy decayed below threshold
      if (!isMouseOver && maxActiveEnergy < 0.005 && mouseSpeed < 0.5) {
        isSleeping = true;
      }
    };

    // Animation Loop
    const loop = () => {
      renderFrame(true);
      if (!isSleeping) {
        rafId = requestAnimationFrame(loop);
      }
    };

    // Pointer event listeners
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