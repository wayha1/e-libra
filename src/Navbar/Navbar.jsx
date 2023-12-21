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
      behavior: "smooth", // You can change this to "auto" for an instant scroll
    });
  };
  return (
    <nav className="nav-bar w-full sticky top-0 z-50 bg-gray-100 shadow-sm">
      <div className="container mx-auto">
        {/* Desktop Mode */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to={"/"} onClick={scrollToTop}>
              <img
                src={require("./Logo.png")}
                alt="Logo"
                width={40}
                height={40}
                className="hidden md:flex hover:shadow-full hover:scale-110"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
