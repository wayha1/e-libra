import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../content/LoadingPage/LoadingPage";
import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import Sidebar from "./Sidebar";
import ContentSection from "./ContentSection";

const MAIN_CATEGORY_TITLE = "មាតិកាទាំងអស់";

const categories = [
  { id: 1, name: "មាតិកាទាំងអស់", path: "/allgen" },
  // ... (your other categories)
];

const AllgenBook = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState(MAIN_CATEGORY_TITLE);
  const [isSmScreen, setIsSmScreen] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isSmScreen); // Set to true for larger screens
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    const component = categories.find((category) => category.path.split("/")[2] === path)?.name;
    setActiveComponent(component || MAIN_CATEGORY_TITLE);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmScreen(window.innerWidth < 768);
      setIsSidebarOpen(!isSmScreen); // Automatically open on larger screens
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmScreen]);

  return (
    <div className="flex bg-gray-50 overflow-y-auto">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {isSmScreen && (
            <button onClick={toggleSidebar} className="text-xl max-sm:absolute ">
              {!isSidebarOpen ? <FaArrowAltCircleRight /> : <FaArrowCircleLeft />}
            </button>
          )}
          {isSidebarOpen && (
            <Sidebar
              handleGoBack={() => navigate(-1)}
              activeComponent={activeComponent}
              isSmScreen={isSmScreen}
              handleCategoryChange={(category) => {
                setActiveComponent(category);
                const selectedCategory = categories.find((c) => c.name === category);
                if (selectedCategory) {
                  navigate(selectedCategory.path);
                }
              }}
              categories={categories}
            />
          )}
          <ContentSection />
        </>
      )}
    </div>
  );
};

export default AllgenBook;
