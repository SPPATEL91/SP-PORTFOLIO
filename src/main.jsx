import React, { useEffect, useRef, useState, useCallback, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import {
  ArrowUpRight, ChevronRight, Code2, ExternalLink, Mail, MapPin,
  Sparkles, Terminal, Check, Copy, X, GraduationCap, Award, BookOpen,
  Layers, Server, Database, Wrench, CheckCircle2, Cpu, Monitor, FileText,
  Zap, Globe, Shield, BarChart2
} from "lucide-react";
import "./styles.css";

function Linkedin({ size = 18, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github({ size = 18, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const linkedInUrl = "https://www.linkedin.com/in/smit-pipalava-54b063311";
const githubUrl = "https://github.com/SPPATEL91";
const resumeUrl = "/Smit_Pipalava_Resume.pdf";
const email = "smitpipalva91@gmail.com";

const navItems = [
  { label: "Work",       id: "projects"     },
  { label: "About",      id: "about"        },
  { label: "Experience", id: "experience"   },
  { label: "Skills",     id: "skills"       },
  { label: "Contact",    id: "contact"      },
];

const projectsData = {
  "request-management": {
    id: "request-management",
    title: "Service Request Management System",
    category: "Full-Stack Enterprise Application",
    previewClass: "requests",
    monogram: "RMS",
    techBadges: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    githubUrl: "https://github.com/SPPATEL91",
    description: "Full-stack service request management platform built with React, Node.js, Express and MongoDB for organizational grievance tracking and workflow resolution.",
    overview: "Built an end-to-end management pipeline featuring user authentication, request submissions, categorization, real-time status tracking, and an administrative resolution dashboard.",
    problem: "Organizations frequently struggle with lost requests, chaotic manual ticketing, and zero accountability when users submit grievances or logistical needs across departments.",
    solution: "Developed a centralized full-stack system with a flexible MongoDB document schema, clear ticket lifecycles (Submitted → Assigned → Under Review → Resolved), role-based dashboards, and granular staff resolution logs.",
    features: [
      "Request management and self-service ticket lodging with category, priority, and file attachments",
      "Role-based dashboards for users, assigned department staff, and administrators",
      "RESTful APIs and CRUD operations with input validation and error handling",
      "Live request status timeline and progress tracking across lifecycle milestones",
      "MongoDB integration for secure, scalable document storage and audit logging",
    ],
    architecture: [
      "React SPA frontend with structured state management and responsive forms",
      "Express.js & Node.js backend following RESTful resource design",
      "MongoDB document database with schemas, validation, and indexed queries",
      "Modular middleware pipeline for request verification and error handling",
    ],
    learnings: [
      "Designing resilient document schemas for stateful request lifecycles",
      "Implementing clean error-handling contracts between React client and Express REST API",
      "Managing realistic user permissions and state synchronization across multiple roles",
    ],
    highlights: [
      "Role-based dashboards for 3 user types",
      "Full ticket lifecycle: Submitted → Assigned → Resolved",
      "RESTful API with complete CRUD operations",
    ],
  },
  "sp-polymers": {
    id: "sp-polymers",
    title: "SP Polymers (Khodal Industries)",
    category: "Industrial Manufacturing Platform",
    previewClass: "polymers",
    monogram: "SP",
    techBadges: ["React", "Next.js", "Node.js", "Responsive UI", "Production SEO"],
    liveUrl: "https://khodal-industries-ma1m-q68gbqe9n-sppatel8.vercel.app/",
    githubUrl: "https://github.com/SPPATEL91/Khodal-Industries-",
    description: "A modern commercial web platform developed for a real plastic raw materials manufacturer — live in production for Khodal Industries.",
    overview: "Created a robust digital presence that translates industrial manufacturing capabilities into an intuitive, elegant web catalog. Focuses on fast load speeds, responsive device adaptations, and clear information hierarchy for commercial buyers.",
    problem: "Industrial manufacturing companies often suffer from outdated or fragmented web presences that fail to communicate product variety, raw material grades, and production capacity to prospective buyers.",
    solution: "Engineered an optimized digital catalog with clean navigational routes, high-contrast typography, fast static delivery, and structured company information that builds immediate buyer trust.",
    features: [
      "Information platform for plastic raw materials and manufacturing processes",
      "Dynamic catalog presentation for plastic polymer raw materials and grades",
      "Fully responsive interface for seamless accessibility across all devices",
      "Integrated animations and interactive UI to improve commercial engagement",
      "Direct inquiry integration for commercial quotes and sample requests",
    ],
    architecture: [
      "Component-driven frontend architecture with React & Next.js",
      "Optimized static asset bundling, responsive styling, and fast delivery",
      "Clean CSS layout systems with fluid typographic scales",
      "Production deployment with zero layout shifts (CLS)",
    ],
    learnings: [
      "Structuring complex industrial product data into intuitive navigation patterns",
      "Balancing high visual polish with lightning-fast initial load times",
      "Designing for B2B credibility and clear conversion actions",
    ],
    highlights: [
      "Live in production for a real business (Khodal Industries)",
      "Full SEO optimization and fast static delivery via Next.js",
      "Responsive across all device sizes",
    ],
  },
  "student-projects": {
    id: "student-projects",
    title: "Student Project Management System",
    category: "Role-Based Academic Governance Platform",
    previewClass: "academic",
    monogram: "SPMS",
    techBadges: ["React", "ASP.NET Core", "SQL Server", "RBAC", "REST APIs"],
    githubUrl: "https://github.com/SPPATEL91/STUDENT-PROJECT-MANAGEMENT-SYSTEM",
    description: "Role-Based Access Control (RBAC) academic governance platform powering Student, Faculty, and Admin portals for university milestone management and grading.",
    overview: "Engineered an academic governance system that replaces messy email submissions and manual spreadsheets with structured milestone submissions, faculty reviews, grading rubrics, and admin controls.",
    problem: "Universities require strict separation of concerns: students need to form teams and submit project milestones; faculty mentors need to review and score deliverables; administrators need macro oversight.",
    solution: "Created a robust multi-portal solution powered by ASP.NET Core backend services, SQL Server relational models, and a responsive React UI, enforced with rigorous Role-Based Access Control.",
    features: [
      "Three distinct dedicated portals: Student Workspace, Faculty Evaluation Hub, and Admin Command Center",
      "Role-Based Access Control (RBAC) preventing unauthorized endpoint access",
      "Milestone tracking: Proposal approval, mid-term progress, code review, and final presentation",
      "Faculty grading interface with remarks, revision requests, and timestamped reviews",
      "SQL Server database backing with relational integrity, normalized entities, and audit history",
    ],
    architecture: [
      "React component library tailored with distinct portal dashboards",
      "ASP.NET Core Web API with secure controller authorization filters",
      "Microsoft SQL Server database with transactional integrity and stored procedures",
      "Token-based authentication and Claims-based Role authorization",
    ],
    learnings: [
      "Mastering Role-Based Access Control (RBAC) architecture across backend and frontend",
      "Developing typed enterprise APIs using ASP.NET Core conventions",
      "Managing complex multi-table relationships and academic lifecycle constraints in SQL Server",
    ],
    highlights: [
      "3-portal RBAC system: Student, Faculty, Admin",
      "ASP.NET Core Web API + SQL Server relational backend",
      "Structured milestone evaluation workflow",
    ],
  },
};

const timelineData = [
  {
    role: "DBMS Teaching Assistant",
    target: "Diploma Semester 2 Students",
    institution: "Darshan University",
    duration: "Full Semester Engagement",
    description: "Conducted practical laboratory sessions, guided students through relational database concepts, ER diagrams, schema normalization, and practical SQL queries on real database instances.",
    takeaways: [
      "Led regular weekly lab sessions for foundational computer science students",
      "Explained complex relational concepts: Primary/Foreign keys, Joins, Aggregations, and Constraints",
      "Developed high confidence in public speaking and articulating technical debugging steps",
    ],
  },
  {
    role: "Office Automation Tools Teaching Assistant",
    target: "B.Tech Semester 4 Students",
    institution: "Darshan University",
    duration: "Full Semester Engagement",
    description: "Delivered hands-on practical demonstrations of office automation systems, productivity suites, and software workflows, helping engineering peers master practical software applications.",
    takeaways: [
      "Conducted software demonstrations and practical workflows for undergraduate engineers",
      "Assisted students with hands-on exercises, assignments, and problem-solving",
      "Strengthened pedagogical clarity: learning to break complex workflows into digestible steps",
    ],
  },
];

const coreSkills = [
  { name: "React", desc: "Component architecture, hooks, state management & SPA development", icon: Monitor },
  { name: "Node.js + Express", desc: "Event-driven runtime, RESTful APIs, middleware & backend services", icon: Server },
  { name: "MongoDB", desc: "NoSQL document modeling, aggregation pipelines & scalable schemas", icon: Database },
  { name: "ASP.NET Core", desc: "Enterprise Web APIs, C# dependency injection & authorization", icon: Server },
  { name: "SQL Server / MySQL", desc: "Relational schemas, normalization, joins & stored procedures", icon: Database },
  { name: "JavaScript (ES6+)", desc: "Async/await, closures, DOM manipulation & modern web APIs", icon: Code2 },
];

const familiarSkills = [
  "Next.js", "NestJS", "Python", "Java", "C", "PostgreSQL", "HTML5", "CSS3",
  "Git & GitHub", "Postman", "REST APIs", "DSA", "DBMS", "OOP", "VS Code",
];

/* ── HOOKS ── */
function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRm(q.matches);
    const u = () => setRm(q.matches);
    q.addEventListener("change", u);
    return () => q.removeEventListener("change", u);
  }, []);
  return rm;
}

function useFinePointer() {
  const [fp, setFp] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(pointer: fine) and (hover: hover)");
    setFp(q.matches);
    const u = () => setFp(q.matches);
    q.addEventListener("change", u);
    return () => q.removeEventListener("change", u);
  }, []);
  return fp;
}

