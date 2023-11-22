import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../App.css";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

const BodyHomepage = ({ visible }) => {
  const [Book, setBook] = useState([]);
  const [BookData, setBookData] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const slideNext = () => {
    setCurrentData((prevIndex) => (prevIndex + 3) % BookData.length);
  };

  const slidePrev = () => {
    setCurrentData((prevIndex) => (prevIndex - 3 + BookData.length) % BookData.length);
  };
  useEffect(() => {
    const getBooks = async () => {
      try {
        const contain = collection(db, "PopularSection");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val) => ({ ...val.data(), id: val.id }));
        setBook(data);

        const bookDataPromises = data.map(async (elem) => {
          try {
            const BookPop = collection(db, `PopularSection/${elem.id}/BookPopular`);
            const DataBooks = await getDocs(BookPop);
            const BookData = DataBooks.docs.map((bookDoc) => ({
              ...bookDoc.data(),
              id: bookDoc.id,
              PdfUrl: bookDoc.data().PdfUrl,
            }));
            return BookData;
          } catch (error) {
            console.error(`Error fetching book data for ${elem.id}:`, error);
            return null;
          }
        });

        const bookData = await Promise.all(bookDataPromises);
        setBookData(bookData.flat());
      } catch (error) {
        console.error("Error fetching popular section data:", error);
      }
    };
    getBooks();
  }, []);
  const handleSeeMoreClick = (index) => {
    setExpandedIndex(index);
    openModal(BookData[index]);
  };
  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <section>
        {Book.map((data, i) => (
          <button key={i}>
            <div className="" key={i}>
              {data.container && (
                <h1 className="text-4xl px-10 uppercase font-bold flex lg:py-3 hover:text-cyan-800 rounded-xl">
                  {data.container}
                </h1>
              )}
            </div>
          </button>
        ))}
        <div className="flex w-full bg-gray-100 items-center p-2 justify-between">
          <button
            onClick={() => slidePrev()}
            className="flex rounded-2xl items-center bg-white hover:shadow-xl"
          >
            <BiChevronLeftCircle className="text-cyan-700 text-3xl m-1" />
          </button>

          <div className="flex gap-8 lg:w-full m-2">
            {BookData.slice(currentData, currentData + 3).map((data, i) => (
              <div key={i} className="lg:w-full">
                <div className="flex rounded-xl bg-gray-200 lg:w-[320px] shadow-xl overflow-hidden">
                  {data.ImageBook && (
                    <div className="flex lg:w-[250px] lg:h-[250px]">
                      <img src={data.ImageBook} alt="image-book" />
                    </div>
                  )}
                  <div className="flex flex-col text-left lg:w-[200px] lg:h-fit">
                    {data.title && (
                      <h1 className="flex book-title font-bold lg:text-2xl whitespace-nowrap justify-center m-2">
                        {data.title}
                      </h1>
                    )}
                    {data.decs && (
                      <p className="indent-3 line-clamp-2 overflow-hidden lg:w-[150px] h-[50px]">
                        {data.decs}
                      </p>
                    )}
                    <div className="w-full flex items-center justify-center lg:mt-5">
                      <button
                        className="ease-in-out decoration-300 text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700"
                        onClick={() => handleSeeMoreClick(currentData + i)}
                      >
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => slideNext()}
            className="flex rounded-2xl items-center bg-white hover:shadow-xl"
          >
            <BiChevronRightCircle className="text-cyan-700 text-3xl m-1" />
          </button>
        </div>
      </section>
    </>
  );
};

export default BodyHomepage;
