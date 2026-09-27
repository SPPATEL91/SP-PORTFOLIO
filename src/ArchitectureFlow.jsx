import React, { useState } from "react";
import { Layers, Server, Database, Globe, CheckCircle2, Cpu, ArrowRight } from "lucide-react";

/**
 * ArchitectureFlow
 * Interactive Technical Architecture Pipeline for Projects:
 * Visualizes Frontend ➔ API / Middleware ➔ Backend ➔ Database / Deployment.
 * Includes animated data-transfer packets along connection conduits
 * and interactive node inspection.
 */
export function ArchitectureFlow({ nodes, projectName }) {
  const [activeNode, setActiveNode] = useState(null);

  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="arch-pipeline-container" aria-label={`System Architecture for ${projectName}`}>
      <div className="arch-pipeline-header">
        <span className="arch-pipeline-label">
          <Layers size={11} /> System Architecture &amp; Data Conduit
        </span>
        <span className="arch-pipeline-hint">Hover node to inspect role</span>
      </div>

      <div className="arch-pipeline-track">
        {nodes.map((node, idx) => {
          const isSelected = activeNode?.name === node.name;
          const isLast = idx === nodes.length - 1;

          return (
            <React.Fragment key={node.name}>
              <div
                className={`arch-node-box${isSelected ? " is-active" : ""}`}
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
                tabIndex={0}
                role="button"
                aria-label={`${node.tier}: ${node.name}`}
              >
                <div className="arch-node-tier">{node.tier}</div>
                <div className="arch-node-name">{node.name}</div>
                <div className="arch-node-role">{node.role}</div>
              </div>

              {!isLast && (
                <div className="arch-conduit" aria-hidden="true">
                  <div className="arch-conduit-line">
                    <span className="arch-conduit-pulse" />
                  </div>
                  <ArrowRight size={10} className="arch-conduit-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Dynamic contextual inspection drawer */}
      <div className={`arch-inspector-drawer${activeNode ? " is-open" : ""}`} aria-live="polite">
        {activeNode ? (
          <div className="arch-inspector-content">
            <span className="arch-inspector-pill">{activeNode.tier}</span>
            <div className="arch-inspector-detail">
              <strong>{activeNode.name}:</strong> {activeNode.details}
            </div>
          </div>
        ) : (
          <div className="arch-inspector-placeholder">
            <span>Hover any tier above to inspect architectural responsibilities</span>
          </div>
        )}
      </div>
    </div>
  );
}
