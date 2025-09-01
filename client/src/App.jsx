import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Wrapper for protected routes
function RequireAuth({ children, token }) {
  if (!token) return <Navigate to="/login" />;
  return children;
}

// Wrapper for admin-only routes
function RequireAdmin({ children, role }) {
  if (role !== "admin") return <Navigate to="/dashboard" />;
  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // Sync with localStorage in case of refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <RequireAuth token={token}>
              <RequireAdmin role={role}>
                <AdminDashboard token={token} role={role} setToken={setToken} setRole={setRole} />
              </RequireAdmin>
            </RequireAuth>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth token={token}>
              <Dashboard token={token} role={role} setToken={setToken} setRole={setRole} />
            </RequireAuth>
          }
        />

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={<Navigate to={token ? (role === "admin" ? "/admin" : "/dashboard") : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
