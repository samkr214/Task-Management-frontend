import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const out = () => {
    logout();
    setOpen(false);
    nav("/login", { replace: true });
  };

  if (!isAuthenticated) {
    return (
      <header className="public-nav">
        <Link className="brand" to="/login">
          <span className="brand-mark">T</span>
          <span>TaskFlow</span>
        </Link>
        <div className="public-links">
          <Link to="/login">Sign in</Link>
          <Link className="nav-cta" to="/register">
            Get started <Icon name="arrow" size={15} />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <aside className={`sidebar ${open ? "mobile-open" : ""}`}>
        <div className="sidebar-inner">
          <Link className="brand sidebar-brand" to="/tasks" onClick={() => setOpen(false)}>
            <span className="brand-mark">T</span>
            <span>TaskFlow</span>
          </Link>

          <div className="workspace-label">WORKSPACE</div>
          <nav className="side-nav">
            <NavLink to="/tasks" end onClick={() => setOpen(false)}>
              <Icon name="grid" />
              <span>My Tasks</span>
            </NavLink>
            <NavLink to="/tasks/new" onClick={() => setOpen(false)}>
              <Icon name="plus" />
              <span>New Task</span>
            </NavLink>
            <NavLink to="/profile" onClick={() => setOpen(false)}>
              <Icon name="user" />
              <span>Profile</span>
            </NavLink>
          </nav>

          <div className="sidebar-bottom">
            <Link className="secure-note profile-sidebar-link" to="/profile" onClick={() => setOpen(false)}>
              <span><Icon name="shield" size={16} /></span>
              <div>
                <strong>Private workspace</strong>
                <small>Your tasks are protected</small>
              </div>
              <Icon name="arrow" size={13} />
            </Link>
            <button className="side-logout" onClick={out}>
              <Icon name="logout" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      <header className="workspace-topbar">
        <div>
          <span className="topbar-kicker">TASKFLOW WORKSPACE</span>
          <strong>Stay focused. Ship faster.</strong>
        </div>
        <Link className="topbar-action" to="/tasks/new">
          <Icon name="plus" size={16} /> New task
        </Link>
      </header>

      <header className="mobile-topbar">
        <Link className="brand" to="/tasks">
          <span className="brand-mark">T</span>
          <span>TaskFlow</span>
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Menu">
          <i /><i /><i />
        </button>
      </header>
      {open && <button className="mobile-backdrop" onClick={() => setOpen(false)} aria-label="Close menu" />}
    </>
  );
}
