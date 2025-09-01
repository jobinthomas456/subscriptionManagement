import { useEffect, useState } from "react";
import {
  getSubscriptions, createSubscription, deleteSubscription, updateSubscription,
  getUsers, createUser, updateUser, deleteUser
} from "../api";
import SubscriptionForm from "../components/SubscriptionForm";
import SubscriptionList from "../components/SubscriptionList";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import Navbar from "../components/Navbar";

export default function AdminDashboard({ token, role, setToken, setRole }) {
  const [subs, setSubs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("subscriptions"); // default tab

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  const fetchSubs = async () => { try { if(!token) return; const data = await getSubscriptions(token); setSubs(Array.isArray(data)?data:[]); } catch(err){ console.error(err); if(err.message.toLowerCase().includes("token")) handleLogout(); } };
  const fetchUsers = async () => { try { if(!token) return; const data = await getUsers(token); setUsers(Array.isArray(data)?data:[]); } catch(err){ console.error(err); if(err.message.toLowerCase().includes("token")) handleLogout(); } };

  useEffect(()=>{ fetchSubs(); fetchUsers(); }, [token]);

  const handleAddSub = async (sub)=>{ await createSubscription(token,sub); fetchSubs(); };
  const handleDeleteSub = async (id)=>{ await deleteSubscription(token,id); fetchSubs(); };
  const handleToggleShared = async (id,value)=>{ await updateSubscription(token,id,{shared:value}); fetchSubs(); };

  const handleSubmitUser = async (userData)=>{ try{ if(selectedUser) await updateUser(token, selectedUser._id, userData); else await createUser(token, userData); setSelectedUser(null); fetchUsers(); }catch(err){ console.error(err); } };
  const handleEditUser = (user)=>setSelectedUser(user);
  const handleDeleteUser = async (id)=>{ await deleteUser(token,id); fetchUsers(); };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        role={role}
        setToken={setToken}
        setRole={setRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {activeTab === "subscriptions" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Subscriptions</h2>
            <SubscriptionForm token={token} onAdd={handleAddSub} />
            <SubscriptionList subscriptions={subs} onDelete={handleDeleteSub} onToggleShared={handleToggleShared} />
          </>
        )}

        {activeTab === "users" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <UserForm onSubmit={handleSubmitUser} user={selectedUser} />
            <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
          </>
        )}
      </div>
    </div>
  );
}
