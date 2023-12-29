import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext.js";
import "firebase/compat/database";
import App from "./App";
import "./index.css";
import Navbar from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <App />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
