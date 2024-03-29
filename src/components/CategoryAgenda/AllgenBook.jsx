import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../content/LoadingPage/LoadingPage";
import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import Sidebar from "./Sidebar";
import ContentSection from "./ContentSection";

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
    }, 1000);
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
  }, []);


  return (
    <div className="flex bg-gray-50 h-full overflow-y-auto">
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