/* ── CUSTOM CURSOR ── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const fp = useFinePointer();
  const rm = useReducedMotion();

  useEffect(() => {
    if (!fp || rm) return undefined;
    let curX = window.innerWidth / 2, curY = window.innerHeight / 2;
    let ringX = curX, ringY = curY, tX = curX, tY = curY, rafId = null;
    const move = (e) => {
      tX = e.clientX; tY = e.clientY;
      const t = e.target;
      const isInt = t?.closest?.("a, button, .btn-case-study, .building-chip, .familiar-pill, .stack-pill");
      const isPrj = t?.closest?.(".project-editorial, .project-visual-zone");
      document.body.classList.toggle("cursor-hover", Boolean(isInt && !isPrj));
      document.body.classList.toggle("cursor-project", Boolean(isPrj));
    };
    const leave = () => { if (dotRef.current) dotRef.current.style.opacity = "0"; if (ringRef.current) ringRef.current.style.opacity = "0"; };
    const enter = () => { if (dotRef.current) dotRef.current.style.opacity = "1"; if (ringRef.current) ringRef.current.style.opacity = "1"; };
    const render = () => {
      curX += (tX - curX) * 0.55; curY += (tY - curY) * 0.55;
      ringX += (tX - ringX) * 0.18; ringY += (tY - ringY) * 0.18;
      if (dotRef.current) { dotRef.current.style.setProperty("--cursor-x", `${curX}px`); dotRef.current.style.setProperty("--cursor-y", `${curY}px`); }
      if (ringRef.current) { ringRef.current.style.setProperty("--cursor-x", `${ringX}px`); ringRef.current.style.setProperty("--cursor-y", `${ringY}px`); }
      rafId = requestAnimationFrame(render);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    rafId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove("cursor-hover", "cursor-project");
    };
  }, [fp, rm]);

  if (!fp || rm) return null;
  return (
    <>
      <div className="custom-cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="custom-cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="custom-cursor-text">VIEW</span>
      </div>
    </>
  );
}

/* ── MAGNETIC ── */
function Magnetic({ as: C = "a", className = "", children, strength = 0.2, ...props }) {
  const ref = useRef(null);
  const fp = useFinePointer();
  const rm = useReducedMotion();
  const move = (e) => {
    if (!fp || rm || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.setProperty("--magnet-x", `${dx}px`);
    ref.current.style.setProperty("--magnet-y", `${dy}px`);
  };
  const leave = () => { if (ref.current) { ref.current.style.setProperty("--magnet-x", "0px"); ref.current.style.setProperty("--magnet-y", "0px"); } };
  return <C ref={ref} className={`magnetic ${className}`.trim()} onMouseMove={move} onMouseLeave={leave} {...props}>{children}</C>;
}

/* ── REVEAL ── */
const Reveal = React.forwardRef(function Reveal({ as: C = "div", className = "", children, ...props }, fRef) {
  const localRef = useRef(null);
  const rm = useReducedMotion();
  useEffect(() => {
    const el = localRef.current;
    if (!el) return undefined;
    if (rm) { el.classList.add("is-visible"); return undefined; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [rm]);
  const setRef = (n) => { localRef.current = n; if (typeof fRef === "function") fRef(n); else if (fRef) fRef.current = n; };
  return <C ref={setRef} className={`reveal ${className}`.trim()} {...props}>{children}</C>;
});

/* ── PROJECT MODAL ── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const kd = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", kd);
    return () => { document.body.style.overflow = orig; window.removeEventListener("keydown", kd); };
  }, [project, onClose]);
  if (!project) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <div className="modal-cat-tag">{project.category}</div>
            <h3 id="modal-title" className="modal-hero-title">{project.title}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal"><X size={16} /></button>
        </div>
        <div className="modal-scroll-area">
          <div className="modal-section-block"><h4>01 // System Overview</h4><p>{project.overview}</p></div>
          <div className="modal-section-block"><h4>02 // The Problem</h4><p>{project.problem}</p></div>
          <div className="modal-section-block"><h4>03 // Engineering Solution</h4><p>{project.solution}</p></div>
          <div className="modal-section-block">
            <h4>04 // Core Features</h4>
            <ul className="modal-feature-list">
              {project.features.map((f) => <li key={f} className="modal-feature-item"><CheckCircle2 size={14} /><span>{f}</span></li>)}
            </ul>
          </div>
          <div className="modal-section-block">
            <h4>05 // Architecture</h4>
            <ul className="modal-feature-list">
              {project.architecture.map((a) => <li key={a} className="modal-feature-item"><Layers size={14} /><span>{a}</span></li>)}
            </ul>
          </div>
          <div className="modal-section-block">
            <h4>06 // Engineering Learnings</h4>
            <ul className="modal-feature-list">
              {project.learnings.map((l) => <li key={l} className="modal-feature-item"><Sparkles size={14} /><span>{l}</span></li>)}
            </ul>
          </div>
          {(project.liveUrl || project.githubUrl) && (
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {project.liveUrl && <Magnetic as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-live-link">Live Site <ArrowUpRight size={14} /></Magnetic>}
              {project.githubUrl && <Magnetic as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-github-link"><Github size={14} /> GitHub</Magnetic>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── HEADER ── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 24);
    s();
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <nav className="navbar" aria-label="Main Navigation">
            <Magnetic as="a" href="#projects" className="brand" aria-label="Smit Pipalava — Home">
              <span className="brand-badge">SP</span>
              <span className="brand-name">Smit Pipalava</span>
            </Magnetic>

            <div className="nav-links-desktop">
              {navItems.map(({ label, id }) => (
                <a key={id} href={`#${id}`} className={`nav-link${active === id ? " active" : ""}`}>{label}</a>
              ))}
            </div>

            <div className="nav-right">
              <Magnetic as="a" href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" className="btn-nav-resume" aria-label="Download Resume">
                <FileText size={13} /> Resume
              </Magnetic>
              <button type="button" className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
                {mobileOpen ? <X size={20} /> : <Terminal size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className={`mobile-drawer${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
        {navItems.map(({ label, id }) => (
          <a key={id} href={`#${id}`} className={`mobile-nav-link${active === id ? " active" : ""}`} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" className="mobile-resume-btn">
          <FileText size={16} /> Download Resume
        </a>
      </div>
    </>
  );
}

/* ── APP ── */
export function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const rm = useReducedMotion();

  const selectedProject = selectedId ? projectsData[selectedId] : null;

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 1.5 });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  /* Preloader */
  useEffect(() => {
    const t = setTimeout(() => setPreloaderDone(true), 850);
    return () => clearTimeout(t);
  }, []);

  /* Copy email */
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <CustomCursor />

      {/* Preloader */}
      <div className={`preloader${preloaderDone ? " preloader-done" : ""}`} aria-hidden="true">
        <div className="preloader-box">
          <div className="preloader-badge"><span /> LOADING</div>
          <div className="preloader-title">Smit Pipalava</div>
          <div className="preloader-progress-bar"><div className="preloader-progress-fill" /></div>
        </div>
      </div>

      <Header />

      <main id="main-content">

        {/* ═══════════════════════════════ 1. HERO ═══════════════════════════════ */}
        <section id="home" className="section hero" aria-label="Hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <Terminal size={12} />
                B.Tech Computer Engineering · Darshan University
              </div>

              <p className="hero-statement">I build software that solves real problems.</p>

              <h1 className="hero-name">
                Smit <span className="gradient-name">Pipalava</span>
              </h1>

              <p className="hero-role">
                Computer Science Student &amp; <span className="accent-text">Full-Stack Developer</span>
              </p>

              <p className="hero-bio">
                Computer Science student building practical full-stack web applications across React, Node.js, ASP.NET Core and modern databases.
              </p>

              <div className="hero-actions">
                <Magnetic as="a" href="#projects" className="btn btn-primary" aria-label="View my work">
                  View My Work <ArrowUpRight size={16} />
                </Magnetic>
                <Magnetic as="a" href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" className="btn btn-secondary" aria-label="Download Resume">
                  <FileText size={16} /> Download Resume
                </Magnetic>
              </div>

              <div className="hero-secondary-links">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hero-secondary-link" aria-label="GitHub profile">
                  <Github size={15} /> GitHub <ArrowUpRight size={13} />
                </a>
                <span className="hero-divider" aria-hidden="true" />
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="hero-secondary-link" aria-label="LinkedIn profile">
                  <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
                </a>
                <span className="hero-divider" aria-hidden="true" />
                <a href={`mailto:${email}`} className="hero-secondary-link" aria-label="Email Smit Pipalava">
                  <Mail size={15} /> Email
                </a>
              </div>
            </div>

            {/* Hero Stack Card */}
            <div className="hero-stack-card" aria-label="Current technology stack">
              <div className="stack-card-top">
                <span className="stack-card-label">Current Stack</span>
                <span className="stack-live-pill">
                  <span className="stack-live-dot" aria-hidden="true" /> Active
                </span>
              </div>

              <div className="stack-layers">
                <div className="stack-layer-row">
                  <span className="stack-layer-key">Frontend</span>
                  <div className="stack-pills">
                    {["React", "Next.js", "JavaScript", "HTML5", "CSS3"].map((t) => (
                      <span key={t} className="stack-pill"><span className="stack-pill-dot" />{t}</span>
                    ))}
                  </div>
                </div>

                <div className="stack-sep" />

                <div className="stack-layer-row">
                  <span className="stack-layer-key">Backend</span>
                  <div className="stack-pills">
                    {["Node.js", "Express.js", "ASP.NET Core", "REST APIs"].map((t) => (
                      <span key={t} className="stack-pill"><span className="stack-pill-dot" />{t}</span>
                    ))}
                  </div>
                </div>

                <div className="stack-sep" />

                <div className="stack-layer-row">
                  <span className="stack-layer-key">Database</span>
                  <div className="stack-pills">
                    {["MongoDB", "SQL Server", "MySQL", "PostgreSQL"].map((t) => (
                      <span key={t} className="stack-pill"><span className="stack-pill-dot" />{t}</span>
                    ))}
                  </div>
                </div>

                <div className="stack-sep" />

                <div className="stack-layer-row">
                  <span className="stack-layer-key">Tools</span>
                  <div className="stack-pills">
                    {["Git", "GitHub", "Postman", "VS Code"].map((t) => (
                      <span key={t} className="stack-pill"><span className="stack-pill-dot" />{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="stack-card-footer">
                <span className="stack-footer-key">Focus</span>
                <span className="stack-footer-val">Full-Stack Engineering</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════ 2. CREDIBILITY ═══════════════════════════════ */}
        <div className="credibility-strip" aria-label="Key metrics">
          <div className="container">
            <div className="credibility-grid">
              <div className="cred-item">
                <span className="cred-number">8.87</span>
                <span className="cred-label">CGPA (out of 10)</span>
              </div>
              <div className="cred-item">
                <span className="cred-number">3+</span>
                <span className="cred-label">Projects Built</span>
              </div>
              <div className="cred-item">
                <span className="cred-number">2</span>
                <span className="cred-label">Teaching Assistant Roles</span>
              </div>
              <div className="cred-item">
                <span className="cred-number">Top</span>
                <span className="cred-label">Hackathon Finalist</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════ 3. WHAT I BUILD ═══════════════════════════════ */}
        <section className="section" aria-labelledby="build-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><Zap size={12} /> Capabilities</span>
              <h2 id="build-heading" className="section-title">What I Build</h2>
              <p className="section-subtitle">Practical software engineered from frontend to database, built to solve real problems.</p>
            </Reveal>

            <div className="build-grid">
              {[
                { icon: Globe, title: "Full-Stack Applications", desc: "End-to-end web applications connecting responsive React frontends to Node.js/Express backends with real database integration.", tags: ["React", "Node.js", "Express", "MongoDB"] },
                { icon: Monitor, title: "Business Platforms", desc: "Commercial and industrial web platforms with clear information hierarchy, product catalogs, and conversion-focused UX.", tags: ["Next.js", "SEO", "Responsive UI"] },
                { icon: Server, title: "Backend Systems", desc: "RESTful API design, authentication flows, CRUD operations, business logic layers and middleware pipelines.", tags: ["REST APIs", "Auth", "ASP.NET Core"] },
                { icon: Database, title: "Data-Driven Systems", desc: "Role-based data architectures using MongoDB document modeling and SQL Server relational schemas for complex workflows.", tags: ["MongoDB", "SQL Server", "RBAC"] },
              ].map(({ icon: Icon, title, desc, tags }) => (
                <Reveal key={title} className="build-card">
                  <div className="build-icon"><Icon size={20} /></div>
                  <h3 className="build-title">{title}</h3>
                  <p className="build-desc">{desc}</p>
                  <div className="build-tags">{tags.map((t) => <span key={t} className="build-tag">{t}</span>)}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════ 4. SELECTED WORK ═══════════════════════════════ */}
        <section id="projects" className="section section-alt" aria-labelledby="work-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><Layers size={12} /> Selected Work</span>
              <h2 id="work-heading" className="section-title">Selected Work</h2>
              <p className="section-subtitle">Projects where I turned ideas and real requirements into working software.</p>
            </Reveal>

            <div className="projects-list">
              {Object.values(projectsData).map((proj, i) => (
                <Reveal key={proj.id} className={`project-editorial${i % 2 === 1 ? " reverse" : ""}`}>
                  <div className={`project-visual-zone ${proj.previewClass}`} aria-hidden="true">
                    <span className="project-visual-monogram">{proj.monogram}</span>
                  </div>
                  <div className="project-info">
                    <span className="project-num">0{i + 1}</span>
                    <span className="project-cat">{proj.category}</span>
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.description}</p>
                    <div className="project-highlights">
                      {proj.highlights.map((h) => <p key={h} className="proj-hi">{h}</p>)}
                    </div>
                    <div className="project-tech-row">
                      {proj.techBadges.map((b) => <span key={b} className="tech-badge">{b}</span>)}
                    </div>
                    <div className="project-actions">
                      <button type="button" className="btn-case-study" onClick={() => setSelectedId(proj.id)} aria-label={`View case study for ${proj.title}`}>
                        Case Study <ChevronRight size={14} />
                      </button>
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-live-link" aria-label={`Live site for ${proj.title}`}>
                          Live Site <ArrowUpRight size={14} />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-github-link" aria-label={`GitHub for ${proj.title}`}>
                          <Github size={13} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════ 5. ENGINEERING HIGHLIGHTS ═══════════════════════════════ */}
        <section className="section" aria-labelledby="eng-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><Shield size={12} /> Engineering</span>
              <h2 id="eng-heading" className="section-title">Engineering Highlights</h2>
              <p className="section-subtitle">Core engineering patterns applied across all three projects.</p>
            </Reveal>

            <div className="highlights-grid">
              {[
                { icon: Server, title: "API Design", desc: "RESTful APIs following resource-based design: structured endpoints, proper HTTP methods, input validation, and consistent error contracts." },
                { icon: Database, title: "Database Architecture", desc: "Experience with both MongoDB document modeling for flexible schemas and SQL Server relational design for normalized, integrity-constrained data." },
                { icon: Shield, title: "Role-Based Systems", desc: "Building multi-portal platforms where different user types (Student, Faculty, Admin — or User, Staff, Admin) access appropriate data and actions." },
                { icon: Layers, title: "Full-Stack Development", desc: "Working across React frontends, Node.js/ASP.NET Core backends, and database layers — understanding the entire request lifecycle end-to-end." },
              ].map(({ icon: Icon, title, desc }) => (
                <Reveal key={title} className="highlight-item">
                  <div className="highlight-icon"><Icon size={22} /></div>
                  <h3 className="highlight-title">{title}</h3>
                  <p className="highlight-desc">{desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════ 6. ABOUT & EDUCATION ═══════════════════════════════ */}
        <section id="about" className="section section-alt" aria-labelledby="about-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><BookOpen size={12} /> Profile</span>
              <h2 id="about-heading" className="section-title">About Me</h2>
            </Reveal>

            <div className="about-grid">
              <Reveal className="about-text">
                <p>
                  I am a B.Tech Computer Engineering undergraduate at Darshan University, driven by a passion for full-stack engineering, clean database models, and practical web architectures that solve actual problems.
                </p>
                <p>
                  I focus on writing dependable code whether that involves industrial product catalogs live for a real business, administrative grievance workflows, or multi-tenant role-based academic governance platforms.
                </p>
                <p>
                  Alongside software development, I served as a Teaching Assistant for both DBMS and Office Automation Tools — teaching relational database concepts and software workflows to diploma and undergraduate engineering students.
                </p>
                <div className="about-highlight-box">
                  <Terminal size={18} />
                  <p>
                    <strong>Teaching Philosophy:</strong> Explaining complex database and software concepts to other students fundamentally shaped how I architect and document software. Clear communication and clean architecture go together.
                  </p>
                </div>
              </Reveal>

              <Reveal className="education-card">
                <span className="section-eyebrow"><GraduationCap size={12} /> Education</span>
                <h3 style={{ marginTop: "0.5rem" }} className="education-degree">Darshan University</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0" }}>B.Tech in Computer Engineering</p>
                <dl className="education-meta-list">
                  <div className="meta-row"><dt>Duration</dt><dd>2024 – Present</dd></div>
                  <div className="meta-row"><dt>CGPA</dt><dd className="highlight-grade">8.87 / 10.0</dd></div>
                  <div className="meta-row"><dt>Focus</dt><dd>Full-Stack &amp; DBMS</dd></div>
                  <div className="meta-row"><dt>Location</dt><dd>Rajkot, Gujarat</dd></div>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════ 7. SKILLS ═══════════════════════════════ */}
        <section id="skills" className="section" aria-labelledby="skills-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><Cpu size={12} /> Technical Stack</span>
              <h2 id="skills-heading" className="section-title">Skills</h2>
              <p className="section-subtitle">Technologies I work with daily, organized by depth of experience.</p>
            </Reveal>

            <div className="skills-two-tier">
              <div>
                <div className="tier-heading">Core Stack</div>
                <div className="core-stack-grid">
                  {coreSkills.map(({ name, desc, icon: Icon }) => (
                    <Reveal key={name} className="core-skill-card">
                      <div className="skill-icon-wrap"><Icon size={18} /></div>
                      <div>
                        <div className="core-skill-name">{name}</div>
                        <div className="core-skill-desc">{desc}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div>
                <div className="tier-heading">Also Familiar With</div>
                <div className="familiar-pills">
                  {familiarSkills.map((s) => <span key={s} className="familiar-pill">{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════ 8. EXPERIENCE ═══════════════════════════════ */}
        <section id="experience" className="section section-alt" aria-labelledby="exp-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><Terminal size={12} /> Leadership &amp; Pedagogy</span>
              <h2 id="exp-heading" className="section-title">Experience &amp; Leadership</h2>
              <p className="section-subtitle">Academic mentorship and practical lab instruction that reinforced database fundamentals and software communication.</p>
            </Reveal>

            <div className="exp-cards-grid">
              {timelineData.map((item) => (
                <Reveal key={item.role} className="exp-card">
                  <h3 className="exp-role">{item.role}</h3>
                  <div className="exp-org">{item.institution} · {item.target}</div>
                  <div className="exp-period">{item.duration}</div>
                  <p className="exp-desc">{item.description}</p>
                  <div className="exp-takeaways">
                    {item.takeaways.map((t) => (
                      <div key={t} className="exp-takeaway">{t}</div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="exp-quote-block">
              <Sparkles size={24} />
              <blockquote>
                &ldquo;Teaching relational database management and office automation tools to fellow students taught me that true mastery is being able to explain complex system architecture with complete clarity.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════ 9. ACHIEVEMENTS ═══════════════════════════════ */}
        <section className="section" aria-labelledby="achieve-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><Award size={12} /> Milestone</span>
              <h2 id="achieve-heading" className="section-title">Achievements</h2>
              <p className="section-subtitle">Competitive hackathon finalist journey, rapid prototyping, and end-to-end full-stack defense.</p>
            </Reveal>

            <Reveal className="hackathon-card">
              <div className="hackathon-header">
                <span className="hackathon-badge-pill">Darshan University Hackathon</span>
                <span className="hackathon-participants"><Award size={15} /> ~200–300 Competing Students</span>
              </div>
              <h3 className="hackathon-title">Grand Finalist — Advanced Through 3 Evaluation Stages</h3>

              <div className="stages-grid">
                <div className="stage-box">
                  <div className="stage-num-label">Stage 01 // Screening</div>
                  <div className="stage-title">Problem Ideation &amp; Feasibility</div>
                  <p className="stage-desc">Comprehensive problem definition, architectural planning, and proposal defense against university evaluation criteria.</p>
                </div>

                <div className="stage-box">
                  <div className="stage-num-label">Stage 02 // Prototyping</div>
                  <div className="stage-title">Rapid Sprint &amp; MVP Build</div>
                  <p className="stage-desc">High-intensity sprint implementing functional REST endpoints, schemas, and responsive user flows within time limits.</p>
                </div>

                <div className="stage-box stage-final">
                  <div className="stage-num-label green">Stage 03 // Final Round</div>
                  <div className="stage-title">Grand Finalist Defense</div>
                  <p className="stage-desc">Demonstrated working software live before faculty evaluators and judging panel, proving practical utility and robust execution.</p>
                </div>
              </div>

              <div className="project-tech-row" style={{ marginBottom: 0 }}>
                {["Agile Sprints", "Rapid Prototyping", "Live System Defense", "Under-Pressure Delivery"].map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════ 10. CURRENTLY BUILDING ═══════════════════════════════ */}
        <section className="section section-alt" aria-labelledby="building-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><Zap size={12} /> Current Focus</span>
              <h2 id="building-heading" className="section-title">Currently Building</h2>
              <p className="section-subtitle">Areas of deep technical practice I am actively developing every day.</p>
            </Reveal>

            <Reveal className="building-row">
              {[
                "Full-Stack Web Engineering",
                "Backend Architecture & Microservices",
                "RESTful API Design & Validation",
                "Database Modeling (MongoDB & SQL Server)",
                "Data Structures & Algorithms (DSA)",
                "Component Systems & Performance"
              ].map((area) => (
                <div key={area} className="building-chip">
                  <span className="building-dot" aria-hidden="true" />
                  <span>{area}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════ 11. HOW I BUILD ═══════════════════════════════ */}
        <section className="section" aria-labelledby="process-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow"><Layers size={12} /> Engineering Philosophy</span>
              <h2 id="process-heading" className="section-title">How I Build</h2>
              <p className="section-subtitle">I focus on understanding the problem first, designing practical data and API flows, then building maintainable solutions.</p>
            </Reveal>

            <Reveal className="process-track">
              {[
                { step: "01", label: "Understand", sub: "Analyze requirements & user friction" },
                { step: "02", label: "Design", sub: "Data models, schemas & API contracts" },
                { step: "03", label: "Build", sub: "Clean frontend & resilient backend code" },
                { step: "04", label: "Test", sub: "CRUD operations, edge cases & validation" },
                { step: "05", label: "Ship", sub: "Production deploy, responsive QA & SEO" },
              ].map(({ step, label, sub }) => (
                <div key={step} className="process-step">
                  <div className="process-node">{step}</div>
                  <div className="process-label">{label}</div>
                  <div className="process-sub">{sub}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════ 12. CONTACT ═══════════════════════════════ */}
        <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div className="contact-grid-bg" aria-hidden="true" />
          <div className="container">
            <div className="contact-inner">
              <div className="contact-eyebrow">
                <Mail size={12} /> Available for Opportunities
              </div>
              <h2 id="contact-heading" className="contact-headline">
                Have a problem worth building?<br />Let&apos;s build something useful.
              </h2>
              <p className="contact-sub">
                Open to full-stack engineering roles, internships, and technical collaborations.
              </p>

              <div className="contact-actions">
                <a href={`mailto:${email}`} className="btn-contact-primary" aria-label="Send email to Smit Pipalava">
                  <Mail size={16} /> Email Me
                </a>
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="btn-contact-secondary" aria-label="LinkedIn profile">
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
                </a>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-contact-secondary" aria-label="GitHub profile">
                  <Github size={16} /> GitHub <ArrowUpRight size={14} />
                </a>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" className="btn-contact-secondary" aria-label="Download Resume">
                  <FileText size={16} /> Resume
                </a>
              </div>

              <div className="contact-meta">
                <span>Rajkot, Gujarat, India</span>
                <span aria-hidden="true">·</span>
                <a href={`mailto:${email}`}>{email}</a>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  style={{ color: "rgba(248,250,252,0.6)", fontSize: "0.8125rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy Email</>}
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ═══════════════════════════════ 13. FOOTER ═══════════════════════════════ */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-brand-name">Smit Pipalava</div>
            <div className="footer-brand-sub">Computer Science Student · Full-Stack Developer</div>
          </div>

          <div className="footer-links">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={14} /> GitHub</a>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={14} /> LinkedIn</a>
            <a href={`mailto:${email}`} aria-label="Email"><Mail size={14} /> Email</a>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" aria-label="Resume"><FileText size={14} /> Resume</a>
          </div>

          <div className="footer-copy">
            &copy; 2026 Smit Pipalava
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedId(null)} />
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
