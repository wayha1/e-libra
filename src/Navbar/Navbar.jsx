"use client";
import React from "react";
import { BiUserCircle, BiSearchAlt2 } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="w-screen py-3 font-bold">
        <div className="flex justify-between flex-row">
      
          <Link to={"/"} className="logo lg:ml-64 md:ml-12 sm:ml-12 xs:ml-12 ">
            E-libra
          </Link>

          <div className="flex justify-between ">
            <input
              className="border lg:w-64 md:w-64 px-2 rounded-lg border-3 border-gray-900 "
              type="search"
              placeholder="Search"
              BiSearchAlt2="absolute mt-1  "
            />
          </div>

          <div className="flex px-20">
            <ul className="flex ">
              <Link to={"/help"}  className="help  px-5">Help</Link>
              <Link to={"/contact"} className="Contact px-5 ">
                Contact
              </Link>
              <Link to={"/account"} className="Account flex px-5 ">
                {" "}
                <BiUserCircle className="mt-1 -translate-x-2" to={"/account"} /> 
                Account
              </Link>

              <Link to="/cart" className="Cart flex ps-5 space-x-4 ">
                <BsCartPlus className="mt-1 -translate-x-2" to="/cart" />
                Cart
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
