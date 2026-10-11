import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getErrorMessage } from "../../utils/errorHandler";
import FormAlert from "../../components/FormAlert";

const FoodPartnerDashboard = () => {
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [actionNotice, setActionNotice] = useState(null);

  // Fetch safe food partner profile from backend
  const fetchPartnerProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/food-partner/me",
        {
          withCredentials: true,
        }
      );

      if (response.data?.foodPartner) {
        setPartner(response.data.foodPartner);
        // Cache safe non-token details for fast hydration
        localStorage.setItem(
          "foodPartner",
          JSON.stringify(response.data.foodPartner)
        );
      } else {
        throw new Error("Invalid response format received from server");
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Unauthorized - session expired or invalid
        localStorage.removeItem("foodPartner");
        navigate("/FoodPartner/login", { replace: true });
        return;
      }

      // Other network or server error
      const msg = getErrorMessage(
        err,
        "Failed to load food partner dashboard. Please verify your connection."
      );
      setError(msg);

      // Attempt fallback to cached local profile
      try {
        const cached = localStorage.getItem("foodPartner");
        if (cached) {
          setPartner(JSON.parse(cached));
        }
      } catch (cacheErr) {
        console.warn("Could not read local partner cache", cacheErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerProfile();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.get("http://localhost:3000/api/auth/food-partner/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      // Clean up local profile (never stored tokens)
      localStorage.removeItem("foodPartner");
      setLoggingOut(false);
      navigate("/FoodPartner/login", { replace: true });
    }
  };

  const handleActionClick = (actionName, description) => {
    setActionNotice({
      title: actionName,
      message: description,
    });
  };

  if (loading && !partner) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20 animate-pulse">
            🍴
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium text-gray-600 dark:text-gray-300">
            <svg
              className="animate-spin h-4 w-4 text-emerald-600 dark:text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Loading Food Partner Dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍔</span>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                FoodNest
              </span>
            </Link>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Partner Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            {partner && (
              <div className="hidden sm:flex flex-col items-end text-right mr-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {partner.foodPartnerName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {partner.name}
                </span>
              </div>
            )}
            {/* Logout Button in header */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-800 transition-all duration-200 cursor-pointer disabled:opacity-50"
              id="header-logout-btn"
            >
              <span>🚪</span>
              <span>{loggingOut ? "Signing out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error notification if any */}
        {error && (
          <div className="mb-6">
            <FormAlert
              type="error"
              message={error}
              onClose={() => setError("")}
            />
          </div>
        )}

        {/* Action notice modal / alert banner */}
        {actionNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-start justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h4 className="font-bold text-teal-900 dark:text-teal-200 text-sm">
                  {actionNotice.title}
                </h4>
                <p className="text-xs text-teal-700 dark:text-teal-300 mt-0.5">
                  {actionNotice.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActionNotice(null)}
              className="text-teal-600 hover:text-teal-800 dark:text-teal-400 text-xs font-bold cursor-pointer"
            >
              ✕ Dismiss
            </button>
          </div>
        )}

        {/* Hero Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 sm:p-10 text-white shadow-xl shadow-emerald-950/10 mb-8">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Verified Restaurant Partner
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {partner?.foodPartnerName || "Your Restaurant"}
              </h1>
              <p className="mt-2 text-emerald-100 max-w-xl text-sm sm:text-base">
                Welcome back,{" "}
                <span className="font-bold text-white">
                  {partner?.name || "Partner"}
                </span>
                ! Manage dishes, monitor customer orders, and track your kitchen's operations.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium flex items-center gap-2">
                <span className="text-emerald-300">●</span>
                <span>Portal Online & Synced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons (Requirement 5) */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            Quick Partner Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Add Food */}
            <button
              onClick={() =>
                handleActionClick(
                  "Add Food",
                  "Open dish creator with ImageKit media upload, price configuration, and description."
                )
              }
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-4 text-left cursor-pointer group"
              id="btn-add-food"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🍲
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  Add Food
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Publish new menu dish
                </p>
              </div>
            </button>

            {/* 2. Manage Food */}
            <button
              onClick={() =>
                handleActionClick(
                  "Manage Food",
                  "Browse existing dishes, edit prices, toggle item availability, and update descriptions."
                )
              }
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-teal-200 dark:border-teal-800/60 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-4 text-left cursor-pointer group"
              id="btn-manage-food"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📋
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  Manage Food
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  View and edit menu items
                </p>
              </div>
            </button>

            {/* 3. Manage Orders */}
            <button
              onClick={() =>
                handleActionClick(
                  "Manage Orders",
                  "View live kitchen incoming orders, accept or decline deliveries, and update cooking statuses."
                )
              }
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800/60 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-4 text-left cursor-pointer group"
              id="btn-manage-orders"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📦
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  Manage Orders
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Kitchen order pipeline
                </p>
              </div>
            </button>

            {/* 4. Logout (Requirement 5 & 6) */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-rose-200 dark:border-rose-900/40 hover:border-rose-500 dark:hover:border-rose-500 shadow-sm hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-4 text-left cursor-pointer group disabled:opacity-50"
              id="btn-logout"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🚪
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  {loggingOut ? "Signing Out..." : "Logout"}
                </h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
                  End partner session
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Food Partner Information Display (Requirement 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Restaurant Profile Card */}
          <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
                  <span>🏪</span> Restaurant & Partner Profile
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Verified credentials and business address registered on FoodNest
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Active Partner
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* 1. Restaurant Name */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>🏪</span>
                  <span>Restaurant Name</span>
                </div>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-1 break-words">
                  {partner?.foodPartnerName || "—"}
                </p>
              </div>

              {/* 2. Owner Name */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>👤</span>
                  <span>Owner Name</span>
                </div>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-1 break-words">
                  {partner?.name || "—"}
                </p>
              </div>

              {/* 3. Email */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>📧</span>
                  <span>Email Address</span>
                </div>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-1 break-all">
                  {partner?.email || "—"}
                </p>
              </div>

              {/* 4. Phone */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>📱</span>
                  <span>Phone Number</span>
                </div>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
                  {partner?.phone || "—"}
                </p>
              </div>

              {/* 5. Address (full span) */}
              <div className="sm:col-span-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>📍</span>
                  <span>Restaurant Address</span>
                </div>
                <p className="text-base font-semibold text-gray-900 dark:text-white mt-1 leading-relaxed">
                  {partner?.address || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats & Security Overview */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <span>🛡️</span> Security & Auth Mode
              </h3>
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Storage Type</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    httpOnly Cookie JWT
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Token in LocalStorage</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    None (Zero-storage)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Account ID</span>
                  <span className="font-mono text-gray-600 dark:text-gray-400">
                    {partner?._id ? `${partner._id.slice(0, 8)}...` : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Support Info Card */}
            <div className="rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-6">
              <span className="text-2xl">💡</span>
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mt-2">
                Food Partner Help Desk
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 leading-relaxed">
                Need to update your restaurant address or banking information? Contact the FoodNest Partner Team anytime.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FoodPartnerDashboard;
