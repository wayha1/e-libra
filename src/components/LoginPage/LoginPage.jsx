import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import IMAGES from "./images";

const LoginPage = () => {
  return (
    <form onSubmit="Login">
      <div className="flex item-center justify-center h-screen bg-rose-50 sm:h-screen md:h-screen xs:h-screen w-screen">
        <main className="flex flex-col item-center justify-center h-full lg:px-96 md:px-8 sm:px-12 xs:px-8 " >
          <div className="bg-gray-300 rounded-3xl ">
            <div className="mx-12">
              <h1 className="text-center text-4xl pt-8 font-bold text-blue-700">Log In</h1>

              <div className="username mt-10 ">
                <div className="flex pl-1">
                  <BiUserCircle className="mt-2.5" />
                  <label className="mt-1.5">Username</label>
                  <div className="pl-1">
                    <input
                      className="username border border-gray-600 rounded-lg pl-2 text-gray-200 bg-gray-100 py-1"
                      type="username"
                      placeholder="username or email"
                    />
                  </div>
                </div>
              </div>

              <div className="passowrd mt-8 ">
                <div className="flex pl-1 ">
                  <RiLockPasswordLine className="mt-2.5" />
                  <label className="mt-1.5">Password </label>
                  <div className="pl-1">
                    <input
                      className="password border border-gray-600 rounded-lg pl-2 text-gray-200 bg-gray-100 py-1"
                      type="password"
                      placeholder="password"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center justify-center bg-blue-700 rounded-2xl mx-20 ">
                <button
                  type="submit"
                  className="py-1.5 text-white text-2xl font-bold shadow-xl shadow-inner hover:shadow-lg"
                >
                  Log In
                </button>
              </div>

              <div className="mt-10 text-center flex justify-center w-full">
                <div className="flex">
                  <button className="py-3 "> Forgot Password &#10072; </button>
                  <button className="py-3 text-blue-700" type="Register">
                    &#160;Register
                  </button>
                </div>
              </div>

              <div className="flex justify-evenly px-3 py-3">
                <button className="">
                  <img src={IMAGES.imgFb} alt="my image" width={50} height={50} onClick={this} />
                </button>
                <button className="">
                  <img src={IMAGES.imgGoogle} alt="my image" width={50} height={50} onClick={this} />
                </button>
                <button className=" ">
                  <img src={IMAGES.imgPhone} alt="my image" width={50} height={50} onClick={this} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </form>
  );
};

export default LoginPage;
