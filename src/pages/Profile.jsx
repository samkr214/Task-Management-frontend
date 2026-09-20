import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return {};
  }
}

export default function Profile() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const account = useMemo(() => decodeToken(token || ""), [token]);

  const email = account.email || "Account email unavailable";
  const initials = email !== "Account email unavailable" ? email.charAt(0).toUpperCase() : "T";

  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <section className="profile-page">
      <div className="profile-hero">
        <div>
          <span className="eyebrow">ACCOUNT CENTER</span>
          <h1>Your profile</h1>
          <p>Your workspace, tasks and session controls — all in one place.</p>
        </div>
        <div className="profile-hero-actions">
          <Link className="btn btn-secondary" to="/tasks">
            <Icon name="grid" size={16} /> My tasks
          </Link>
          <Link className="btn btn-primary" to="/tasks/new">
            <Icon name="plus" size={17} /> New task
          </Link>
        </div>
      </div>

      <div className="profile-grid">
        <article className="profile-card profile-identity-card">
          <div className="profile-identity">
            <div className="profile-avatar">{initials}</div>
            <div>
              <span className="profile-overline">SIGNED IN ACCOUNT</span>
              <h2>{email}</h2>
              <div className="profile-status"><span /> Active session</div>
            </div>
          </div>

          <div className="account-details">
            <div>
              <span>Email</span>
              <strong>{email}</strong>
            </div>
            <div>
              <span>Authentication</span>
              <strong>JWT secured</strong>
            </div>
            <div>
              <span>Session</span>
              <strong>Protected</strong>
            </div>
            <div>
              <span>Workspace</span>
              <strong>Private</strong>
            </div>
          </div>
        </article>

        <article className="profile-card quick-actions-card">
          <div className="profile-card-heading">
            <div>
              <span className="eyebrow">QUICK ACTIONS</span>
              <h2>Manage your workspace</h2>
            </div>
            <span className="heading-icon"><Icon name="spark" size={17} /></span>
          </div>

          <div className="profile-actions-list">
            <Link to="/tasks/new" className="profile-action">
              <span className="action-icon action-blue"><Icon name="plus" /></span>
              <span><strong>Add a new task</strong><small>Create something you want to accomplish.</small></span>
              <Icon name="arrow" size={16} />
            </Link>
            <Link to="/tasks" className="profile-action">
              <span className="action-icon action-purple"><Icon name="edit" /></span>
              <span><strong>Edit or update tasks</strong><small>Review your existing tasks and make changes.</small></span>
              <Icon name="arrow" size={16} />
            </Link>
            <Link to="/tasks" className="profile-action">
              <span className="action-icon action-green"><Icon name="check" /></span>
              <span><strong>Track your progress</strong><small>See pending and completed work in one place.</small></span>
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </article>

        <article className="profile-card security-card">
          <div className="security-icon"><Icon name="shield" size={22} /></div>
          <div>
            <span className="eyebrow">SECURITY</span>
            <h2>Your account is protected</h2>
            <p>Your protected session is active. Task requests are authorized by the backend using your signed authentication token.</p>
          </div>
          <div className="security-points">
            <span><Icon name="check" size={14} /> Authenticated session</span>
            <span><Icon name="check" size={14} /> Protected task routes</span>
            <span><Icon name="check" size={14} /> User-specific task access</span>
          </div>
        </article>

        <article className="profile-card signout-card">
          <div>
            <span className="eyebrow">SESSION CONTROL</span>
            <h2>Ready to leave?</h2>
            <p>Signing out will end your current TaskFlow session on this browser.</p>
          </div>
          <button className="btn btn-danger" onClick={signOut}>
            <Icon name="logout" size={17} /> Sign out
          </button>
        </article>
      </div>
    </section>
  );
}
