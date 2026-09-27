import React, { useState } from "react";
import {
  Monitor, Server, Database, Code2, Cpu, Wrench, Sparkles, Layers, ArrowRight
} from "lucide-react";

const TECHNICAL_ARSENAL_CATEGORIES = [
  {
    id: "frontend",
    title: "FRONTEND",
    icon: Monitor,
    skills: ["React", "Next.js", "JavaScript", "HTML", "CSS"],
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
    skills: ["MongoDB", "SQL Server", "MySQL"],
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
    skills: ["Data Structures", "Algorithms", "DBMS", "OOP", "Computer Networks"],
  },
  {
    id: "tools",
    title: "TOOLS",
    icon: Wrench,
    skills: ["Git", "GitHub", "Office Automation Tools"],
  },
];

const SKILL_RELATIONS = {
  "React": {
    related: ["Next.js", "JavaScript", "HTML", "CSS", "Node.js", "Express"],
    insight: "Client-side SPA framework powering reactive views, component hierarchies, and API interactions.",
  },
  "Next.js": {
    related: ["React", "JavaScript", "Node.js", "HTML", "CSS"],
    insight: "SSR/ISR framework powering optimized static delivery and SEO for the SP Polymers catalog live on Vercel.",
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
    related: ["SQL Server", "OOP", "Data Structures", "DBMS"],
    insight: "Enterprise backend framework powering C# controllers, dependency injection, and RBAC governance for SPMS.",
  },
  "MongoDB": {
    related: ["Node.js", "Express", "DBMS"],
    insight: "Document database handling flexible JSON schemas, indexed queries, and request status lifecycles.",
  },
  "SQL Server": {
    related: ["ASP.NET / .NET", "DBMS", "OOP"],
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
    related: ["SQL Server", "MongoDB", "MySQL", "Computer Networks"],
    insight: "Core database theory taught as TA: ER modeling, normalization to 3NF, SQL queries, and relational keys.",
  },
  "Git": {
    related: ["GitHub", "Office Automation Tools"],
    insight: "Distributed version control tracking commit histories, atomic branches, and deployment pipelines.",
  },
};

export function InteractiveSkills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const relation = hoveredSkill ? SKILL_RELATIONS[hoveredSkill] : null;
  const relatedList = relation ? relation.related : [];

  const filteredCategories = selectedCategory === "all"
    ? TECHNICAL_ARSENAL_CATEGORIES
    : TECHNICAL_ARSENAL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <div className="skills-system-wrapper" aria-label="Technical Arsenal Ecosystem">
      
      {/* Category Filter Navigation */}
      <div className="skills-concept-banner">
        <div className="concept-badge">
          <Layers size={13} /> VERIFIED PROFICIENCY
        </div>
        <h3 className="concept-title">TECHNICAL ARSENAL</h3>
        <p className="concept-sub">
          Categorized engineering disciplines built through coursework, university lab instruction, and verified projects. Hover any badge to spotlight system connections.
        </p>

        {/* Filter Pills */}
        <div className="skills-filter-pills" role="tablist" aria-label="Skill Category Filter">
          <button
            type="button"
            className={`filter-pill${selectedCategory === "all" ? " is-active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </button>
          {TECHNICAL_ARSENAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-pill${selectedCategory === cat.id ? " is-active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
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
              {relation?.insight || "Core engineering competency in full-stack web applications."}
            </span>
          </div>
        ) : (
          <div className="relation-dock-placeholder">
            <span>Hover any technology badge to inspect architectural integration</span>
          </div>
        )}
      </div>

      {/* Category Grid */}
      <div className="skills-category-grid">
        {filteredCategories.map(({ id, title, icon: Icon, skills }) => (
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
                    {isConnected && <span className="skill-tag-badge">LINK</span>}
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
