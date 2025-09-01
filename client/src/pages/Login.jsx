import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login({ setToken, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Added for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const data = await login(email, password);

      if (data.token) {
        // Save token, role, and name
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);

        // Update state in App
        setToken(data.token);
        setRole(data.role);

        // Redirect user based on role
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
