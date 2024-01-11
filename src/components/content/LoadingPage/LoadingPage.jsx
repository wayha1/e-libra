import React, { useState, useEffect } from "react";
import "./LoadingPage.css";
const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="flex w-full h-full justify-center items-center">
        {isLoading ? (
          <div className="flex flex-col lg:text-5xl text-gray-800 font-semibold tracking-wide font-mono ml-4 animate-pulse">
            <img
              src={require("./Logo.png")}
              alt="logo"
              width={80}
              height={80}
              className="items-center"
            />
            <div class="loader"></div>
          </div>
        ) : (
          <div className="flex lg:text-5xl text-gray-600 font-semibold tracking-wide font-mono ml-4">
            <div class="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
