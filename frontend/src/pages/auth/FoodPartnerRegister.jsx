import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getErrorMessage } from "../../utils/errorHandler";
import FormAlert from "../../components/FormAlert";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  // Controlled form state
  const [formData, setFormData] = useState({
    name: "",
    foodPartnerName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [agreedTerms, setAgreedTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user edits
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Owner name is required.";
    }
    if (!formData.foodPartnerName.trim()) {
      return "Restaurant name is required.";
    }
    if (!formData.email.trim()) {
      return "Email address is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      return "Phone number is required.";
    }
    if (!formData.address.trim()) {
      return "Restaurant address is required.";
    }
    if (!formData.password) {
      return "Password is required.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!agreedTerms) {
      return "Please accept the Partner Terms and Commission Policy to proceed.";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          name: formData.name.trim(),
          foodPartnerName: formData.foodPartnerName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      // Store only partner profile info for UI display (JWT is stored exclusively in httpOnly cookie)
      if (response.data?.foodPartner) {
        localStorage.setItem(
          "foodPartner",
          JSON.stringify(response.data.foodPartner)
        );
      }

      setSuccess("Restaurant registered successfully! Redirecting to dashboard...");

      // Smooth transition to partner dashboard
      setTimeout(() => {
        navigate("/food-partner/dashboard");
      }, 700);
    } catch (err) {
      const errorMsg = getErrorMessage(
        err,
        "Registration failed. Please check your information and try again."
      );
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-400/20 dark:bg-teal-500/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-emerald-100/50 dark:shadow-black/40 p-8">
          {/* Partner Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
              🏪 Restaurant Partner Portal
            </span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 mb-4">
              <span className="text-3xl">🍴</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Register Your Restaurant
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Start reaching hungry customers across your city
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleRegister} noValidate>
            {/* Feedback Alerts */}
            {error && (
              <FormAlert
                type="error"
                message={error}
                onClose={() => setError("")}
              />
            )}
            {success && (
              <FormAlert
                type="success"
                message={success}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* owner name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Owner Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
                    👤
                  </span>
                  <input
                    type="text"
                    name="name"
                    disabled={loading}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* restaurant name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Restaurant Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
                    🏪
                  </span>
                  <input
                    type="text"
                    name="foodPartnerName"
                    disabled={loading}
                    value={formData.foodPartnerName}
                    onChange={handleChange}
                    placeholder="e.g. Spice Garden"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
                  📧
                </span>
                <input
                  type="email"
                  name="email"
                  disabled={loading}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="restaurant@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 disabled:opacity-60"
                />
              </div>
            </div>

            {/* phone */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
                  📱
                </span>
                <input
                  type="tel"
                  name="phone"
                  disabled={loading}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (234) 567-8900"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 disabled:opacity-60"
                />
              </div>
            </div>

            {/* address */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
                  📍
                </span>
                <input
                  type="text"
                  name="address"
                  disabled={loading}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Food Street, City, Country"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 disabled:opacity-60"
                />
              </div>
            </div>

            {/* password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
                  🔒
                </span>
                <input
                  type="password"
                  name="password"
                  disabled={loading}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input
                id="partner-terms"
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                disabled={loading}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 dark:border-gray-600 accent-emerald-600 cursor-pointer flex-shrink-0"
              />
              <label
                htmlFor="partner-terms"
                className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none leading-relaxed"
              >
                I agree to FoodNest's{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium underline">
                  Partner Terms
                </span>{" "}
                and{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium underline">
                  Commission Policy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                  <span>Registering Restaurant...</span>
                </span>
              ) : (
                "Submit Registration"
              )}
            </button>
          </form>

          {/* Footer Links */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already a partner?{" "}
            <Link
              to="/food-partner/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              Sign in here
            </Link>
          </p>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
            Looking for the customer app?{" "}
            <Link
              to="/user/register"
              className="text-emerald-500 hover:text-emerald-600 underline transition-colors"
            >
              Register as a user
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
