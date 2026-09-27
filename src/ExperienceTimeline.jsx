import React from "react";
import { Terminal, CheckCircle2, Calendar, MapPin, Users } from "lucide-react";

const EXPERIENCES = [
  {
    role: "DBMS LAB TEACHING ASSISTANT",
    institution: "Darshan University",
    location: "Rajkot, Gujarat",
    target: "~60 Students Taught",
    duration: "Academic Semester Appointment",
    description:
      "Served as Teaching Assistant for Database Management Systems (DBMS) laboratory practicals, responsible for reinforcing relational database theory and query execution.",
    responsibilities: [
      "Guided approximately 60 students through database concepts and practical laboratory work",
      "Assisted students with SQL/database-related learning and query authoring (DDL, DML, Joins)",
      "Explained technical database concepts (ER diagrams, primary/foreign keys, 3NF normalization) in an approachable way",
      "Received positive feedback for clear explanations and supportive practical mentorship",
    ],
    skills: ["DBMS Instruction", "SQL Queries", "Schema Normalization", "Technical Communication"],
  },
  {
    role: "OFFICE AUTOMATION TOOLS TEACHING ASSISTANT",
    institution: "Darshan University",
    location: "Rajkot, Gujarat",
    target: "Practical Demonstrations",
    duration: "Academic Semester Appointment",
    description:
      "Instructed practical lab sessions covering desktop productivity tools, software workflows, and document processing automation.",
    responsibilities: [
      "Delivered practical demonstrations covering Excel, PowerPoint, and Word functionality",
      "Helped students understand real-world productivity workflows and document automation",
      "Improved technical communication, presentation clarity, and 1-on-1 problem resolution",
      "Guided engineering peers through laboratory evaluations and practical exercises",
    ],
    skills: ["Excel Data Workflows", "PowerPoint & Word", "Technical Communication", "Practical Demonstrations"],
  },
];

export function ExperienceTimeline() {
  return (
    <div className="experience-section-wrapper" id="experience">
      {/* Editorial Section Header */}
      <div className="section-header-v2 text-center">
        <span className="section-eyebrow-v2">
          <Terminal size={13} /> EXPERIENCE
        </span>
        <h2 id="experience-heading" className="section-title-v2">
          Teaching Assistant Experience
        </h2>
        <p className="section-subtitle-v2 mx-auto">
          Academic appointments at Darshan University demonstrating technical leadership, communication, and practical instruction.
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
