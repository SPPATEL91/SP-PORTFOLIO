import React from "react";
import { Award, ShieldCheck, Cpu, Users, Award as AwardIcon } from "lucide-react";

const HIGHLIGHTS = [
  {
    number: "8.87",
    label: "CGPA",
    subtext: "High Distinction · Darshan Univ",
    icon: Award,
  },
  {
    number: "3",
    label: "Major Projects",
    subtext: "End-to-End Full-Stack Systems",
    icon: Cpu,
  },
  {
    number: "2",
    label: "Teaching Assistant Roles",
    subtext: "DBMS & Office Automation Labs",
    icon: ShieldCheck,
  },
  {
    number: "200–300",
    label: "Hackathon Participants",
    subtext: "Competitive Student Field",
    icon: Users,
  },
  {
    number: "Final Round",
    label: "Hackathon Stage",
    subtext: "Reached Last Evaluation Round",
    icon: AwardIcon,
  },
];

export function ProofMetrics() {
  return (
    <section className="engineering-highlights-section" aria-label="Engineering Highlights">
      <div className="container">
        <div className="highlights-header">
          <span className="highlights-eyebrow">VERIFIED TRACK RECORD</span>
          <h3 className="highlights-title">ENGINEERING HIGHLIGHTS</h3>
        </div>

        <div className="highlights-grid">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="highlight-metric-card">
                <div className="metric-icon-box">
                  <Icon size={16} />
                </div>
                <div className="metric-number">{item.number}</div>
                <div className="metric-label">{item.label}</div>
                <div className="metric-subtext">{item.subtext}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
