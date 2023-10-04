import React from "react";
import HomePage from "./components/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import AccountPage from './components/AccountPage/AccountPage';
import CartPage from './components/Cartt/CartPage';
import Contactpage from './components/Contact/Contactpage';
import Help from "./components/Help/Help";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { Footer } from "./Footer/Footer";

const App = ({ children }) => {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path="/contact" element={<Contactpage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
      {children} 
     
    </>
  );
};

export default App;

