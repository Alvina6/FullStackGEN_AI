import { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleRegister({ firstName, lastName, username, email, password });
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Registration failed",
      );
    }
  };

  if (loading) {
    return (
      <main className="loading-state">
        <h1>loading ...............</h1>
      </main>
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
          <span className="nav-text">Already have an account?</span>
          <Link to="/login" className="nav-btn">
            Log in
          </Link>
        </div>
      </header>

      <div className="auth-split-container">
        {/* Left Visual Panel */}
        <div className="auth-panel-left">
          <img
            className="panel-bg-image"
            alt="Career Background"
            src="https://img.magnific.com/free-photo/businesswoman-interacting-with-ai-hologram-office_23-2151977876.jpg?semt=ais_test_b&w=740&q=80"
          />
          <div className="panel-content">
            <h2>Accelerate Your Career</h2>
            <p>
              Join thousands of professionals accelerating their careers with
              AI.
            </p>
          </div>
        </div>

        {/* Right Form Side Panel */}
        <div className="auth-panel-right">
          <div className="form-header">
            <h3>Create an Account</h3>
            <p>Enter your details below to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="janedoe123"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="jane@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </div>
            <span className="help-text">
              Must be at least 8 characters long.
            </span>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="button primary-button">
              Create Account
            </button>
          </form>

          <p className="switch-auth">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
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

export default Register;
