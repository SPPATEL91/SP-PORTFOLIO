import React from "react";
import { Award, CheckCircle2, ShieldCheck, Zap, Users, ArrowDown } from "lucide-react";

export function HackathonFinalist() {
  return (
    <section className="section-v2 section-dark-contrast" aria-labelledby="hackathon-heading">
      <div className="container">
        <div className="section-header-v2 text-center light-text">
          <span className="section-eyebrow-v2 accent-cyan">
            <Award size={12} /> COMPETITIVE ENGINEERING
          </span>
          <h2 id="hackathon-heading" className="section-title-v2 text-white">
            Hackathon Finalist
          </h2>
          <p className="section-subtitle-v2 mx-auto text-slate-300">
            Advanced through 3 rigorous evaluation stages among ~200–300 competing students at Darshan University.
          </p>
        </div>

        <div className="hackathon-visual-flow">
          {/* Top Banner */}
          <div className="hackathon-top-badge">
            <div className="badge-item">
              <Users size={14} className="accent-cyan" />
              <span>~200–300 Competing Students</span>
            </div>
            <div className="badge-divider" />
            <div className="badge-item">
              <Award size={14} className="accent-cyan" />
              <span>Darshan University Hackathon</span>
            </div>
            <div className="badge-divider" />
            <div className="badge-item">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Grand Finalist Standing</span>
            </div>
          </div>

          {/* 3-Stage Visual Pipeline */}
          <div className="hackathon-stages-grid">
            
            {/* Stage 1 */}
            <div className="stage-flow-card">
              <div className="stage-number">01</div>
              <div className="stage-header">
                <span className="stage-eyebrow">SCREENING ROUND</span>
                <h4 className="stage-title">Ideation &amp; Feasibility</h4>
              </div>
              <p className="stage-desc">
                Defended system architecture, database schema feasibility, and technical problem statement before departmental faculty evaluators.
              </p>
              <div className="stage-status-pill status-passed">
                <CheckCircle2 size={12} /> Passed Screening
              </div>
            </div>

            {/* Down Arrow for mobile / Flow Conduit */}
            <div className="stage-conduit-arrow" aria-hidden="true">
              <ArrowDown size={18} className="accent-cyan" />
            </div>

            {/* Stage 2 */}
            <div className="stage-flow-card">
              <div className="stage-number">02</div>
              <div className="stage-header">
                <span className="stage-eyebrow">PROTOTYPING SPRINT</span>
                <h4 className="stage-title">Rapid Full-Stack Build</h4>
              </div>
              <p className="stage-desc">
                Engineered working REST API endpoints, responsive UI views, and database persistence under time constraints in an agile sprint.
              </p>
              <div className="stage-status-pill status-passed">
                <CheckCircle2 size={12} /> Passed Prototyping
              </div>
            </div>

            {/* Down Arrow for mobile / Flow Conduit */}
            <div className="stage-conduit-arrow" aria-hidden="true">
              <ArrowDown size={18} className="accent-cyan" />
            </div>

            {/* Stage 3 */}
            <div className="stage-flow-card stage-finalist-highlight">
              <div className="stage-number highlight-num">03</div>
              <div className="stage-header">
                <span className="stage-eyebrow accent-cyan">FINAL ROUND DEFENSE</span>
                <h4 className="stage-title text-white">Grand Finalist Defense</h4>
              </div>
              <p className="stage-desc text-slate-300">
                Demonstrated working software live before jury and judging panel, defending security, error contracts, and real utility.
              </p>
              <div className="stage-status-pill status-finalist">
                <Award size={12} /> Finalist Selected
              </div>
            </div>

          </div>

          {/* Verification Footnote */}
          <div className="hackathon-skills-strip">
            <span className="strip-label">DEMONSTRATED COMPETENCIES:</span>
            <div className="strip-tags">
              <span className="strip-chip">Agile Rapid Build</span>
              <span className="strip-chip">Live System Defense</span>
              <span className="strip-chip">Pressure Performance</span>
              <span className="strip-chip">REST API Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
