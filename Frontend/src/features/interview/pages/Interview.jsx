import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useAuth } from "../../auth/hooks/useAuth";

// Icon Components
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const LightbulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const FileWarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="13" x2="12" y2="16" />
    <line x1="12" y1="18.5" x2="12.01" y2="18.5" />
  </svg>
);

// Constants
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

// Shared shell used by the loading / not-found states so they don't
// render as bare unstyled text before the report is available.
const InterviewShell = ({ user, onLogout, children }) => (
  <div className="interview-page">
    <header className="top-app-bar">
      <div className="top-app-bar__inner">
        <div className="brand">CareerAI</div>

        <div className="top-app-bar__right">
          <nav>
            <a href="/">Dashboard</a>
            <span>Interview Prep</span>
          </nav>

          {user && (
            <div className="user-menu">
              <span className="user-menu__avatar">
                {(user.username || user.email || "?").charAt(0).toUpperCase()}
              </span>
              <span className="user-menu__name">
                {user.username || user.email}
              </span>
              <button
                type="button"
                className="user-menu__logout"
                onClick={onLogout}
                title="Log out"
              >
                <LogoutIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>

    <main className="state-screen">{children}</main>
  </div>
);

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { report, loading, getReportById, getResumePdf } =
    useInterview(interviewId);
  const { user, handlelogout } = useAuth();

  const [activeTab, setActiveTab] = useState("technical");
  const [expanded, setExpanded] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const handleLogoutClick = async () => {
    try {
      await handlelogout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout");
    }
  };

  useEffect(() => {
    if (!interviewId) return;

    getReportById(interviewId);
  }, [interviewId]);

  if (loading) {
    return (
      <InterviewShell user={user} onLogout={handleLogoutClick}>
        <div className="state-card">
          <span className="state-card__spinner" />
          <span className="state-card__title">Preparing your Resume</span>
          <p>This usually takes a few seconds...</p>
        </div>
      </InterviewShell>
    );
  }

  if (!report) {
    return (
      <InterviewShell user={user} onLogout={handleLogoutClick}>
        <div className="state-card">
          <span className="state-card__icon">
            <FileWarningIcon />
          </span>
          <span className="state-card__title">Report not found</span>
          <p>We couldn't find this interview report.</p>
        </div>
      </InterviewShell>
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

          <div className="top-app-bar__right">
            <nav>
              <a href="/">Dashboard</a>
              <span>Interview Prep</span>
            </nav>

            {user && (
              <div className="user-menu">
                <span className="user-menu__avatar">
                  {(user.username || user.email || "?").charAt(0).toUpperCase()}
                </span>
                <span className="user-menu__name">
                  {user.username || user.email}
                </span>
                <button
                  type="button"
                  className="user-menu__logout"
                  onClick={handleLogoutClick}
                  title="Log out"
                >
                  <LogoutIcon />
                </button>
              </div>
            )}
          </div>
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
              <button
                onClick={() => {
                  getResumePdf(interviewId);
                }}
                className="generate-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Resume"}
              </button>
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
