import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "../components/Header";
import { UserBenefitsSection } from "../components/UserBenefitsSection";
import { Footer } from '../components/Footer/index';

import { Register } from "../pages/Register";
import { Login } from '../pages/Login/index';


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <UserBenefitsSection />
      <Footer />
    </BrowserRouter>
  );
}