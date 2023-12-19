// AllgenBook.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import BacIIBook from "./BacIIBook";
import AllCategory from "./AllCategory";
import ComicBook from "./ComicBook";
import StudyBook from "./StudyBook";
import NovelBook from "./NovelBook";

const AllgenBook = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "មាតិកាទាំងអស់", path: "/allgen" },
    { id: 2, name: "បាក់ឌុប", path: "/allgen/bacII" },
    { id: 3, name: "កំប្លែង", path: "/allgen/comic" },
    { id: 4, name: "ចំណេះដឹងទូទៅ", path: "/allgen/study" },
    { id: 5, name: "ប្រលោមលោក", path: "/allgen/novel" },
    { id: 6, name: "Science", path: "/allgen/science" },
    { id: 7, name: "Mathematics", path: "/allgen/math" },
  ]);
  const [activeComponent, setActiveComponent] = useState("មាតិកាទាំងអស់");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleGoBack = () => {
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "មាតិកាទាំងអស់":
        return <AllCategory />;
      case "បាក់ឌុប":
        return <BacIIBook />;
      case "កំប្លែង":
        return <ComicBook />;
      case "ចំណេះដឹងទូទៅ":
        return <StudyBook />;
      case "ប្រលោមលោក":
        return <NovelBook />;
      default:
        return (
          <div className="text-center text-2xl font-medium">No content available for : {activeComponent}</div>
        );
    }
  };
  return (
    <div className="flex bg-gray-50 overflow-y-auto">
      <div className="flex flex-col mt-5 w-[25%]">
        <button
          className="mt-5 bg-blue-700 text-white shadow-lg font-semibold rounded-l-3xl cursor-pointer w-[180px] justify-end"
          onClick={handleGoBack}
        >
          BacktoHomepage
        </button>
        <p className="mt-10 bg-white shadow-sm p-4 text-gray-600 whitespace-nowrap md:text-2xl lg:text-3xl text-center">
          មាតិកាទាំងមូល
        </p>

        <ul className="mt-10">
          {categories.map((category) => (
            <li key={category.id} className="flex text-center">
              <Link
                to={category.path}
                className={`${
                  activeComponent === category.name ? "bg-blue-700 text-white" : "bg-gray-300"
                } w-full h-[50px] text-lg cursor-pointer duration-300 border p-2`}
                onClick={() => handleComponentChange(category.name)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div id="contentSection" className=" overflow-y-auto h-[1015px] w-[75%] bg-gray-100">
        {/* <button
          className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full"
          onClick={scrollToTop}
        >
          Go to Top
        </button> */}
        <Routes>
          <Route path="/" element={<AllCategory />} />
          <Route path="/bacII" element={<BacIIBook />} />
          <Route path="/comic" element={<ComicBook />} />
          <Route path="/study" element={<StudyBook />} />
          <Route path="/novel" element={<NovelBook />} />
        </Routes>
      </div>
    </div>
  );
};

export default AllgenBook;
