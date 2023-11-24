import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../App.css";
import {
  BiChevronLeftCircle,
  BiChevronRightCircle,
  BiXCircle,
  BiBookmarkPlus,
  BiBookReader,
  BiSolidCartAdd,
} from "react-icons/bi";

const BodyHomepage = ({ visible }) => {
  const [Book, setBook] = useState([]);
  const [BookData, setBookData] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const Showdata = useState(0);

  const showSpecificModal = (index) => {
    setCurrentData(index);
    setOpenModal(true);
  };
  // const [expandedIndex, setExpandedIndex] = useState(null);
  // const [selectedBook, setSelectedBook] = useState(null);

  const slideNext = () => {
    setCurrentData((prevIndex) => (prevIndex + 1) % BookData.length);
  };

  const slidePrev = () => {
    setCurrentData((prevIndex) => (prevIndex - 1 + BookData.length) % BookData.length);
  };

  // const toggleSeeMore = (index) => {
  //   if (currentData.length.value && !currentData.lengthvalue.contains(BookData.value)){

  //   }

  //   openModal(BookData[index]);
  // };

  // const openModal = (book) => {
  //   setSelectedBook(book);
  //   setShowMore(true);
  // };

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    Showdata.current = BookData.length;
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
        <div className=" flex items-center justify-center bg-gray-100  z-10">
          <div className="w-full flex items-center justify-between px-2 relative">
            <button
              onClick={() => slidePrev()}
              className="flex rounded-2xl items-center bg-white hover:shadow-xl border-2 border-[#626262]"
            >
              <BiChevronLeftCircle className="text-cyan-700 text-3xl lg:m-1 " />
            </button>

            <div className="flex gap-x-8 w-full overflow-hidden p-3 ">
              {BookData.slice(
                currentData,
                currentData + (window.innerWidth < 450 ? 1 : window.innerWidth < 770 ? 2 : 3)
              ).map((data, i) => (
                <div key={i} className="hover:shadow-xl">
                  <div className="flex rounded-xl bg-gray-200 shadow-xl overflow-hidden  duration-300">
                    {data.ImageBook && (
                      <img
                        src={data.ImageBook}
                        alt="image-book"
                        className="flex lg:w-[200px] lg:h-[250px] xl:w-[250px] xl:h-[300px] max-lg:w-[150px] max-lg:h-[200px] max-sm:w-[150px] max-sm:h-[180px]"
                      />
                    )}
                    <div className="flex flex-col text-left lg:w-[170px] lg:h-full xl:w-[200px] max-lg:w-[150px] max-sm:w-[120px] overflow-hidden">
                      {data.title && (
                        <h1 className="flex book-title font-bold lg:text-2xl max-sm:text-sm whitespace-nowrap justify-center m-2 ">
                          {data.title}
                        </h1>
                      )}

                      {data.decs && (
                        <p className="indent-3 line-clamp-2 overflow-hidden max-sm:text-xs">{data.decs}</p>
                      )}
                      <div className="w-full flex items-center justify-center lg:mt-5 max-md:mt-3 max-sm:p-4">
                        <button
                          className="flex whitespace-nowrap ease-in-out decoration-300 text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700"
                          onClick={(e) => {
                            setOpenModal(true);
                          }}
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
              className="flex rounded-2xl items-center bg-white hover:shadow-xl border-2 border-[#626262]"
            >
              <BiChevronRightCircle className="text-cyan-700 text-3xl lg:m-1 " />
            </button>
          </div>
        </div>
      </section>

      {/* Modal book */}
      {openModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center max-sm:translate-y-40 lg:translate-y-12 transition-opacity z-50">
          <div className="flex-shrink-0 w-full h-full ">
            <div
              className="w-[90%] h-[80%] max-sm:h-[60%] bg-gray-100 rounded-2xl mx-auto my-8 relative"
              ref={Showdata}
            >
              <div className="flex h-[60%]">
                {BookData.filter((book, index) => index === currentData).map((data, i) => (
                  <div key={i} className="flex w-[100%] h-[100%] relative ">
                    {data.ImageBook[i] && (
                      <div className="bg-no-repeat bg-left flex justify-center lg:w-[50%] max-sm:w-[100%] max-sm:p-1 lg:p-5">
                        <img
                          src={data.ImageBook}
                          alt="image-book"
                          className="w-[80%] h-[100%] max-sm:h-[50%] max-sm:w-[100%] rounded-md shadow-xl items-center "
                        />
                      </div>
                    )}
                    <button className="absolute top-0 right-0 p-4">
                      <BiXCircle className="text-[40px] text-gray-500" onClick={closeModal} />
                    </button>

                    <div className="w-[50%] flex flex-col overflow-hidden">
                      {data.title && (
                        <h1 className="flex book-title font-bold text-gray-700 lg:text-5xl lg:translate-y-12 max-sm:text-sm whitespace-nowrap justify-center">
                          {data.title}
                        </h1>
                      )}
                      {data.author && (
                        <h1 className="hover:text-cyan-800 flex book-decs font-bold text-gray-500 lg:text-xl lg:translate-y-12 mt-1 max-sm:text-sm whitespace-nowrap ">
                          Author By : {data.author}
                        </h1>
                      )}

                      {data.decs && <p className="lg:text-xl lg:translate-y-14 ">{data.decs}</p>}
                      {data.price && (
                        <div className="lg:mt-20 flex w-fit book-decs ">
                          <h1 className="flex lg:text-4xl underline">Price :</h1>
                          <h2 className="flex text-gray-700 lg:text-5xl ml-5">{data.price}</h2>
                        </div>
                      )}

                      <div className="lg:gap-x-5 flex lg:mt-10">
                        <button
                          className="gap-x-1 p-1 lg:w-52 rounded-xl bg-gray-500 flex items-center justify-center text-white text-xl whitespace-nowrap hover:bg-gray-800"
                          onClick={() => this}
                        >
                          <BiBookmarkPlus className="lg:text-2xl" />
                          Add to Playlist
                        </button>
                        <button className="gap-x-1 p-1 lg:w-52 rounded-xl bg-gray-500 flex items-center justify-center text-white text-xl whitespace-nowrap hover:bg-gray-800">
                          <BiBookReader className="lg:text-2xl" />
                          Read Now
                        </button>
                        <button className="gap-x-1 p-1 lg:w-52 rounded-xl bg-gray-500 flex items-center justify-center text-white text-xl whitespace-nowrap hover:bg-gray-800">
                          <BiSolidCartAdd className="lg:text-2xl" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-3xl px-10 uppercase font-bold flex lg:py-3 hover:text-cyan-800">
                  <h1> Recommendation </h1>
                </div>
                <div className="mt-10 flex gap-x-8 w-full overflow-hidden p-3 ">
                  {BookData.slice(
                    currentData,
                    currentData + (window.innerWidth < 450 ? 1 : window.innerWidth < 770 ? 2 : 3)
                  ).map((data, i) => (
                    <div key={i} className="hover:shadow-xl">
                      <div className="flex rounded-xl bg-gray-200 shadow-xl overflow-hidden  duration-300">
                        {data.ImageBook && (
                          <img
                            src={data.ImageBook}
                            alt="image-book"
                            className="flex lg:w-[200px] lg:h-[250px] xl:w-[250px] xl:h-[300px] max-lg:w-[150px] max-lg:h-[200px] max-sm:w-[150px] max-sm:h-[180px]"
                          />
                        )}
                        <div className="flex flex-col text-left lg:w-[170px] lg:h-full xl:w-[200px] max-lg:w-[150px] max-sm:w-[120px] overflow-hidden">
                          {data.title && (
                            <h1 className="flex book-title font-bold lg:text-2xl max-sm:text-sm whitespace-nowrap justify-center m-2 ">
                              {data.title}
                            </h1>
                          )}

                          {data.decs && (
                            <p className="indent-3 line-clamp-2 overflow-hidden max-sm:text-xs">
                              {data.decs}
                            </p>
                          )}
                          <div className="w-full flex items-center justify-center lg:mt-5 max-md:mt-3 max-sm:p-4">
                            <button className="flex whitespace-nowrap ease-in-out decoration-300 text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
                              See More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BodyHomepage;
