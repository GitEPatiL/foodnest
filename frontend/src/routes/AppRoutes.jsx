import React from 'react'
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import UserLogin from '../pages/auth/UserLogin';
import UserRegister from '../pages/auth/UserRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';

const AppRoutes = () => {
  return (
    <div>
      

      <BrowserRouter>
        <Routes>
            <Route path="/user/register" element={<UserRegister/>} />
            <Route path="/user/login" element={<UserLogin/>} />
            <Route path="/FoodPartner/register" element={<FoodPartnerRegister/>} />
            <Route path="/FoodPartner/login" element={<FoodPartnerLogin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
