// AllCategory.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Change this line

const AllCategory = () => {
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate(); // Change this line
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data for BacII category
        const bacIIQuery = query(collection(db, "Books", "All_Genre", "BacII"));
        const bacIIDocs = await getDocs(bacIIQuery);
        const bacIIBooks = bacIIDocs.docs.map((doc) => ({
          ...doc.data(),
          category: "BacII",
        }));

        // Fetch the data for Comic category
        const comicQuery = query(collection(db, "Books", "All_Genre", "Comics"));
        const comicDocs = await getDocs(comicQuery);
        const comicBooks = comicDocs.docs.map((doc) => ({
          ...doc.data(),
          category: "Comics",
        }));

        // Fetch the data for GeneralBook category
        const GeneralQuery = query(collection(db, "Books", "All_Genre", "GeneralBook"));
        const GeneralDocs = await getDocs(GeneralQuery);
        const GeneralBook = GeneralDocs.docs.map((doc) => ({
          ...doc.data(),
          category: "GeneralBook",
        }));

        // Fetch the data for NovelBook category
        const NovelQuery = query(collection(db, "Books", "All_Genre", "NovelBook"));
        const NovelDocs = await getDocs(NovelQuery);
        const NovelBook = NovelDocs.docs.map((doc) => ({
          ...doc.data(),
          category: "NovelBook",
        }));
        // Fetch the data for KhmerBook category
        const KhmerQuery = query(collection(db, "Books", "All_Genre", "KhmerBook"));
        const KhmerDocs = await getDocs(KhmerQuery);
        const KhmerBook = KhmerDocs.docs.map((doc) => ({
          ...doc.data(),
          category: "KhmerBook",
        }));

        // Combine both sets of books into a single array
        const combinedBooks = [...bacIIBooks, ...comicBooks, ...GeneralBook, ...NovelBook, ...KhmerBook];

        const sortedBooks = combinedBooks.sort((a, b) => a.title.localeCompare(b.title));

        setAllBooks(sortedBooks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReadNowClick = (book) => {
    setSelectedBook(book);
    navigate("/allgen/see-all", { state: { selectedBook: book } }); // Change this line
  };

  return (
    <div className="z-20 overflow-y-auto">
      <h2 className="text-center font-mono underline text-green-900 text-5xl font-bold mx-10 my-8 uppercase">
        មាតិកា ទាំងអស់
      </h2>
      <div className="gap-x-5 gap-y-10 grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 mx-20 my-5">
        {allBooks.map((book, index) => (
          <button key={index} className="text-gray-700 p-1 bg-gray-100 shadow-sm rounded-md">
            <img
              src={book.img}
              alt={book.title}
              className="rounded-lg w-[300px] h-[300px] "
              onClick={() => handleReadNowClick(book)}
            />
            <div className="text-center">
              <p className="text-xl font-bold">{book.title}</p>
              <p className="text-md">{book.price}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
