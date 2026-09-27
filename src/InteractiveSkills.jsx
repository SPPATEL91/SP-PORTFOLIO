import React, { useState } from "react";
import {
  Monitor, Server, Database, Code2, Cpu, Wrench, Sparkles, Layers, ArrowRight
} from "lucide-react";

const TECHNICAL_ARSENAL_CATEGORIES = [
  {
    id: "frontend",
    title: "FRONTEND",
    icon: Monitor,
    skills: ["React", "Next.js", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "backend",
    title: "BACKEND",
    icon: Server,
    skills: ["Node.js", "Express", "NestJS", "ASP.NET / .NET"],
  },
  {
    id: "database",
    title: "DATABASE",
    icon: Database,
    skills: ["MongoDB", "SQL Server"],
  },
  {
    id: "languages",
    title: "LANGUAGES",
    icon: Code2,
    skills: ["JavaScript", "Python", "Java", "C"],
  },
  {
    id: "core-cs",
    title: "CORE CS",
    icon: Cpu,
    skills: [
      "Data Structures",
      "Algorithms",
      "DBMS",
      "Software Engineering",
    ],
  },
  {
    id: "tools",
    title: "TOOLS",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "Office Automation Tools",
    ],
  },
];

const SKILL_RELATIONS = {
  "React": {
    related: ["Next.js", "JavaScript", "HTML", "CSS", "Node.js", "Express"],
    insight: "Client-side SPA framework powering reactive views, component hierarchies, and API interactions.",
  },
  "Next.js": {
    related: ["React", "JavaScript", "Node.js", "HTML", "CSS"],
    insight: "SSR/ISR framework powering optimized static delivery and SEO for SP Polymers catalog on Vercel.",
  },
  "JavaScript": {
    related: ["React", "Next.js", "Node.js", "Express", "NestJS"],
    insight: "Asynchronous runtime language uniting client-side state engines and server-side REST APIs.",
  },
  "Node.js": {
    related: ["Express", "NestJS", "React", "MongoDB", "JavaScript"],
    insight: "Event-driven runtime handling asynchronous I/O operations, JWT authentication, and service API routes.",
  },
  "Express": {
    related: ["Node.js", "MongoDB", "JavaScript"],
    insight: "REST routing framework powering Service Request Management System backend with CRUD endpoints.",
  },
  "ASP.NET / .NET": {
    related: ["SQL Server", "DBMS", "Data Structures"],
    insight: "Enterprise backend framework powering C# controllers, dependency injection, and RBAC governance for SPMS.",
  },
  "MongoDB": {
    related: ["Node.js", "Express", "DBMS"],
    insight: "Document database handling flexible JSON schemas, indexed queries, and request status lifecycles.",
  },
  "SQL Server": {
    related: ["ASP.NET / .NET", "DBMS"],
    insight: "Relational database enforcing 3NF schema normalization, ACID compliance, and stored procedures.",
  },
  "Data Structures": {
    related: ["Algorithms", "Python", "Java", "C", "JavaScript"],
    insight: "Fundamental memory structures, arrays, linked lists, stacks, queues, trees, and graph representations.",
  },
  "Algorithms": {
    related: ["Data Structures", "Python", "Java", "C", "JavaScript"],
    insight: "Computational efficiency, sorting, searching, time/space complexity analysis, and optimization.",
  },
  "DBMS": {
    related: ["SQL Server", "MongoDB"],
    insight: "Core database theory taught as TA: ER modeling, normalization to 3NF, SQL queries, and relational keys.",
  },
  "Git": {
    related: ["GitHub", "Office Automation Tools"],
    insight: "Distributed version control tracking commit histories, atomic branches, and deployment pipelines.",
  },
};

export function InteractiveSkills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const relation = hoveredSkill ? SKILL_RELATIONS[hoveredSkill] : null;
  const relatedList = relation ? relation.related : [];

  return (
    <div className="skills-system-wrapper" id="skills" aria-label="Technical Arsenal Ecosystem">
      {/* Editorial Section Header */}
      <div className="section-header-v2 text-center">
        <span className="section-eyebrow-v2">
          <Layers size={13} /> TECHNICAL SKILLS
        </span>
        <h2 id="skills-heading" className="section-title-v2">
          Technical Arsenal
        </h2>
        <p className="section-subtitle-v2 mx-auto">
          Technologies used across coursework, full-stack project builds, and university laboratory teaching assistant appointments.
        </p>
      </div>

      {/* Relational Feedback Bar */}
      <div className={`skills-relation-dock${hoveredSkill ? " is-active" : ""}`} aria-live="polite">
        {hoveredSkill ? (
          <div className="relation-dock-content">
            <span className="relation-dock-source">
              <Sparkles size={13} /> {hoveredSkill}
            </span>
            <ArrowRight size={13} className="relation-dock-arrow" />
            <span className="relation-dock-insight">
              {relation?.insight || "Core engineering competency in software development."}
            </span>
          </div>
        ) : (
          <div className="relation-dock-placeholder">
            <span>Hover any technology pill to view application context</span>
          </div>
        )}
      </div>

      {/* Categorized Skills Grid */}
      <div className="skills-category-grid">
        {TECHNICAL_ARSENAL_CATEGORIES.map(({ id, title, icon: Icon, skills }) => (
          <div key={id} className="skill-discipline-card">
            <div className="discipline-header">
              <div className="discipline-icon">
                <Icon size={16} />
              </div>
              <h4 className="discipline-title">{title}</h4>
            </div>

            <div className="discipline-pills">
              {skills.map((skill) => {
                const isHovered = hoveredSkill === skill;
                const isConnected = relatedList.includes(skill);
                const isDimmed = hoveredSkill && !isHovered && !isConnected;

                return (
                  <button
                    key={skill}
                    type="button"
                    className={`skill-tag${isHovered ? " is-hovered" : ""}${isConnected ? " is-connected" : ""}${isDimmed ? " is-dimmed" : ""}`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onFocus={() => setHoveredSkill(skill)}
                    onBlur={() => setHoveredSkill(null)}
                    aria-label={`Technology: ${skill}`}
                  >
                    <span className="skill-tag-dot" aria-hidden="true" />
                    <span className="skill-tag-text">{skill}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
