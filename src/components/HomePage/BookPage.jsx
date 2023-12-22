import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const BookPage = () => {
  const location = useLocation();
  const { pages } = location.state || {};
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {pages && pages.length > 0 && (
        <img src={pages[currentPage]} alt={`Page ${currentPage + 1}`} className="max-w-full max-h-full" />
      )}
      <div className="flex mt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default BookPage;
