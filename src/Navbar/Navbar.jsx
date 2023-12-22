import React, { useState, useRef } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const [open, setOpen] = useState(false);
  const Menus = ["Setting", "Logout"];
  const menuRef = useRef();
  const imgRef = useRef();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleMenuItemClick = () => {
    setOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <nav className="nav-bar w-full sticky top-0 z-50 bg-gray-100 shadow-sm">
      <div className="container mx-auto flex">
        {/* Desktop Mode */}
        <div className="flex justify-between items-center py-4 w-full ">
          <div className="flex items-center space-x-4">
            <Link to={"/"} onClick={scrollToTop}>
              <img
                src={require("./Logo.png")}
                alt="Logo"
                width={40}
                height={40}
                className="max-lg:hidden md:flex hover:shadow-full hover:scale-110"
              />
            </Link>

            <Link
              to={"/"}
              onClick={scrollToTop}
              className="uppercase whitespace-nowrap hover:shadow-full hover:scale-110"
            >
              E-libra
            </Link>
          </div>
          <ul className="max-lg:hidden">
            <div className="flex items-center space-x-4 mr-10">
              <Link
                to={"/allgen"}
                onClick={scrollToTop}
                className="whitespace-nowrap px-4 py-2 hover:shadow-full hover:scale-110"
              >
                Category Book
              </Link>
              <Link
                to={"/aboutus"}
                onClick={scrollToTop}
                className="whitespace-nowrap px-4 py-2 hover:shadow-full hover:scale-110"
              >
                About Us
              </Link>
              <Link
                to={"/author"}
                onClick={scrollToTop}
                className="px-4 py-2 hover:shadow-full hover:scale-110"
              >
                Author
              </Link>
              <Link
                to="/cart"
                onClick={scrollToTop}
                className="px-4 py-2 hover:shadow-full flex hover:scale-110"
              >
                <BsCartPlus className="mt-1 -translate-x-2" />
                Cart
              </Link>
              {/* Integrated Account component */}
              <div className="relative">
                <img
                  ref={imgRef}
                  onClick={handleImageClick}
                  src="https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw&r=0"
                  alt="user"
                  className="h-14 w-18 object-cover border-4 border-gray-400 cursor-pointer rounded-full"
                />
                {open && (
                  <div ref={menuRef} className="bg-gray-200 p-4 w-52 shadow-lg absolute -left-14 top-20">
                    <ul>
                      {Menus.map((menu) => (
                        <Link
                          key={menu}
                          onClick={() => {
                            handleMenuItemClick();
                            scrollToTop();
                            if (menu === "Setting") {
                              // Navigate to the AccountPage when "Setting" is clicked
                              window.location.href = "/account";
                            }
                          }}
                          className="flex flex-col p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
                        >
                          {menu}
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>

        {/* Mobile Mode */}
        <div className="z-50 flex">
          <div
            onClick={handleNav}
            className="flex block lg:hidden justify-center items-center -translate-x-8"
          >
            {nav ? (
              <AiOutlineMenu size={40} className="bg-white rounded-md" />
            ) : (
              <AiOutlineClose size={40} className="bg-white rounded-md" />
            )}
          </div>
          <div
            className={`${
              nav
                ? "hidden fixed left-[-100%]"
                : "fixed left-0 top-0 w-[70%] shadow-xl ease-in-out duration-500 absolute"
            }`}
          >
            <div className="z-50 bg-white h-screen flex flex-col items-center lg:hidden">
              <Link to="/" className="hover:shadow-full flex flex-col" onClick={handleNav}>
                <img
                  src={require("./Logo.png")}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="ml-4 hover:scale-110"
                />
                <span className="text-2xl whitespace-nowrap text-gray-600 hover:scale-110">E-Libra</span>
              </Link>
              <div className="text-center mt-10">
                <ul className="uppercase p-4">
                  <li className="border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link
                      to={"/allgen"}
                      onClick={scrollToTop}
                      className="whitespace-nowrap px-4 py-2 hover:shadow-full hover:scale-110"
                    >
                      Category Book
                    </Link>
                  </li>
                  <li className="border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link
                      to={"/aboutus"}
                      className="whitespace-nowrap px-4 py-2 hover:shadow-full hover:scale-110"
                      onClick={handleNav}
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link
                      to={"/author"}
                      className="whitespace-nowrap px-4 py-2 hover:shadow-full hover:scale-110"
                      onClick={handleNav}
                    >
                      Author
                    </Link>
                  </li>
                  {/* <li className="border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link
                      to={"/account"}
                      className="whitespace-nowrap px-4 py-2 hover:shadow-full hover:scale-110"
                      onClick={handleNav}
                    >
                      Account
                    </Link>
                  </li> */}
                  <li className="border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link
                      to={"/cart"}
                      className="whitespace-nowrap px-4 py-2 hover:shadow-full hover:scale-110"
                      onClick={handleNav}
                    >
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
