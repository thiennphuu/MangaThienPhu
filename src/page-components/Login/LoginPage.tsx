"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "../../features/auth/AuthContext";
import type { LoginRequest } from "../../types/auth";
import "./LoginPage.css";

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

export function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form);
      // AuthContext updates isAuthenticated → App re-renders to main view
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* ── Left panel — brand hero ── */}
      <div className="auth-hero" aria-hidden="true">
        <div className="auth-hero-overlay" />
        <header className="auth-hero-header">
          <div className="auth-logo">
            <span className="auth-logo-icon">M</span>
            <strong>mangahub</strong>
          </div>
          <a href="#explore" className="auth-explore-link">
            Explore the library&nbsp;↗
          </a>
        </header>
        <div className="auth-hero-copy">
          <p className="auth-eyebrow">Your daily escape</p>
          <h1>
            One more chapter.<br />
            A whole new world.
          </h1>
          <p className="auth-hero-sub">
            Your quiet corner of the manga universe. Pick up where you left off,
            and get lost in what comes next.
          </p>
        </div>
        <div className="auth-hero-card">
          <p className="auth-eyebrow">Tonight&apos;s spotlight</p>
          <strong>Tokyo After Dark</strong>
          <span>Seinen / Sci-fi / Mystery</span>
          <div className="auth-hero-chapter">
            <em>01</em>
            <small>Every great escape starts with a single chapter.</small>
          </div>
        </div>
        <footer className="auth-hero-footer">
          Made for the love of the next chapter.
        </footer>
      </div>

      {/* ── Right panel — login form ── */}
      <main className="auth-form-panel">
        <div className="auth-form-wrap">
          <p className="auth-eyebrow">Your reading room</p>
          <h2 className="auth-form-title">Welcome back.</h2>
          <p className="auth-form-sub">
            Your next chapter is waiting. Sign in to return to your library.
          </p>

          <form id="login-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
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
              <label htmlFor="login-password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    /* eye-off */
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    /* eye */
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="auth-row">
              <label className="auth-checkbox-label" htmlFor="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <button type="button" id="forgot-password-link" className="auth-link">
                Forgot password?
              </button>
            </div>

            {error && (
              <p id="login-error-message" className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              id="sign-in-button"
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>Sign in &nbsp;→</>
              )}
            </button>
          </form>

          <p className="auth-switch">
            New to Manga Hub?{" "}
            <button
              id="create-account-link"
              type="button"
              className="auth-link"
              onClick={onSwitchToRegister}
            >
              Create an account&nbsp;↗
            </button>
          </p>

          <p className="auth-tagline">
            <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
              <rect x="1" y="2" width="14" height="11" rx="2" />
              <path d="M5 2V1M11 2V1M1 6h14" stroke="#0f1614" strokeWidth="1.5" />
            </svg>
            Your library, bookmarks, and late-night favorites. All here.
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
