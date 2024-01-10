import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import AccountPage from "./components/AccountPage/AccountPage";
import CartPage from "./components/Cartt/CartPage";
import LoginPage from "./auth/LoginPage/LoginPage";
import RegisterPage from "./auth/RegisterPage/RegisterPage";
import AboutUs from "./components/About Us/AboutUs";
import AllgenBook from "./components/CategoryAgenda/AllgenBook";
import { AuthorPage } from "./components/Author/AuthorPage";
import SeeAll from "./components/CategoryBook/SeeAll";
import AuthorInfo from "./components/Author/AuthorInfo";
import Payment from "./components/Cartt/Payment";
import GoogleLogin from "./auth/LoginWithGoogle/GoogleLogin";
import PhoneLogin from "./auth/LoginWithPhone/PhoneLogin";
import { ModalToLogin } from "./components/content/requirement/ModalToLogin";
import BookPage from "./components/HomePage/Book/BookPage";
import YourBook from "./components/AccountPage/YourBook";
import { Admin } from "./admin/Admin";
import ProtectedRoute from "./ProtectedRoute";
import { Dashboard } from "./admin/dashboard/Dashboard.jsx";
import { Generalbook } from "./admin/GeneralBook/Generalbook.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/author" element={<AuthorPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/allgen/*" element={<AllgenBook />} />
      <Route path="/allgen/see-all" element={<SeeAll />} />
      <Route path="/allgen/bacll/see-all" element={<SeeAll />} />
      <Route path="/allgen/comic/see-all" element={<SeeAll />} />
      <Route path="/allgen/novel/see-all" element={<SeeAll />} />
      <Route path="/allgen/study/see-all" element={<SeeAll />} />
      <Route path="/authorInfo" element={<AuthorInfo />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/google" element={<GoogleLogin />} />
      <Route path="/login-modal" element={<ModalToLogin />} />
      <Route path="/phoneLogin" element={<PhoneLogin />} />
      <Route path="/bookview" element={<BookPage />} />
      <Route path="/yourbook" element={<YourBook />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;
