import React from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function SeeAll() {
  const location = useLocation();
  const selectedBook = location.state?.selectedBook;

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

  return (
    <div className="mt-8 mx-auto h-[940px] overflow-y-auto">
      <div className="flex mb-6">
        {/* <Link
        to="/allgen"
        className="text-blue-500 pl-5 hover:underline mt-4 w-50 
        bg-gray-200 py-2 px-4 rounded-full ml-3"
      >
        Back to All Categories
      </Link> */}

        {/* Title */}
        {/* <h2 className="text-3xl font-bold mb-4">Book Details</h2> */}
        <p className="text-4xl mx-auto font-semibold pr-5 text-green-900 mb-5 text-center">
          {selectedBook.title}
        </p>
      </div>

      {/* Book details container */}
      <div className="flex bg-gray-200 p-4 rounded-md items-center justify-center w-full h-[400px]">
        {/* Book image on the left */}
        <img
          src={selectedBook.img}
          alt={selectedBook.title}
          className="rounded-md w-60 h-70 object-cover mr-8 shadow-lg"
        />

        <div className="grid items-center">
          {/* Button: Add to Cart or Free */}
          {selectedBook.price === "free" ? (
            <button
              className="bg-green-300 text-gray-600 font-bold active:bg-gray-500 py-2 mb-4 px-4 rounded-lg shadow-lg"
              disabled // Disable the button for free items
            >
              Read
            </button>
          ) : (
            <button
              className="bg-white hover:bg-green-300 active:bg-gray-600 text-green-700 
                font-bold py-2 mb-4 px-4 rounded-lg shadow-lg"
              onClick={() => handleAddToCart(selectedBook)}
            >
              Add to Cart
            </button>
          )}

          {/* Book information on the right */}
          <div className="flex space-x-20">
            {/* Left-aligned labels */}
            <div className="text-left">
              <p className="text-gray-600 mb-3">តម្លៃ:</p>
              <p className="text-gray-600 mb-3">អ្នកនិពន្ធ: </p>
              <p className="text-gray-600 mb-3">ប្រភេទ:</p>
              <p className="text-gray-600 mb-3">ថ្ងៃខែឆ្នាំកំណើត:</p>
            </div>

            {/* Right-aligned values */}
            <div className="text-right">
              <p className="text-gray-600 mb-3">{selectedBook.price} KHR</p>
              <p className="text-gray-600 mb-3">{selectedBook.authorId}</p>
              <p className="text-gray-600 mb-3">{selectedBook.type}</p>
              <p className="text-gray-600 mb-3">{selectedBook.date}</p>
            </div>
          </div>
        </div>
      </div>
      <p className=" text-lg text-gray-700 leading-relaxed mt-4 mb-4 px-8 py-10">{selectedBook.decs}</p>

      {/* Add a button to go back to AllCategory */}
    </div>
  );
}

export default SeeAll;
