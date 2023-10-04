"use client";
import React from "react";
import { BiUserCircle, BiSearchAlt2 } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="w-screen py-2 font-bold ">
        <div className="flex justify-between lg:mx-10 md:mx-10 sm:mx-4 xs:mx-4">
          <div className="lg:ml-32 md:ml-12 sm:ml-12 xs:ml-12 flex space-x-5 px-5">
            <img src={require('./Logo.png')} alt="Logo" width={30} height={30}/>
            <Link to={"/"} className="logo ml-20 whitespace-normal mt-1">
              Elibra
            </Link>

            <div className="flex ">
              <input
                className="border px-2 rounded-lg border-3 border-gray-900 flex py-0.5"
                type="search"
                placeholder="Search"
                id="search"
                
              />
              <BiSearchAlt2 className="absolute flex mx-48 mt-2.5 " />
            </div>
          </div>
          <div className="flex ">
            <ul className="flex ">
              <Link to={"/help"} className="help  px-5">
                Help
              </Link>
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
