import React, { useEffect, useRef } from "react";
import {
  ArrowUpRight, FileText, Terminal, Sparkles, CheckCircle2, ShieldCheck,
  Database, Server, Monitor, Cpu
} from "lucide-react";

function Github({ size = 15, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const githubUrl = "https://github.com/SPPATEL91";
const resumeUrl = "/Smit_Pipalava_Resume.pdf";

const TECH_STACK_HERO = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Runtime" },
  { name: ".NET", category: "Backend" },
  { name: "MongoDB", category: "NoSQL DB" },
  { name: "SQL Server", category: "Relational DB" },
];

export function HeroSection({ Magnetic }) {
  const heroRef = useRef(null);
  const profileCardRef = useRef(null);
  const mainContentRef = useRef(null);

  /* Subtle mouse movement for desktop depth */
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || isReducedMotion) return undefined;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let rafId = null;

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const render = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;

      if (profileCardRef.current) {
        profileCardRef.current.style.transform = `translate(${curX * 3}px, ${curY * 3}px)`;
      }
      if (mainContentRef.current) {
        mainContentRef.current.style.transform = `translate(${curX * 1.2}px, ${curY * 1.2}px)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="hero-section-v2" aria-label="Hero Introduction">
      {/* Restrained Light Ambient Glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="container hero-container-v2">
        {/* Main Typographic Column */}
        <div ref={mainContentRef} className="hero-typography-column">
          
          {/* Status Eyebrow */}
          <div className="hero-stage-1">
            <div className="hero-status-pill">
              <span className="status-indicator-dot" aria-hidden="true" />
              <span className="status-indicator-text">FULL-STACK DEVELOPER &amp; COMPUTER SCIENCE STUDENT</span>
            </div>
            <div className="hero-university-tag">
              <Terminal size={12} />
              <span>Darshan University · 8.87 CGPA</span>
            </div>
          </div>

          {/* Name Headline */}
          <h1 className="hero-display-name hero-stage-2">
            SMIT PIPALAVA
          </h1>

          {/* Value Proposition Statement */}
          <p className="hero-display-role hero-stage-3">
            &ldquo;I build complete web applications — from polished interfaces to APIs, databases and real-world workflows.&rdquo;
          </p>

          {/* Bio Description */}
          <p className="hero-display-bio hero-stage-4">
            B.Tech in Computer Science &amp; Engineering student at Darshan University with an 8.87 CGPA. Experienced in building full-stack applications with React, Next.js, Node.js, ASP.NET Core, and MongoDB/SQL Server.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions-group hero-stage-5">
            <Magnetic as="a" href="#projects" className="btn-v2 btn-v2-primary" aria-label="View My Work">
              <span>VIEW MY WORK</span>
              <ArrowUpRight size={16} />
            </Magnetic>

            <Magnetic as="a" href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-v2 btn-v2-secondary" aria-label="View GitHub Profile">
              <Github size={15} />
              <span>GITHUB</span>
            </Magnetic>

            <Magnetic as="a" href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" className="btn-v2 btn-v2-ghost" aria-label="Download Resume">
              <FileText size={15} />
              <span>RESUME</span>
            </Magnetic>
          </div>

          {/* Technology Stack Line Beneath Hero */}
          <div className="hero-tech-stack-strip hero-stage-6">
            <span className="tech-stack-label">TECH STACK:</span>
            <div className="tech-stack-badges">
              {TECH_STACK_HERO.map(({ name, category }) => (
                <div key={name} className="hero-tech-badge">
                  <span className="tech-badge-dot" aria-hidden="true" />
                  <span className="tech-badge-name">{name}</span>
                  <span className="tech-badge-cat">{category}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right-Side Technical Profile visual */}
        <div ref={profileCardRef} className="hero-profile-column">
          <div className="developer-profile-card">
            
            {/* Telemetry Header */}
            <div className="profile-telemetry-header">
              <div className="telemetry-live-pill">
                <span className="telemetry-dot" aria-hidden="true" />
                <span>RAJKOT, GUJARAT</span>
              </div>
              <span className="telemetry-academic-score">CGPA 8.87 / 10.0</span>
            </div>

            {/* Profile Frame */}
            <div className="profile-image-viewport">
              <img
                src="/smit-pipalava.png"
                alt="Smit Pipalava — Computer Science Student & Full-Stack Developer"
                className="profile-headshot-img"
              />
              <div className="profile-card-overlay-badge">
                <div className="overlay-badge-name">Smit Pipalava</div>
                <div className="overlay-badge-role">B.Tech CS Student &amp; Full-Stack Developer</div>
              </div>
            </div>

            {/* Architecture Node Flow Dock */}
            <div className="profile-architecture-dock">
              <div className="profile-dock-header">
                <span className="dock-title">
                  <Cpu size={12} /> FULL-STACK ARCHITECTURE
                </span>
                <span className="dock-sub">Verified Codebase</span>
              </div>

              {/* Node Flow */}
              <div className="hero-animated-visual-nodes">
                <div className="visual-node node-client">
                  <Monitor size={14} />
                  <span>React / Next.js SPA</span>
                </div>
                <div className="visual-pulse-arrow" />
                <div className="visual-node node-api">
                  <Server size={14} />
                  <span>Express &amp; ASP.NET API</span>
                </div>
                <div className="visual-pulse-arrow" />
                <div className="visual-node node-db">
                  <Database size={14} />
                  <span>MongoDB &amp; SQL Server</span>
                </div>
              </div>

              {/* Verified Badges */}
              <div className="profile-verified-strip">
                <div className="verified-badge-item">
                  <ShieldCheck size={13} className="verified-check-icon" />
                  <span>Live Vercel Demo (SP Polymers)</span>
                </div>
                <div className="verified-badge-item">
                  <CheckCircle2 size={13} className="verified-check-icon" />
                  <span>Darshan Univ TA</span>
                </div>
                <div className="verified-badge-item">
                  <Sparkles size={13} className="verified-check-icon" />
                  <span>Hackathon Final Round</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
