import "../auth.form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleRegister({ username, email, password });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Registration failed");
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
          <h2>Create an account</h2>
          <p>Join us today to get started with your dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              name="username"
              id="username"
              placeholder="johndoe"
              required
            />
          </div>

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
            <label htmlFor="password">Password</label>
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
            Create Account
          </button>
        </form>

        <div className="form-footer">
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="login-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
