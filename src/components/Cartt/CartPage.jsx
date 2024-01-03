import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  where, query
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { CiCreditCard1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../content/LoadingPage/LoadingPage";
import DefaultCartPage from "./DefualtCartPage";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleIncrease = async (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );

    setCartItems(updatedCart);

    const newQuantity =
      (updatedCart.find((item) => item.id === itemId)?.quantity || 1) + 1;

    try {
      const itemDoc = doc(db, "addtoCart", itemId);
      await updateDoc(itemDoc, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDecrease = async (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCartItems(updatedCart);

    const newQuantity = Math.max(
      1,
      (updatedCart.find((item) => item.id === itemId)?.quantity || 1) - 1
    );

    try {
      const itemDoc = doc(db, "addtoCart", itemId);
      await updateDoc(itemDoc, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (itemId) => {
    if (loading) return;
    setSelectedItemId(itemId);
    setShowConfirmationModal(true);
    try {
      setLoading(true);
      const itemRef = doc(db, "addtoCart", selectedItemId);
      await deleteDoc(itemRef);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItemId)
      );
    } catch (error) {
      console.error("Error Deleting Document", error.message);
    } finally {
      setLoading(false);
      setShowConfirmationModal(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const itemRef = doc(db, "addtoCart", selectedItemId);
      console.log("Deleting:", selectedItemId);
      await deleteDoc(itemRef);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItemId)
      );
      alert("Delete success items!");
    } catch (error) {
      console.error("Error Deleting Document", error.message);
    } finally {
      setLoading(false);
      setShowConfirmationModal(false);
    }
  };

  const handleImageClick = (item, event) => {
    const isButton = event.target.tagName.toLowerCase() === "button";
    if (!isButton) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.includes(item.id)
          ? prevSelectedItems.filter((id) => id !== item.id)
          : [...prevSelectedItems, item.id]
      );
    }
  };

  const fetchCartItems = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        console.log("Current User UID:", uid);

        const cartCollection = collection(db, "addtoCart");
        const q = query(cartCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        console.log("Fetched Cart Items:", querySnapshot.docs.map((doc) => doc.data()));

        setCartItems(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      } else {
        console.error("No user found");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCartItems();
  }, [showConfirmationModal]);

  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  const handleReadNowClick = (selectedBook) => {
    setSelectedBook(selectedBook);
    navigate("/payment", { state: { selectedBook, cartItems } });
  };

  return (
    <div className="overflow-y-auto z-20 ">
      {loading && <LoadingPage />}
      <div className="mx-auto mt-10 px-10 py-4 h-[1100px]">
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center ">
            <p className="text-5xl book-title text-gray-600"><DefaultCartPage /></p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center border-b-2 py-4 mb-5 border rounded-lg border-gray-300 ${selectedItems.includes(item.id)
                  ? "bg-blue-200 text-white"
                  : "bg-gray-100"
                  }`}
                onClick={(event) => handleImageClick(item, event)}
              >
                <img
                  src={item.img}
                  alt="Book"
                  className={`w-30 h-40 ml-3 ${selectedItems.includes(item.id)
                    ? "border-4 border-green-500"
                    : ""
                    }`}
                />
                <div className="flex-grow ml-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">{item.title}</h2>
                      <p className="text-gray-500">{item.price}</p>
                      <p className="text-gray-500">
                        Quantity: {item.quantity || 1}
                      </p>
                    </div>

                    <div className="flex flex-col space-y-2 mr-3">
                      <div>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2"
                          onClick={() => {
                            handleIncrease(item.id);
                          }}
                        >
                          +
                        </button>
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded-full"
                          onClick={() => handleDecrease(item.id)}
                        >
                          -
                        </button>
                      </div>
                      <button
                        className="bg-red-600 text-white rounded-xl p-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="flex justify-end text-xl font-semibold mt-5 space-y-5">
          <div className="flex-col space-x-3 mb-8">
            Total Price: {total} {"រៀល"}
            <button
              className="flex bg-blue-500 px-5 py-2 text-white rounded-lg shadow-lg 
            border-2 hover:bg-blue-600"
              onClick={() => handleReadNowClick(selectedBook)}
            >
              <CiCreditCard1 className="flex mt-[5px] mr-5" /> Pay now
            </button>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <p className="text-xl font-semibold mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white active:bg-blue-400 px-4 py-2 rounded-full"
                onClick={confirmDelete}
              >
                Yes, delete
              </button>
              <button
                className="bg-gray-500 text-white active:bg-blue-400 ml-3 px-4 py-2 rounded-full"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
