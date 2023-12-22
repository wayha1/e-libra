import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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

  const handleNextPage = () => {
    if (currentPage < (pages?.BookPdf?.length ?? 0)) {
      setCurrentPage(currentPage + 2);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 2);
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

    return (
      <div className="flex h-[980px] justify-center items-center relative">
        <Document file={pages.BookPdf} onLoadSuccess={() => setCurrentPage(1)} className="flex">
          {/* Display the current page and the next page */}
          <Page pageNumber={currentPage} className="flex mr-2 w-[500px]" />
          {currentPage + 1 <= totalPages && <Page pageNumber={currentPage + 1} className="flex w-[500px]" />}
        </Document>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between mb-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Prev Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage + 1 > totalPages}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Next Page
          </button>
        </div>
      </div>
    );
  };

  return <div className="flex h-[970px] justify-center items-center bg-gray-600">{renderPdf()}</div>;
};
export default BookPage;
