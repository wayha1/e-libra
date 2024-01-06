import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "./BookPage.css"; // Import the CSS file for your styles
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set worker source URL
const workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const BookPage = () => {
  const { state } = useLocation();
  const { pages } = state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleNextPage = () => {
    if (currentPage < (pages?.BookPdf?.length ?? 0)) {
      const increment = window.innerWidth < 500 ? 1 : 2;
      setCurrentPage(currentPage + increment);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const decrement = window.innerWidth < 500 ? 1 : 2;
      setCurrentPage(currentPage - decrement);
    }
  };

  const renderPdf = () => {
    if (!pages?.BookPdf || pages.BookPdf.length === 0) {
      return <p>No pages in the book</p>;
    }

    const totalPages = pages.BookPdf.length;

    if (currentPage < 1 || currentPage > totalPages) {
      return <p>Invalid page number</p>;
    }

    const isMobile = window.innerWidth < 500;
    const slidesToShow = isMobile ? 1 : 2;

    return (
      <div className="flex h-[980px] items-center relative">

        <Document file={pages.BookPdf} onLoadSuccess={() => setCurrentPage(1)} className={`flex ${isMobile ? 'mx-5' : 'mx-5'} w-[70%] max-sm:w-[50%]`}>
          <Page pageNumber={currentPage} className="flex w-[80%]" />
        </Document>

        {!isMobile && (
          <Document file={pages.BookPdf} onLoadSuccess={() => setCurrentPage(2)} className={`flex ${isMobile ? 'mb-4' : 'mr-4'} w-full`}>
            {currentPage + 1 <= totalPages && <Page pageNumber={currentPage + 1} className="flex w-full" />}
          </Document>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex justify-between mb-8 max-sm:m-5">

          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className="bg-white text-gray-700 px-4 py-2 rounded-md"
          >
            Prev Page
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage + 1 > totalPages}
            className="bg-white text-gray-700 px-4 py-2 rounded-md"
          >
            Next Page
          </button>
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="absolute m-5">
        <button
          className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="flex h-full justify-center items-center bg-gray-600 " >
        {renderPdf()}</div>

    </>
  );
};
export default BookPage;
