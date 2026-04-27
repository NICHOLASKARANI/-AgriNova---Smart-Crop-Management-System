"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = document.cookie.includes("token");
    if (!token) {
      router.push("/login");
      return;
    }
    
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? "dark" : ""}`}>
      {/* Top Navbar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {darkMode ? "?? Light" : "?? Dark"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-3xl text-white">
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.name || "User"}!
                </h2>
                <p className="text-gray-500">{user?.email || ""}</p>
                <p className="text-gray-500">Role: {user?.role || "User"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="border rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">??</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
                <div className="text-gray-600 dark:text-gray-400">Total Orders</div>
              </div>
              <div className="border rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">??</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
                <div className="text-gray-600 dark:text-gray-400">Wishlist</div>
              </div>
              <div className="border rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">??</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
                <div className="text-gray-600 dark:text-gray-400">Notifications</div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-300">
                ? You are successfully logged in to AgriNova!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
