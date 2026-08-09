import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="8 6 2 12 8 18" />
    <polyline points="16 6 22 12 16 18" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m10.29 3.86-8.18 14.14A2 2 0 0 0 3.93 21h16.14a2 2 0 0 0 1.82-2.99L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.5" fill="currentColor" />
  </svg>
);

const LightbulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a6 6 0 0 0-4 10.5c.6.5 1 1.3 1 2.1V15h6v-.4c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 2Z" />
  </svg>
);

const SEVERITY_LABEL = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const NAV_ITEMS = [
  { key: "technical", label: "Technical Questions", Icon: CodeIcon },
  { key: "behavioral", label: "Behavioral Questions", Icon: ChatIcon },
  { key: "roadmap", label: "Road Map", Icon: MapPinIcon },
];

const MatchRing = ({ value = 0 }) => {
  const size = 92;
  const stroke = 7;

  const radius = (size - stroke) / 2;

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="match-ring"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="match-ring__track"
          strokeWidth={stroke}
          fill="none"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="match-ring__value"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>

      <span className="match-ring__text">{value}%</span>
    </div>
  );
};

const matchLabel = (value) => {
  if (value >= 80) return "Strong match for this role";
  if (value >= 60) return "Good match — a few gaps to close";
  return "Needs focused preparation";
};

const Interview = () => {
  const { interviewId } = useParams();

  const { report, loading, getReportById } = useInterview();

  const [activeTab, setActiveTab] = useState("technical");
  const [expanded, setExpanded] = useState(() => new Set());

  const toggleExpanded = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!interviewId) return;

    getReportById(interviewId);
  }, [interviewId]);

  if (loading) {
    return (
      <div className="page-main">
        <div className="empty-state">Loading interview report...</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="page-main">
        <div className="empty-state">Interview report not found.</div>
      </div>
    );
  }

  const {
    matchScore = 0,
    technicalQuestions = [],
    behavioralQuestions = [],
    skillGaps = [],
    preparationPlan = [],
  } = report;

  const activeMeta = NAV_ITEMS.find((item) => item.key === activeTab);

  const renderContentBadge = () => {
    if (activeTab === "technical")
      return `${technicalQuestions.length} questions`;
    if (activeTab === "behavioral")
      return `${behavioralQuestions.length} questions`;
    if (activeTab === "roadmap") return `${preparationPlan.length}-day plan`;
    return null;
  };

  const renderContent = () => {
    // Technical / Behavioral
    if (activeTab === "technical" || activeTab === "behavioral") {
      const list =
        activeTab === "technical" ? technicalQuestions : behavioralQuestions;

      if (!list.length) {
        return <p className="empty-state">Nothing here yet.</p>;
      }

      return (
        <div className="questions-list">
          {list.map((q, i) => {
            const id = `${activeTab}-${i}`;
            const isObj = typeof q === "object" && q !== null;
            const isOpen = expanded.has(id);

            return (
              <div
                key={id}
                className={`question-item ${isOpen ? "question-item--open" : ""}`}
              >
                <button
                  type="button"
                  className="question-item__row"
                  onClick={() => isObj && toggleExpanded(id)}
                  aria-expanded={isOpen}
                >
                  <span className="question-number">{i + 1}</span>

                  <p className="question-text">{isObj ? q.question : q}</p>

                  {isObj && (q.intention || q.answer) && (
                    <span className="question-item__chevron">
                      <ChevronIcon />
                    </span>
                  )}
                </button>

                {isObj && isOpen && (q.intention || q.answer) && (
                  <div className="question-detail">
                    {q.intention && (
                      <div className="question-detail__block">
                        <span className="question-detail__label">
                          <TargetIcon />
                          Why it's asked
                        </span>
                        <p>{q.intention}</p>
                      </div>
                    )}

                    {q.answer && (
                      <div className="question-detail__block question-detail__block--answer">
                        <span className="question-detail__label">
                          <LightbulbIcon />
                          Sample answer
                        </span>
                        <p>{q.answer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Roadmap
    if (!preparationPlan.length) {
      return <p className="empty-state">No preparation plan yet.</p>;
    }

    return (
      <ol className="roadmap-list">
        {preparationPlan.map((step, i) => (
          <li key={i} className="roadmap-item">
            <span className="roadmap-marker" />

            <div className="roadmap-body">
              <div className="roadmap-heading">
                <span className="roadmap-day">Day {step.day || i + 1}</span>
                <span className="roadmap-title">
                  {typeof step === "string"
                    ? step
                    : step.focus || step.title || `Day ${step.day || i + 1}`}
                </span>
              </div>

              {typeof step === "object" &&
                step.tasks &&
                step.tasks.length > 0 && (
                  <ul className="roadmap-description">
                    {step.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                )}
            </div>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="interview-page">
      {/* Top App Bar */}
      <header className="top-app-bar">
        <div className="top-app-bar__inner">
          <div className="brand">CareerAI</div>

          <nav>
            <a href="/">Dashboard</a>
            <span>Interview Prep</span>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="page-main">
        <div className="page-header">
          <h1>Your interview prep plan</h1>
          <p>
            Based on the job description and your resume, here's your
            personalized breakdown.
          </p>
        </div>

        <div className="interview-panel">
          {/* Left Column */}
          <aside className="interview-nav">
            <span className="nav-eyebrow">Sections</span>

            <nav className="nav-list">
              {NAV_ITEMS.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  type="button"
                  className={`nav-item ${
                    activeTab === key ? "nav-item--active" : ""
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  <span className="nav-item__icon">
                    <Icon />
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Middle Column */}
          <main className="interview-content">
            <div className="content-header">
              <h2>{activeMeta?.label}</h2>
              {renderContentBadge() && (
                <span className="badge badge--plan">
                  {renderContentBadge()}
                </span>
              )}
            </div>

            {renderContent()}
          </main>

          {/* Right Column */}
          <aside className="interview-side">
            <div className="match-score-block">
              <span className="side-eyebrow">Match Score</span>
              <MatchRing value={matchScore} />
              <p className="match-score__hint">{matchLabel(matchScore)}</p>
            </div>

            <div className="skill-gaps-block">
              <div className="side-heading">
                <span className="side-heading__icon">
                  <WarningIcon />
                </span>
                <span className="side-eyebrow">Skill Gaps</span>
              </div>

              <div className="skill-gap-pills">
                {skillGaps.length ? (
                  skillGaps.map((gap, i) => {
                    const isObj = typeof gap === "object" && gap !== null;
                    const severity = isObj ? gap.severity : "medium";

                    return (
                      <span
                        key={i}
                        className={`skill-gap-pill skill-gap-pill--${severity}`}
                      >
                        <span className="skill-gap-pill__name">
                          {isObj ? gap.skill : gap}
                        </span>
                        <span className="skill-gap-pill__severity">
                          {SEVERITY_LABEL[severity] || severity}
                        </span>
                      </span>
                    );
                  })
                ) : (
                  <p className="empty-state">No skill gaps identified.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="page-footer">
        <div className="page-footer__inner">
          <div className="brand">CareerAI</div>

          <div className="copyright">
            © 2026 CareerAI. Powered by Intelligence.
          </div>

          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#help">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Interview;
