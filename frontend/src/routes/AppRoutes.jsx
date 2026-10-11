import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerDashboard from "../pages/foodPartner/FoodPartnerDashboard";
import ProtectedPartnerRoute from "../components/auth/ProtectedPartnerRoute";
import Home from "../pages/general/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Auth Routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* Food Partner Public Auth Routes */}
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/FoodPartner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/FoodPartner/login" element={<FoodPartnerLogin />} />

        {/* Food Partner Protected Dashboard Routes */}
        <Route
          path="/food-partner/dashboard"
          element={
            <ProtectedPartnerRoute>
              <FoodPartnerDashboard />
            </ProtectedPartnerRoute>
          }
        />
        <Route
          path="/FoodPartner/dashboard"
          element={
            <ProtectedPartnerRoute>
              <FoodPartnerDashboard />
            </ProtectedPartnerRoute>
          }
        />

        {/* Home & Default Fallback */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
