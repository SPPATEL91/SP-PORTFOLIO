import React, { useEffect, useRef, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import {
  ArrowUpRight, ChevronRight, Code2, ExternalLink, Mail, MapPin,
  Sparkles, Terminal, Check, Copy, X, GraduationCap, Award, BookOpen,
  Layers, Server, Database, Wrench, CheckCircle2, Cpu, Monitor, FileText,
  Zap, Globe, Shield, BarChart2
} from "lucide-react";

import "./styles.css";
import { PixelGridBackground } from "./PixelGridBackground";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { OrbitalProjects } from "./OrbitalProjects";
import { InteractiveSkills } from "./InteractiveSkills";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { HackathonFinalist } from "./HackathonFinalist";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { DeveloperTerminal } from "./DeveloperTerminal";
import { CommandPalette } from "./CommandPalette";

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

const projectsData = {
  "sp-polymers": {
    id: "sp-polymers",
    title: "SP Polymers (Khodal Industries)",
    category: "FLAGSHIP B2B PLATFORM",
    monogram: "SP",
    techBadges: ["React", "Next.js", "Node.js", "Responsive UI", "Production SEO"],
    liveUrl: "https://khodal-industries-ma1m-q68gbqe9n-sppatel8.vercel.app/",
    githubUrl: "https://github.com/SPPATEL91/Khodal-Industries-",
    description: "Industrial B2B web platform developed for a real plastic raw materials manufacturer — live in active production for Khodal Industries.",
    archNodes: [
      { tier: "01 // UI Layer", name: "Next.js / React", role: "Product Catalog", details: "Dynamic industrial material grade browser, specs filter, and quotation inquiry forms." },
      { tier: "02 // Engine", name: "Node.js Runtime", role: "Asset Optimization", details: "Static generation (ISR) ensuring sub-second initial paint and zero Cumulative Layout Shift (CLS)." },
      { tier: "03 // Marketing", name: "Production SEO", role: "Semantic Discovery", details: "JSON-LD structured data, open-graph protocols, and canonical metadata for commercial buyers." },
      { tier: "04 // Edge", name: "Vercel Cloud CDN", role: "Global Delivery", details: "Worldwide edge caching powering 100% production uptime for Khodal Industries." },
    ],
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
  },
  "request-management": {
    id: "request-management",
    title: "Service Request Management System",
    category: "FULL-STACK ENTERPRISE",
    monogram: "RMS",
    techBadges: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    githubUrl: "https://github.com/SPPATEL91",
    description: "Full-stack service request management platform built with React, Node.js, Express and MongoDB for organizational grievance tracking and workflow resolution.",
    archNodes: [
      { tier: "01 // Client", name: "React SPA", role: "Role-Based UI", details: "Stateful forms, ticket status tracker, and granular views for User, Staff, and Admin." },
      { tier: "02 // Gateway", name: "Express REST API", role: "Routing & Auth", details: "Stateless controllers enforcing CRUD validation, payload security, and JWT verification." },
      { tier: "03 // Runtime", name: "Node.js Engine", role: "Lifecycle Engine", details: "State transition management (Submitted → Assigned → Review → Resolved) with staff resolution logs." },
      { tier: "04 // Database", name: "MongoDB Store", role: "Document Schemas", details: "Flexible NoSQL document schemas, indexed lookup queries, and audit logging." },
    ],
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
  },
  "student-projects": {
    id: "student-projects",
    title: "Student Project Management System",
    category: "ACADEMIC GOVERNANCE",
    monogram: "SPMS",
    techBadges: ["React", "ASP.NET Core", "SQL Server", "RBAC", "REST APIs"],
    githubUrl: "https://github.com/SPPATEL91/STUDENT-PROJECT-MANAGEMENT-SYSTEM",
    description: "Role-Based Access Control (RBAC) academic governance platform powering Student, Faculty, and Admin portals for university milestone management and grading.",
    archNodes: [
      { tier: "01 // Portals", name: "React Multi-Portal", role: "3 Discrete Interfaces", details: "Dedicated isolated workflows: Student Team Workspace, Faculty Evaluation Hub, and Admin Command Center." },
      { tier: "02 // API Layer", name: "ASP.NET Core Web API", role: "Typed Endpoints", details: "C# backend controllers, dependency injection, and claims-based authorization filters." },
      { tier: "03 // Governance", name: "RBAC Engine", role: "Milestone Lifecycle", details: "Strict permission validation across proposal approvals, mid-term grading, and code review rubrics." },
      { tier: "04 // Relational", name: "SQL Server DB", role: "ACID Normalized DB", details: "Normalized 3NF schema, transactional stored procedures, referential integrity, and evaluation logs." },
    ],
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
  },
};

/* Magnetic Hook */
function Magnetic({ as: C = "a", className = "", children, strength = 0.2, ...props }) {
  const ref = useRef(null);
  const move = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };
  return (
    <C ref={ref} className={className} onMouseMove={move} onMouseLeave={leave} {...props}>
      {children}
    </C>
  );
}

