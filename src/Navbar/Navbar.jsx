import React, { useState, useRef, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const [open, setOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState("login");
  const [accordionState, setAccordionState] = useState({ login: false, profile: false });
  const menuRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleNav = () => setNav(!nav);

  const handleImageClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleButtonClick = () => {
    setOpen(false);
    if (accordionState === "login") {
      navigate("/login");
    } else {
      setDropdownState("profile");
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

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

              <div className="inline-block text-left z-50" ref={menuRef}>
                <button
                  onClick={handleButtonClick}
                  className="mr-4 focus:border-gray-600 focus:border-2 
                  rounded-full flex"
                >
                  <img
                    ref={imgRef}
                    onClick={handleImageClick}
                    src={
                      user
                        ? user.photoURL
                          ? user.photoURL
                          : "https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw&r=0"
                        : "https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw&r=0"
                    }
                    alt="user"
                    className=" w-[35px] h-[35px] object-cover focus:border-gray-600 focus:border-2 rounded-full"
                  />
                </button>
                {open && (
                  <div className="flex flex-col justify-center items-center lg:items-end lg:mr-[2%] w-screen absolute right-0 z-50">
                    <ul className=" mt-2 p-8 lg:p-12 rounded-md shadow-lg bg-gray-500 -translate-x-12">
                      {user ? (
                        <div className="flex flex-col justify-center items-center space-y-4">
                          <div className="text-white text-xl font-semibold">
                            <Link to={"/account"}>
                              <button className="whitespace-nowrap px-4 py-2 text-white hover:underline">
                                Profile
                              </button>
                            </Link>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="whitespace-nowrap px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center space-y-4">
                          <p className="text-white uppercase font-semibold">No Account</p>
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
          <div
            onClick={handleNav}
            className="flex lg:hidden justify-center items-center -translate-x-8 transition-transform duration-300"
          >
            {nav ? (
              <AiOutlineMenu size={40} className="bg-white rounded-md" />
            ) : (
              <AiOutlineClose size={40} className="bg-white rounded-md" />
            )}
          </div>
          <div
            className={`${nav
              ? "hidden fixed left-[-100%] transition-transform duration-300"
              : "fixed left-0 top-0 w-[70%] shadow-xl ease-in-out duration-500 transition-transform"
              }`}
            onClick={scrollToTop}
          >
            <div className="z-50 bg-white h-screen flex flex-col items-center lg:hidden">
              {user ? (
                <Link to="/account" className="hover:shadow-full flex flex-col mt-10" onClick={handleNav}>
                  <img
                    ref={imgRef}
                    onClick={handleImageClick}
                    src={
                      user.photoURL
                        ? user.photoURL
                        : "https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw&r=0"
                    }
                    alt="user"
                    className=" w-[50px] h-[50px] object-cover focus:border-gray-600 focus:border-2 rounded-full"
                  />
                </Link>
              ) : null}
              <div className="text-center mt-10">
                <ul className="uppercase p-4">
                  <li className="border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110">
                    <Link
                      to={"/"}
                      onClick={handleNav}
                      className="whitespace-nowrap px-4 py-2 hover:shadow-full hover:scale-110"
                    >
                      Home
                    </Link>
                  </li>
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
                  <li
                    className="border-b border-b-slate-200 p-5 hover:shadow-full hover:scale-110"
                    onClick={handleNav}
                  >
                    {user ? (
                      <div
                        onClick={scrollToTop}
                        className="flex flex-col justify-center items-center space-y-4"
                      >
                        <button
                          onClick={handleLogout}
                          className="whitespace-nowrap px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <p className="text-white uppercase font-semibold">No Account</p>
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
