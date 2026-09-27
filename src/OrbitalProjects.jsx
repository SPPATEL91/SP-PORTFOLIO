import React from "react";
import {
  ArrowUpRight, Layers, CheckCircle2, ChevronRight, Sparkles, ShieldCheck, Database, Server, Terminal, Laptop
} from "lucide-react";

function GithubIcon({ size = 15, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function OrbitalProjects({ projects, onSelectProject }) {
  const p1 = projects["sp-polymers"];
  const p2 = projects["request-management"];
  const p3 = projects["student-projects"];

  return (
    <div className="selected-work-wrapper" id="projects">
      {/* Editorial Section Header */}
      <div className="section-header-v2 text-center">
        <span className="section-eyebrow-v2">
          <Layers size={13} /> SELECTED WORK
        </span>
        <h2 id="projects-heading" className="section-title-v2">
          Software applications built from requirement to deployment.
        </h2>
        <p className="section-subtitle-v2 mx-auto">
          Full-stack web applications engineered with React, Next.js, Node.js, Express, ASP.NET Core, MongoDB, and SQL Server.
        </p>
      </div>

      {/* ========================================================= */}
      {/* PROJECT 01 — FEATURED PROJECT (SP POLYMERS)              */}
      {/* ========================================================= */}
      {p1 && (
        <div className="featured-project-card">
          <div className="featured-card-inner">
            <div className="featured-grid">
              
              {/* Visual Browser Preview Column */}
              <div className="featured-preview-col">
                <div className="browser-mockup-frame">
                  <div className="browser-top-bar">
                    <div className="browser-dots">
                      <span className="b-dot dot-red" />
                      <span className="b-dot dot-yellow" />
                      <span className="b-dot dot-green" />
                    </div>
                    <div className="browser-url-bar">
                      <span className="url-lock">https://</span>
                      <span className="url-text">khodal-industries.vercel.app</span>
                    </div>
                  </div>

                  <div className="browser-content-canvas sp-polymers-canvas">
                    <div className="canvas-header-strip">
                      <div className="canvas-logo-mark">SP POLYMERS</div>
                      <div className="canvas-nav-links">
                        <span>Catalog</span>
                        <span>Grades</span>
                        <span>Quotes</span>
                        <span>Contact</span>
                      </div>
                    </div>

                    <div className="canvas-hero-banner">
                      <div className="banner-tag">PLASTIC RAW MATERIALS MANUFACTURER</div>
                      <h4 className="banner-heading">Polymer Raw Materials &amp; Industrial Grades</h4>
                      <p className="banner-desc">High-density Polyethylene (HDPE), Polypropylene (PP), &amp; Custom Compounds</p>
                    </div>

                    <div className="canvas-catalog-preview">
                      <div className="catalog-mini-card">
                        <span className="mini-chip">HDPE 100</span>
                        <div className="mini-title">Pipe Grade Compound</div>
                        <span className="mini-status">In Stock</span>
                      </div>
                      <div className="catalog-mini-card">
                        <span className="mini-chip">PP Injection</span>
                        <div className="mini-title">Molding Grade Homopolymer</div>
                        <span className="mini-status">In Stock</span>
                      </div>
                      <div className="catalog-mini-card">
                        <span className="mini-chip">LLDPE Film</span>
                        <div className="mini-title">Blown Film Grade</div>
                        <span className="mini-status">Verified Spec</span>
                      </div>
                    </div>

                    <div className="canvas-footer-bar">
                      <span className="canvas-live-badge">
                        <span className="live-dot" /> LIVE ON VERCEL
                      </span>
                      <span className="canvas-tech-tag">React · Next.js · Node.js</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information & Details Column */}
              <div className="featured-info-col">
                <div className="project-badge-header">
                  <span className="featured-num-tag">PROJECT 01 // FEATURED WORK</span>
                  <span className="live-status-pill">
                    <Sparkles size={12} /> LIVE DEMO
                  </span>
                </div>

                <h3 className="featured-project-title">{p1.title}</h3>
                <p className="featured-project-sub">{p1.description}</p>

                {/* Key Engineering Highlights */}
                <div className="engineering-highlights-box">
                  <span className="highlights-label">ENGINEERING HIGHLIGHTS</span>
                  <ul className="highlights-list">
                    <li>
                      <CheckCircle2 size={14} className="highlight-icon" />
                      <span>Sub-second initial paint with Next.js Incremental Static Regeneration (ISR)</span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} className="highlight-icon" />
                      <span>Structured product grade taxonomy &amp; specifications catalog browser</span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} className="highlight-icon" />
                      <span>Integrated commercial quotation inquiry &amp; sample request workflows</span>
                    </li>
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="featured-tech-row">
                  {p1.techBadges.map((badge) => (
                    <span key={badge} className="featured-tech-badge">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Actions Row */}
                <div className="featured-actions-row">
                  {p1.liveUrl && (
                    <a
                      href={p1.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-v2 btn-v2-primary"
                      aria-label="Open SP Polymers Live Demo on Vercel"
                    >
                      <span>VIEW LIVE</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}

                  {p1.githubUrl && (
                    <a
                      href={p1.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-v2 btn-v2-secondary"
                      aria-label="View SP Polymers source code on GitHub"
                    >
                      <GithubIcon size={15} />
                      <span>GITHUB</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectProject("sp-polymers")}
                    className="btn-v2 btn-v2-ghost"
                    aria-label="View full case study for SP Polymers"
                  >
                    <span>Full Case Study</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PROJECTS 02 & 03 GRID                                     */}
      {/* ========================================================= */}
      <div className="secondary-projects-grid">
        
        {/* ---------------- PROJECT 02 ---------------- */}
        {p2 && (
          <div className="grid-project-card">
            <div className="browser-mockup-frame frame-compact">
              <div className="browser-top-bar">
                <div className="browser-dots">
                  <span className="b-dot dot-red" />
                  <span className="b-dot dot-yellow" />
                  <span className="b-dot dot-green" />
                </div>
                <div className="browser-url-bar">
                  <span className="url-lock">localhost:</span>
                  <span className="url-text">3000/dashboard/tickets</span>
                </div>
              </div>

              <div className="browser-content-canvas request-mgmt-canvas">
                <div className="rms-mini-header">
                  <div className="rms-logo"><Server size={13} /> SERVICE REQUEST SYSTEM</div>
                  <span className="rms-role-badge">Admin Dashboard</span>
                </div>

                <div className="rms-tickets-list">
                  <div className="rms-ticket-row">
                    <span className="t-id">#TK-1082</span>
                    <span className="t-title">Network Switch Port Configuration</span>
                    <span className="t-status status-active">Under Review</span>
                  </div>
                  <div className="rms-ticket-row">
                    <span className="t-id">#TK-1081</span>
                    <span className="t-title">Database Permission Scope Grant</span>
                    <span className="t-status status-done">Resolved</span>
                  </div>
                </div>

                <div className="rms-meta-strip">
                  <span>REST API Controller · MongoDB Persistence · JWT Auth</span>
                </div>
              </div>
            </div>

            <div className="grid-card-body">
              <div className="project-badge-header">
                <span className="grid-num-tag">PROJECT 02</span>
                <span className="grid-cat-pill">FULL-STACK ENTERPRISE</span>
              </div>

              <h3 className="grid-project-title">{p2.title}</h3>
              <p className="grid-project-desc">{p2.description}</p>

              <div className="grid-highlights-list">
                <div className="grid-highlight-item">
                  <ShieldCheck size={13} className="accent-blue" />
                  <span>Role-based dashboards for Users, Staff, and Administrators</span>
                </div>
                <div className="grid-highlight-item">
                  <Terminal size={13} className="accent-blue" />
                  <span>Stateful ticket lifecycle (Submitted → Assigned → Review → Resolved)</span>
                </div>
                <div className="grid-highlight-item">
                  <Database size={13} className="accent-blue" />
                  <span>Express REST APIs with input validation &amp; MongoDB schemas</span>
                </div>
              </div>

              <div className="grid-tech-row">
                {p2.techBadges.map((badge) => (
                  <span key={badge} className="grid-tech-badge">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="grid-actions-row">
                {p2.githubUrl && (
                  <a
                    href={p2.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-v2 btn-v2-secondary"
                    aria-label="View Service Request Management System source code on GitHub"
                  >
                    <GithubIcon size={14} />
                    <span>GITHUB</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onSelectProject("request-management")}
                  className="btn-v2 btn-v2-ghost"
                  aria-label="View details for Service Request Management System"
                >
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PROJECT 03 ---------------- */}
        {p3 && (
          <div className="grid-project-card">
            <div className="browser-mockup-frame frame-compact">
              <div className="browser-top-bar">
                <div className="browser-dots">
                  <span className="b-dot dot-red" />
                  <span className="b-dot dot-yellow" />
                  <span className="b-dot dot-green" />
                </div>
                <div className="browser-url-bar">
                  <span className="url-lock">portal.univ:</span>
                  <span className="url-text">443/projects/evaluations</span>
                </div>
              </div>

              <div className="browser-content-canvas academic-mgmt-canvas">
                <div className="spms-mini-header">
                  <div className="spms-logo"><Laptop size={13} /> ACADEMIC PROJECT PORTAL</div>
                  <span className="spms-role-badge">Faculty Evaluator</span>
                </div>

                <div className="spms-milestones-grid">
                  <div className="spms-milestone-box">
                    <span className="ms-num">M1</span>
                    <span className="ms-name">Proposal</span>
                    <span className="ms-grade">Approved</span>
                  </div>
                  <div className="spms-milestone-box">
                    <span className="ms-num">M2</span>
                    <span className="ms-name">Mid-Term</span>
                    <span className="ms-grade">Scored 94/100</span>
                  </div>
                  <div className="spms-milestone-box">
                    <span className="ms-num">M3</span>
                    <span className="ms-name">Final Defense</span>
                    <span className="ms-grade">Pending</span>
                  </div>
                </div>

                <div className="spms-meta-strip">
                  <span>ASP.NET Core Web API · SQL Server DB · Claims RBAC</span>
                </div>
              </div>
            </div>

            <div className="grid-card-body">
              <div className="project-badge-header">
                <span className="grid-num-tag">PROJECT 03</span>
                <span className="grid-cat-pill">ACADEMIC GOVERNANCE</span>
              </div>

              <h3 className="grid-project-title">{p3.title}</h3>
              <p className="grid-project-desc">{p3.description}</p>

              <div className="grid-highlights-list">
                <div className="grid-highlight-item">
                  <ShieldCheck size={13} className="accent-blue" />
                  <span>3 Portals: Student Team Workspace, Faculty Hub, Admin Center</span>
                </div>
                <div className="grid-highlight-item">
                  <Terminal size={13} className="accent-blue" />
                  <span>ASP.NET Core Web API controllers with Claims-based RBAC</span>
                </div>
                <div className="grid-highlight-item">
                  <Database size={13} className="accent-blue" />
                  <span>SQL Server normalized 3NF database schema &amp; audit history</span>
                </div>
              </div>

              <div className="grid-tech-row">
                {p3.techBadges.map((badge) => (
                  <span key={badge} className="grid-tech-badge">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="grid-actions-row">
                {p3.githubUrl && (
                  <a
                    href={p3.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-v2 btn-v2-secondary"
                    aria-label="View Student Project Management System source code on GitHub"
                  >
                    <GithubIcon size={14} />
                    <span>GITHUB</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onSelectProject("student-projects")}
                  className="btn-v2 btn-v2-ghost"
                  aria-label="View details for Student Project Management System"
                >
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
