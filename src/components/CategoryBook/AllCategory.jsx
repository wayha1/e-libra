import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AllCategory = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const booksPerPage = 8;

  const fetchData = async () => {
    try {
      // Fetch the data for all categories
      const bacIIQuery = query(collection(db, "Books", "All_Genre", "bacII"));
      const comicQuery = query(collection(db, "Books", "All_Genre", "Comics"));
      const GeneralQuery = query(collection(db, "Books", "All_Genre", "GeneralBook"));
      const NovelQuery = query(collection(db, "Books", "All_Genre", "NovelBook"));
      const KhmerQuery = query(collection(db, "Books", "All_Genre", "KhmerBook"));

      const [bacIIDocs, comicDocs, GeneralDocs, NovelDocs, KhmerDocs] = await Promise.all([
        getDocs(bacIIQuery),
        getDocs(comicQuery),
        getDocs(GeneralQuery),
        getDocs(NovelQuery),
        getDocs(KhmerQuery),
      ]);

      const bacIIBooks = bacIIDocs.docs.map((doc) => ({ ...doc.data(), category: "bacII" }));
      const comicBooks = comicDocs.docs.map((doc) => ({ ...doc.data(), category: "Comics" }));
      const GeneralBook = GeneralDocs.docs.map((doc) => ({ ...doc.data(), category: "GeneralBook" }));
      const NovelBook = NovelDocs.docs.map((doc) => ({ ...doc.data(), category: "NovelBook" }));
      const KhmerBook = KhmerDocs.docs.map((doc) => ({ ...doc.data(), category: "KhmerBook" }));

      const combinedBooks = [...bacIIBooks, ...comicBooks, ...GeneralBook, ...NovelBook, ...KhmerBook];

      const sortedBooks = combinedBooks.sort((a, b) => a.title.localeCompare(b.title));

      setAllBooks(sortedBooks);
      setFilteredBooks(sortedBooks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReadNowClick = (book) => {
    setSelectedBook(book);
    navigate("/allgen/see-all", { state: { selectedBook: book } });
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const renderBooks = currentBooks.map((book, index) => (
    <button
      key={index}
      className="text-gray-700 bg-gray-100 shadow-sm rounded-md w-[200px] h-[300px] mx-4 my-2"
    >
      <img
        src={book.img}
        alt={book.title}
        className="w-[200px] h-[250px] hover:scale-95"
        onClick={() => handleReadNowClick(book)}
      />
      <div className="text-center">
        <p className="text-xl font-title font-bold whitespace-nowrap overflow-hidden">{book.title}</p>
        <p className="text-md">{book.price}</p>
      </div>
    </button>
  ));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = async () => {
    try {
      const searchResult = allBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredBooks(searchResult);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching for books:", error.message);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredBooks(allBooks);
    setCurrentPage(1);
  };

  return (
    <div className="z-20 overflow-y-auto">
      <h2 className="text-center book-style underline text-green-900 text-5xl font-bold mx-10 my-8 uppercase">
        មាតិកា ទាំងអស់
      </h2>
      <div className="flex mb-4 pr-4 w-full justify-end">
        <input
          type="text"
          placeholder="Search Book"
          className="p-2 border rounded-md mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="p-2 bg-blue-500 text-white rounded-md" onClick={handleSearch}>
          Search
        </button>
        <button className="p-2 bg-red-500 text-white rounded-md ml-2" onClick={handleClearSearch}>
          Clear
        </button>
      </div>

      <div className="h-[700px] gap-x-5 gap-y-10 grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 mx-20 my-5">
        {renderBooks}
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 text-sm font-semibold text-white bg-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBook >= allBooks.length}
          className="px-4 py-2 mx-2 text-sm font-semibold text-white bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCategory;
