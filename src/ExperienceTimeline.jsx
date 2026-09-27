import React from "react";
import { Terminal, CheckCircle2, Calendar, MapPin, Users, BookOpen } from "lucide-react";

const EXPERIENCES = [
  {
    role: "DBMS LAB TEACHING ASSISTANT",
    institution: "Darshan University",
    location: "Rajkot, Gujarat",
    target: "~60 Diploma Engineering Students",
    duration: "Academic Semester Appointment",
    description:
      "Instructed diploma computer engineering students through relational database management systems, ER diagram design, schema normalization, and practical SQL query execution.",
    responsibilities: [
      "Instructed ~60 students in weekly database management laboratory sessions",
      "Explained relational database concepts, ER diagrams, Primary/Foreign keys, and schema normalization to 3NF",
      "Guided hands-on SQL query authoring (DDL/DML), join operations, and database troubleshooting",
      "Developed technical communication skills by answering real-time student queries and debugging lab code",
    ],
    skills: ["DBMS Instruction", "SQL Concepts", "ER Diagramming", "Troubleshooting", "Technical Communication"],
  },
  {
    role: "OFFICE AUTOMATION TOOLS TEACHING ASSISTANT",
    institution: "Darshan University",
    location: "Rajkot, Gujarat",
    target: "Undergraduate Engineering Peers",
    duration: "Academic Semester Appointment",
    description:
      "Delivered practical demonstrations of software automation tools, productivity suites, and desktop workflows for undergraduate engineering students.",
    responsibilities: [
      "Delivered structured practical software demonstrations and workflow automation lab sessions",
      "Mentored engineering peers 1-on-1 through complex data processing and document automation exercises",
      "Strengthened leadership, public presentation, and instructional clarity under active classroom environments",
    ],
    skills: ["Software Workflows", "Peer Mentorship", "Data Automation", "Instructional Leadership"],
  },
];

export function ExperienceTimeline() {
  return (
    <div className="experience-section-wrapper">
      <div className="section-header-v2">
        <span className="section-eyebrow-v2">
          <Terminal size={12} /> PEDAGOGY &amp; INSTRUCTION
        </span>
        <h2 id="experience-heading" className="section-title-v2">
          ENGINEERING EXPERIENCE
        </h2>
        <p className="section-subtitle-v2">
          Academic teaching assistantships at Darshan University reinforcing core database theory, troubleshooting, and software workflows.
        </p>
      </div>

      <div className="experience-cards-grid">
        {EXPERIENCES.map((exp) => (
          <div key={exp.role} className="experience-card-v2">
            <div className="card-top-row">
              <div>
                <span className="experience-type-tag">TEACHING ASSISTANT</span>
                <h3 className="experience-role-title">{exp.role}</h3>
                <div className="experience-institution-row">
                  <MapPin size={13} />
                  <span>{exp.institution} · {exp.location}</span>
                </div>
              </div>
              <div className="experience-meta-box">
                <span className="experience-cohort-pill">
                  <Users size={12} /> {exp.target}
                </span>
                <span className="experience-date-pill">
                  <Calendar size={12} /> {exp.duration}
                </span>
              </div>
            </div>

            <p className="experience-desc">{exp.description}</p>

            <div className="experience-bullet-list">
              {exp.responsibilities.map((resp) => (
                <div key={resp} className="experience-bullet-item">
                  <CheckCircle2 size={14} className="check-icon" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>

            <div className="experience-tags-row">
              {exp.skills.map((s) => (
                <span key={s} className="experience-chip">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
