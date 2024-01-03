import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { BiChevronLeftCircle, BiChevronRightCircle, BiXCircle, BiBookmarkPlus, BiBookReader, BiSolidCartAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import BookDetail from "./Book/BookDetail";

const BookCard = ({ data, handleSeeMoreClick, handleAddToCartClick }) => (
  <div className="hover:shadow-xl w-full overflow-hidden">
    <div className="flex flex-col bg-white items-center shadow-lg h-[350px] w-[350px] md:w-[150px] max-sm:w-[120px]">
      {data.img && (
        <img
          onClick={() => handleSeeMoreClick(data.index)}
          src={data.img}
          alt="image-book"
          className="lg:w-[320px] h-[250px] md:w-[150px] max-sm:w-[120px] hover:scale-110 duration-300"
        />
      )}

      {data.title && (
        <h1 className="book-title font-bold lg:text-xl max-sm:text-sm whitespace-nowrap justify-center m-2 overflow-hidden">
          {data.title}
        </h1>
      )}

      {data.userRating && (
        <h1 className="font-bold lg:text-xl max-sm:text-sm whitespace-nowrap justify-center m-2 overflow-hidden">
          Rating: {data.userRating} Star
        </h1>
      )}
    </div>
  </div>
);

const BodyHomepage = ({ selectedBook }) => {
  const [bookData, setBookData] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const [detailIndex, setDetailIndex] = useState(0);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const navigate = useNavigate();

  const slideNext = () => {
    const lastIndex = bookData.length - 1;
    setCurrentData((prevIndex) => (prevIndex === lastIndex ? prevIndex : (prevIndex + 1) % bookData.length));
  };

  const slidePrev = () => {
    setCurrentData((prevIndex) =>
      prevIndex === 0 ? prevIndex : (prevIndex - 1 + bookData.length) % bookData.length
    );
  };

  const handleSeeMoreClick = (index) => {
    setDetailIndex(index);
    const selectedBook = bookData[index];
    navigate(`/allgen/see-all`, { state: { selectedBook } });
  };

  const recommendationBook = (index) => {
    const lastIndex = bookData.length - 1;
    const recommendedBooks = index === lastIndex ? [] : bookData.slice(index + 1, lastIndex + 1);
    setRecommendedBooks(recommendedBooks);
  };

  const handleAddToCartClick = (data) => {
    addToCart(data);
  };

  const addToCart = async (book) => {
    try {
      const cartsCollectionRef = collection(db, "addtoCart");
      const querySnapshot = await getDocs(cartsCollectionRef);
      const isItemInCart = querySnapshot.docs.some((doc) => doc.data().id === book.id);

      if (!isItemInCart) {
        await addDoc(cartsCollectionRef, book);
        setAddedItems((prevItems) => [...prevItems, book.id]);
        alert("Item added to cart!");
      } else {
        alert("Item already added to cart!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  useEffect(() => {
    const getBooks = async () => {
      try {
        const contain = collection(db, "popular");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val, index) => ({ ...val.data(), id: val.id, index }));
        const filteredData = data.filter((book) => book.userRating > 3);
        const sortedData = filteredData.sort((a, b) => b.userRating - a.userRating);
        setBookData(sortedData);
        const bookDataPromises = sortedData.map(async (elem) => {
          try {
            // Fetch additional data for each book if needed
          } catch (error) {
            console.error(`Error fetching book data for ${elem.id}:`, error);
            return null;
          }
        });
        await Promise.all(bookDataPromises);
      } catch (error) {
        console.error("Error fetching popular section data:", error);
      }
    };
    getBooks();
  }, []);

  return (
    <>
      <section>
        <div className="w-full py-2">
          <h1 className="p-5 w-full text-center underline text-3xl uppercase font-bold hover:text-cyan-800 book-style">
            {"ពេញនិយម ឥឡូវ​នេះ"}
          </h1>
        </div>

        <div className="bg-gray-100 z-10">
          <div className="flex items-center justify-between relative px-7 h-[400px] md:w-full">
            <button
              onClick={slidePrev}
              className={`flex rounded-2xl items-center bg-white hover:shadow-xl border-2 border-[#626262] ${currentData === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
              disabled={currentData === 0}
            >
              <BiChevronLeftCircle className="text-cyan-700 text-3xl lg:m-1" />
            </button>

            <div className="flex lg:gap-x-20 xl:gap-x-20 max-lg:gap-x-2 md:gap-x-5 max-sm:gap-x-8">
              {bookData.slice(
                currentData,
                currentData + (window.innerWidth < 450 ? 2 : window.innerWidth < 900 ? 3 : 4)
              ).map((data, i) => (
                <BookCard
                  key={i}
                  data={data}
                  handleSeeMoreClick={handleSeeMoreClick}
                  handleAddToCartClick={handleAddToCartClick}
                />
              ))}
            </div>
            <button
              onClick={slideNext}
              className={`flex rounded-2xl items-center bg-white hover:shadow-xl border-2 border-[#626262] ${currentData === bookData.length - 4 ? "cursor-not-allowed opacity-50" : ""
                }`}
              disabled={currentData === bookData.length - 4}
            >
              <BiChevronRightCircle className="text-cyan-700 text-3xl lg:m-1 " />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BodyHomepage;
