import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useAuth } from "../../auth/hooks/useAuth";

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
  </svg>
);

const UploadCloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 16l-4-4-4 4" />
    <path d="M12 12v9" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 5v4h4" />
    <path d="M12 7v5l3 3" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MAX_CHARS = 5000;

const formatDate = (value) => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const Home = () => {
  const { loading, reports, generateReport, getReports } = useInterview();
  const { user, handlelogout } = useAuth();

  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [reportsLoading, setReportsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadReports = async () => {
      setReportsLoading(true);
      try {
        await getReports();
      } catch (error) {
        console.error("Failed to load previous reports:", error);
      } finally {
        if (!cancelled) setReportsLoading(false);
      }
    };

    loadReports();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogoutClick = async () => {
    try {
      await handlelogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    if (!resumeFile && !selfDescription.trim()) {
      alert("Please upload your resume or add a self description.");
      return;
    }

    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      console.log("Generated Report:", data);

      navigate(`/interview/${data._id}`);
    } catch (error) {
      console.error("Generate report failed:", error);
      alert("Failed to generate interview report.");
    }
  };

  return (
    <div className="home-page">
      {/* TopAppBar */}
      <header className="top-app-bar">
        <div className="top-app-bar__inner">
          <div className="brand">CareerAI</div>

          <div className="top-app-bar__right">
            <nav className="nav-links">
              <a href="#dashboard" className="nav-link active">
                Dashboard
              </a>
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

      <main className="page-main">
        <div className="page-header">
          <h1>
            Create your custom <span className="accent">interview plan</span>
          </h1>
          <p>
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        <form className="prep-form" onSubmit={handleGenerate}>
          <div className="form-grid">
            {/* Job Description */}
            <div className="form-column">
              <div className="column-header">
                <span className="column-header__icon">
                  <BriefcaseIcon />
                </span>
                <h2>Target Job Description</h2>
                <span className="badge badge--required">Required</span>
              </div>

              <div className="textarea-shell textarea-shell--large">
                <textarea
                  id="job-description"
                  value={jobDescription}
                  maxLength={MAX_CHARS}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                />
                <span className="char-count">
                  {jobDescription.length} / {MAX_CHARS} chars
                </span>
              </div>
            </div>

            <div className="form-divider" />

            {/* Resume + Self Description */}
            <div className="form-column">
              <div className="column-header">
                <span className="column-header__icon">
                  <PersonIcon />
                </span>
                <h2>Your Profile</h2>
              </div>

              <div className="upload-block">
                <div className="upload-block__label-row">
                  <label htmlFor="resume-upload">Upload Resume</label>
                  <span className="badge badge--best">Best results</span>
                </div>

                <label className="upload-dropzone-lg" htmlFor="resume-upload">
                  <span className="upload-dropzone-lg__icon">
                    <UploadCloudIcon />
                  </span>
                  <span className="upload-dropzone-lg__title">
                    {resumeFile
                      ? resumeFile.name
                      : "Click to upload or drag & drop"}
                  </span>
                  <span className="upload-dropzone-lg__hint">
                    PDF or DOCX (Max 5MB)
                  </span>

                  <input
                    id="resume-upload"
                    type="file"
                    accept="application/pdf,.docx"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="or-divider">
                <span>OR</span>
              </div>

              <div className="self-description-block">
                <label htmlFor="self-description">Quick Self-Description</label>

                <div className="textarea-shell">
                  <textarea
                    id="self-description"
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="notice-bar">
            <span className="notice-bar__icon">
              <InfoIcon />
            </span>
            <p>
              Either a <strong>Resume</strong> or a{" "}
              <strong>Self Description</strong> is required to generate a
              personalized plan.
            </p>
          </div>

          <div className="generate-row">
            <button
              className="generate-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Prep Plan"}
            </button>
          </div>
        </form>

        {/* Previous Reports */}
        {(reportsLoading || (reports && reports.length > 0)) && (
          <section className="previous-reports">
            <div className="previous-reports__header">
              <span className="previous-reports__icon">
                <HistoryIcon />
              </span>
              <h2>Previous Interview Plans</h2>
              {reports && reports.length > 0 && (
                <span className="previous-reports__count">
                  {reports.length}
                </span>
              )}
            </div>

            {reportsLoading && !reports?.length ? (
              <p className="empty-state">Loading your previous plans...</p>
            ) : (
              <div className="previous-reports__list">
                {reports.map((r) => (
                  <button
                    key={r._id}
                    type="button"
                    className="report-card"
                    onClick={() => navigate(`/interview/${r._id}`)}
                  >
                    <div className="report-card__main">
                      <span className="report-card__title">
                        {r.title || "Untitled Interview Plan"}
                      </span>
                      <span className="report-card__date">
                        {formatDate(r.createdAt)}
                      </span>
                    </div>

                    {typeof r.matchScore === "number" && (
                      <span className="report-card__score">
                        {r.matchScore}% match
                      </span>
                    )}

                    <span className="report-card__arrow">
                      <ChevronRightIcon />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}
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

export default Home;
