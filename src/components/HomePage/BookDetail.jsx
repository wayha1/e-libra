import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BiBookReader } from "react-icons/bi";
import { db } from "../../firebase";

const BookDetail = ({ bookData, closeBook, setReadBook }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (location.state && location.state.selectedBook) {
      setSelectedBook(location.state.selectedBook);
    } else {
      const foundBook = bookData.find((book) => book.id === bookId);

      if (foundBook) {
        setSelectedBook(foundBook);
      } else {
        setSelectedBook(null);
      }
    }
  }, [bookData, bookId, location.state]);

  if (!selectedBook) {
    return <div>No book found for the given ID.</div>;
  }

  const handleAddToCart = async (selectedBook) => {
    try {
      const cartsCollectionRef = collection(db, "addtoCart");
      const querySnapshot = await getDocs(cartsCollectionRef);
      const isItemInCart = querySnapshot.docs.some((doc) => {
        const cartItem = doc.data();
        return cartItem.title === selectedBook.title; // Assuming 'title' is a unique identifier for the item
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
    navigate("/bookview", { state: { pages: { BookPdf: pdfPages } } });
  };

  return (
    <div className="w-screen h-[1010px] overflow-y-auto">
      <div className="justify-center m-3">
        <button
          className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
      <div key={selectedBook.id}>
        <div className="overflow-hidden">
          {selectedBook.title && (
            <h1 className="m-10 flex book-title font-bold text-green-900 lg:text-5xl md:text-5xl max-sm:text-3xl whitespace-nowrap justify-center">
              {"រឿង : "}
              {selectedBook.title}
            </h1>
          )}
          {selectedBook.img && (
            <div className="flex bg-gray-200 p-4 justify-center rounded-lg items-center h-[500px]">
              <img
                src={selectedBook.img}
                alt="img-book"
                className="flex rounded-md w-[300px] h-[400px] object-cover"
              />
              <div className="grid items-center ml-7">
                <button
                  className="bg-white hover:bg-green-300 active:bg-gray-600 text-green-700 
                  font-bold py-2 mb-7 px-4 rounded-lg shadow-lg"
                  onClick={() => handleAddToCart(selectedBook)}
                >
                  Add to Cart
                </button>

                {selectedBook.price && (
                  <div className="flex mt-3 mb-5 space-x-20 book-decs">
                    <div className="text-gray-600">តម្លៃ:</div>
                    <div className="text-gray-600">{selectedBook.price}</div>
                  </div>
                )}

                {selectedBook.authorId && (
                  <div className="flex mt-3 mb-5 space-x-20 book-decs">
                    <div className="text-gray-600">អ្នកនិពន្ធ:</div>
                    <div className="text-gray-600">{selectedBook.authorId}</div>
                  </div>
                )}

                {selectedBook.type && (
                  <div className="flex mt-3 mb-5 space-x-20 book-decs">
                    <div className="text-gray-600">ប្រភេទ:</div>
                    <div className="text-gray-600">{selectedBook.type}</div>
                  </div>
                )}

                {selectedBook.date && (
                  <div className="flex mt-3 space-x-20 book-decs">
                    <div className="text-gray-600">ថ្ងៃខែឆ្នាំ:</div>
                    <div className="text-gray-600">{selectedBook.date}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          {selectedBook.decs && (
            <p className="text-lg text-gray-700 leading-relaxed mt-4 mb-4 px-8 py-10 book-style">
              {selectedBook.decs}
            </p>
          )}
          <div className="flex flex-col">
            <div className="lg:gap-x-2 flex lg:mt-3 md:gap-x-5 max-md:gap-x-5 max-sm:gap-x-1 text-xl justify-center max-sm:text-md">
              <button
                onClick={handleReadNow}
                className="gap-x-1 p-1 lg:w-52 max-sm:w-32 rounded-xl bg-gray-500 flex items-center justify-center text-white text-xl whitespace-nowrap hover:bg-gray-800"
              >
                <BiBookReader className="lg:text-2xl md:text-3xl" />
                Read Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
