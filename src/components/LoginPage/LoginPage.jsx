import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import "./Login.module.css";

const LoginPage = () => {
  return (
    <form className="flex flex-col item-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col item-center justify-center w-full h-full px-96 flex-1 ">
        <div className="bg-white rounded-2xl ">
          <div className="">
            <h1 className="text-center text-4xl pt-5">Log In</h1>

            <div className="username mt-8 text-center w-full flex justify-center ">
              <div className="flex">
                <BiUserCircle className="mt-1" />
                <label className="pl-2">Username</label>
                <div className="pl-2">
                  <input
                    className="username border border-indigo-600 rounded-lg pl-2 text-gray-200"
                    type="username"
                    placeholder="username or email"
                  />
                </div>
              </div>
            </div>
            <div className="passowrd mt-8 text-center w-full flex justify-center">
              <div className="flex items-between">
                <RiLockPasswordLine className="mt-1" />
                <label className="pl-2">Password </label>
                <div className="pl-2">
                  <input
                    className="password border border-indigo-600 rounded-lg pl-2 text-gray-200 "
                    type="password"
                    placeholder="password"
                  />
                </div>
              </div>
            </div>

            <div className="w-full px-32">
            <div className="mt-6 text-center justify-center bg-cyan-500 rounded-lg ">
              <button type="submit" className="py-3 text-white text-2xl">
                Log in
              </button>
            </div>
            </div>

            <div className="mt-10 text-center flex justify-center w-full rounded-lg pb-5">
              <div className="flex">
                <h1 className="py-3 ">Forgot Password  </h1>
                <button className="py-3 text-red" type="Register">/ Register</button>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </form>
  );
};

export default LoginPage;
