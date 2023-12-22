import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "./BookPage.css"; // Import the CSS file for your styles

// Set worker source URL
const workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const BookPage = () => {
  const { state } = useLocation();
  const { pages } = state || {};
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < (pages?.BookPdf?.length ?? 0)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPdf = () => (
    <div className="flex h-[1000px] justify-center items-center relative">
      <Document file={pages.BookPdf} onLoadSuccess={() => setCurrentPage(1)}>
        <Page pageNumber={currentPage} className="flex" />
      </Document>

      <div className="absolute bottom-0 left-0 right-0">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Prev Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === (pages?.BookPdf?.length ?? 0)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Next Page
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-[1000px] justify-center items-center bg-gray-50">
      {pages.BookPdf && renderPdf()}
    </div>
  );
};

export default BookPage;