/* Detailed Project Modal */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const kd = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", kd);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", kd);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay-v2"
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-container-v2">
        <div className="modal-header-v2">
          <div>
            <div className="modal-tag-v2">{project.category}</div>
            <h3 className="modal-title-v2">{project.title}</h3>
          </div>
          <button type="button" className="modal-close-v2" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-scroll-body-v2">
          <div className="modal-block-v2">
            <h4>01 // System Architecture Pipeline</h4>
            <ArchitectureFlow nodes={project.archNodes} projectName={project.title} />
          </div>

          <div className="modal-block-v2">
            <h4>02 // System Overview</h4>
            <p>{project.overview}</p>
          </div>

          <div className="modal-block-v2">
            <h4>03 // Problem Statement</h4>
            <p>{project.problem}</p>
          </div>

          <div className="modal-block-v2">
            <h4>04 // Engineering Solution</h4>
            <p>{project.solution}</p>
          </div>

          <div className="modal-block-v2">
            <h4>05 // Core Features</h4>
            <ul className="modal-list-v2">
              {project.features.map((f) => (
                <li key={f} className="modal-list-item-v2">
                  <CheckCircle2 size={14} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="modal-actions-v2">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-v2 btn-v2-primary">
                  <span>Open Live Production Site</span>
                  <ArrowUpRight size={15} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-v2 btn-v2-secondary">
                  <Github size={15} />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");

  const selectedProject = selectedProjectId ? projectsData[selectedProjectId] : null;

  /* Scroll Progress */
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Active Section Observer */
  useEffect(() => {
    const sectionIds = ["about", "projects", "experience", "skills", "education", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0.05 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K) */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* Lenis Smooth Scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-navigation-link">Skip to main content</a>

      {/* Signature High-Performance Interactive Pixel Grid Canvas */}
      <PixelGridBackground />

      {/* Sticky Floating Navbar */}
      <Navbar
        scrollProgress={scrollProgress}
        onOpenCmd={() => setIsCmdOpen(true)}
        activeSection={activeSection}
        onSelectSection={(id) => setActiveSection(id)}
        Magnetic={Magnetic}
      />

      <main id="main-content">

        {/* 1. HERO SECTION */}
        <HeroSection Magnetic={Magnetic} />

        {/* 2. CORE DISCIPLINES (WHAT I BUILD) */}
        <section className="section-v2 section-alt-v2" aria-labelledby="capabilities-heading">
          <div className="container">
            <div className="section-header-v2">
              <span className="section-eyebrow-v2"><Zap size={12} /> CORE DISCIPLINES</span>
              <h2 id="capabilities-heading" className="section-title-v2">What I Build</h2>
              <p className="section-subtitle-v2">
                Practical full-stack software engineered from reactive client states to normalized transactional schemas.
              </p>
            </div>

            <div className="skills-category-grid">
              {[
                {
                  icon: Globe,
                  title: "Full-Stack Web Applications",
                  desc: "End-to-end architectures uniting responsive React frontends with Node.js/Express REST APIs and MongoDB document stores.",
                  tags: ["React", "Node.js", "Express", "MongoDB"],
                },
                {
                  icon: Monitor,
                  title: "Commercial & Business Platforms",
                  desc: "Fast commercial portals with optimized catalog discovery, high B2B credibility, and live production deployment.",
                  tags: ["Next.js", "Production SEO", "Static ISR"],
                },
                {
                  icon: Server,
                  title: "Enterprise Backend Systems",
                  desc: "RESTful API design, input sanitization, controller authorization filters, and middleware pipelines.",
                  tags: ["ASP.NET Core", "REST APIs", "Auth & RBAC"],
                },
                {
                  icon: Database,
                  title: "Relational & Document Databases",
                  desc: "Data modeling using MongoDB document schemas and Microsoft SQL Server normalized 3NF relational models.",
                  tags: ["SQL Server", "Stored Procedures", "ACID Data"],
                },
              ].map(({ icon: Icon, title, desc, tags }) => (
                <div key={title} className="skill-discipline-card">
                  <div className="discipline-header">
                    <div className="discipline-icon"><Icon size={18} /></div>
                    <h3 className="discipline-title">{title}</h3>
                  </div>
                  <p className="about-body-para" style={{ fontSize: "0.88rem" }}>{desc}</p>
                  <div className="discipline-pills" style={{ marginTop: "1rem" }}>
                    {tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK & THREE-PROJECT ORBIT SHOWCASE */}
        <section id="projects" className="section-v2" aria-labelledby="projects-heading">
          <div className="container">
            <OrbitalProjects
              projects={projectsData}
              onSelectProject={(id) => setSelectedProjectId(id)}
            />
          </div>
        </section>

        {/* 4. TECHNICAL ARSENAL (SKILLS) */}
        <section id="skills" className="section-v2 section-alt-v2" aria-labelledby="skills-heading">
          <div className="container">
            <InteractiveSkills />
          </div>
        </section>

        {/* 5. ENGINEERING EXPERIENCE */}
        <section id="experience" className="section-v2" aria-labelledby="experience-heading">
          <div className="container">
            <ExperienceTimeline />
          </div>
        </section>

        {/* 6. HACKATHON FINALIST VISUAL BLOCK */}
        <HackathonFinalist />

        {/* 7. ABOUT ME & CURRENTLY SECTION */}
        <section id="about" className="section-v2 section-alt-v2" aria-labelledby="about-heading">
          <div className="container">
            <div className="section-header-v2">
              <span className="section-eyebrow-v2"><BookOpen size={12} /> BIOGRAPHY &amp; FOCUS</span>
              <h2 id="about-heading" className="section-title-v2">About Me</h2>
            </div>

            <div className="about-currently-grid">
              {/* Authentic About Card */}
              <div className="about-text-card">
                <p className="about-lead-para">
                  I am a Computer Science &amp; Engineering student at Darshan University with an 8.87 CGPA, focused on full-stack web engineering, API design, and database systems.
                </p>
                <p className="about-body-para">
                  My approach to software engineering centers on building complete, working applications — from an industrial manufacturing platform live in production for Khodal Industries to organizational request trackers and role-based academic portals.
                </p>
                <p className="about-body-para">
                  Serving as a Teaching Assistant for Database Management Systems (DBMS) and Office Automation Tools (OAT) at Darshan University has given me strong technical communication skills and a discipline for clear schema design.
                </p>
              </div>

              {/* CURRENTLY Section Card */}
              <div className="currently-card">
                <h3 className="currently-title">
                  <Sparkles size={18} /> CURRENTLY
                </h3>
                <div className="currently-block-list">
                  <div className="currently-item">
                    <span className="currently-key">BUILDING</span>
                    <span className="currently-val">Full-stack applications and real-world web systems.</span>
                  </div>
                  <div className="currently-item">
                    <span className="currently-key">EXPLORING</span>
                    <span className="currently-val">Modern application architecture, scalable APIs, AI-assisted development and system design.</span>
                  </div>
                  <div className="currently-item">
                    <span className="currently-key">LOOKING FOR</span>
                    <span className="currently-val">Software engineering / full-stack development internship and entry-level opportunities.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. EDUCATION SECTION */}
        <section id="education" className="section-v2" aria-labelledby="education-heading">
          <div className="container">
            <div className="section-header-v2">
              <span className="section-eyebrow-v2"><GraduationCap size={12} /> ACADEMIC BACKGROUND</span>
              <h2 id="education-heading" className="section-title-v2">Education</h2>
            </div>

            <div className="education-cards-grid">
              {/* Primary Education Card: Darshan University */}
              <div className="edu-primary-card">
                <div className="edu-header-row">
                  <div>
                    <span className="experience-type-tag">PRIMARY EDUCATION</span>
                    <h3 className="edu-degree-title">B.Tech — Computer Science &amp; Engineering</h3>
                    <div className="edu-institution">Darshan University, Rajkot, Gujarat</div>
                  </div>
                  <div className="text-right">
                    <span className="edu-gpa-pill">CGPA: 8.87 / 10</span>
                    <div className="edu-dates" style={{ marginTop: "0.4rem" }}>2024 – Present</div>
                  </div>
                </div>
                <p className="about-body-para" style={{ marginBottom: 0 }}>
                  Undergraduate degree in Computer Science with distinction. Focus on Data Structures, Algorithms, DBMS, Full-Stack Web Development, and Object-Oriented Programming. Appointed Teaching Assistant for DBMS and OAT labs.
                </p>
              </div>

              {/* Secondary Education Cards */}
              <div className="edu-secondary-grid">
                <div className="edu-secondary-card">
                  <h4 className="edu-sec-title">Higher Secondary Certificate (HSC) — GSEB</h4>
                  <div className="edu-sec-inst">School of Science, Rajkot (2024)</div>
                  <div className="edu-sec-score">Score: 86.15%</div>
                </div>

                <div className="edu-secondary-card">
                  <h4 className="edu-sec-title">Secondary School Certificate (SSC) — GSEB</h4>
                  <div className="edu-sec-inst">Patanjali School, Rajkot (2022)</div>
                  <div className="edu-sec-score">Score: 94.33%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. DEVELOPER TERMINAL */}
        <section id="terminal" className="section-v2 section-alt-v2" aria-labelledby="terminal-heading">
          <div className="container">
            <div className="section-header-v2">
              <span className="section-eyebrow-v2"><Terminal size={12} /> INTERACTIVE SHELL</span>
              <h2 id="terminal-heading" className="section-title-v2">Developer Terminal</h2>
              <p className="section-subtitle-v2">
                Inspect system metrics, current stack, and engineer availability via interactive terminal commands.
              </p>
            </div>
            <DeveloperTerminal />
          </div>
        </section>

        {/* 10. CONTACT / FINAL CTA */}
        <section id="contact" className="contact-section-v2" aria-labelledby="contact-heading">
          <div className="container">
            <div className="contact-card-centered">
              <div className="hero-status-pill" style={{ marginBottom: "1.25rem" }}>
                <span className="status-indicator-dot" />
                <span className="status-indicator-text">AVAILABLE FOR ROLES</span>
              </div>

              <h2 id="contact-heading" className="contact-display-title">
                LET&apos;S BUILD SOMETHING USEFUL.
              </h2>

              <p className="contact-sub-paragraph">
                Have a project, opportunity or interesting problem?
              </p>

              <div className="contact-primary-actions">
                <Magnetic as="a" href={`mailto:${email}`} className="btn-v2 btn-v2-primary">
                  <Mail size={16} />
                  <span>EMAIL ME</span>
                </Magnetic>

                <Magnetic as="a" href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="btn-v2 btn-v2-secondary">
                  <Linkedin size={16} />
                  <span>LINKEDIN</span>
                  <ArrowUpRight size={14} />
                </Magnetic>

                <Magnetic as="a" href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-v2 btn-v2-secondary">
                  <Github size={16} />
                  <span>GITHUB</span>
                  <ArrowUpRight size={14} />
                </Magnetic>

                <Magnetic as="a" href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" className="btn-v2 btn-v2-ghost">
                  <FileText size={16} />
                  <span>DOWNLOAD RESUME</span>
                </Magnetic>
              </div>

              {/* Copy Email Button */}
              <div className="contact-email-copy-bar">
                <span className="contact-email-text">{email}</span>
                <button
                  type="button"
                  className="btn-email-copy-pill"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedEmail ? "Copied to Clipboard!" : "Copy Email"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="site-footer-v2">
        <div className="container footer-container-v2">
          <div>
            <div className="footer-title">SMIT PIPALAVA</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.2rem" }}>
              Full-Stack Developer · Darshan University B.Tech CSE (8.87 CGPA)
            </div>
          </div>

          <div className="footer-nav-links">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github size={14} /> GitHub</a>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={14} /> LinkedIn</a>
            <a href={`mailto:${email}`}><Mail size={14} /> Email</a>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf"><FileText size={14} /> Resume</a>
          </div>

          <div style={{ fontSize: "0.8rem" }}>
            &copy; 2026 Smit Pipalava.
          </div>
        </div>
      </footer>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProjectId(null)} />

      {/* Command Palette (⌘K) */}
      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
