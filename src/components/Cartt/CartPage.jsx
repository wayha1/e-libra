import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { db } from "../../firebase";
import { db } from "../../firebase";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  // const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleIncrease = async (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );

    setCartItems(updatedCart);

    const newQuantity = (updatedCart.find((item) => item.id === itemId)?.quantity || 1) + 1;

    try {
      // Update Firestore with the new quantity
      const itemDoc = doc(db, "addtoCart", itemId);
      await updateDoc(itemDoc, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDecrease = async (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );

    setCartItems(updatedCart);

    const newQuantity = Math.max(1, (updatedCart.find((item) => item.id === itemId)?.quantity || 1) - 1);

    try {
      // Update Firestore with the new quantity
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
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const itemRef = doc(db, "addtoCart", selectedItemId);
      console.log("Deleting:", selectedItemId);
      await deleteDoc(itemRef);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== selectedItemId));
      alert("Delete success items!");
    } catch (error) {
      console.error("Error Deleting Document", error.message);
    } finally {
      setLoading(false);
      setShowConfirmationModal(false);
    }
  };

  const handleImageClick = (item, event) => {
    // Check if the clicked element is a button
    const isButton = event.target.tagName.toLowerCase() === 'button';
  
    // Toggle selection only if the clicked element is not a button
    if (!isButton) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.includes(item.id)
          ? prevSelectedItems.filter((id) => id !== item.id)
          : [...prevSelectedItems, item.id]
      );
    }
  };

  // const closeModal = () => {
  //   // Close the modal by resetting the selected item details
  //   setSelectedItemDetails(null);
  // };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const sample = collection(db, "addtoCart");
        const snapshot = await getDocs(sample);
        setCartItems(snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })))
        // const data = snapshot.docs.map((doc) => ({
        //   ...doc.data(),
        //   id: doc.id,
        // }));
        // console.log(data);
        
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [showConfirmationModal]);

  const total = cartItems.reduce((acc, item) => acc + parseInt(item.price, 10) * (item.quantity || 1), 0);

  return (
    <div className="container mx-auto mt-10 z-20 overflow-y-auto h-[1000px]">
      <h1 className="text-4xl font-bold mb-6">Cart Items</h1>
      {cartItems.map((item) => (
        <div key={item.id}
        className={`flex items-center border-b-2 py-4 mb-5 border rounded-lg border-gray-300 ${
          selectedItems.includes(item.id) ? "bg-blue-200 text-white" : "bg-gray-100"
        }`}        
          onClick={(event) => handleImageClick(item, event)}>
        <img
          src={item.ImageBook}
          alt="Book"
          className={`w-30 h-40 ml-3 ${
            selectedItems.includes(item.id) ? "border-4 border-green-500" : ""}`}/>
          <div className="flex-grow ml-3">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-gray-500">{item.price}</p>
                <p className="text-gray-500">Quantity: {item.quantity || 1}</p>
              </div>

              <div className="flex flex-col space-x-2 mr-3">
                <div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full mr-3"
                  onClick={() => {
                    handleIncrease(item.id);
                  }}
                  
                >
                  +
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full"
                  onClick={() => handleDecrease(item.id)}
                >
                  -
                </button>
                </div>
              <button
                className="bg-red-500 text-white px-4 py-2 mt-3 rounded-full flex-col"
                onClick={() => handleDelete(item.id)}
                >
                Delete
              </button>
                
              </div>
            </div>
          </div>
        </div>
      ))}
      <p className="flex justify-end mb-5 text-xl font-semibold mt-4">
        Total Price: {total} {"រៀល"}
      </p>
      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <p className="text-xl font-semibold mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white active:bg-blue-400 px-4 py-2 rounded-full" onClick={confirmDelete}>
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
      {/* Modal for image click */}
      {/* {selectedItemDetails && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <div className="flex items-center mb-4">
              <img 
                src={selectedItemDetails.ImageBook} 
                alt="Book" 
                className="w-30 h-40 mr-3" 
              />
              <div>
                <p className="text-xl font-semibold">{selectedItemDetails.title}</p>
                <p className="text-gray-500">Quantity: {selectedItemDetails.quantity || 1}</p>
              </div>
            </div>
            <p className="text-gray-500">{selectedItemDetails.price}</p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white active:bg-blue-400 px-4 py-2 rounded-full"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CartPage;
