import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import BacIIBook from "./BacIIBook";
import AllCategory from "./AllCategory";
import ComicBook from "./ComicBook";
import StudyBook from "./StudyBook";
import NovelBook from "./NovelBook";
import LoadingPage from "../LoadingPage";

const MAIN_CATEGORY_TITLE = "មាតិកាទាំងអស់";

const categories = [
  { id: 1, name: "មាតិកាទាំងអស់", path: "/allgen" },
  { id: 2, name: "បាក់ឌុប", path: "/allgen/bacII" },
  { id: 3, name: "កំប្លែង", path: "/allgen/comdy" },
  { id: 4, name: "គំនូរជីវចល", path: "/allgen/comic" },
  { id: 5, name: "ប្រលោមលោក", path: "/allgen/novel" },
  { id: 6, name: "ចំណេះដឹងទូទៅ", path: "/allgen/study" },
  { id: 7, name: "វិទ្យាសាស្រ្ត", path: "/allgen/science" },
  { id: 8, name: "គណិតវិទ្យា", path: "/allgen/math" },
];

const Sidebar = ({ handleGoBack, activeComponent, isSmScreen, handleCategoryChange }) => {
  const renderCategories = () => {
    if (isSmScreen) {
      return (
        <select
          value={activeComponent}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="mt-10 bg-gray-300 w-full h-[50px] text-lg cursor-pointer duration-300 border p-2"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      );
    }

    return (
      <ul className="mt-10">
        {categories.map((category) => (
          <li key={category.id} className="flex text-center">
            <NavLink
              to={category.path}
              className={`${
                activeComponent === category.name ? "bg-gray-600 text-white" : "bg-gray-300"
              } w-full h-[50px] text-lg cursor-pointer duration-300 border p-2`}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col mt-5 w-[20%] book-title max-sm:hidden">
      <button
        className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        onClick={handleGoBack}
      >
        Back
      </button>
      <p className="mt-10 bg-white shadow-sm p-4 text-gray-600 whitespace-nowrap md:text-2xl lg:text-3xl text-center">
        {MAIN_CATEGORY_TITLE}
      </p>
      {renderCategories()}
    </div>
  );
};

const ContentSection = () => (
  <div
    id="contentSection"
    className="overflow-y-auto h-[980px] max-lg:h-[1050px] lg:h-[1300px] w-full bg-gray-50"
  >
    <Routes>
      <Route path="/bacII" element={<BacIIBook />} />
      <Route path="/comic" element={<ComicBook />} />
      <Route path="/study" element={<StudyBook />} />
      <Route path="/novel" element={<NovelBook />} />
      <Route path="/" element={<AllCategory />} />
      {/* Add a default route for pages that are not matched */}
      <Route path="*" element={<div className="text-center text-2xl font-medium">Page is working on</div>} />
    </Routes>
  </div>
);

const AllgenBook = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState(MAIN_CATEGORY_TITLE);
  const [isSmScreen, setIsSmScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    const component = categories.find((category) => category.path.split("/")[2] === path)?.name;
    setActiveComponent(component || MAIN_CATEGORY_TITLE);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [location]);

  const handleGoBack = () => {
    window.location.href = "/";
  };

  const handleCategoryChange = (category) => {
    setActiveComponent(category);
    // Navigate to the selected category path
    const selectedCategory = categories.find((c) => c.name === category);
    if (selectedCategory) {
      window.location.href = selectedCategory.path;
    }
  };

  useEffect(() => {
    // Update isSmScreen state on window resize
    const handleResize = () => {
      setIsSmScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex bg-gray-50 overflow-y-auto">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Sidebar
            handleGoBack={handleGoBack}
            activeComponent={activeComponent}
            isSmScreen={isSmScreen}
            handleCategoryChange={handleCategoryChange}
          />
          <ContentSection />
        </>
      )}
    </div>
  );
};

export default AllgenBook;
