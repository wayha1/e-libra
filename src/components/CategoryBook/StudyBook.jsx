import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Change this line

//js

const StudyBook = () => {
  const [bacData, setBacData] = useState([]);
  const [bacBooks, setBacBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Change this line
  const [selectedBook, setSelectedBook] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const getBacData = async () => {
      try {
        const contain = collection(db, "Books");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val) => ({ ...val.data(), id: val.id }));
        setBacData(data);
        console.log(data);
        const bookDataPromises = data.map(async (elem) => {
          try {
            const BookPop = collection(db, `Books/${elem.id}/GeneralBook`);
            const DataBooks = await getDocs(BookPop);
            const BookData = DataBooks.docs.map((bookDoc) => ({
              ...bookDoc.data(),
              id: bookDoc.id,
            }));
            return BookData;
          } catch (error) {
            console.error(`Error fetching book data for ${elem.id}:`, error);
            return null;
          }
        });

        const bookData = (await Promise.all(bookDataPromises)).flatMap((data) => data || []);
        setBacBooks(bookData);
        console.log(bookData);
      } catch (error) {
        console.error("Error fetching popular section data:", error);
      }
    };
    getBacData();
  }, []);

  // Calculate the indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bacBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to the next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(bacBooks.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleReadNowClick = (item) => {
    // Store the selected book information in the state
    setSelectedBook(item);

    // Navigate to the SeeAll component when "Read Now" is clicked
    navigate("/allgen/study/see-all", { state: { selectedBook: item } }); // Change this line
  };

  return (
    <section className="container mx-auto mt-8 mb-10">
      <div className="ml-10 mb-8">
        <h1 className="text-4xl uppercase font-bold hover:text-cyan-800 rounded-xl"> Study Books </h1>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 justify-items-center justify-center">
        {currentItems.map((item, index) => (
          <div key={index} className="mb-4 bg-gray-100 w-[200px]">
            <img 
            src={item.img} 
            alt={`Bacll-${index}`} 
            className="w-[200px] h-[250px] hover:scale-95" 
            onClick={() => handleReadNowClick(item)}
            />
            <div className="text-center">
              <h3 className="text-xl font-title font-bold">{item.title}</h3>
              <p className="text-md">{item.price}</p>
            </div>
            {/* Add your other Bacll-related content here */}
            {/* <button
              onClick={() => handleReadNowClick(item)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Read now
            </button> */}
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={goToPreviousPage}
          className="mx-2 px-3 py-1 rounded-full bg-gray-300"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: Math.ceil(bacBooks.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-2 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-cyan-500 text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className="mx-2 px-3 py-1 rounded-full bg-gray-300"
          disabled={currentPage === Math.ceil(bacBooks.length / itemsPerPage)}
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default StudyBook;
