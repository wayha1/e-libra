// BookCard.jsx
import React from "react";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

const BookCard = ({ data, handleSeeMoreClick, handleAddToCartClick }) => (
  <div className="hover:shadow-xl w-full overflow-hidden">
    <div className="flex flex-col bg-white items-center shadow-lg h-[350px] w-[350px] lg:w-[220px] md:w-[150px] max-sm:w-[120px]">
      {data.img && (
        <img
          src={data.img}
          alt="image-book"
          className="lg:w-[200px] h-[250px] md:w-[150px] max-sm:w-[120px] duration-300 p-0 hover:bg-gray-700"
          onClick={() => handleSeeMoreClick(data.index)}
        />
      )}

      {data.title && (
        <h1 className="book-title font-bold text-gray-500 lg:text-xl max-sm:text-sm whitespace-nowrap m-2 overflow-hidden">
          {data.title}
        </h1>
      )}

      {data.userRating && (
        <h1 className="lg:text-xl max-sm:text-sm whitespace-nowrap justify-center m-2 overflow-hidden">
          Rating: {data.userRating}
        </h1>
      )}
      {/* <button onClick={() => handleAddToCartClick(data)} className="bg-cyan-700 text-white p-2 mt-auto rounded-md hover:bg-cyan-800">
        Add to Cart
      </button> */}
    </div>
  </div>
);

export default BookCard;
