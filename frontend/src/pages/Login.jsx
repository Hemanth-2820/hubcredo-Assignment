import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backend =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/auth";

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password)
      return setError("Enter email and password");

    try {
      setLoading(true);
      const res = await axios.post(`${backend}/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-xl bg-white shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back</h2>
        <p className="text-gray-600 mb-6 text-center">
          Log in to access your dashboard.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          New here?{" "}
          <Link to="/signup" className="text-indigo-700 font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
