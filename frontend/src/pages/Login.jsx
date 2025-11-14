import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Always bypass login and go straight to dashboard
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <p>Auto-demo mode enabled 🚀 Redirecting to dashboard...</p>
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
      `}</style>
    </div>
  );
}

export default Login;
