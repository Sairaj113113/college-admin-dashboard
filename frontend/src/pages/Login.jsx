import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Always redirect to dashboard immediately
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <p>Auto-demo mode enabled 🚀 Redirecting to dashboard...</p>
      </div>

      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          background: #0f172a;
          color: #e5e7eb;
          font-family: Inter, system-ui, sans-serif;
        }

        .login-wrapper {
          height: 100%;
          display: grid;
          place-items: center;
        }

        .login-card {
          padding: 24px;
          background: #111827;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}

export default Login;
