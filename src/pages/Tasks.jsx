import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import Spinner from "../components/Spinner";
import Icon from "../components/Icon";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      setTasks(await api.getTasks());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const stats = useMemo(() => {
    const done = tasks.filter((t) => Boolean(t.completed)).length;
    return { total: tasks.length, done, pending: tasks.length - done };
  }, [tasks]);

  const completion = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesQuery = !q || t.title.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || (filter === "completed" ? Boolean(t.completed) : !t.completed);
      return matchesQuery && matchesFilter;
    });
  }, [tasks, query, filter]);

  const del = async (id) => {
    if (!window.confirm("Delete this task? This action cannot be undone.")) return;
    try {
      await api.deleteTask(id);
      setTasks((items) => items.filter((t) => t.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <div className="hero-title-row">
            <span className="hero-orb"><Icon name="spark" size={16} /></span>
            <span className="eyebrow">WORKSPACE OVERVIEW</span>
          </div>
          <h1>My tasks</h1>
          <p>Plan your work, keep priorities clear, and make steady progress.</p>
        </div>
        <Link className="btn btn-primary btn-large hero-create" to="/tasks/new">
          <Icon name="plus" size={18} /> New task
        </Link>
      </div>

      {error && <div className="alert error"><Icon name="shield" size={16} />{error}</div>}

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <span className="stat-icon"><Icon name="grid" /></span>
          <div><small>Total tasks</small><strong>{stats.total}</strong><em>In your workspace</em></div>
        </div>
        <div className="stat-card stat-pending">
          <span className="stat-icon pending-icon"><Icon name="clock" /></span>
          <div><small>In progress</small><strong>{stats.pending}</strong><em>Still to finish</em></div>
        </div>
        <div className="stat-card stat-done">
          <span className="stat-icon done-icon"><Icon name="check" /></span>
          <div><small>Completed</small><strong>{stats.done}</strong><em>Nice work</em></div>
        </div>
        <div className="progress-card">
          <div className="progress-head"><div><small>Completion rate</small><span>Overall progress</span></div><strong>{completion}%</strong></div>
          <div className="progress-track"><span style={{ width: `${completion}%` }} /></div>
        </div>
      </div>

      <div className="tasks-section-head">
        <div>
          <div className="section-title-row"><h2>Your tasks</h2><span className="count-pill">{visible.length}</span></div>
          <p>Everything you are working on right now.</p>
        </div>
        <div className="toolbar-controls">
          <div className="search-box"><Icon name="search" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks..." /></div>
          <div className="filter-tabs">
            {[['all', 'All'], ['pending', 'Pending'], ['completed', 'Done']].map(([value, label]) => (
              <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {loading ? <Spinner text="Loading your workspace..." /> : visible.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><Icon name={tasks.length ? "search" : "check"} size={25} /></div>
          <span className="eyebrow">{tasks.length ? "NO RESULTS" : "ALL CLEAR"}</span>
          <h3>{tasks.length ? "No matching tasks" : "Your workspace is clear"}</h3>
          <p>{tasks.length ? "Try another search or filter." : "Create your first task and start building momentum."}</p>
          {!tasks.length && <Link className="btn btn-primary" to="/tasks/new">Create your first task <Icon name="arrow" size={16} /></Link>}
        </div>
      ) : (
        <div className="task-list">
          {visible.map((task, index) => (
            <article className={`task-row ${task.completed ? "is-complete" : ""}`} key={task.id}>
              <div className="task-index">{String(index + 1).padStart(2, "0")}</div>
              <span className={`task-status-dot ${task.completed ? "complete" : ""}`} />
              <div className="task-main">
                <Link className="task-title" to={`/tasks/${task.id}`}>{task.title}</Link>
                <div className="task-meta"><span className={`status ${task.completed ? "done" : "pending"}`}>{task.completed ? "Completed" : "In progress"}</span></div>
              </div>
              <div className="task-row-actions">
                <Link className="icon-action" to={`/tasks/${task.id}/edit`} title="Edit task"><Icon name="edit" /></Link>
                <button className="icon-action danger-action" onClick={() => del(task.id)} title="Delete task"><Icon name="trash" /></button>
                <Link className="view-link" to={`/tasks/${task.id}`}>Open <Icon name="arrow" size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
