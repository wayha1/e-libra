import React, { useState, useRef } from "react";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const [open, setOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState("login");
  const Menus = ["Setting", "Logout"];
  const [accordionState, setAccordionState] = useState({
    login: false,
    profile: false,
  });
  const menuRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const handleNav = () => {
    setNav(!nav);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleMenuItemClick = (menuItem) => {
    setOpen(false);
    setAccordionState((prevState) => ({
      ...Object.fromEntries(Menus.map((menu) => [menu, false])), // Close all other items
      [menuItem]: !prevState[menuItem], // Toggle the clicked item
    }));

    if (menuItem === "Setting") {
      setDropdownState("profile");
    } else if (menuItem === "Logout") {
      handleLogout();
      setDropdownState("login");
    }
  };

  const handleButtonClick = () => {
    if (dropdownState === "login") {
      navigate("/login");
      console.log(dropdownState);
    } else {
      setDropdownState("profile");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogout = async () => {
    try {
      // Sign out the user using Firebase authentication
      await signOut(auth);

      // Use the 'useNavigate' hook to navigate to the login page
      navigate("/login"); // Update this to the correct path for your login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
              <div className="relative flex" ref={menuRef}>
                <button onClick={handleButtonClick} className="focus:outline-none">
                  <img
                    ref={imgRef}
                    onClick={handleImageClick}
                    src={user ? user.photoURL : "https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw&r=0"}
                    alt="user"
                    className="h-15 w-12 object-cover border-4 border-gray-400 cursor-pointer rounded-full"
                  />
                </button>
                {open && (
                  <div className="bg-gray-400 shadow-lg absolute mt-20 w-[200px] duration-300 ease-in-out -translate-x-20">
                    <ul className="flex flex-col items-center">
                      {user ? (
                        <div>
                          <p className="text-green-600 mb-3">Logged in as {user.displayName}</p>
                          <button
                            onClick={handleLogout}
                            className="whitespace-nowrap px-4 py-2 border border-red-500 rounded-md bg-red-500 text-white hover:bg-red-600 hover:border-red-600"
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-red-600 mb-3">No Account</p>
                          <button
                            onClick={() => {
                              handleButtonClick();
                              navigate("/login");
                            }}
                            className="whitespace-nowrap px-4 py-2 border border-blue-500 rounded-md bg-blue-500 text-white hover:bg-blue-600 hover:border-blue-600"
                          >
                            Login
                          </button>
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>

        {/* Mobile Mode */}
        <div className="z-50 flex">
          <div onClick={handleNav} className="flex lg:hidden justify-center items-center -translate-x-8">
            {nav ? (
              <AiOutlineMenu size={40} className="bg-white rounded-md" />
            ) : (
              <AiOutlineClose size={40} className="bg-white rounded-md" />
            )}
          </div>
          <div
            className={`${nav
              ? "hidden fixed left-[-100%]"
              : "fixed left-0 top-0 w-[70%] shadow-xl ease-in-out duration-500"
              }`}
            onClick={scrollToTop}
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
                      onClick={handleNav}
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
