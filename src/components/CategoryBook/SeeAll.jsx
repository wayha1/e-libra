import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Rating } from "../content/Rating/Rating";

function SeeAll() {
  const location = useLocation();
  const selectedBook = location.state?.selectedBook;
  const navigate = useNavigate();
  const allBooks = location.state?.allBooks || [];

  if (!selectedBook) {
    return (
      <div>
        <p>No book selected.</p>
        <Link to="/allGen" className="text-blue-500 hover:underline">
          Back to All Categories
        </Link>
      </div>
    );
  }

  const handleAddToCart = async (selectedBook) => {
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
  };

  const handleReadNow = () => {
    const pdfPages = selectedBook.BookPdf || [];

    if (pdfPages.length > 0) {
      navigate("/bookview", { state: { pages: { BookPdf: pdfPages } } });
      console.log(pdfPages);
    } else {
      alert("This book does not have any pages to read.");
    }
  };
  // Filter recommended books based on the author name
  const recommendedBooks = allBooks.filter(
    (book) => book.authorId === selectedBook.authorId && book.title !== selectedBook.title
  );

  return (
    <div className="mt-8 mx-auto h-[940px] overflow-y-auto">
      <div className="justify-center m-3">
        <button
          className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          onClick={() => navigate("/allGen")}
        >
          Back
        </button>
      </div>
      <div className="flex mb-6">
        <p className="text-4xl mx-auto font-semibold pr-5 text-green-900 mb-5 text-center">
          {selectedBook.title}
        </p>
      </div>
      {/* Back button */}

      <div className="flex bg-gray-200 p-4 rounded-md items-center justify-center w-full h-[400px]">
        <img
          src={selectedBook.img}
          alt={selectedBook.title}
          className="rounded-md w-60 h-70 object-cover mr-8 shadow-lg"
        />

        <div className="grid items-center">
          {selectedBook.price === "free" ? (
            <button
              className={`${
                selectedBook.price === "free"
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
                <Rating />
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className=" text-lg text-gray-700 leading-relaxed mt-4 mb-4 px-8 py-10">{selectedBook.decs}</p>

      {/* Add a button to go back to AllCategory */}

      {/* Recomment Book */}
      <div className="bg-gray-100 h-[359px]">
        <h1 className="text-center book-style text-green-900 text-3xl font-bold mx-10 my-8">
          Recommend Books by {selectedBook.authorId}
        </h1>
        <div className="flex gap-4 p-4 overflow-x-auto">
          {recommendedBooks.map((book) => (
            <div key={book.title} className="flex-shrink-0 w-48">
              <img src={book.img} alt={book.title} className="rounded-md w-48 h-64 object-cover shadow-lg" />
              <p className="text-sm text-gray-700 mt-2">{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeeAll;
