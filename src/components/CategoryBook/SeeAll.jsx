// SeeAll.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

function SeeAll() {
  // Access the location to get the state passed from the AllCategory component
  const location = useLocation();
  const selectedBook = location.state?.selectedBook;

  if (!selectedBook) {
    // Handle the case where there is no selected book
    return (
      <div>
        <p>No book selected.</p>
        <Link to="/allGen" className="text-blue-500 hover:underline">
          Back to All Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 mx-auto text-center">
      <div className="flex justify-between">
        <Link
          to="/allgen"
          className="text-blue-500 pl-5 hover:underline mt-4 w-50"
        >
          Back to All Categories
        </Link>
        {/* Title */}
        {/* <h2 className="text-3xl font-bold mb-4">Book Details</h2> */}
        <p className="text-4xl font-semibold pr-5 text-green-900 mb-5">
          {selectedBook.title}
        </p>
      </div>

      {/* Book details container */}
      <div className="flex bg-green-700 p-4 rounded-md items-center justify-center">
        {/* Book image on the left */}
        <img
          src={selectedBook.img}
          alt={selectedBook.title}
          className="rounded-md w-60 h-70 object-cover mr-4"
        />

        {/* Book information on the right */}
        <div className="flex space-x-20">
          {/* Left-aligned labels */}
          <div className="text-left">
            <p className="text-white">តម្លៃ:</p>
            <p className="text-white">អ្នកនិពន្ធ: </p>
            <p className="text-white">ប្រភេទ:</p>
          </div>

          {/* Right-aligned values */}
          <div className="text-right">
            <p className="text-white">{selectedBook.price} KHR</p>
            <p className="text-white">{selectedBook.authorId}</p>
            <p className="text-white">{selectedBook.type}</p>
          </div>
        </div>
      </div>
      <p className="text-lg text-gray-700 leading-relaxed mt-4 mb-4 pl-8 pr-8">
        {selectedBook.decs}
      </p>

      {/* Add a button to go back to AllCategory */}
    </div>
  );
}

export default SeeAll;
