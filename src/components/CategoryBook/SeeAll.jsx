// SeeAll.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      {/* Title */}
      {/* <h2 className="text-3xl font-bold mb-4">Book Details</h2> */}
      <p className="text-lg font-semibold">{selectedBook.title}</p>

      {/* Book details container */}
      <div className="flex bg-green-200 p-4 rounded-md items-center justify-center">
        {/* Book image on the left */}
        <img
          src={selectedBook.img}
          alt={selectedBook.title}
          className="rounded-md w-60 h-70 object-cover mr-4"
        />

        {/* Book information on the right */}
        <div className='flex space-x-20'>
          {/* Left-aligned labels */}
          <div className="text-left">
            <p className="text-gray-500">Price:</p>
            <p>Author's Name:</p>
            <p>Type:</p>
          </div>

          {/* Right-aligned values */}
          <div className="text-right">
            <p className="text-gray-500">{selectedBook.price}</p>
            <p>{selectedBook.authorId}</p>
            <p>{selectedBook.category}</p>
          </div>
        </div>
      </div>
      <p className=''>{selectedBook.decs}</p>
      {/* Add a button to go back to AllCategory */}
      <Link to="/allgen" className="text-blue-500 hover:underline mt-4 w-50">
        Back to All Categories
      </Link>
    </div>
  );
}

export default SeeAll;
