import React, { useState } from "react";
import { BiUserCircle, BiSearchAlt2 } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="nav-bar w-full sticky top-0 z-50 bg-gray-200 rounded-md shadow-lg">
      <div className="">
        {/* Desktop Mode */}
        <div className="flex justify-evenly w-full lg:flex sm:flex md:flex">
          <div className="flex space-x-4">
            <Link to={"/"}>
              <img
                src={require("./Logo.png")}
                alt="Logo"
                width={40}
                height={40}
                className="hidden md:flex shadow-inner hover:shadow-full hover:scale-110"
              />
            </Link>

            <Link
              to={"/"}
              className="logo uppercase whitespace-nowrap mt-2 hover:shadow-full hover:scale-110"
            >
              E libra
            </Link>

            <div className="relative ...">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {/* Adjusted indentation here */}
              </div>
              <input
                className="border w-52 md:w-44 sm:w-32 max-sm:w-32 px-3 mt-1 h-8 rounded-xl border-gray-900 shadow-xl shadow-inner hover:shadow-lg"
                type="search"
                placeholder="Search"
                id="search"
              />
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <ul className="flex uppercase hidden lg:flex justify-end">
              <Link
                to={"/aboutus"}
                className="about-us whitespace-nowrap px-5 hover:shadow-full hover:scale-110"
              >
                About Us
              </Link>

              <Link to={"/contact"} className="Contact px-5 hover:shadow-full hover:scale-110">
                Author
              </Link>
              <Link to={"/account"} className="Account flex px-5 hover:shadow-full hover:scale-110">
                {" "}
                <BiUserCircle className="mt-1 -translate-x-2" to={"/account"} />
                Account
              </Link>

              <Link to="/cart" className="Cart flex ps-5 space-x-4 hover:shadow-full hover:scale-110">
                <BsCartPlus className="mt-1 -translate-x-2 " to="/cart" />
                Cart
              </Link>
            </ul>
          </div>

          {/* Mobile Mode */}
          <div className="dropdown_nav z-50 w-fit h-full">
            <div onClick={handleNav} className="block lg:hidden relative w-fit -translate-x-4">
              {nav ? (
                <AiOutlineMenu size={30} className="flex m-2" />
              ) : (
                <AiOutlineClose size={30} className="flex m-2" />
              )}
            </div>
            <div
              className={
                nav
                  ? "fixed left-[-100%] "
                  : "fixed left-0 top-0 w-[80%] h-screen shadow-xl bg-white ease-in-out duration-500 absolute"
              }
            >
              <Link
                to="/"
                className="flex items-center justify-center shadow-inner hover:shadow-full hover:scale-125"
              >
                <img src={require("./Logo.png")} alt="Logo" width={50} height={50} />
                <span className="text-2xl font-semibold whitespace-nowrap text-black">E-Library</span>
              </Link>
              <div className="text-center ">
                <ul className="uppercase p-4 ">
                  <li className=" border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link to={"/aboutus"} className="font-bold whitespace-nowrap">
                      About Us
                    </Link>
                  </li>
                  <li className=" border-b border-b-slate-200 p-5  hover:shadow-full hover:scale-110">
                    <Link to={"/contact"} className="font-bold ">
                      Author
                    </Link>
                  </li>
                  <li className=" border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link to={"/account"} className="font-bold ">
                      Account
                    </Link>
                  </li>
                  <li className=" border-b border-b-slate-200 p-5  hover:shadow-full hover:scale-110">
                    <Link to={"/cart"} className="font-bold ">
                      Cart
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
