"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "../../features/auth/AuthContext";
import type { RegisterRequest } from "../../types/auth";
import "../Login/LoginPage.css"; // reuse same layout styles

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterRequest>({
    email: "",
    password: "",
    displayName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(form);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* Left hero — same as login */}
      <div className="auth-hero" aria-hidden="true">
        <div className="auth-hero-overlay" />
        <header className="auth-hero-header">
          <div className="auth-logo">
            <span className="auth-logo-icon">M</span>
            <strong>mangahub</strong>
          </div>
        </header>
        <div className="auth-hero-copy">
          <p className="auth-eyebrow">Start your journey</p>
          <h1>
            Your story<br />
            starts here.
          </h1>
          <p className="auth-hero-sub">
            Join thousands of readers. Build your library, track your progress,
            and never lose your place again.
          </p>
        </div>
        <div className="auth-hero-card">
          <p className="auth-eyebrow">Free forever</p>
          <strong>Everything you need</strong>
          <span>Library · Progress tracking · Reading streaks</span>
        </div>
        <footer className="auth-hero-footer">
          Made for the love of the next chapter.
        </footer>
      </div>

      {/* Right form */}
      <main className="auth-form-panel">
        <div className="auth-form-wrap">
          <p className="auth-eyebrow">Create your account</p>
          <h2 className="auth-form-title">Join Manga Hub.</h2>
          <p className="auth-form-sub">
            Your library is waiting. Set up your account in seconds.
          </p>

          <form id="register-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="register-display-name">Display name</label>
              <input
                id="register-display-name"
                type="text"
                placeholder="How should we call you?"
                autoComplete="name"
                required
                value={form.displayName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, displayName: e.target.value }))
                }
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email address</label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                />
                <button
                  type="button"
                  id="register-toggle-password"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p id="register-error-message" className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              id="register-submit-button"
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>Create account &nbsp;→</>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <button
              id="back-to-login-link"
              type="button"
              className="auth-link"
              onClick={onSwitchToLogin}
            >
              Sign in&nbsp;↗
            </button>
          </p>
        </div>

        <footer className="auth-form-footer">
          <a href="#privacy">Privacy</a>
          <span>·</span>
          <a href="#terms">Terms</a>
          <span>·</span>
          <span>Night mode, always.</span>
        </footer>
      </main>
    </div>
  );
}
