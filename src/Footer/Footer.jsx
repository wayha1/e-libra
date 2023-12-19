import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export const Footer = () => {
  return (
    <main className="flex h-full justify-evenly text-center bg-[#54743540] whitespace-nowrap py-5">
      <section className="Logo flex items-center px-3 space-y-5 max-sm:hidden">
        <div>
          <img src={require("./Logo.png")} alt="logo" width={50} height={50} />
        </div>
      </section>

      <section className="flex">
        <div className="flex flex-col space-y-5 ">
          <h1 className="text-xl font-bold  hover:text-cyan-700">Contact Us</h1>
          <span>Facebook</span>
          <span>Instagram</span>
          <span>Google</span>
          <span>Youtube</span>
        </div>
      </section>
      <section className="flex">
        <div className="flex flex-col space-y-5">
          <h1 className="text-xl font-bold hover:text-cyan-700"> Resource </h1>
          <span>Return Policy</span>
          <span>FAG</span>
          <span>Privacy Policy</span>
        </div>
      </section>
      <section className="flex ">
        <div className="flex flex-col space-y-5">
          <h1 className="text-xl font-bold hover:text-cyan-700">About Us</h1>
          <span>Our Story</span>
          <span>Our Vision</span>
          <span>Press</span>
          <span>Carrers</span>
        </div>
      </section>
      {/* <section className="flex">
        <div className="flex flex-col px-3 ">
        <DropdownButton id="dropdown-basic-button" title="Dropdown button" className="text-xl hover:text-cyan-700 appearance-none">
          <div className="flex flex-col space-y-3">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </div>
        </DropdownButton>
        </div>
      </section> */}
    </main>
  );
};
