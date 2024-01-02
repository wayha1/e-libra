import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Rating } from "../content/Rating/Rating";
import { ModalToLogin } from "../content/requirement/ModalToLogin";

function SeeAll() {
  const location = useLocation();
  const selectedBook = location.state?.selectedBook;
  const navigate = useNavigate();
  const allBooks = location.state?.allBooks || [];
  const [userRating, setUserRating] = useState(null);
  const [reset, setReset] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setUserRating(null);
  }, [selectedBook]);

  const handleAddToCart = async (selectedBook) => {
    if (userIsLoggedIn()) {
      try {
        const cartsCollectionRef = collection(db, "addtoCart");
        const querySnapshot = await getDocs(cartsCollectionRef);
        const isItemInCart = querySnapshot.docs.some((doc) => {
          const cartItem = doc.data();
          return cartItem.title === selectedBook.title;
        });

        if (!isItemInCart) {
          await addDoc(cartsCollectionRef, selectedBook);
          alert("Item added to cart!");
        } else {
          alert("Item already added to cart!");
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {

      openModal();
    }
  };

  const handleReadNow = () => {
    if (userIsLoggedIn()) {
      const pdfPages = selectedBook.BookPdf || [];
      if (pdfPages.length > 0) {
        navigate("/bookview", { state: { pages: { BookPdf: pdfPages } } });
        console.log(pdfPages);
      } else {
        alert("This book does not have any pages to read.");
      }
    } else {

      openModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userIsLoggedIn = () => {
    return auth.currentUser !== null;

  };

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const handleRatingSubmit = async () => {
    try {
      const popularCollectionRef = collection(db, "popular");
      const docData = {
        bookTitle: selectedBook.title,
        authorId: selectedBook.authorId,
        userRating: userRating,
        price: selectedBook.price,
        decs: selectedBook.decs,
        type: selectedBook.type,
        date: selectedBook.date,
        image: selectedBook.img,
        BookPdf: selectedBook.BookPdf,
      };

      await addDoc(popularCollectionRef, docData);

      alert("Rating submitted!");
      setUserRating(null);
      setReset(true);
      console.log(userRating);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };
  const recommendedBooks = allBooks.filter(
    (book) =>
      book.authorId === selectedBook.authorId &&
      book.title !== selectedBook.title
  );
  return (
    <div className="mt-8 mx-auto h-[940px] overflow-y-auto">
      <div className="justify-center m-3">
        <button
          className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="flex mb-6">
        <p className="text-4xl mx-auto font-semibold pr-5 text-green-900 mb-5 text-center">
          {selectedBook.title}
        </p>
      </div>

      <div className="flex bg-gray-200 p-4 rounded-md items-center justify-center w-full h-[400px]">
        <img
          src={selectedBook.img}
          alt={selectedBook.title}
          className="rounded-md w-60 h-70 object-cover mr-8 shadow-lg"
        />

        <div className="grid items-center">
          {selectedBook.price === "free" ? (
            <button
              className={`${selectedBook.price === "free"
                ? "bg-green-300 text-gray-600 font-bold active:bg-gray-500 py-2 mb-4 px-4 rounded-lg shadow-lg"
                : "bg-white hover:bg-green-300 active:bg-gray-600 text-green-700 font-bold py-2 mb-4 px-4 rounded-lg shadow-lg"
                }`}
              onClick={handleReadNow}
            >
              Read Now (Free)
            </button>
          ) : (
            <button
              className="bg-white hover:bg-green-300 active:bg-gray-600 text-green-700 
              font-bold py-2 mb-4 px-4 rounded-lg shadow-lg"
              onClick={() => handleAddToCart(selectedBook)}
              disabled={selectedBook.price === "free"}
            >
              Add to Cart
            </button>
          )}

          <div className="flex space-x-20">
            <div className="text-left">
              <p className="text-gray-600 mb-3">តម្លៃ:</p>
              <p className="text-gray-600 mb-3">អ្នកនិពន្ធ: </p>
              <p className="text-gray-600 mb-3">ប្រភេទ:</p>
              <p className="text-gray-600 mb-3">ថ្ងៃខែឆ្នាំកំណើត:</p>
              <p className="text-gray-600 mb-3">Rating</p>
            </div>

            <div className="text-right">
              <p className="text-gray-600 mb-3">{selectedBook.price} KHR</p>
              <p className="text-gray-600 mb-3">{selectedBook.authorId}</p>
              <p className="text-gray-600 mb-3">{selectedBook.type}</p>
              <p className="text-gray-600 mb-3">{selectedBook.date}</p>
              <p className="text-gray-600 mb-3">
                <Rating onRatingChange={handleRatingChange} reset={reset} />
              </p>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 active:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleRatingSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className=" text-lg text-gray-700 leading-relaxed mt-4 mb-4 px-8 py-10">
        {selectedBook.decs}
      </p>

      <div className="bg-gray-100 h-[359px]">
        <h1 className="text-center book-style text-green-900 text-3xl font-bold mx-10 my-8">
          Recommend Books by {selectedBook.authorId}
        </h1>
        <div className="flex gap-4 p-4 overflow-x-auto">
          {recommendedBooks.map((book) => (
            <div key={book.title} className="flex-shrink-0 w-48">
              <img
                src={book.img}
                alt={book.title}
                className="rounded-md w-48 h-64 object-cover shadow-lg"
              />
              <p className="text-sm text-gray-700 mt-2">{book.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for login */}
      {isModalOpen && <ModalToLogin closeModal={closeModal} />}
    </div>
  );
}

export default SeeAll;
