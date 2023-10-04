"use client";
import React from "react";
import { BiUserCircle , BiSearchAlt2} from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import Help from "../components/Help/Help";
import HomePage from "../components/HomePage/HomePage";
import help from "../components/Help/Help";

const Navbar = () => {
  return (
    <nav className="nav">
    <div className="w-screen py-3 font-bold">
      <div className="flex justify-between flex-row">
      <a href="/home" className="logo lg:ml-64 md:ml-12 sm:ml-12 xs:ml-12 ">
        E-libra
      </a>
      <div className="flex justify-between ">
      <input className="border lg:w-64 md:w-64 px-2 rounded-lg border-3 border-gray-900 "
                    type="search"
                    placeholder="Search"
                    BiSearchAlt2 = "absolute mt-1  "
                />      
      
      </div>
      
      <div className="flex px-20">
        <ul className="flex ">
          <a href="/help" className="help  px-5">
            Help
          </a>
          <a href="/contact" className="Contact px-5 ">
            Contact
          </a>
          <a href="/account" className="Account flex px-5 ">
            {" "}
            <BiUserCircle className="mt-1 -translate-x-2" /> Account
          </a>
          
          <a href="/cart" className="Cart flex ps-5 space-x-4 ">
            <BsCartPlus className="mt-1 -translate-x-2" />
            Cart
          </a>
          
        </ul>
      </div>

      </div>
    </div>
    </nav>
  );
};

export default Navbar;
