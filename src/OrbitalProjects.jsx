import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink, ArrowUpRight, Layers, CheckCircle2, ChevronRight, Sparkles, Eye, Code2
} from "lucide-react";

function Github({ size = 16, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function OrbitalProjects({ projects, onSelectProject }) {
  const containerRef = useRef(null);
  const [isHoveringZone, setIsHoveringZone] = useState(false);
  const [activeHoverId, setActiveHoverId] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check breakpoint & fine pointer
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Orbit animation loop
  useEffect(() => {
    if (isMobile) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    let rafId = null;
    let lastTime = performance.now();

    const loop = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const speed = isHoveringZone ? 0.05 : 0.22;
      const direction = mouseOffset.x < 0 ? -1 : 1;

      setOrbitAngle((prev) => (prev + delta * speed * direction) % (Math.PI * 2));
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHoveringZone, mouseOffset.x, isMobile]);

  // Track mouse coordinates over interaction zone
  const handleMouseMove = (e) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    setMouseOffset({ x: Math.max(-1, Math.min(1, normX)), y: Math.max(-1, Math.min(1, normY)) });
  };

  const projectList = Object.values(projects);

  return (
    <div className="orbital-projects-wrapper">
      
      {/* Editorial Header */}
      <div className="section-header-v2 text-center">
        <span className="section-eyebrow-v2">
          <Layers size={12} /> SELECTED WORK
        </span>
        <h2 id="projects-heading" className="section-title-v2">
          Projects where I turned requirements into working software.
        </h2>
        <p className="section-subtitle-v2 mx-auto">
          Hover over the orbital interaction zone to inspect software systems built for plastic raw materials manufacturing, enterprise service requests, and university governance.
        </p>
      </div>

      {/* Flagship Highlight Box for SP Polymers */}
      {projects["sp-polymers"] && (
        <div className="flagship-case-study-hero">
          <div className="flagship-grid">
            
            {/* Visual Preview Side */}
            <div className="flagship-visual-container">
              <div className="flagship-visual-mockup">
                <div className="mockup-browser-bar">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                  <span className="mockup-url">khodal-industries.vercel.app</span>
                </div>

                <div className="mockup-content-preview">
                  <div className="flagship-monogram">SP POLYMERS</div>
                  <div className="flagship-sub">Plastic Raw Materials &amp; Industrial Catalog Platform</div>
                  <div className="flagship-badge-row">
                    <span className="badge-pill">React</span>
                    <span className="badge-pill">Next.js</span>
                    <span className="badge-pill">Node.js</span>
                    <span className="badge-pill">Vercel Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Details Side */}
            <div className="flagship-details-side">
              <div className="flagship-eyebrow">
                <Sparkles size={13} /> LIVE VERCEL PROJECT
              </div>
              <h3 className="flagship-title">SP Polymers (Khodal Industries)</h3>
              <p className="flagship-description">
                Industrial B2B web catalog platform engineered for plastic raw materials presentation. Deployed live on Vercel.
              </p>

              {/* Challenge - Solution - Engineering */}
              <div className="flagship-breakdown-list">
                <div className="breakdown-item">
                  <span className="breakdown-tag">CHALLENGE</span>
                  <p>Industrial product presentation requiring an intuitive catalog to inspect material grades, specs, and inquiry workflows.</p>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-tag">SOLUTION</span>
                  <p>Built a fast static Next.js platform with zero layout shifts, structured product grade taxonomies, and instant catalog exploration.</p>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-tag">ENGINEERING WORK</span>
                  <p>Implemented sub-second initial paint with Next.js ISR, OpenGraph metadata, JSON-LD schemas, and responsive CSS grid structures deployed on Vercel.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flagship-actions">
                <a
                  href="https://khodal-industries-ma1m-q68gbqe9n-sppatel8.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-v2 btn-v2-primary"
                >
                  <span>Live Project</span>
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href="https://github.com/SPPATEL91/Khodal-Industries-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-v2 btn-v2-secondary"
                >
                  <Github size={15} />
                  <span>View Code</span>
                </a>
                <button
                  type="button"
                  onClick={() => onSelectProject("sp-polymers")}
                  className="btn-v2 btn-v2-ghost"
                >
                  <span>Full Case Study</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3-Project Interactive Orbit Area (Desktop) vs Stacked (Mobile) */}
      {!isMobile ? (
        <div
          ref={containerRef}
          className="orbit-stage-container"
          onMouseEnter={() => setIsHoveringZone(true)}
          onMouseLeave={() => {
            setIsHoveringZone(false);
            setActiveHoverId(null);
          }}
          onMouseMove={handleMouseMove}
          aria-label="Interactive 3-Project Orbital Showcase"
        >
          {/* Orbital Guidelines */}
          <div className={`orbit-path-ring${isHoveringZone ? " is-expanded" : ""}`} aria-hidden="true" />

          <div className="orbit-center-badge">
            <span className="pulse-dot" />
            <span>{isHoveringZone ? "ORBIT PAUSED · HOVER CARD TO INSPECT" : "APPROACH CURSOR TO EXPAND ORBIT"}</span>
          </div>

          {/* Render 3 Orbiting Project Cards */}
          <div className="orbit-cards-container">
            {projectList.map((proj, idx) => {
              const total = projectList.length;
              const baseAngle = (idx / total) * Math.PI * 2;
              const currentAngle = baseAngle + orbitAngle;

              const radiusX = isHoveringZone ? 340 : 60;
              const radiusY = isHoveringZone ? 160 : 25;

              const x = Math.cos(currentAngle) * radiusX + mouseOffset.x * -25;
              const y = Math.sin(currentAngle) * radiusY + mouseOffset.y * -15;

              const depthFactor = (Math.sin(currentAngle) + 1) / 2;
              const scale = isHoveringZone ? 0.9 + depthFactor * 0.18 : 0.85;
              const zIndex = activeHoverId === proj.id ? 100 : Math.round(depthFactor * 50) + 10;

              const isHovered = activeHoverId === proj.id;

              return (
                <div
                  key={proj.id}
                  className={`orbit-card-item${isHovered ? " is-hovered" : ""}`}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale})`,
                    zIndex: zIndex,
                  }}
                  onMouseEnter={() => setActiveHoverId(proj.id)}
                  onMouseLeave={() => setActiveHoverId(null)}
                  onClick={() => onSelectProject(proj.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") onSelectProject(proj.id); }}
                >
                  <div className="orbit-card-inner">
                    <div className="orbit-card-header">
                      <span className="orbit-proj-category">{proj.category}</span>
                      <span className="orbit-proj-num">0{idx + 1}</span>
                    </div>

                    <h4 className="orbit-proj-title">{proj.title}</h4>
                    <p className="orbit-proj-summary">{proj.description}</p>

                    <div className="orbit-proj-badges">
                      {proj.techBadges.slice(0, 4).map((badge) => (
                        <span key={badge} className="orbit-badge-chip">{badge}</span>
                      ))}
                    </div>

                    <div className="orbit-card-footer">
                      <span className="orbit-action-text">Explore Case Study</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Mobile Swipeable / Stacked Card Presentation */
        <div className="mobile-projects-stack">
          {projectList.map((proj, idx) => (
            <div key={proj.id} className="mobile-project-card">
              <div className="mobile-card-header">
                <span className="mobile-proj-tag">0{idx + 1} // {proj.category}</span>
              </div>
              <h3 className="mobile-proj-title">{proj.title}</h3>
              <p className="mobile-proj-desc">{proj.description}</p>

              <div className="mobile-proj-tech">
                {proj.techBadges.map((badge) => (
                  <span key={badge} className="mobile-tech-pill">{badge}</span>
                ))}
              </div>

              <div className="mobile-card-actions">
                <button
                  type="button"
                  className="btn-v2 btn-v2-primary w-full"
                  onClick={() => onSelectProject(proj.id)}
                >
                  <span>View Case Study</span>
                  <ChevronRight size={14} />
                </button>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-v2 btn-v2-secondary w-full"
                  >
                    <span>Live Site</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
