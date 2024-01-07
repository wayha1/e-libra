import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AllCategory = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const bacIIQuery = query(collection(db, "Books", "All_Genre", "bacII"));
      const comicQuery = query(collection(db, "Books", "All_Genre", "Comics"));
      const comdyQuery = query(collection(db, "Books", "All_Genre", "Comdy"));
      const GeneralQuery = query(collection(db, "Books", "All_Genre", "GeneralBook"));
      const NovelQuery = query(collection(db, "Books", "All_Genre", "NovelBook"));
      const KhmerQuery = query(collection(db, "Books", "All_Genre", "KhmerBook"));

      const [bacIIDocs, comicDocs, GeneralDocs, NovelDocs, KhmerDocs, comdyDocs] = await Promise.all([
        getDocs(bacIIQuery),
        getDocs(comicQuery),
        getDocs(comdyQuery),
        getDocs(GeneralQuery),
        getDocs(NovelQuery),
        getDocs(KhmerQuery),
      ]);

      const combinedBooks = [
        ...bacIIDocs.docs.map((doc) => ({ ...doc.data(), category: "bacII" })),
        ...comicDocs.docs.map((doc) => ({ ...doc.data(), category: "Comics" })),
        ...comdyDocs.docs.map((doc) => ({ ...doc.data(), category: "Comdy" })),
        ...GeneralDocs.docs.map((doc) => ({ ...doc.data(), category: "GeneralBook" })),
        ...NovelDocs.docs.map((doc) => ({ ...doc.data(), category: "NovelBook" })),
        ...KhmerDocs.docs.map((doc) => ({ ...doc.data(), category: "KhmerBook" })),
      ];

      const sortedBooks = combinedBooks.sort((a, b) => a.title.localeCompare(b.title));

      setAllBooks(sortedBooks);
      setFilteredBooks(sortedBooks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const handleResize = () => {
      setBooksPerPageState(booksPerPage());
      setCurrentPage(1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleReadNowClick = (book) => {
    setSelectedBook(book);
    navigate("/allgen/see-all", { state: { selectedBook: book, allBooks: filteredBooks } });
  };

  const booksPerPage = () => {
    if (window.innerWidth >= 1024) {
      return 8;
    } else if (window.innerWidth >= 768) {
      return 9;
    } else {
      return 6;
    }
  };

  const [booksPerPageState, setBooksPerPageState] = useState(booksPerPage());

  const indexOfLastBook = currentPage * booksPerPageState;
  const indexOfFirstBook = indexOfLastBook - booksPerPageState;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const renderBooks = currentBooks.map((book, index) => (
    <button
      key={index}
      className="text-gray-700 bg-gray-100 shadow-sm rounded-md w-[200px] h-[300px] max-sm:w-[100px] max-sm:h-[150px] mx-4 my-2 max-sm:my-4 mt-5"
    >
      <img
        src={book.img}
        alt={book.title}
        className="w-[200px] h-[250px] max-sm:w-[100px] max-sm:h-[150px] hover:scale-95"
        onClick={() => handleReadNowClick(book)}
      />
      <div className="text-center mt-2">
        <p className="text-xl max-sm:text-[10px] font-title font-bold overflow-hidden whitespace-nowrap">
          {book.title}
        </p>
        <p className="text-md">{book.price}</p>
        {filterType === "author" && <p className="text-md">{book.authorId}</p>}
      </div>
    </button>
  ));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchByTitle = () => {
    try {
      const searchResult = allBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredBooks(searchResult);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching by title:", error.message);
    }
  };

  const searchByAuthor = () => {
    try {
      const searchResult = allBooks.filter((book) =>
        book.authorId.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredBooks(searchResult);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching by author:", error.message);
    }
  };

  const handleSearch = async () => {
    try {
      if (filterType === "title") {
        searchByTitle();
      } else if (filterType === "author") {
        searchByAuthor();
      }
    } catch (error) {
      console.error("Error searching for books:", error.message);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredBooks(allBooks);
    setCurrentPage(1);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="z-20 overflow-y-auto">
      <button
        className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg mx-5 my-2 max-lg:hidden lg:hidden"
        onClick={handleGoBack}
      >
        Back
      </button>
      <h2 className="text-center book-style underline text-green-900 text-5xl font-bold mx-10 my-8 uppercase max-sm:text-3xl">
        មាតិកា ទាំងអស់
      </h2>
      <div className="flex mb-4 pr-4 max-sm:pr-3 w-full justify-end ">
        <input
          type="text"
          placeholder={filterType === "title" ? "Search Title" : "Search Author"}
          className=" border rounded-md mr-2 max-sm:w-[130px] max-sm:p-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded-md mr-2"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>

        <button className="p-2 bg-blue-500 text-white rounded-md" onClick={handleSearch}>
          Search
        </button>
        <button className="p-2 bg-red-500 text-white rounded-md ml-2" onClick={handleClearSearch}>
          Clear
        </button>
      </div>

      <div className="h-[600px] md:h-[1010px] max-sm:h-[570px] gap-x-5 gap-y-10 grid grid-cols-4 md:grid-cols-3 max-sm:grid-cols-3 lg:grid-cols-4 mx-20 my-5 md:mx-10 max-sm:mx-1 ">
        {renderBooks}
      </div>

      <div className="flex justify-center my-4 md:my-16">
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
