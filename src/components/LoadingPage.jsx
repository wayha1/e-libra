import React, { useState, useEffect } from "react";
import "./LoadingPage.css";
const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="flex w-full h-full justify-center items-center">
        {isLoading ? (
          <div className="flex flex-col lg:text-5xl text-gray-600 font-semibold tracking-wide font-mono ml-4 animate-pulse">
            <img
              src={require("./auth/LoginPage/Logo.png")}
              alt="logo"
              width={120}
              height={120}
              className="items-center"
            />
            <p className="loader"></p>
          </div>
        ) : (
          <div className="flex lg:text-5xl text-gray-600 font-semibold tracking-wide font-mono ml-4">
            <h1 className="flex mt-10">E-libra</h1>
            <img src={require("./auth/LoginPage/Logo.png")} alt="logo" width={100} height={100} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
