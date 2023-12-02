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
        <h1 className={`lg:text-5xl text-gray-600 font-semibold tracking-wide font-serif  ml-4 ${isLoading ? "animate-pulse" : ""}`}>
          Welcome E-libra
        </h1>
      </div>
    </div>
  );
};

export default LoadingPage;
