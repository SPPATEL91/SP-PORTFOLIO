import React, { useState } from "react";
import { Terminal, Copy, Check, Sparkles } from "lucide-react";

export function DeveloperTerminal() {
  const [activeTab, setActiveTab] = useState("whoami");
  const [copied, setCopied] = useState(false);

  const commands = {
    whoami: {
      cmd: "smit@portfolio:~$ whoami",
      output: [
        "Smit Pipalava",
        "Role: Computer Science Student & Full-Stack Developer",
        "Degree: B.Tech Computer Engineering (CGPA: 8.87 / 10.0)",
        "Institution: Darshan University, Rajkot, Gujarat",
        "Philosophy: 'Build reliable software that solves real friction.'",
      ],
    },
    stack: {
      cmd: "smit@portfolio:~$ cat stack.json",
      output: [
        "Frontend: React · Next.js · JavaScript (ES6+) · HTML5 · CSS3",
        "Backend: Node.js · Express.js · ASP.NET Core · RESTful APIs",
        "Databases: MongoDB · SQL Server · MySQL · PostgreSQL",
        "Core CS: Data Structures & Algorithms · DBMS · OOP · System Design",
        "Tools: Git & GitHub · Postman · VS Code",
      ],
    },
    stats: {
      cmd: "smit@portfolio:~$ ./get-metrics.sh",
      output: [
        "Academic CGPA: 8.87 / 10.0 (High Distinction)",
        "Full-Stack Projects Engineered: 3+",
        "Teaching Assistant Roles: 2 (DBMS Lab & Office Automation)",
        "Students Mentored in Lab Sessions: 160+ (60+ DBMS, 100+ OAT)",
        "Hackathon Achievement: Grand Finalist (3 Stages, ~200-300 Students)",
      ],
    },
    status: {
      cmd: "smit@portfolio:~$ systemctl status engineer",
      output: [
        "● engineer.service - Full-Stack Developer Active",
        "   Status: Active & building practical software",
        "   Current Focus: API Design, Scalable Schemas & Core CS (DSA)",
        "   Availability: Open for Software Engineering Internships & Roles",
        "   Contact: smitpipalva91@gmail.com",
      ],
    },
  };

  const current = commands[activeTab];

  const handleCopy = () => {
    const text = `${current.cmd}\n${current.output.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dev-terminal-wrapper" aria-label="Developer Terminal">
      <div className="dev-terminal">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="terminal-title">
            <Terminal size={13} /> smit@dev-box: ~
          </div>
          <button
            type="button"
            className="terminal-copy-btn"
            onClick={handleCopy}
            title="Copy command output"
            aria-label="Copy terminal content"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>

        <div className="terminal-tabs">
          {Object.keys(commands).map((key) => (
            <button
              key={key}
              type="button"
              className={`terminal-tab${activeTab === key ? " active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              ${key}
            </button>
          ))}
        </div>

        <div className="terminal-body" role="region" aria-live="polite">
          <div className="terminal-cmd-line">
            <span className="cmd-prompt">{current.cmd}</span>
          </div>
          <div className="terminal-output">
            {current.output.map((line, i) => (
              <p key={i} className="terminal-out-line">{line}</p>
            ))}
          </div>
          <div className="terminal-cursor-line">
            <span className="cmd-prompt">smit@portfolio:~$</span>
            <span className="terminal-blinking-cursor" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}