import React from 'react';
import { ArrowRight, Inbox, Cpu, GitMerge, CheckCircle2, Rocket } from 'lucide-react';

interface WorkflowBarProps {
  onStageClick?: (stage: string) => void;
}

export const WorkflowBar: React.FC<WorkflowBarProps> = ({ onStageClick }) => {
  const stages = [
    { num: '01', title: 'Capture', desc: 'Text / PDF / Link', icon: Inbox },
    { num: '02', title: 'Extract', desc: 'Entities & Dates', icon: Cpu },
    { num: '03', title: 'Reconcile', desc: 'Detect Conflicts', icon: GitMerge },
    { num: '04', title: 'Verify', desc: 'Low-Confidence Review', icon: CheckCircle2 },
    { num: '05', title: 'Act', desc: 'Unified Timeline & Tasks', icon: Rocket },
  ];

  return (
    <div className="workflow-strip">
      <div className="workflow-legend">
        <span className="workflow-legend-label">Campus Workflow Pipeline:</span>
      </div>

      <div className="workflow-steps-list">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <React.Fragment key={stage.title}>
              <div
                className="workflow-step-pill active"
                onClick={() => onStageClick && onStageClick(stage.title)}
                title={`Pipeline Stage ${stage.num}: ${stage.title} — ${stage.desc}`}
                style={{ cursor: 'pointer' }}
              >
                <span className="step-num">{stage.num}</span>
                <Icon size={12} style={{ color: '#818cf8' }} />
                <span>{stage.title}</span>
              </div>
              {idx < stages.length - 1 && (
                <ArrowRight size={12} className="workflow-arrow" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
