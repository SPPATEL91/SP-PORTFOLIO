import React, { useEffect, useMemo, useRef, useState, useCallback, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";

const HeroCanvas3D = lazy(() => import("./HeroCanvas3D.jsx"));
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
  Check,
  Copy,
  X,
  GraduationCap,
  Award,
  BookOpen,
  Layers,
  Server,
  Database,
  Wrench,
  CheckCircle2,
  Cpu,
  Monitor,
  FileText
} from "lucide-react";
import "./styles.css";

function Linkedin({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
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
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" }
];

const skillsData = [
  // Frontend
  { name: "React", category: "Frontend", level: "Advanced Component Architecture & State", icon: Monitor },
  { name: "Next.js", category: "Frontend", level: "SSR, App Router & Static Generation", icon: Monitor },
  { name: "JavaScript (ES6+)", category: "Frontend", level: "Async, Closures & Modern Web APIs", icon: Code2 },
  { name: "HTML5 & Semantic Web", category: "Frontend", level: "Accessible & Responsive Standards", icon: Monitor },
  { name: "CSS3 & Modern Layouts", category: "Frontend", level: "Flexbox, Grid & High-End Animations", icon: Monitor },

  // Backend
  { name: "Node.js", category: "Backend", level: "Event-driven Runtime & Microservices", icon: Server },
  { name: "Express.js", category: "Backend", level: "REST APIs, Routing & Middleware Pipelines", icon: Server },
  { name: "NestJS", category: "Backend", level: "Enterprise TypeScript Modular Framework", icon: Server },
  { name: "ASP.NET Core", category: "Backend", level: "Enterprise Web APIs, C# & Dependency Injection", icon: Server },

  // Databases
  { name: "MongoDB", category: "Databases", level: "NoSQL Schema Modeling & Aggregation", icon: Database },
  { name: "Microsoft SQL Server", category: "Databases", level: "Relational Queries, Procedures & Indexing", icon: Database },
  { name: "MySQL", category: "Databases", level: "Relational Schemas, Constraints & Optimization", icon: Database },
  { name: "PostgreSQL", category: "Databases", level: "ACID Transactions, Indexing & Data Integrity", icon: Database },

  // Programming Languages
  { name: "JavaScript (ES6+)", category: "Languages", level: "Async/Await, Closures, DOM & Modern APIs", icon: Code2 },
  { name: "Python", category: "Languages", level: "Data Processing, Scripting & Algorithms", icon: Code2 },
  { name: "Java", category: "Languages", level: "OOP, Concurrency & Enterprise Systems", icon: Code2 },
  { name: "C", category: "Languages", level: "Memory Management & Low-Level Architecture", icon: Code2 },

  // CS Fundamentals
  { name: "Data Structures", category: "CS Core", level: "Trees, Graphs, Hash Tables & Complexity", icon: Cpu },
  { name: "Algorithms", category: "CS Core", level: "Dynamic Programming, Divide & Conquer", icon: Cpu },
  { name: "DBMS Engineering", category: "CS Core", level: "Relational Normalization, ER Modeling & SQL", icon: Cpu },
  { name: "Object-Oriented Programming", category: "CS Core", level: "Polymorphism, Inheritance & Encapsulation", icon: Cpu },
  { name: "Software Engineering", category: "CS Core", level: "SDLC, System Design & Architecture", icon: Cpu },
  { name: "Computer Networks", category: "CS Core", level: "TCP/IP, OSI Stack & Network Protocols", icon: Cpu },

  // Tools
  { name: "Git & GitHub", category: "Tools", level: "Version Control, CI/CD & Collaboration", icon: Wrench },
  { name: "Postman", category: "Tools", level: "API Testing, Mocking & Documentation", icon: Wrench },
  { name: "Office Automation Tools", category: "Tools", level: "Workflow Productivity & Automation", icon: Wrench },
  { name: "VS Code & Modern IDEs", category: "Tools", level: "Dev Tooling, Debugging & Extensions", icon: Wrench }
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
    description:
      "Full-stack service request management platform built with React, Node.js, Express and MongoDB for organizational grievance tracking and workflow resolution.",
    overview:
      "Built an end-to-end management pipeline featuring user authentication, request submissions, categorization, real-time status tracking, and an administrative resolution dashboard for assigned department staff.",
    problem:
      "Organizations frequently struggle with lost requests, chaotic manual ticketing, and zero accountability when users submit grievances or logistical needs across departments.",
    solution:
      "Developed a centralized full-stack system with a flexible MongoDB document schema, clear ticket lifecycles (Submitted → Assigned → Under Review → Resolved), role-based dashboards, and granular staff resolution logs.",
    features: [
      "Request management and self-service ticket lodging with category, priority, and file attachments",
      "Role-based dashboards for users, assigned department staff, and administrators",
      "RESTful APIs and CRUD operations with input validation and error handling",
      "Live request status timeline and progress tracking across lifecycle milestones",
      "MongoDB integration for secure, scalable document storage and audit logging"
    ],
    architecture: [
      "React SPA frontend with structured state management and responsive forms",
      "Express.js & Node.js backend following RESTful resource design",
      "MongoDB document database with schemas, validation, and indexed queries",
      "Modular middleware pipeline for request verification and error handling"
    ],
    learnings: [
      "Designing resilient document schemas for stateful request lifecycles",
      "Implementing clean error-handling contracts between React client and Express REST API",
      "Managing realistic user permissions and state synchronization across multiple roles"
    ]
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
    description:
      "A modern commercial web platform developed for plastic raw materials, manufacturing capacity, technical specifications, and corporate credibility.",
    overview:
      "Created a robust digital presence that translates industrial manufacturing capabilities into an intuitive, elegant web catalog. The platform focuses on fast load speeds, responsive device adaptations, and clear information hierarchy for commercial buyers.",
    problem:
      "Industrial manufacturing companies often suffer from outdated or fragmented web presences that fail to communicate product variety, raw material grades, and production capacity to prospective commercial buyers.",
    solution:
      "Engineered an optimized digital catalog with clean navigational routes, high-contrast typography, fast static delivery, and structured company information that builds immediate buyer trust.",
    features: [
      "Information platform for plastic raw materials and manufacturing processes",
      "Dynamic catalog presentation for plastic polymer raw materials and grades",
      "Fully responsive interface for seamless accessibility across all devices",
      "Integrated animations and interactive UI to improve commercial engagement",
      "Direct inquiry integration for commercial quotes and sample requests"
    ],
    architecture: [
      "Component-driven frontend architecture with React & Next.js",
      "Optimized static asset bundling, responsive styling, and fast delivery",
      "Clean CSS layout systems with fluid typographic scales",
      "Production deployment with zero layout shifts (CLS)"
    ],
    learnings: [
      "Structuring complex industrial product data into intuitive navigation patterns",
      "Balancing high visual polish with lightning-fast initial load times",
      "Designing for B2B credibility and clear conversion actions"
    ]
  },
  "student-projects": {
    id: "student-projects",
    title: "Student Project Management System (SPMS)",
    category: "Role-Based Academic Governance Platform",
    previewClass: "academic",
    monogram: "SPMS",
    techBadges: ["React", "ASP.NET Core", "SQL Server", "RBAC Security", "REST APIs"],
    githubUrl: "https://github.com/SPPATEL91/STUDENT-PROJECT-MANAGEMENT-SYSTEM",
    description:
      "Role-Based Access Control (RBAC) academic governance platform powering Student, Faculty, and Admin portals for university milestone management and grading.",
    overview:
      "Engineered an academic governance system that replaces messy email submissions and manual spreadsheets with structured milestone submissions, faculty reviews, grading rubrics, and admin controls.",
    problem:
      "Universities require strict separation of concerns: students need to form teams and submit project milestones; faculty mentors need to review and score deliverables; administrators need macro oversight of department progress.",
    solution:
      "Created a robust multi-portal solution powered by ASP.NET Core backend services, SQL Server relational models, and a responsive React UI, enforced with rigorous Role-Based Access Control.",
    features: [
      "Three distinct dedicated portals: Student Workspace, Faculty Evaluation Hub, and Admin Command Center",
      "Role-Based Access Control (RBAC) preventing unauthorized endpoint access",
      "Milestone tracking: Proposal approval, mid-term progress, code review, and final presentation",
      "Faculty grading interface with remarks, revision requests, and timestamped reviews",
      "SQL Server database backing with relational integrity, normalized entities, and audit history"
    ],
    architecture: [
      "React component library tailored with distinct portal dashboards",
      "ASP.NET Core Web API with secure controller authorization filters",
      "Microsoft SQL Server database with transactional integrity and stored procedures",
      "Token-based authentication and Claims-based Role authorization"
    ],
    learnings: [
      "Mastering Role-Based Access Control (RBAC) architecture across backend and frontend",
      "Developing typed enterprise APIs using ASP.NET Core conventions",
      "Managing complex multi-table relationships and academic lifecycle constraints in SQL Server"
    ]
  }
};

