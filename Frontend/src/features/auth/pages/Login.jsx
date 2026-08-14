import { useState } from "react";
import "../auth.form.scss";
import "../../interview/styles/interview.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Login failed");
    }
  };

  if (loading) {
    return (
      <div className="state-card">
        <span className="state-card__spinner" />
        <span className="state-card__title">Loading...</span>
        <p>This usually takes a few seconds...</p>
      </div>
    );
  }

  return (
    <main className="auth-wrapper">
      {/* Header Navigation Bar */}
      <header className="auth-navbar">
        <Link to="/" className="nav-logo">
          <span className="brand-name">CareerAI</span>
        </Link>
        <div className="nav-actions">
          <span className="nav-text">Don't have an account?</span>
          <Link to="/register" className="nav-btn">
            Sign up
          </Link>
        </div>
      </header>

      <div className="auth-split-container">
        {/* Left Visual Panel */}
        <div className="auth-panel-left">
          <img
            className="panel-bg-image"
            alt="Career Background"
            src="https://media.licdn.com/dms/image/v2/D5612AQEGIckqnN4Wsw/article-cover_image-shrink_720_1280/B56ZWA2gPOHQAM-/0/1741623528189?e=2147483647&v=beta&t=WgRVXE0BPOiGDqzH9XtpxUDu0sVnlKigVTQxtrnx-qY"
          />
          <div className="panel-content">
            <h2>Welcome Back!</h2>
            <p>Grow into a more intelligent career, one sign-in at a time.</p>
          </div>
        </div>

        {/* Right Form Side Panel */}
        <div className="auth-panel-right">
          <div className="form-header">
            <h3>Sign In</h3>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <div className="input-with-icon">
                <MailIcon />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <LockIcon />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" name="remember" />
                Remember me
              </label>
              <a href="#forgot" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="button primary-button">
              Sign In <ArrowIcon />
            </button>
          </form>

          <p className="switch-auth">
            Don't have an account?{" "}
            <Link to="/register" className="login-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <footer className="page-footer">
        <span>© 2026 CareerAI. Powered by Intelligence.</span>
        <nav>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#help">Help Center</a>
        </nav>
      </footer>
    </main>
  );
};

export default Login;
