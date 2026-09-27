import React, { useEffect, useRef, useState } from "react";
import { Award, CheckCircle2, TrendingUp, Users, ShieldCheck, Cpu } from "lucide-react";

const METRICS_DATA = [
  {
    target: 8.87,
    isFloat: true,
    suffix: "",
    label: "Academic CGPA",
    sublabel: "/ 10.0 High Distinction · Darshan Univ",
    icon: Award,
  },
  {
    target: 3,
    isFloat: false,
    suffix: "+",
    label: "Enterprise Web Apps",
    sublabel: "End-to-End Full-Stack Deployments",
    icon: Cpu,
  },
  {
    target: 2,
    isFloat: false,
    suffix: "",
    label: "TA Appointments",
    sublabel: "DBMS & Office Automation Labs",
    icon: ShieldCheck,
  },
  {
    target: 160,
    isFloat: false,
    suffix: "+",
    label: "Students Mentored",
    sublabel: "Weekly Practical Lab Instructions",
    icon: Users,
  },
  {
    target: 3,
    isFloat: false,
    prefix: "Stage 0",
    suffix: " Finalist",
    customText: "Top Finalist",
    label: "Hackathon Finalist",
    sublabel: "3 Competitive Rounds (~200-300 Devs)",
    icon: TrendingUp,
  },
  {
    target: 100,
    isFloat: false,
    suffix: "%",
    label: "Production Uptime",
    sublabel: "Live in Commercial Use (Khodal Ind.)",
    icon: CheckCircle2,
  },
];

export function ProofMetrics() {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(
    METRICS_DATA.map((m) => (m.isFloat ? 0.0 : 0))
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic: 1 - pow(1 - progress, 3)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              METRICS_DATA.map((m) => {
                if (m.isFloat) {
                  return Number((m.target * easeOut).toFixed(2));
                }
                return Math.floor(m.target * easeOut);
              })
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(METRICS_DATA.map((m) => m.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="proof-metrics-grid" aria-label="Verified Track Record Metrics">
      {METRICS_DATA.map((m, idx) => {
        const Icon = m.icon;
        let displayVal;
        if (m.customText && counts[idx] >= m.target) {
          displayVal = m.customText;
        } else if (m.isFloat) {
          displayVal = counts[idx].toFixed(2) + m.suffix;
        } else {
          displayVal = (m.prefix || "") + counts[idx] + m.suffix;
        }

        return (
          <div key={m.label} className="proof-metric-card">
            <div className="proof-card-top">
              <div className="proof-metric-icon">
                <Icon size={16} />
              </div>
              <span className="proof-metric-dot" aria-hidden="true" />
            </div>
            <div className="proof-number-val">{displayVal}</div>
            <div className="proof-metric-title">{m.label}</div>
            <div className="proof-metric-sub">{m.sublabel}</div>
          </div>
        );
      })}
    </div>
  );
}