const timelineData = [
  {
    role: "DBMS Teaching Assistant",
    target: "Diploma Semester 2 Students",
    institution: "Darshan University",
    duration: "Full Semester Engagement",
    description:
      "Conducted practical laboratory sessions, guided students through relational database concepts, ER diagrams, schema normalization, and practical SQL queries on real database instances.",
    takeaways: [
      "Led regular weekly lab sessions for foundational computer science students",
      "Explained complex relational concepts: Primary/Foreign keys, Joins, Aggregations, and Constraints",
      "Developed high confidence in public speaking and articulating technical debugging steps"
    ]
  },
  {
    role: "Office Automation Tools Teaching Assistant",
    target: "B.Tech Semester 4 Students",
    institution: "Darshan University",
    duration: "Full Semester Engagement",
    description:
      "Delivered hands-on practical demonstrations of office automation systems, productivity suites, and software workflows, helping engineering peers master practical software applications.",
    takeaways: [
      "Conducted software demonstrations and practical workflows",
      "Assisted students with hands-on exercises, assignments, and problem-solving",
      "Strengthened pedagogical clarity: learning to break complex workflows into digestible steps"
    ]
  }
];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const update = () => setReducedMotion(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function useFinePointer() {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    setIsFinePointer(query.matches);
    const update = () => setIsFinePointer(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isFinePointer;
}

// Custom Cursor with Physics & Hover Expansion
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isFinePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isFinePointer || reducedMotion) return undefined;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let ringX = cursorX;
    let ringY = cursorY;
    let targetX = cursorX;
    let targetY = cursorY;
    let rafId = null;

    const handlePointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target;
      const isInteractive = target?.closest?.("a, button, .filter-tab, .skill-tech-card, .btn, .modal-close-btn");
      const isProjectCard = target?.closest?.(".project-card, .project-visual-preview");

      document.body.classList.toggle("cursor-hover", Boolean(isInteractive && !isProjectCard));
      document.body.classList.toggle("cursor-project", Boolean(isProjectCard));
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const render = () => {
      cursorX += (targetX - cursorX) * 0.55;
      cursorY += (targetY - cursorY) * 0.55;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.setProperty("--cursor-x", `${cursorX}px`);
        dotRef.current.style.setProperty("--cursor-y", `${cursorY}px`);
      }
      if (ringRef.current) {
        ringRef.current.style.setProperty("--cursor-x", `${ringX}px`);
        ringRef.current.style.setProperty("--cursor-y", `${ringY}px`);
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove("cursor-hover", "cursor-project");
    };
  }, [isFinePointer, reducedMotion]);

  if (!isFinePointer || reducedMotion) return null;

  return (
    <>
      <div className="custom-cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="custom-cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="custom-cursor-text">VIEW</span>
      </div>
    </>
  );
}

