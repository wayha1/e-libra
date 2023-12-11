import React, { useState, useEffect } from "react";
import BacIIBook from "./BacIIBook";
import AllCategory from "./AllCategory";
import ComicBook from "./ComicBook";
import StudyBook from "./StudyBook";
import NovelBook from "./NovelBook";

const AllgenBook = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "All Categories" },
    { id: 2, name: "BacII" },
    { id: 3, name: "Comic" },
    { id: 4, name: "Study" },
    { id: 5, name: "Novel" },
    { id: 6, name: "Science" },
    { id: 7, name: "Mathematics" },
  ]);
  const [activeComponent, setActiveComponent] = useState("All Categories");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleGoBack = () => {
    window.location.href = "/";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Render content based on the active component
  const renderContent = () => {
    switch (activeComponent) {
      case "All Categories":
        return <AllCategory />;
      case "BacII":
        return <BacIIBook />;
      case "Comic":
        return <ComicBook />;
      case "Study":
        return <StudyBook />;
      case "Novel":
        return <NovelBook />;
      default:
        return (
          <div className="text-center text-2xl font-medium ">
            No content available for : {activeComponent}
          </div>
        );
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="w-screen h-[1200px] flex bg-gray-50">
      <div className="flex flex-col mt-1 w-[300px]">
        <button
          className="ml-5 p-2 bg-blue-800 text-white text-lg shadow-lg font-semibold rounded-l-3xl cursor-pointer w-[180px]"
          onClick={handleGoBack}
        >
          Back to Homepage
        </button>
        <p className="mt-10 text-center text-cyan-600 text-3xl p-2 font-sans uppercase font-bold">
          Categories
        </p>

        <ul className="mt-10">
          {categories.map((category) => (
            <li key={category.id} className="flex">
              <span
                className={`${
                  activeComponent === category.name ? "bg-blue-700 text-white" : "bg-gray-300"
                } w-full h-[50px] border text-center font-medium text-xl p-2 uppercase cursor-pointer`}
                onClick={() => handleComponentChange(category.name)}
              >
                {category.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div id="contentSection" className="flex-grow bg-gray-200 overflow-y-auto">
        {renderContent()}
        {/* Go to Top Button */}
        <button
          className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full"
          onClick={scrollToTop}
        >
          Go to Top
        </button>
      </div>
    </div>
  );
};

export default AllgenBook;
