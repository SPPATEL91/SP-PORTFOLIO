import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, FileText, Mail, ExternalLink, Code2, Layers, BookOpen, GraduationCap, Award, Zap } from "lucide-react";

function Github({ size = 14, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ size = 14, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function CommandPalette({ isOpen, onClose, onSelectAction }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    { id: "projects", label: "Selected Work / Projects", category: "Navigation", icon: Layers, href: "#projects" },
    { id: "about", label: "About & Education", category: "Navigation", icon: BookOpen, href: "#about" },
    { id: "skills", label: "Technical Skills", category: "Navigation", icon: Code2, href: "#skills" },
    { id: "experience", label: "Experience & Teaching", category: "Navigation", icon: GraduationCap, href: "#experience" },
    { id: "proof", label: "Proof & Verified Achievements", category: "Navigation", icon: Award, href: "#proof" },
    { id: "terminal", label: "Developer Terminal", category: "Navigation", icon: Zap, href: "#terminal" },
    { id: "contact", label: "Contact & Collaborations", category: "Navigation", icon: Mail, href: "#contact" },
    { id: "resume", label: "Download Resume (PDF)", category: "Document", icon: FileText, href: "/Smit_Pipalava_Resume.pdf", external: true },
    { id: "github", label: "GitHub Profile", category: "Social", icon: Github, href: "https://github.com/SPPATEL91", external: true },
    { id: "linkedin", label: "LinkedIn Profile", category: "Social", icon: Linkedin, href: "https://www.linkedin.com/in/smit-pipalava-54b063311", external: true },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      execute(filtered[selectedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const execute = (item) => {
    onClose();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="cmd-palette-box" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="cmd-header">
          <Search size={16} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search sections... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>

        <div className="cmd-list" role="listbox">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No matching commands found.</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-item${isSelected ? " selected" : ""}`}
                  onClick={() => execute(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="cmd-item-left">
                    <span className="cmd-icon-wrap"><Icon size={14} /></span>
                    <span className="cmd-item-label">{item.label}</span>
                  </div>
                  <div className="cmd-item-right">
                    <span className="cmd-item-cat">{item.category}</span>
                    {item.external ? <ExternalLink size={12} /> : <ArrowRight size={12} />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵</kbd></span>
          <span>Close with <kbd>ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}