// Magnetic Button with Restrained Spring Attraction
function Magnetic({ as: Component = "a", className = "", children, strength = 0.22, ...props }) {
  const ref = useRef(null);
  const isFinePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (!isFinePointer || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    ref.current.style.setProperty("--magnet-x", `${distanceX}px`);
    ref.current.style.setProperty("--magnet-y", `${distanceY}px`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--magnet-x", "0px");
    ref.current.style.setProperty("--magnet-y", "0px");
  };

  return (
    <Component
      ref={ref}
      className={`magnetic ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
}

// Staggered Scroll Reveal with IntersectionObserver
const Reveal = React.forwardRef(function Reveal(
  { as: Component = "div", className = "", children, ...props },
  forwardedRef
) {
  const localRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = localRef.current;
    if (!el) return undefined;
    if (reducedMotion) {
      el.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const setRef = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Component ref={setRef} className={`reveal ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
});


// 3D Tilt Project Card with Dynamic Spotlight
function ProjectCard({ project, onOpen }) {
  const cardRef = useRef(null);
  const isFinePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  const handlePointerMove = (e) => {
    if (!isFinePointer || reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    cardRef.current.style.setProperty("--spot-x", `${x}px`);
    cardRef.current.style.setProperty("--spot-y", `${y}px`);
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <article
      ref={cardRef}
      className="project-card"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <div className="project-header-bar">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
        </div>
        <span className="project-category-tag">{project.category}</span>
      </div>

      <div className={`project-visual-preview ${project.previewClass}`} aria-hidden="true">
        <span className="project-preview-monogram">{project.monogram}</span>
      </div>

      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech-badges">
          {project.techBadges.map((badge) => (
            <span key={badge} className="tech-badge">
              {badge}
            </span>
          ))}
        </div>

        <div className="project-card-actions">
          <button
            type="button"
            className="btn-details"
            onClick={() => onOpen(project.id)}
            aria-label={`Inspect architecture and details for ${project.title}`}
          >
            Inspect Architecture <ChevronRight size={15} />
          </button>

          {project.liveUrl && (
            <Magnetic
              as="a"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-live"
              aria-label={`Launch live production site of ${project.title}`}
            >
              Live Demo <ArrowUpRight size={13} />
            </Magnetic>
          )}

          {project.githubUrl && (
            <Magnetic
              as="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-live"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <Github size={13} /> GitHub
            </Magnetic>
          )}
        </div>
      </div>
    </article>
  );
}

// Deep Inspection Project Modal
function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-proj-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <div>
            <span className="preloader-badge">{project.category}</span>
            <h3 id="modal-proj-title" className="modal-hero-title">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-scroll-area">
          <div className="modal-section-block">
            <h4>01 // System Overview</h4>
            <p>{project.overview}</p>
          </div>

          <div className="modal-section-block">
            <h4>02 // The Problem &amp; Challenge</h4>
            <p>{project.problem}</p>
          </div>

          <div className="modal-section-block">
            <h4>03 // Engineering Solution</h4>
            <p>{project.solution}</p>
          </div>

          <div className="modal-section-block">
            <h4>04 // Core Features &amp; Capabilities</h4>
            <ul className="modal-feature-list">
              {project.features.map((feat) => (
                <li key={feat} className="modal-feature-item">
                  <CheckCircle2 size={16} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section-block">
            <h4>05 // Architecture &amp; Tech Stack</h4>
            <ul className="modal-feature-list">
              {project.architecture.map((arch) => (
                <li key={arch} className="modal-feature-item">
                  <Layers size={16} />
                  <span>{arch}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section-block">
            <h4>06 // Engineering Learnings</h4>
            <ul className="modal-feature-list">
              {project.learnings.map((learn) => (
                <li key={learn} className="modal-feature-item">
                  <Sparkles size={16} />
                  <span>{learn}</span>
                </li>
              ))}
            </ul>
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {project.liveUrl && (
                <Magnetic
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  aria-label={`Launch live production site of ${project.title}`}
                >
                  Launch Production Site <ArrowUpRight size={16} />
                </Magnetic>
              )}
              {project.githubUrl && (
                <Magnetic
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  aria-label={`View source code for ${project.title} on GitHub`}
                >
                  <Github size={16} /> Source Code on GitHub <ArrowUpRight size={14} />
                </Magnetic>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Global Site Header
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.05 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <nav className="navbar" aria-label="Main Navigation">
            <Magnetic as="a" href="#home" className="brand" aria-label="Smit Pipalava Home">
              <span className="brand-badge">SP</span>
              <div className="brand-info">
                <span className="brand-name">SMIT PIPALAVA</span>
                <span className="brand-title">CS STUDENT &amp; FULL-STACK DEVELOPER</span>
              </div>
            </Magnetic>

            <div className="nav-links-desktop">
              {navItems.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`nav-link ${activeSection === id ? "active" : ""}`}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="nav-status-pill">
              <span className="status-dot" aria-hidden="true" />
              <span>Available for Projects &amp; Internships</span>
            </div>

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Terminal size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        {navItems.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`mobile-nav-link ${activeSection === id ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

export function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const reducedMotion = useReducedMotion();

  const selectedProject = selectedProjectId ? projectsData[selectedProjectId] : null;

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Quick High-End Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Copy email handler
  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  }, []);

  // Filter skills
  const skillCategories = useMemo(
    () => ["All", "Frontend", "Backend", "Databases", "Languages", "CS Core", "Tools"],
    []
  );

  const filteredSkills = useMemo(() => {
    if (activeSkillCategory === "All") return skillsData;
    return skillsData.filter((s) => s.category === activeSkillCategory);
  }, [activeSkillCategory]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <CustomCursor />

      {/* Preloader Sequence */}
      <div className={`preloader ${preloaderDone ? "preloader-done" : ""}`} aria-hidden="true">
        <div className="preloader-box">
          <div className="preloader-badge">
            <span /> SYSTEM INITIALIZING
          </div>
          <div className="preloader-title">SMIT PIPALAVA</div>
          <div className="preloader-progress-bar">
            <div className="preloader-progress-fill" />
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="ambient-canvas" aria-hidden="true">
        <div className="ambient-glow-orb orb-1" />
        <div className="ambient-glow-orb orb-2" />
        <div className="ambient-glow-orb orb-3" />
      </div>
      <div className="ambient-grid" aria-hidden="true" />

      <Header />

      <main id="main-content">
        {/* 1. HERO SECTION */}
        <section id="home" className="section hero" aria-label="Hero Section">
          <div className="container hero-grid">
            <Reveal className="hero-content">
              <div className="hero-eyebrow">
                <Terminal size={14} />
                <span>B.Tech Computer Engineering • Darshan University</span>
              </div>

              <h1 className="hero-name">
                Smit <span>Pipalava</span>
              </h1>

              <p className="hero-role">
                Computer Science Student &amp; <span className="accent-text">Full-Stack Developer</span>
              </p>

              <p className="hero-bio">
                Computer Science student building practical full-stack web applications using React, Node.js, Express, MongoDB and ASP.NET Core.
              </p>

              <div className="hero-actions">
                <Magnetic as="a" href="#projects" className="btn btn-primary" aria-label="View featured projects">
                  View Projects <ArrowUpRight size={17} />
                </Magnetic>
                <Magnetic
                  as="a"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Smit_Pipalava_Resume.pdf"
                  className="btn btn-resume"
                  aria-label="Download Smit Pipalava Resume (PDF)"
                >
                  <FileText size={17} /> Download Resume
                </Magnetic>
                <Magnetic
                  as="a"
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  aria-label="Visit Smit Pipalava GitHub profile"
                >
                  <Github size={17} /> GitHub
                </Magnetic>
                <Magnetic
                  as="a"
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  aria-label="Visit Smit Pipalava LinkedIn profile"
                >
                  <Linkedin size={17} /> LinkedIn
                </Magnetic>
                <Magnetic as="a" href="#contact" className="btn btn-ghost" aria-label="Contact Smit Pipalava">
                  <Mail size={17} /> Contact
                </Magnetic>
              </div>

              <div className="hero-stats-row">
                <div className="stat-item">
                  <span className="stat-num">
                    8.87<span>/10</span>
                  </span>
                  <span className="stat-label">Academic CGPA</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">
                    3<span>+</span>
                  </span>
                  <span className="stat-label">Production Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">
                    2<span>×</span>
                  </span>
                  <span className="stat-label">TA Appointments</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="hero-visual-area">
              <Suspense
                fallback={
                  <div className="hero-canvas-wrapper" aria-label="Loading 3D Workspace">
                    <div className="hero-canvas-halo" />
                    <span className="hero-orbit-tag orbit-tag-1">React / Next.js</span>
                    <span className="hero-orbit-tag orbit-tag-2">Node / Express</span>
                    <span className="hero-orbit-tag orbit-tag-3">SQL / DBMS</span>
                    <span className="hero-orbit-tag orbit-tag-4">.NET / C#</span>
                  </div>
                }
              >
                <HeroCanvas3D reducedMotion={reducedMotion} />
              </Suspense>
            </Reveal>
          </div>
        </section>

        {/* 2. ABOUT & EDUCATION */}
        <section id="about" className="section" aria-labelledby="about-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow">
                <BookOpen size={14} /> Profile &amp; Background
              </span>
              <h2 id="about-heading" className="section-title">
                About Me
              </h2>
              <p className="section-subtitle">
                Turning Computer Science theory into working products, clean architectures, and dependable full-stack applications.
              </p>
            </Reveal>

            <div className="about-grid">
              <Reveal className="about-card">
                <p>
                  I am a B.Tech Computer Engineering undergraduate at Darshan University, driven by a passion
                  for full-stack engineering, clean database models, and practical web architectures.
                </p>
                <p>
                  I focus on writing dependable code that solves tangible problems—whether that involves industrial product
                  catalogs, administrative grievance workflows, or multi-tenant role-based academic systems.
                </p>
                <div className="about-highlight-box">
                  <Terminal size={22} />
                  <p>
                    <strong>Teaching Philosophy:</strong> Serving as a Teaching Assistant for both DBMS and Office
                    Automation reinforced my technical fundamentals. Communicating complex concepts clearly to other students
                    fundamentally shaped how I architect and document software today.
                  </p>
                </div>
              </Reveal>

              <Reveal className="education-card">
                <span className="section-eyebrow">
                  <GraduationCap size={14} /> Academic Degree
                </span>
                <h3>Darshan University</h3>
                <p className="education-degree">B.Tech in Computer Engineering</p>

                <dl className="education-meta-list">
                  <div className="meta-row">
                    <dt>Duration</dt>
                    <dd>2024 &ndash; Present</dd>
                  </div>
                  <div className="meta-row">
                    <dt>Cumulative Grade (CGPA)</dt>
                    <dd className="highlight-grade">8.87 / 10.0</dd>
                  </div>
                  <div className="meta-row">
                    <dt>Academic Focus</dt>
                    <dd>Full-Stack &amp; DBMS Engineering</dd>
                  </div>
                  <div className="meta-row">
                    <dt>Location</dt>
                    <dd>Rajkot, Gujarat</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. SKILLS & TECHNOLOGIES */}
        <section id="skills" className="section" aria-labelledby="skills-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow">
                <Cpu size={14} /> Engineering Arsenal
              </span>
              <h2 id="skills-heading" className="section-title">
                Skills &amp; Technical Stack
              </h2>
              <p className="section-subtitle">
                Languages, frameworks, databases, and core computer science fundamentals organized by technical domain.
              </p>
            </Reveal>

            <div className="skills-filter-nav">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-tab ${activeSkillCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveSkillCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="skills-grid">
              {filteredSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <Reveal key={skill.name} className="skill-tech-card">
                    <div className="skill-tech-top">
                      <span className="skill-category-badge">{skill.category}</span>
                      <Icon size={18} color="var(--accent-cyan)" />
                    </div>
                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-desc">{skill.level}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. FEATURED PROJECTS */}
        <section id="projects" className="section" aria-labelledby="projects-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow">
                <Layers size={14} /> Practical Software
              </span>
              <h2 id="projects-heading" className="section-title">
                Featured Projects
              </h2>
              <p className="section-subtitle">
                Engineered with modern full-stack architectures, practical data models, and accessible user interfaces.
              </p>
            </Reveal>

            <div className="projects-grid">
              {Object.values(projectsData).map((proj) => (
                <ProjectCard key={proj.id} project={proj} onOpen={setSelectedProjectId} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCE & TEACHING ASSISTANT JOURNEY */}
        <section id="experience" className="section" aria-labelledby="exp-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow">
                <Terminal size={14} /> Leadership &amp; Pedagogy
              </span>
              <h2 id="exp-heading" className="section-title">
                Teaching Experience &amp; Leadership
              </h2>
              <p className="section-subtitle">
                Academic mentorship and hands-on lab instruction that reinforced database fundamentals and software communication.
              </p>
            </Reveal>

            <div className="timeline-track">
              {timelineData.map((item, idx) => (
                <div key={item.role} className="timeline-card-wrapper">
                  <div className="timeline-node-pin" />
                  <Reveal className="timeline-item-card">
                    <div className="timeline-item-header">
                      <h3 className="timeline-role-title">{item.role}</h3>
                      <span className="timeline-period-badge">{item.duration}</span>
                    </div>
                    <p className="timeline-item-desc">{item.description}</p>
                    <ul className="timeline-takeaways">
                      {item.takeaways.map((t) => (
                        <li key={t}>
                          <ChevronRight size={14} />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              ))}
            </div>

            <Reveal className="timeline-quote-box">
              <Sparkles size={32} />
              <blockquote>
                &ldquo;Teaching relational database management and automation tools to other students taught me that true
                mastery isn&apos;t just writing code that runs—it is explaining the architecture with such clarity that
                anyone can understand the system.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* 6. HACKATHONS & ACHIEVEMENTS */}
        <section id="achievements" className="section" aria-labelledby="achieve-heading">
          <div className="container">
            <Reveal className="section-header">
              <span className="section-eyebrow">
                <Award size={14} /> Competitive Milestone
              </span>
              <h2 id="achieve-heading" className="section-title">
                Achievements &amp; Hackathons
              </h2>
              <p className="section-subtitle">
                Competitive hackathon finalist journey, rapid prototyping, and end-to-end full-stack prototype delivery.
              </p>
            </Reveal>

            <Reveal className="hackathon-pipeline-card">
              <div className="hackathon-header-flex">
                <div>
                  <span className="preloader-badge">Darshan University Hackathon</span>
                  <h3 className="timeline-role-title" style={{ marginTop: "0.5rem" }}>
                    Advanced Through 3 Rigorous Evaluation Stages
                  </h3>
                </div>
                <div className="hackathon-participants-badge">
                  <Award size={15} /> ~200–300 Competing Students
                </div>
              </div>

              <div className="hackathon-stages">
                <div className="hackathon-stage-box">
                  <span className="stage-num-badge">STAGE 01 // SCREENING</span>
                  <h4 className="stage-title">Problem Ideation &amp; Feasibility</h4>
                  <p className="stage-desc">
                    Comprehensive problem formulation, architectural planning, and proposal defense against university judging criteria.
                  </p>
                </div>

                <div className="hackathon-stage-box">
                  <span className="stage-num-badge">STAGE 02 // PROTOTYPING</span>
                  <h4 className="stage-title">Rapid Sprint &amp; MVP Build</h4>
                  <p className="stage-desc">
                    High-intensity development sprint, wiring API endpoints, database schemas, and responsive user flows within time limits.
                  </p>
                </div>

                <div className="hackathon-stage-box stage-final">
                  <span className="stage-num-badge" style={{ color: "var(--accent-emerald)" }}>
                    STAGE 03 // FINAL ROUND
                  </span>
                  <h4 className="stage-title">Grand Finalist Defense</h4>
                  <p className="stage-desc">
                    Presented working solution live before faculty evaluators and industry panels, demonstrating system value and robustness.
                  </p>
                </div>
              </div>

              <div className="project-tech-badges">
                <span className="tech-badge">Agile Teamwork</span>
                <span className="tech-badge">Rapid Prototyping</span>
                <span className="tech-badge">Live System Defense</span>
                <span className="tech-badge">Time-Critical Problem Solving</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 7. CONTACT SECTION */}
        <section id="contact" className="section" aria-labelledby="contact-heading">
          <div className="container">
            <Reveal className="contact-card">
              <div className="contact-grid">
                <div>
                  <span className="section-eyebrow">
                    <Mail size={14} /> Get in Touch
                  </span>
                  <h2 id="contact-heading" className="section-title">
                    Get in Touch
                  </h2>
                  <p className="section-subtitle">
                    Open to full-stack engineering opportunities, project collaborations, and software discussions.
                  </p>
                </div>

                <div className="contact-info-list">
                  <div className="contact-channel-item">
                    <div className="channel-meta">
                      <div className="channel-icon">
                        <Mail size={18} />
                      </div>
                      <div className="channel-labels">
                        <span className="channel-label">Email Address</span>
                        <span className="channel-val">{email}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="copy-btn"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? (
                        <>
                          <Check size={14} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Smit_Pipalava_Resume.pdf"
                    className="contact-channel-item"
                    aria-label="Download Smit Pipalava Resume (PDF)"
                  >
                    <div className="channel-meta">
                      <div className="channel-icon">
                        <FileText size={18} />
                      </div>
                      <div className="channel-labels">
                        <span className="channel-label">Curriculum Vitae</span>
                        <span className="channel-val">Download Resume (PDF)</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} color="var(--accent-cyan)" />
                  </a>

                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel-item"
                    aria-label="Visit Smit Pipalava LinkedIn profile"
                  >
                    <div className="channel-meta">
                      <div className="channel-icon">
                        <Linkedin size={18} />
                      </div>
                      <div className="channel-labels">
                        <span className="channel-label">Professional Profile</span>
                        <span className="channel-val">linkedin.com/in/smit-pipalava</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} color="var(--accent-cyan)" />
                  </a>

                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel-item"
                    aria-label="Visit Smit Pipalava GitHub profile"
                  >
                    <div className="channel-meta">
                      <div className="channel-icon">
                        <Github size={18} />
                      </div>
                      <div className="channel-labels">
                        <span className="channel-label">GitHub Profile</span>
                        <span className="channel-val">github.com/SPPATEL91</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} color="var(--accent-cyan)" />
                  </a>

                  <div className="contact-channel-item">
                    <div className="channel-meta">
                      <div className="channel-icon">
                        <MapPin size={18} />
                      </div>
                      <div className="channel-labels">
                        <span className="channel-label">Location</span>
                        <span className="channel-val">Rajkot, Gujarat, India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <p className="footer-author">
            &copy; {new Date().getFullYear()} Smit Pipalava. Crafted with precision &amp; modern web craft.
          </p>
          <Magnetic as="a" href="#home" className="btn-details" aria-label="Back to top of page">
            Back to top &uarr;
          </Magnetic>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProjectId(null)} />
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

