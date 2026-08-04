import { useState } from "react";
import "../auth.form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

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
      <main>
        <h1>loading ...............</h1>
      </main>
    );
  }

  return (
    <main className="auth-wrapper">
      <div className="form-card">
        <div className="form-header">
          <h2>Welcome back</h2>
          <p>Please sign in to continue to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              id="email"
              placeholder="alex@company.com"
              required
            />
          </div>

          <div className="input-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="#forgot" className="forgot-link">
                Forgot?
              </a>
            </div>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="button primary-button">
            Sign In
          </button>
        </form>
        <div className="form-footer">
          <p>
            Don't have an account?{" "}
            <Link to={"/register"} className="login-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
