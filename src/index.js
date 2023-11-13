// import * as React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//         <Link to="about">About Us</Link>
//     ),
//   },
//   {
//     path: "about",
//     element: <div>About</div>,
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );

import Navbar from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";
import React from "react";
import ReactDOM from "react-dom/client";
import "firebase/compat/database";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar />
    <App />
    <Footer />
  </BrowserRouter>
  </React.StrictMode>
);
