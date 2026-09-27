import React, { useEffect, useRef, useState } from "react";
import { Terminal, FileText, X, Menu, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const resumeUrl = "/Smit_Pipalava_Resume.pdf";

export function Navbar({ scrollProgress, onOpenCmd, activeSection, onSelectSection, Magnetic }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navLinksRef = useRef({});

  // Detect scroll elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update sliding indicator position based on active section
  useEffect(() => {
    const activeEl = navLinksRef.current[activeSection];
    if (activeEl) {
      const { offsetLeft, offsetWidth } = activeEl;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeEl = navLinksRef.current[activeSection];
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  return (
    <>
      <header className={`navbar-floating-header${scrolled ? " is-scrolled" : ""}`}>
        {/* Top Scroll Progress Line */}
        <div
          className="top-scroll-progress-line"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
          aria-hidden="true"
        />

        <div className="container navbar-container">
          <nav className="navbar-glass-pill" aria-label="Main Navigation">
            
            {/* Brand Logo */}
            <Magnetic as="a" href="#home" className="navbar-brand-link" aria-label="Smit Pipalava Portfolio Home">
              <span className="brand-monogram">SP</span>
              <div className="brand-text-block">
                <span className="brand-name-text">SMIT PIPALAVA</span>
                <span className="brand-sub-badge">Full-Stack</span>
              </div>
            </Magnetic>

            {/* Desktop Navigation Links with Animated Sliding Indicator */}
            <div className="navbar-nav-links-wrapper" role="menubar">
              <div
                className="nav-sliding-pill-indicator"
                style={{
                  transform: `translateX(${indicatorStyle.left}px)`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                }}
                aria-hidden="true"
              />

              {NAV_ITEMS.map(({ label, id }) => {
                const isActive = activeSection === id;
                return (
                  <a
                    key={id}
                    ref={(el) => { navLinksRef.current[id] = el; }}
                    href={`#${id}`}
                    className={`nav-link-pill-item${isActive ? " is-active" : ""}`}
                    onClick={() => onSelectSection?.(id)}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </a>
                );
              })}
            </div>

            {/* Right-Side Command Palette & Resume Actions */}
            <div className="navbar-actions-right">
              <button
                type="button"
                className="btn-cmd-palette-trigger"
                onClick={onOpenCmd}
                title="Open Command Palette (Ctrl+K or ⌘K)"
                aria-label="Open Command Palette"
              >
                <Terminal size={12} />
                <span className="cmd-key-badge">⌘K</span>
              </button>

              <Magnetic as="a" href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Smit_Pipalava_Resume.pdf" className="btn-navbar-resume" aria-label="Download Resume (PDF)">
                <FileText size={13} />
                <span>Resume</span>
              </Magnetic>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="mobile-hamburger-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-navigation-drawer${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-brand">SMIT PIPALAVA</span>
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mobile-drawer-links">
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`mobile-drawer-link${activeSection === id ? " is-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{label}</span>
                <ArrowUpRight size={14} className="mobile-link-arrow" />
              </a>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="mobile-cmd-btn"
              onClick={() => {
                setMobileOpen(false);
                onOpenCmd();
              }}
            >
              <Terminal size={14} /> Open Command Palette (⌘K)
            </button>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Smit_Pipalava_Resume.pdf"
              className="mobile-resume-download"
            >
              <FileText size={14} /> Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
