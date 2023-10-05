import React, { useState } from "react";
import { BiUserCircle, BiSearchAlt2 } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import IMAGES from "../components/LoginPage/images";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="bg-white border-gray-200 shadow-lg">
      <div className="w-screen py-5 font-bold shadow-lg">
        <div className="flex justify-between lg:mx-10 md:mx-10 sm:mx-4 xs:mx-4">
          {/* Deskop Mode */}
          <div className="lg:ml-32 md:ml-12 sm:ml-12 xs:ml-12 flex space-x-5 px-auto py-auto">
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
              className="logo ml-20 whitespace-normal mt-1 shadow-inner hover:shadow-full hover:scale-110"
            >
              Elibra
            </Link>

            <div className="flex ">
              <input
                className="border rounded-xl border-gray-900 px-3 py-2 mx-3 h-8 shadow-xl shadow-inner hover:shadow-lg"
                type="search"
                placeholder="Search "
                id="search"
              />
              <BiSearchAlt2 className="absolute flex mx-52 mt-2 " />
            </div>
          </div>

          <ul className="flex hidden md:flex">
            <Link to={"/help"} className="help  px-5 hover:shadow-full hover:scale-110">
              Help
            </Link>

            <Link to={"/contact"} className="Contact px-5 hover:shadow-full hover:scale-110">
              Contact
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

          {/* Mobile Mode */}
          <div className="dropdown_nav">
            <div onClick={handleNav} className="block md:hidden me-1">
              {nav ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}
            </div>
            <div
              className={
                nav
                  ? "fixed left-[-100%]"
                  : "fixed left-0 top-0 w-[60%] h-full shadow-xl bg-white ease-in-out duration-500"
              }
            >
              <Link
                to="/"
                className="flex items-center justify-center shadow-inner hover:shadow-full hover:scale-125"
              >
                <img src={IMAGES.imgLogo} alt="Logo" width={50} height={50} />
                <span className="text-2xl font-semibold whitespace-nowrap text-black">E-Library</span>
              </Link>
              <div className="text-center ">
                <ul className="uppercase p-4 ">
                  <li className=" border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link to={"/help"} className="font-bold ">
                      Help
                    </Link>
                  </li>
                  <li className=" border-b border-b-slate-200 p-5  hover:shadow-full hover:scale-110">
                    <Link to={"/contact"} className="font-bold ">
                      Contact
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
