import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Rating } from "../content/Rating/Rating";
import { ModalToLogin } from "../content/requirement/ModalToLogin";
import LoadingPage from '../content/LoadingPage/LoadingPage'

function SeeAll() {
  const location = useLocation();
  const selectedBook = location.state?.selectedBook;
  const navigate = useNavigate();
  const allBooks = location.state?.allBooks || [];
  const [userRating, setUserRating] = useState(null);
  const [reset, setReset] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [, setSelectedBook] = useState(null);


  useEffect(() => {
    setUserRating(null);
  }, [selectedBook]);

  const handleAddToCart = async (selectedBook) => {
    if (userIsLoggedIn()) {
      try {
        setIsLoading(true);

        const currentUser = auth.currentUser;
        const cartsCollectionRef = collection(db, "addtoCart");
        const querySnapshot = await getDocs(
          query(cartsCollectionRef, where("uid", "==", currentUser.uid))
        );

        const isItemInCart = querySnapshot.docs.some((doc) => {
          const cartItem = doc.data();
          return cartItem.title === selectedBook.title;
        });

        if (!isItemInCart) {
          const cartItemToAdd = {
            ...selectedBook,
            uid: currentUser.uid,
          };

          await addDoc(cartsCollectionRef, cartItemToAdd);
          alert("Item added to cart!");
        } else {
          alert("Item already added to cart!");
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      openModal();
    }
  };


  const handleRatingSubmit = async () => {
    try {
      setIsLoading(true);
      if (userIsLoggedIn()) {
        const user = auth.currentUser;

        if (user) {
          const popularCollectionRef = collection(db, "popular");
          const docData = {
            title: selectedBook.title,
            authorId: selectedBook.authorId,
            userRating: userRating,
            price: selectedBook.price,
            decs: selectedBook.decs,
            type: selectedBook.type,
            date: selectedBook.date,
            img: selectedBook.img,
            BookPdf: selectedBook.BookPdf,
            userId: user.uid,
          };

          await addDoc(popularCollectionRef, docData);
          setUserRating(null);
          setReset(true);
          console.log(userRating);
        } else {
          console.error("User is not available.");
        }
      } else {
        openModal();
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsLoading(false);
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

  const handleAddToFav = async () => {
    setIsModalOpen(false);
    try {
      if (userIsLoggedIn()) {
        const user = auth.currentUser;

        if (user) {
          const userBookCollection = collection(db, 'userBook');

          // Add the selectedBook to userBook collection
          await addDoc(userBookCollection, {
            title: selectedBook.title,
            decs: selectedBook.decs,
            img: selectedBook.img,
            BookPdf: selectedBook.BookPdf,
            date: selectedBook.date,
            authorId: selectedBook.authorId,
            price: selectedBook.price,
            userId: user.uid,
            type: selectedBook.type
          });

          alert("Item added to Favorites!");
        } else {
          console.error("User is not available.");
        }
      } else {
        openModal();
      }
    } catch (error) {
      console.error('Error adding item to userBook collection:', error.message);
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



  const recommendedBooks = allBooks.filter(
    (book) =>
      book.authorId === selectedBook.authorId &&
      book.title !== selectedBook.title
  );

  const handleReadNowClick = (book) => {
    setSelectedBook(book);
    navigate("/allgen/see-all", { state: { selectedBook: book, allBooks } }); // Change this line
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const renderRecommendedBooks = () => (
    <>
      <div className="w-full ">
        <h1 className="text-center book-style text-green-900 text-3xl font-bold mx-10 my-8">
          Recommend Books by {selectedBook.authorId}
        </h1>
        <div className="w-full flex space-x-5">
          {recommendedBooks.map((book) => (
            <div key={book.title} className="flex-shrink-0 w-48">
              <img
                src={book.img}
                alt={book.title}
                className="rounded-md w-48 h-64 object-cover shadow-lg cursor-pointer"
                onClick={() => handleReadNowClick(book)}
              />
              <p className="text-sm text-gray-700 mt-2">{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );


  return (
    <div className="mt-8 mx-auto h-full overflow-y-auto">
      {isLoading ? (
        <div className="text-center items-center justify-center">
          <LoadingPage />
        </div>
      ) : (
        <>
          <div className="justify-center m-3">
            <button
              className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
              onClick={handleBackButton}
            >
              Back
            </button>
          </div>
          <div className="flex mb-6">
            <p className="text-4xl mx-auto font-semibold pr-5 text-green-900 mb-5 text-center">
              {selectedBook.title}
            </p>
          </div>

          <div className="flex max-sm:flex-col bg-gray-200 max-sm:h-[650px] p-4 rounded-md items-center justify-center w-full h-[400px]">
            <img
              src={selectedBook.img}
              alt={selectedBook.title}
              className="rounded-md w-60 h-70 object-cover mr-8 shadow-lg cursor-pointer"
            />

            <div className="grid items-center max-sm:justify-center max-sm:hidden" >
              {selectedBook.price === "Free" ? (
                <div className="flex space-x-4">
                  <button
                    className="bg-green-300 hover:bg-green-500 text-gray-600 font-bold active:bg-gray-500 py-2 mb-4 px-4 rounded-lg shadow-lg"
                    onClick={handleReadNow}
                  >
                    Read Now (Free)
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 active:bg-gray-500 text-white font-bold mb-4 px-4 rounded-lg shadow-lg"
                    onClick={handleAddToFav}
                  >
                    Add to Favorites
                  </button>
                </div>
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

              <div className="flex space-x-20 ">
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

            <div className="grid mt-5 items-center max-sm:justify-center lg:hidden md:hidden " >
              {selectedBook.price === "Free" ? (
                <div className="flex  space-x-4 mt-5">
                  <button
                    className=" bg-green-300 hover:bg-green-500 text-gray-600 font-bold active:bg-gray-500 py-2 mb-4 px-4 rounded-lg shadow-lg"
                    onClick={handleReadNow}
                  >
                    Read Now (Free)
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 active:bg-gray-500 text-white font-bold mb-4 px-4 rounded-lg shadow-lg"
                    onClick={handleAddToFav}
                  >
                    Add to Favorites
                  </button>
                </div>
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

              <div className="flex space-x-20 ">
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

          <div className="bg-gray-100 h-[500px]">
            <div className="flex gap-4 p-5 overflow-x-auto">
              {renderRecommendedBooks()}
            </div>
          </div>

          {/* Modal for login */}
          {isModalOpen && <ModalToLogin closeModal={closeModal} />
          }
        </>
      )}
    </div>
  );
}

export default SeeAll;
