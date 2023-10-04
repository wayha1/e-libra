import React from "react";
import IMAGES from "../LoginPage/images";
const RegisterPage = () => {
  return (
    <form onSubmit="Register">
      <div className="flex item-center justify-center h-screen bg-sky-600 sm:h-screen md:h-screen xs:h-screen w-screen">
        <main className="flex flex-col item-center justify-center h-full lg:px-96 md:px-8 sm:px-12 xs:px-8 ">
          <div className="justify-center items-center flex">
            <div className="bg-white rounded-3xl ">
              <div className="mx-12">
                <h1 className="text-center text-4xl pt-8 font-bold text-blue-700">Register</h1>
                <div className="username mt-10 ">
                  <div className="flex pl-1">
                    <div className="pl-1">
                      <input
                        className="first-name border border-gray-600 rounded-lg pl-2 text-gray-200 bg-gray-100 py-1"
                        type="first-name"
                        placeholder="first-name"
                      />
                    </div>
                  </div>
                </div>
                <div className="last-name mt-10 ">
                  <div className="flex pl-1">
                    <div className="pl-1">
                      <input
                        className="last-name border border-gray-600 rounded-lg pl-2 text-gray-200 bg-gray-100 py-1"
                        type="last-name"
                        placeholder="last-name"
                      />
                    </div>
                  </div>
                </div>
                <div className="username mt-10 ">
                  <div className="flex pl-1">
                    <div className="pl-1">
                      <input
                        className="username border border-gray-600 rounded-lg pl-2 text-gray-200 bg-gray-100 py-1"
                        type="username"
                        placeholder="username or email"
                      />
                    </div>
                  </div>
                </div>

                <div className="password mt-10 ">
                  <div className="flex pl-1">
                    <div className="pl-1">
                      <input
                        className="password border border-gray-600 rounded-lg pl-2 text-gray-200 bg-gray-100 py-1"
                        type="password"
                        placeholder="password"
                      />
                    </div>
                  </div>
                </div>
                <div className="cureent-password mt-10 ">
                  <div className="flex pl-1">
                    <div className="pl-1">
                      <input
                        className="cureent-password border border-gray-600 rounded-lg pl-2 text-gray-200 bg-gray-100 py-1"
                        type="cureent-password"
                        placeholder="cureent-password"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center justify-center bg-blue-700 rounded-xl mx-10 hover:bg-blue-800">
                <button
                  type="submit"
                  className="py-1.5 text-white text-2xl font-bold shadow-xl shadow-inner hover:shadow-lg ">
                  Register
                </button>
              </div>
              <div>
              <ul className="flex justify-between px-3 py-3">
                <button className="">
                  <img src={IMAGES.imgFb} alt="my image" width={50} height={50} onClick={this} className=" shadow-inner hover:shadow-full hover:scale-125 " />
                </button>
                <button className="">
                  <img src={IMAGES.imgGoogle} alt="my image" width={50} height={50} onClick={this} className=" shadow-inner hover:shadow-full hover:scale-125 " />
                </button>
                <button className=" ">
                  <img src={IMAGES.imgPhone} alt="my image" width={50} height={50} onClick={this} className=" shadow-inner hover:shadow-full hover:scale-125 " />
                </button>
              </ul>
              </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </form>
  );
};

export default RegisterPage;
