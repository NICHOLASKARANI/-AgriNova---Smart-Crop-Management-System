"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
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

  const stats = {
    orders: 12,
    wishlist: 5,
    notifications: 3,
    messages: 2,
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
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-20">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <span className="text-2xl">??</span>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              AgriNova
            </span>
          </div>

          <nav className="space-y-2">
            {[
              { id: "overview", icon: "??", label: "Overview" },
              { id: "profile", icon: "??", label: "Profile" },
              { id: "orders", icon: "??", label: "Orders" },
              { id: "settings", icon: "??", label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-0 right-0 px-6 space-y-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span>{darkMode ? "??" : "??"}</span>
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              <span>??</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Navbar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
            {activeTab}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || "U"}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="text-3xl mb-4">??</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.orders}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Total Orders</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="text-3xl mb-4">??</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.wishlist}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Wishlist Items</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="text-3xl mb-4">??</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.notifications}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Notifications</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="text-3xl mb-4">??</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.messages}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Unread Messages</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Welcome to your Dashboard!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You are now logged in as {user?.name || "User"}.
                </p>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-3xl text-white">
                    {user?.name?.[0] || "U"}
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user?.name || "User"}
                    </p>
                    <p className="text-gray-500">{user?.email || ""}</p>
                    <p className="text-gray-500">Role: {user?.role || "User"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order History
              </h2>
              <p className="text-gray-600">
                No orders yet. Start shopping to see your orders here!
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Notifications
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                    <option>All notifications</option>
                    <option>Only important</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
