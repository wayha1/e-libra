import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import AccountPage from './components/AccountPage/AccountPage';
import CartPage from './components/Cartt/CartPage';
import Contactpage from './components/Contact/Contactpage';
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import AboutUs from "./components/About Us/AboutUs";
import { Footer } from "./Footer/Footer";

const App = ({ children }) => {

  return (
    <>
        : <Navbar />
      <Routes >
        <Route path="/" element={<HomePage />}></Route>
        <Route path="aboutus" element={<AboutUs />}></Route>
        <Route path="/contact" element={<Contactpage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/login" element={<LoginPage />} hideNavBar={true}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
     
   
      {children} 
     
    </>
  );
};

export default App;

