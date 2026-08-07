import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";

const NAV_ITEMS = [
  {
    key: "technical",
    label: "Technical Questions",
    icon: "code",
  },
  {
    key: "behavioral",
    label: "Behavioral Questions",
    icon: "forum",
  },
  {
    key: "roadmap",
    label: "Road Map",
    icon: "map",
  },
];

const MatchRing = ({ value = 0 }) => {
  const size = 76;
  const stroke = 6;

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

const Interview = () => {
  const { interviewId } = useParams();

  const { report, loading, getReportById } = useInterview();

  const [activeTab, setActiveTab] = useState("technical");

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

  const renderContent = () => {
    // Technical / Behavioral
    if (activeTab === "technical" || activeTab === "behavioral") {
      const list =
        activeTab === "technical" ? technicalQuestions : behavioralQuestions;

      if (!list.length) {
        return <p className="empty-state">Nothing here yet.</p>;
      }

      if (loading) {
        return (
          <main>
            <h1>Loading your Interview Plan.....</h1>
          </main>
        );
      }

      return (
        <div className="questions-list">
          {list.map((q, i) => (
            <div key={i} className="question-item">
              <span className="question-number">{i + 1}</span>

              <p className="question-text">
                {typeof q === "string" ? q : q.question}
              </p>
            </div>
          ))}
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
              <span className="roadmap-title">
                {typeof step === "string"
                  ? step
                  : step.focus || step.title || `Day ${step.day}`}
              </span>

              {typeof step === "object" && step.tasks && step.tasks.length > 0 && (
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
    <div>
      {/* Top App Bar */}

      <header className="top-app-bar">
        <div className="brand">CareerAI</div>

        <nav>
          <a href="/">Dashboard</a>
          <span>Interview Prep</span>
        </nav>
      </header>

      {/* Main */}

      <main className="page-main">
        <div className="hero">
          <h1>Your Interview Prep Plan</h1>

          <p>
            Based on the job description and your resume, here's a personalized
            breakdown.
          </p>
        </div>

        <div className="interview-panel">
          {/* Left Column */}

          <aside className="interview-nav">
            <div className="match-score">
              <MatchRing value={matchScore} />

              <span className="match-score__label">Match Score</span>
            </div>

            <nav className="nav-list">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`nav-item ${
                    activeTab === item.key ? "nav-item--active" : ""
                  }`}
                  onClick={() => setActiveTab(item.key)}
                >
                  <span className="material-symbols-outlined nav-item__icon">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Middle Column */}

          <main className="interview-content">
            <div className="content-header">
              {activeMeta && (
                <span className="material-symbols-outlined content-header__icon">
                  {activeMeta.icon}
                </span>
              )}

              <h2>{activeMeta?.label}</h2>
            </div>

            {renderContent()}
          </main>

          {/* Right Column */}

          <aside className="interview-side">
            <div className="side-heading">
              <span className="material-symbols-outlined side-heading__icon">
                warning
              </span>

              <h3>Skill Gaps</h3>
            </div>

            <div className="skill-gap-pills">
              {skillGaps.length ? (
                skillGaps.map((skill, i) => (
                  <span key={i} className="skill-gap-pill">
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))
              ) : (
                <p className="empty-state">No skill gaps identified.</p>
              )}
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
