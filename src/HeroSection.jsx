import React, { useEffect, useRef } from "react";
import {
  ArrowUpRight, FileText, Mail, Terminal, Sparkles, CheckCircle2, ShieldCheck,
  Code2, Database, Server, Monitor, Cpu, Layers, ArrowDown
} from "lucide-react";

function Github({ size = 16, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ size = 16, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const linkedInUrl = "https://www.linkedin.com/in/smit-pipalava-54b063311";
const githubUrl = "https://github.com/SPPATEL91";
const resumeUrl = "/Smit_Pipalava_Resume.pdf";
const email = "smitpipalva91@gmail.com";

const TECH_STACK_HERO = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "SSR / ISR" },
  { name: "Node.js", category: "Runtime" },
  { name: "Express", category: "REST API" },
  { name: "MongoDB", category: "NoSQL DB" },
  { name: "SQL Server", category: "Relational DB" },
];

export function HeroSection({ Magnetic }) {
  const heroRef = useRef(null);
  const profileCardRef = useRef(null);
  const mainContentRef = useRef(null);

  /* Subtle mouse parallax with separated z-planes */
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
        profileCardRef.current.style.transform = `translate(${curX * 4}px, ${curY * 4}px)`;
      }
      if (mainContentRef.current) {
        mainContentRef.current.style.transform = `translate(${curX * 1.5}px, ${curY * 1.5}px)`;
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
      
      {/* Restrained Ambient Radial Glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="container hero-container-v2">
        {/* Main Typographic Column */}
        <div ref={mainContentRef} className="hero-typography-column">
          
          {/* Status Eyebrow */}
          <div className="hero-stage-1">
            <div className="hero-status-pill">
              <span className="status-indicator-dot" aria-hidden="true" />
              <span className="status-indicator-text">FULL-STACK DEVELOPER</span>
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

          {/* Tagline Positioning Statement */}
          <p className="hero-display-role hero-stage-3">
            &ldquo;Building real-world web systems from interface to backend.&rdquo;
          </p>

          {/* Bio Description */}
          <p className="hero-display-bio hero-stage-4">
            B.Tech Computer Science &amp; Engineering student at Darshan University with an 8.87 CGPA. I build complete web applications using React, Next.js, Node.js, .NET and modern databases.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions-group hero-stage-5">
            <Magnetic as="a" href="#projects" className="btn-v2 btn-v2-primary" aria-label="View My Work">
              <span>VIEW MY WORK</span>
              <ArrowUpRight size={16} />
            </Magnetic>

            <Magnetic as="a" href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" className="btn-v2 btn-v2-secondary" aria-label="Download Resume">
              <FileText size={15} />
              <span>DOWNLOAD RESUME</span>
            </Magnetic>

            <Magnetic as="a" href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-v2 btn-v2-ghost" aria-label="View GitHub Profile">
              <Github size={15} />
              <span>GITHUB</span>
            </Magnetic>
          </div>

          {/* Technology Stack Beneath Hero */}
          <div className="hero-tech-stack-strip hero-stage-6">
            <span className="tech-stack-label">TECHNOLOGY STACK:</span>
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

        {/* Right-Side Animated Technical Visual */}
        <div ref={profileCardRef} className="hero-profile-column">
          <div className="developer-profile-card">
            
            {/* Telemetry Header */}
            <div className="profile-telemetry-header">
              <div className="telemetry-live-pill">
                <span className="telemetry-dot" aria-hidden="true" />
                <span>ONLINE · RAJKOT, GUJARAT</span>
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
                <div className="overlay-badge-role">Full-Stack Engineer &amp; DBMS TA</div>
              </div>
            </div>

            {/* Animated Technical Visual Dock */}
            <div className="profile-architecture-dock">
              <div className="profile-dock-header">
                <span className="dock-title">
                  <Cpu size={12} /> SYSTEM CONDUIT ENGINE
                </span>
                <span className="dock-sub">Verified Execution</span>
              </div>

              {/* Animated Interactive Node Flow */}
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
                  <span>Real B2B Production App</span>
                </div>
                <div className="verified-badge-item">
                  <CheckCircle2 size={13} className="verified-check-icon" />
                  <span>Darshan Univ TA</span>
                </div>
                <div className="verified-badge-item">
                  <Sparkles size={13} className="verified-check-icon" />
                  <span>Hackathon Finalist</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
