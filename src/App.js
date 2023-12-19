import * as React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import AccountPage from "./components/AccountPage/AccountPage";
import CartPage from "./components/Cartt/CartPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import AboutUs from "./components/About Us/AboutUs";
import AllgenBook from "./components/CategoryBook/AllgenBook";
import { AuthorPage } from "./components/Author/AuthorPage";
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
        <Route path="/author" element={<AuthorPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/allgen/*" element={<AllgenBook />} />
        {/* <Route path="/allGen/bacII" element={<BacIIBook />}></Route>
        <Route path="/comic" element={<ComicBook />}></Route>
        <Route path="/novel" element={<NovelBook />}></Route>
        <Route path="/study" element={<StudyBook />}></Route> */}
      </Routes>
    </>
  );
};

export default App;
