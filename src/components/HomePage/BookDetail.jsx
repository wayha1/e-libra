import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BiXCircle, BiBookmarkPlus, BiBookReader, BiSolidCartAdd } from "react-icons/bi";

const BookDetail = ({ bookData, closeBook, handleAddToCartClick, setReadBook }) => {
  const { bookId } = useParams();
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Check if the selected book is available in the location state
    if (location.state && location.state.selectedBook) {
      setSelectedBook(location.state.selectedBook);
    } else {
      // If not available, fetch the book data based on the bookId
      const foundBook = bookData.find((book) => book.id === bookId);

      if (foundBook) {
        setSelectedBook(foundBook);
      } else {
        setSelectedBook(null);
      }
    }
  }, [bookData, bookId, location.state]);

  if (!selectedBook) {
    return <div>No book found for the given ID.</div>;
  }
  console.log("Book ID:", selectedBook.id);

  return (
    <div className="w-screen h-[1010px]">
      <div className="max-sm:flex max-sm:flex-col w-[100%] lg:h-[80%] md:h-[70%] max-md:h-[50%] max-sm:h-[70%] max-sm:w-full">
        <div
          key={selectedBook.id}
          className="lg:flex lg:h-[100%] md:h-[100%] max-sm:w-[100%] max-sm:h-[70%] relative "
        >
          {selectedBook.img && (
            <div className="bg-no-repeat bg-left flex lg:justify-center max-sm:justify-center md:justify-center lg:w-[50%] lg:h-[100%] max-sm:w-[100%] md:h-[60%] md:w-[100%] max-md:h-[50%] max-md:w-[100%] max-sm:h-[80%] lg:p-5 max-sm:p-2">
              <img
                src={selectedBook.img}
                alt="img-book"
                className="lg:w-[80%] lg:h-[100%] md:h-[100%] md:w-[90%] max-md:w-[100%] max-sm:h-[100%] max-sm:w-[90%] rounded-md shadow-xl lg:items-center hover:scale-90 hover:duration-200"
              />
            </div>
          )}
          {/* <button className="absolute top-0 right-0 lg:p-4 max-sm:-translate-x-2">
            <BiXCircle className="text-[40px] max-sm:text-[30px] text-gray-500" onClick={closeBook} />
          </button> */}

          <div className="lg:w-[50%] md:indent-8 md:w-[100%] max-md:w-[100%] md:p-2 max-sm:p-2 max-sm:w-[95%] overflow-hidden ">
            {selectedBook.title && (
              <h1 className="flex book-title font-bold text-gray-700 lg:text-5xl md:text-5xl lg:translate-y-12 max-sm:text-3xl whitespace-nowrap justify-center">
                {selectedBook.title}
              </h1>
            )}
            {selectedBook.author && (
              <h1 className="hover:text-cyan-800 flex book-decs font-bold text-gray-500 lg:text-xl lg:translate-y-12 mt-1 md:text-lg max-sm:text-sm whitespace-nowrap max-sm:ml-2">
                Author By : {selectedBook.author}
              </h1>
            )}

            {selectedBook.decs && (
              <p className="lg:text-xl lg:mt-12 md:text-xl max-sm:text-sm max-h-[200px] overflow-y-auto">
                {selectedBook.decs}
              </p>
            )}
            <div className="flex flex-col ">
              {selectedBook.price && (
                <div className="flex w-fit book-decs md:m-3 max-sm:m-3">
                  <h1 className="whitespace-nowrap flex lg:text-4xl md:text-3xl max-md:text-2xl max-sm:text-3xl hover:underline">
                    Price :
                  </h1>
                  <h2 className="whitespace-nowrap flex font-bold text-red-800 lg:text-5xl md:text-4xl max-md:text-4xl max-sm:text-4xl ml-5">
                    {selectedBook.price}
                  </h2>
                </div>
              )}

              <div className="lg:gap-x-2 flex lg:mt-3 md:gap-x-5 max-md:gap-x-5 max-sm:gap-x-1 text-xl justify-center max-sm:text-md">
                {/* <button
                  className="gap-x-1 lg:p-1 lg:w-52 max-sm:w-32 rounded-xl bg-gray-500 flex items-center text-white whitespace-nowrap hover:bg-gray-800"
                  onClick={() => this}
                >
                  <BiBookmarkPlus className="lg:text-2xl md:text-3xl " />
                  Add to Playlist
                </button> */}
                <button
                  onClick={() => {
                    setReadBook(true);
                  }}
                  className="gap-x-1 p-1 lg:w-52 max-sm:w-32 rounded-xl bg-gray-500 flex items-center justify-center text-white text-xl whitespace-nowrap hover:bg-gray-800"
                >
                  <BiBookReader className="lg:text-2xl md:text-3xl " />
                  Read Now
                </button>
                <button
                  className="gap-x-1 p-1 lg:w-52 max-sm:w-32 rounded-xl bg-gray-500 flex items-center justify-center text-white text-xl whitespace-nowrap hover:bg-gray-800"
                  onClick={() => handleAddToCartClick(selectedBook)}
                >
                  <BiSolidCartAdd className="lg:text-2xl md:text-3xl " />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;