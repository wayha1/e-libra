import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

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
        <ClipLoader
          className="flex justify-center items-center w-full h-full"
          loading={isLoading}
          color={545958}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        ></ClipLoader>
        <div className={`flex lg:text-5xl text-gray-600 font-semibold tracking-wide font-mono  ml-4 ${isLoading ? "animate-pulse" : ""}`}>
        <h1 className="flex mt-10">
          E-libra
        </h1>
        <img src={require("./LoginPage/Logo.png")}
            alt="logo"
            width={100}
            height={100} />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
