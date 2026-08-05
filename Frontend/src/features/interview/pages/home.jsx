import React, { useState } from "react";
import "../styles/home.scss";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      console.log({ jobDescription, resumeFile, selfDescription });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="home-page">
      {/* TopAppBar */}
      <header className="top-app-bar">
        <div className="top-app-bar__inner">
          <div className="brand">CareerAI</div>
          <nav className="nav-links">
            <a href="#dashboard" className="nav-link active">
              Dashboard
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="page-main">
        <div className="hero">
          <h1>Prepare for Success</h1>
          <p>
            Provide context about your upcoming interview, and our AI will
            generate a personalized preparation plan.
          </p>
        </div>

        <form
          className="prep-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <div className="form-grid">
            {/* Left Column: Job Description */}
            <div className="form-column">
              <div className="field-header">
                <label htmlFor="job-description">Job Description</label>
                <p>Paste the description of the role you are applying for.</p>
              </div>
              <div className="textarea-shell">
                <textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="e.g., Senior Software Engineer at TechCorp..."
                />
              </div>
            </div>

            {/* Right Column: Resume Upload + Self Description */}
            <div className="form-column">
              <div className="resume-upload-block">
                <label htmlFor="resume-upload">Your Resume</label>
                <p>Upload your resume to provide context.</p>

                <label className="upload-dropzone" htmlFor="resume-upload">
                  <span className="material-symbols-outlined upload-icon">
                    upload_file
                  </span>
                  <span>
                    {resumeFile ? resumeFile.name : "Upload PDF Resume"}
                  </span>
                  <input
                    id="resume-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
              </div>

              <div className="self-description-block">
                <div className="field-header">
                  <label htmlFor="self-description">
                    Self Description (Optional)
                  </label>
                  <p>Add any specific goals or areas you want to focus on.</p>
                </div>
                <div className="textarea-shell">
                  <textarea
                    id="self-description"
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    placeholder="e.g., I want to focus on behavioral questions..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="generate-row">
            <button
              className="generate-button"
              type="submit"
              disabled={generating}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              {generating ? "Generating..." : "Generate Prep Plan"}
            </button>
          </div>
        </form>
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
