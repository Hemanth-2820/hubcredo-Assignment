import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backend =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/auth";

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Name is required");
    if (!form.email.includes("@")) return setError("Valid email required");
    if (form.password.length < 6)
      return setError("Password must be 6+ characters");

    try {
      setLoading(true);
      await axios.post(`${backend}/signup`, form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-xl bg-white shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Create Account</h2>
        <p className="text-gray-600 mb-6 text-center">
          Sign up to continue to the dashboard.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Full name</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </div>

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
              placeholder="Min 6 characters"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-700 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
