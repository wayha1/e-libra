import React from "react";
import { useNavigate } from "react-router-dom";
import facebookLogo from "./../asset/facebook.png"
import instragramLogo from "./../asset/ig.webp"
import googleLogo from "./../asset/google.png"
import youtubeLogo from "./../asset/youtube.png"

export const Footer = () => {
  const navigate = useNavigate();
  const handleUs = () => {
    navigate("/aboutus")
  }

  return (
    <main className="flex h-full justify-evenly text-center bg-[#54743540] whitespace-nowrap py-5">
      <section className="Logo flex items-center px-3 space-y-5 max-sm:hidden">
        <div>
          <img src={require("./Logo.png")} alt="logo" width={50} height={50} />
        </div>
      </section>

      <section className="flex">
        <div className="flex flex-col space-y-5">
          <h1 className="text-xl font-bold  hover:text-cyan-700">Contact Us</h1>
          <img src={facebookLogo} onClick={handleUs} className="cursor-pointer
          w-[30px]"/>
          <img src={instragramLogo} onClick={handleUs} className="cursor-pointer 
          w-[30px]"/>
          <img src={googleLogo} onClick={handleUs} className="cursor-pointer 
          w-[30px]"/>
          <img src={youtubeLogo} onClick={handleUs} className="cursor-pointer 
          w-[30px]"/>
        </div>
      </section>
      <section className="flex">
        <div className="flex flex-col space-y-5">
          <h1 className="text-xl font-bold hover:text-cyan-700"> Resource </h1>
          <span onClick={handleUs} className="cursor-pointer hover:text-blue-300">Return Policy</span>
          <span onClick={handleUs} className="cursor-pointer hover:text-blue-300">FAG</span>
          <span onClick={handleUs} className="cursor-pointer hover:text-blue-300">Privacy Policy</span>
        </div>
      </section>
      <section className="flex ">
        <div className="flex flex-col space-y-5">
          <h1 className="text-xl font-bold hover:text-cyan-700">About Us</h1>
          <span onClick={handleUs} className="cursor-pointer hover:text-blue-300">Our Story</span>
          <span onClick={handleUs} className="cursor-pointer hover:text-blue-300">Our Vision</span>
          <span onClick={handleUs} className="cursor-pointer hover:text-blue-300">Press</span>
          <span onClick={handleUs} className="cursor-pointer hover:text-blue-300">Carrers</span>
        </div>
      </section>
    </main>
  );
};
