import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/home.scss";
import { useInterview } from "../hooks/useInterview";

const Home = () => {
  const { loading, generateReport } = useInterview();

  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

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
