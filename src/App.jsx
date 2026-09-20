import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isPublic = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-shell">
      <Navbar />
      <main className={isAuthenticated && !isPublic ? "app-main" : "public-main"}>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
