import * as React from "react";
import "./App.css";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter,
//    BrowserRouter, 
//    RouterProvider,
//    Route,
//    Link, } from "react-router-dom";
// import Navbar from "./Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import HomePage from "./components/HomePage/HomePage";
import AccountPage from "./components/AccountPage/AccountPage";
import CartPage from "./components/Cartt/CartPage";
import Contactpage from "./components/Contact/Contactpage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import AboutUs from "./components/About Us/AboutUs";
import AllgenBook from "./components/CategoryBook/AllgenBook";
import BacIIBook from "./components/CategoryBook/BacIIBook";
import ComicBook from "./components/CategoryBook/ComicBook";
import NovelBook from "./components/CategoryBook/NovelBook";
import StudyBook from "./components/CategoryBook/StudyBook";
import { Footer } from "./Footer/Footer";

const App = ({ children }) => {
  return (
    <>
        {/* <Navbar /> */}
      <Routes>
        {children}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="aboutus" element={<AboutUs />}></Route>
        <Route path="/contact" element={<Contactpage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/allgen" element={<AllgenBook />}></Route>
        <Route path="/bacII" element={<BacIIBook />}></Route>
        <Route path="/comic" element={<ComicBook />}></Route>
        <Route path="/novel" element={<NovelBook />}></Route>
        <Route path="/study" element={<StudyBook />}></Route>
      </Routes>
      
    </>
  );
};

export default App;
