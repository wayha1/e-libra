import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../../App.css";

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

const BodyHomepage = () => {
  const [bookData, setBookData] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const navigate = useNavigate();

  const slideNext = () => {
    setCurrentData((prevIndex) => (prevIndex + 1) % bookData.length);
  };

  const slidePrev = () => {
    setCurrentData((prevIndex) => (prevIndex - 1 + bookData.length) % bookData.length);
  };

  const handleSeeMoreClick = (index) => {
    const selectedBook = bookData[index];
    navigate(`/allgen/see-all`, { state: { selectedBook } });
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
        alert("Item added to cart!");
      } else {
        alert("Item already added to cart!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const getBooks = async () => {
    try {
      const contain = collection(db, "popular");
      const snapshot = await getDocs(contain);
      const data = snapshot.docs.map((val, index) => ({ ...val.data(), id: val.id, index }));
      const filteredData = data.filter((book) =>
        book.userRating > 3 && book.userId >= 10);

      const sortedData = filteredData.sort((a, b) => b.userRating - a.userRating);
      setBookData(sortedData);
    } catch (error) {
      console.error("Error fetching popular section data:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <section>
      <div className="w-full py-2">
        <h1 className="p-5 w-full text-center underline text-3xl uppercase font-bold hover:text-cyan-800 book-style">
          {"ពេញនិយម ឥឡូវ​នេះ"}
        </h1>
      </div>

      <div className="bg-gray-100 z-10">
        {bookData.length === 0 ? (
          <p className="text-center text-gray-700 py-8">No popular books available</p>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default BodyHomepage;
