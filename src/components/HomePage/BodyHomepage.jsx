// BodyHomepage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import "../../App.css";

const BodyHomepage = () => {
  const [bookData, setBookData] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const [titleUserRatingSet, setTitleUserRatingSet] = useState([]);
  const navigate = useNavigate();

  const slideNext = () => {
    setCurrentData((prevIndex) => (prevIndex + 1) % bookData.length);
  };

  const slidePrev = () => {
    setCurrentData((prevIndex) => (prevIndex - 1 + bookData.length) % bookData.length);
  };

  const handleSeeMoreClick = (index) => {
    const selectedBookEntry = Object.values(bookData)[currentData];
  
    if (selectedBookEntry && selectedBookEntry.books && selectedBookEntry.books.length > 0) {
      const selectedBook = selectedBookEntry.books[0];
      if (selectedBook) {
        console.log(selectedBook);
        navigate(`/allgen/see-all`, { state: { selectedBook } });
      } else {
        console.error(`Book not found at index ${currentData}`);
      }
    } else {
      console.error(`Book entry not found at index ${currentData}`);
    }
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
      const titleUserRatingSet = data.reduce((accumulator, book) => {
        const key = `${book.userRating}_${book.title}`;
        accumulator[key] = accumulator[key] || {
          userCount: 0,
          books: [],
        };

        if (book.userRating > 3) {
          accumulator[key].userCount += 1;
          accumulator[key].books.push(book);
        }

        return accumulator;
      }, {});

      const filteredData = Object.values(titleUserRatingSet)
        .filter((entry) => entry.userCount >= 5);

      const sortedData = filteredData.sort((a, b) => b.books[0].userRating - a.books[0].userRating);
      setBookData(sortedData);
      setTitleUserRatingSet(titleUserRatingSet);
      console.log(sortedData)
      console.log(titleUserRatingSet)
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
              {Object.values(bookData).map((entry, i) => (
                <div key={i} className="flex lg:gap-x-20 xl:gap-x-20 max-lg:gap-x-2 md:gap-x-5 max-sm:gap-x-8">
                  {entry.books
                    .slice(currentData, currentData + 1) // Show only one book from the first array at a time
                    .map((data, j) => (
                      <BookCard
                        key={`${i}-${j}`}
                        data={data}
                        handleSeeMoreClick={() => handleSeeMoreClick(data.index)}
                        handleAddToCartClick={() => handleAddToCartClick(data)}
                      />
                    ))}
                </div>
              ))}
            </div>
            <button
              onClick={slideNext}
              className={`flex rounded-2xl items-center bg-white hover:shadow-xl border-2 border-[#626262] ${currentData === bookData.length - 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              disabled={currentData === bookData.length - 1}
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
