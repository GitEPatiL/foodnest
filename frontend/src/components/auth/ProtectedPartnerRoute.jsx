import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

/**
 * ProtectedPartnerRoute
 * Ensures the route can only be accessed by an authenticated food partner.
 * Verifies authentication against the backend via GET /api/auth/food-partner/me (withCredentials: true).
 * Does not rely on localStorage tokens.
 * Automatically redirects unauthorized visitors to /FoodPartner/login.
 */
const ProtectedPartnerRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const verifyPartnerAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/food-partner/me",
          {
            withCredentials: true,
          }
        );

        if (isMounted) {
          if (response.data?.foodPartner) {
            // Cache safe profile details (excluding any token) for instant UI display
            localStorage.setItem(
              "foodPartner",
              JSON.stringify(response.data.foodPartner)
            );
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          // Token is missing, invalid, or expired
          localStorage.removeItem("foodPartner");
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyPartnerAuth();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/20">
              🏪
            </div>
            <div className="absolute -inset-1 rounded-2xl border-2 border-emerald-500/30 animate-ping pointer-events-none" />
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
            <span>Verifying partner authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/FoodPartner/login" state={{ from: location }} replace />
    );
  }

  return children;
};

export default ProtectedPartnerRoute;
