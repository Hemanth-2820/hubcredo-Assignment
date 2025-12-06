import React from "react";

export default function Dashboard() {
  const name = localStorage.getItem("name") || "User";

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96 text-center">
        <h1 className="text-2xl font-semibold">Welcome, {name} 👋</h1>
        <p className="mt-3 text-gray-600">
          This is your dashboard. You can add more features here.
        </p>
        <button
          onClick={logout}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
