import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../App.css";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

const BodyHomepage = ({ visible }) => {
  const [Book, setBook] = useState([]);
  const [BookData, setBookData] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const Showdata = useRef(null);
  // const [expandedIndex, setExpandedIndex] = useState(null);
  // const [selectedBook, setSelectedBook] = useState(null);

  const slideNext = () => {
    setCurrentData((prevIndex) => (prevIndex + 3) % BookData.length);
  };

  const slidePrev = () => {
    setCurrentData((prevIndex) => (prevIndex - 3 + BookData.length) % BookData.length);
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
              {BookData.slice(currentData, currentData + (window.innerWidth < 800 ? 2 : 3)).map((data, i) => (
                <div key={i} className="hover:shadow-xl" useRef="showData">
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
                          onClick={() => {
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
        <div className="z-30">
          <div
            className="w-[90%] h-[80%] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            closeModal={setOpenModal}
            data={currentData}
            ref={Showdata}
          >
            <button className="close-button" onClick={closeModal} ShowId="true">
              X
            </button>
            <div className="flex gap-x-8 w-full overflow-hidden p-3">
              {BookData.filter((book, index) => index === currentData).map((data, i) => (
                <div key={i} className="hover:shadow-xl">
                  <div className="flex">
                    {data.ImageBook && (
                      <img
                        src={data.ImageBook}
                        alt="image-book"
                        className="flex lg:w-[200px] lg:h-[250px] xl:w-[250px] xl:h-[300px] max-lg:w-[150px] max-lg:h-[200px] max-sm:w-[150px] max-sm:h-[180px]"
                      />
                    )}
                    <div>Index: {i}</div>
                    {data.id}
                    <div className="flex flex-col text-left lg:w-[170px] lg:h-full xl:w-[200px] max-lg:w-[150px] max-sm:w-[120px] overflow-hidden">
                      {data.title && (
                        <h1 className="flex book-title font-bold lg:text-2xl max-sm:text-sm whitespace-nowrap justify-center m-2">
                          {data.title}
                        </h1>
                      )}

                      {data.decs && (
                        <p className="indent-3 line-clamp-2 overflow-hidden max-sm:text-xs">{data.decs}</p>
                      )}
                      <div className="w-full flex items-center justify-center lg:mt-5 max-md:mt-3 max-sm:p-4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BodyHomepage;
