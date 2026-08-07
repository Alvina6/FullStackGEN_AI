import React, { useState } from "react";
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

    if (!resumeFile) {
      alert("Please upload your resume.");
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
          <nav className="nav-links">
            <a href="#dashboard" className="nav-link active">
              Dashboard
            </a>
          </nav>
        </div>
      </header>

      <main className="page-main">
        <div className="hero">
          <h1>Prepare for Success</h1>

          <p>
            Provide context about your upcoming interview, and our AI will
            generate a personalized preparation plan.
          </p>
        </div>

        <form className="prep-form" onSubmit={handleGenerate}>
          <div className="form-grid">
            {/* Job Description */}
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
                  placeholder="e.g., Software Engineer at TechCorp..."
                />
              </div>
            </div>

            {/* Resume + Self Description */}
            <div className="form-column">
              {/* Resume */}
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
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Self Description */}
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
              disabled={loading}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                auto_awesome
              </span>

              {loading ? "Generating..." : "Generate Prep Plan"}
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
