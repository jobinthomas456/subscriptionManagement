import { useState, useEffect } from "react";

export default function UserForm({ onSubmit, user }) {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("user");

  useEffect(()=>{
    if(user){
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  },[user]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name,email,password,role });
    setName(""); setEmail(""); setPassword(""); setRole("user");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 mb-4 rounded bg-white shadow">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-2 w-full mb-2"/>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-2"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="border p-2 w-full mb-2"/>
      <select value={role} onChange={e=>setRole(e.target.value)} className="border p-2 w-full mb-2">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Save User</button>
    </form>
  );
}
