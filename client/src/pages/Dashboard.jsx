import { useEffect, useState } from "react";
import { getSubscriptions, createSubscription, deleteSubscription } from "../api";
import SubscriptionForm from "../components/SubscriptionForm";
import SubscriptionList from "../components/SubscriptionList";
import Navbar from "../components/Navbar";

export default function Dashboard({ token, role, setToken, setRole }) {
  const [subs, setSubs] = useState([]);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState(""); // add user name state

 useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setUserName(name);
    fetchSubs();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  const fetchSubs = async () => {
    try {
      if (!token) return;
      const data = await getSubscriptions(token);
      if (Array.isArray(data)) {
        setSubs(data);
        setError("");
      } else {
        setSubs([]);
        setError(data.message || "Failed to fetch subscriptions");
      }
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
      if (err.message.toLowerCase().includes("token")) handleLogout();
      else setError(err.message || "Failed to fetch subscriptions");
      setSubs([]);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, [token]);

  const handleAdd = async (sub) => {
    try {
      await createSubscription(token, sub);
      fetchSubs();
    } catch (err) {
      console.error("Failed to add subscription:", err);
      if (err.message.toLowerCase().includes("token")) handleLogout();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(token, id);
      fetchSubs();
    } catch (err) {
      console.error("Failed to delete subscription:", err);
      if (err.message.toLowerCase().includes("token")) handleLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role={role} setToken={setToken} setRole={setRole} />
    
      <div className="p-6 max-w-6xl mx-auto">
           <div className="p-4 max-w-3xl mx-auto">
  <h1 className="text-2xl font-bold mb-2">Welcome, {userName}!</h1>
  <h2 className="text-xl font-semibold mb-4">My Subscriptions</h2>
  {error && <p className="text-red-500 mb-4">{error}</p>}
  <SubscriptionForm token={token} onAdd={handleAdd} />
  <SubscriptionList subscriptions={subs} onDelete={handleDelete} />
</div>
  
      </div>
    </div>
  );
}
