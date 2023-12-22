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
import BookDetail from "./components/HomePage/BookDetail";
import SeeAll from "./components/CategoryBook/SeeAll";
import BookPage from "./components/HomePage/BookPage";
const App = ({ children }) => {
  return (
    <>
      <Routes>
        {children}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/author" element={<AuthorPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/allgen/*" element={<AllgenBook />} />
        <Route path="/allgen/see-all" element={<SeeAll />}></Route>
        <Route path="/allgen/bacll/see-all" element={<SeeAll />}></Route>
        <Route path="/allgen/comic/see-all" element={<SeeAll />}></Route>
        <Route path="/allgen/novel/see-all" element={<SeeAll />}></Route>
        <Route path="/allgen/study/see-all" element={<SeeAll />}></Route>
        <Route path="/book-detail/:bookId" element={<BookDetail />} />
        <Route path="/bookview" element={<BookPage />} />
      </Routes>
    </>
  );
};

export default App;
