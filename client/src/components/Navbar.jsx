export default function Navbar({ role, setToken, setRole, activeTab, setActiveTab }) {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-lg">Subscription Manager</span>
      {role === "admin" && (
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`px-3 py-1 rounded ${activeTab === "subscriptions" ? "bg-blue-500" : "bg-gray-700"}`}
          >
            Subscriptions
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-3 py-1 rounded ${activeTab === "users" ? "bg-blue-500" : "bg-gray-700"}`}
          >
            Users
          </button>
        </div>
      )}
      <div className="flex items-center gap-4">
        <span>{role?.toUpperCase() || "USER"}</span>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
