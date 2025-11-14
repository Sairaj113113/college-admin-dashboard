import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isDemo = process.env.REACT_APP_DEMO === "1";

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { username, password });
      if (res.data?.success) {
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  useEffect(() => {
    if (isDemo) {
      // ✅ Auto-fill demo credentials and login
      setUsername("admin");
      setPassword("admin123");
      handleLogin();
    }
  }, [isDemo]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {!isDemo && (
          <form onSubmit={handleLogin} className="form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn primary">Login</button>
          </form>
        )}
        {isDemo && <p>Auto-demo mode enabled 🚀 Redirecting to dashboard...</p>}
      </div>

      {/* Inline CSS */}
      <style>{`
        :root {
          --bg: #0f172a;
          --card: #111827;
          --muted: #9ca3af;
          --text: #e5e7eb;
          --primary: #3b82f6;
          --primary-dark: #1d4ed8;
          --border: #1f2937;
        }

        html, body, #root {
          height: 100%;
          margin: 0;
          background: linear-gradient(135deg, #0f172a 0%, #111827 60%, #0b1022 100%);
          color: var(--text);
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        .login-wrapper {
          height: 100%;
          display: grid;
          place-items: center;
          padding: 24px;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          padding: 28px;
          backdrop-filter: blur(6px);
          animation: fadeIn 300ms ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px);}
          to { opacity: 1; transform: translateY(0);}
        }

        .form {
          display: grid;
          gap: 14px;
          margin-top: 12px;
        }

        input {
          width: 100%;
          background: #0b1220;
          border: 1px solid var(--border);
          color: var(--text);
          border-radius: 10px;
          padding: 12px 14px;
          outline: none;
          transition: border-color 120ms ease, box-shadow 120ms ease;
        }

        input::placeholder { color: #6b7280; }

        input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .btn {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: transform 80ms ease, box-shadow 120ms ease, background 120ms ease;
          font-weight: 600;
        }

        .btn.primary {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .btn.primary:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 12px 20px rgba(59, 130, 246, 0.25);
        }
      `}</style>
    </div>
  );
}

export default Login;
