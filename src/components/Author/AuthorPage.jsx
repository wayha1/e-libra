import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, query, where, orderBy } from "firebase/firestore";
import { db, imgDB } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const AuthorPage = () => {
  const [authorList, setAuthorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authImage, setAuthImage] = useState(null);
  const [authorDetailModalOpen, setAuthorDetailModalOpen] = useState(false);
  const [hoveredAuthor, setHoveredAuthor] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlphabet, setSelectedAlphabet] = useState("");
  const [fullAuthorList, setFullAuthorList] = useState([]);
  const [maleAuthorList, setMaleAuthorList] = useState([]);
  const [femaleAuthorList, setFemaleAuthorList] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const value = collection(db, "Author");
    const getAuthors = async () => {
      try {
        const authVal = await getDocs(value);
        const authors = authVal.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        authors.sort((a, b) => a.authName.localeCompare(b.authName));
        setFullAuthorList(authors);
        setAuthorList(authors);
        const maleAuthors = authors.filter((author) => author.Gender.toLowerCase() === "ប្រុស");
        const femaleAuthors = authors.filter((author) => author.Gender.toLowerCase() === "ស្រី");

        setMaleAuthorList(maleAuthors);
        setFemaleAuthorList(femaleAuthors);
      } catch (error) {
        console.error("Error fetching authors:", error.message);
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
      <div className="w-full h-[1010px] bg-gray-100 overflow-y-auto">
        <h1 className="text-center text-5xl py-16 font-bold text-green-800 underline">មាតិកា អ្នកនិពន្ធ</h1>
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
                      <p className="py-2 text-xl font-bold font-title">{author.authName}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
