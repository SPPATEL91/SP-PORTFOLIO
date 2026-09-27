import React from "react";
import { Terminal, CheckCircle2, Calendar, MapPin, Users } from "lucide-react";

const EXPERIENCES = [
  {
    role: "DBMS Teaching Assistant",
    institution: "Darshan University",
    location: "Rajkot, Gujarat",
    target: "Guided ~60 Students",
    duration: "Academic Semester Appointment",
    description:
      "Served as Teaching Assistant for Database Management Systems (DBMS) lab sessions, responsible for reinforcing relational database theory and hands-on query authoring.",
    responsibilities: [
      "Guided approximately 60 students through weekly database management laboratory practicals",
      "Explained database concepts, ER modeling, primary/foreign keys, and 3NF schema normalization",
      "Assisted students with SQL query execution, database joins, and troubleshooting learning friction",
      "Received positive feedback for clear explanations and supportive practical mentorship",
    ],
    skills: ["DBMS Instruction", "SQL Queries", "Schema Normalization", "Technical Communication"],
  },
  {
    role: "Office Automation Tools Teaching Assistant",
    institution: "Darshan University",
    location: "Rajkot, Gujarat",
    target: "Instructed ~100 Students",
    duration: "Academic Semester Appointment",
    description:
      "Instructed practical sessions covering desktop productivity suites, structured software workflows, and document processing automation.",
    responsibilities: [
      "Taught practical Excel, PowerPoint, and Word functionality in weekly lab demonstrations",
      "Helped students understand real-world productivity workflows, data formatting, and presentation structure",
      "Improved technical communication, presentation clarity, and 1-on-1 student problem resolution",
      "Mentored engineering peers through practical evaluations and workflow exercises",
    ],
    skills: ["Productivity Workflows", "Excel Data Processing", "Presentation Skills", "Peer Mentorship"],
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
