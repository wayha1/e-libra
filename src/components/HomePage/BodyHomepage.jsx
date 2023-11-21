import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../App.css";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BodyHomepage = ({ visible }) => {
  const [Book, setBook] = useState([]);
  const [BookData, setBookData] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const nextIcons = () => {
    setCurrentData((prevIcons) => (prevIcons + 1) % BookData.length);
  };

  const prevIcons = () => {
    setCurrentData((prevIcons) => (prevIcons - 1 + BookData.length) % BookData.length);
  };

  const handleSeeMoreClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
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
          <button onClick={prevIcons} className="flex rounded-xl items-center bg-white hover:shadow-xl">
            <BiChevronLeftCircle className="text-cyan-700 text-3xl m-1" />
          </button>
          <Swiper slidesPerView={3} spaceBetween={10} className="min-h-fit">
            {BookData.map((data, i) => (
              <SwiperSlide key={i}>
                <div className="flex bg-gray-300 w-fit">
                  <div className="flex shadow-xl overflow-hidden">
                    {data.ImageBook && (
                      <div className="flex">
                        <img className="flex lg:w-[300px] lg:h-[100%]" src={data.ImageBook} alt="image-book" />
                      </div>
                    )}
                    <div className="flex flex-col text-left w-[80%]">
                      {data.title && (
                        <h1 className="flex book-title font-bold lg:text-2xl whitespace-nowrap justify-center m-2">
                          {data.title}
                        </h1>
                      )}
                      {data.decs && (
                        <div className="flex flex-col">
                          <p
                            className={`indent-3 p-1 flex book-decs text-md overflow-hidden ${
                              expandedIndex === i ? '' : 'line-clamp-2'
                            }`}
                          >
                            {data.decs}
                          </p>
                          <button
                            className="text-cyan-500 cursor-pointer bg-white"
                            onClick={() => handleSeeMoreClick(i)}
                          >
                            {expandedIndex === i ? 'See Less' : 'See More'}
                          </button>
                          {expandedIndex === i && (
                            <div className="">
                              <button onClick={this} className="text-cyan-500 cursor-pointer bg-white">
                                <h1 className="">Read More</h1>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button onClick={nextIcons} className="flex rounded-xl items-center bg-white hover:shadow-xl">
            <BiChevronRightCircle className="text-cyan-700 text-3xl m-1" />
          </button>
        </div>
      </section>
    </>
  );
};

export default BodyHomepage;
