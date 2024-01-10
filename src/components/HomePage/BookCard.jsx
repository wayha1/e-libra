const BookCard = ({ data, handleSeeMoreClick, handleAddToCartClick }) => (
  <div className="w-full">
    <div className="flex flex-col items-center h-[350px] w-[350px] lg:w-[220px] md:w-[170px] max-sm:w-[120px]">
      {data.img && (
        <img
          src={data.img}
          alt="image-book"
          className="lg:w-[200px] h-[250px] md:w-[170px] max-sm:w-[120px] duration-300 rounded-lg hover:scale-90"
          onClick={() => handleSeeMoreClick(data.index)}
        />
      )}

      {data.title && (
        <h1 className="book-title text-gray-800 lg:text-xl max-sm:text-sm whitespace-nowrap m-2">
          {data.title}
        </h1>
      )}

      {data.userRating && (
        <h1 className="lg:text-xl max-sm:text-sm font-bold text-gray-500 whitespace-nowrap justify-center overflow-hidden ">
          Rating: {data.userRating} Star
        </h1>
      )}
      {/* <button onClick={() => handleAddToCartClick(data)} className="bg-cyan-700 text-white p-2 mt-auto rounded-md hover:bg-cyan-800">
        Add to Cart
      </button> */}
    </div>
  </div>
);

export default BookCard;
