import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";

export const AuthorPage = () => {
  const [authorList, setAuthorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredAuthor, setHoveredAuthor] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const value = collection(db, "Author");
    const getAuthors = async () => {
      try {
        setLoading(true);
        const authVal = await getDocs(value);
        const authors = authVal.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        authors.sort((a, b) => a.authName.localeCompare(b.authName));
        setAuthorList(authors);
      } catch (error) {
        console.error("Error fetching authors:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getAuthors();
  }, []);

  const handleReadNowClick = (author) => {
    setSelectedBook(author);
    navigate("/authorInfo", { state: { selectedBook: author } });
  };

  return (
    <section>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full h-[980px] bg-gray-100 overflow-y-auto">
          <h1 className="text-center text-5xl py-16 font-bold text-green-800 underline book-title">
            មាតិកា អ្នកនិពន្ធ
          </h1>
          <div className="px-40 py-5">
            <div className="grid grid-cols-3 space-y-5 items-center justify-center ">
              {authorList.length > 0 && (
                <>
                  {authorList.map((author) => (
                    <div
                      key={author.id}
                      className={`flex flex-col items-center transition-all duration-300 ${
                        hoveredAuthor === author.id ? "grayscale hover:scale-105" : ""
                      }`}
                      onMouseEnter={() => setHoveredAuthor(author.id)}
                      onMouseLeave={() => setHoveredAuthor(null)}
                    >
                      <div className="text-center">
                        <img
                          src={author.imgAuth}
                          alt={author.authName}
                          className="w-[200px] h-[200px] rounded-full"
                          onClick={() => handleReadNowClick(author)}
                        />
                        <p className="py-2 text-xl font-bold book-decs">{author.authName}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
