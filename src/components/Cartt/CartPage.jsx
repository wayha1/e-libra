import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, imgDB } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectItems, setSelectItems] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const sampleCollection = collection(db, "Sample");
        const snapshot = await getDocs(sampleCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  const handleIncrease = async (itemId) => {
    // Use the updatedCart directly to get the new quantity
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );

    setCartItems(updatedCart);

    const newQuantity = (updatedCart.find((item) => item.id === itemId)?.quantity || 1) + 1;

    try {
      // Update Firestore with the new quantity
      const itemDoc = doc(db, "Sample", itemId);
      await updateDoc(itemDoc, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDecrease = async (itemId) => {
    // Use the updatedCart directly to get the new quantity
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );

    setCartItems(updatedCart);

    const newQuantity = Math.max(1, (updatedCart.find((item) => item.id === itemId)?.quantity || 1) - 1);

    try {
      // Update Firestore with the new quantity
      const itemDoc = doc(db, "Sample", itemId);
      await updateDoc(itemDoc, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (itemId, ImageBook) => {
    if (loading) return;
    setSelectItems({ itemId, ImageBook });
    setShowConfirmationModal(true);
    setDeleteSuccess(false);
    // try {
    //   const itemDoc = doc(db, "Sample", itemId);
    //   await deleteDoc(itemDoc);
    //   alert("Item deleted from cart!");

    //   console.log("Removing item from local state");
    //   setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    // } catch (error) {
    //   console.error("Error deleting document:", error);
    // }
  };
  const confirmDelete = async () => {
    setLoading(true);
    console.log("Deleting:", selectItems);
    try {
      const itemsRef = doc(db, "Sample", selectItems.itemId);
      const ImageRef = ref(imgDB, selectItems.ImageBook);

      await deleteDoc(itemsRef);
      console.log("Document deleted from Firestore");

      await deleteObject(ImageRef);
      console.log("Image deleted from Storage");

      setDeleteSuccess(true);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== selectItems.itemId));
      console.log("Delete success!");
    } catch (error) {
      console.error("Error Deleting Document", error.message);
    } finally {
      setLoading(false);
      setShowConfirmationModal(false);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + parseInt(item.price, 10) * (item.quantity || 1), 0);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">Cart Items</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center border-b-2 py-4">
          <img src={item.ImageBook} alt="Book" className="w-16 h-20 mr-4" />

          <div>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-gray-500">${item.price}</p>
            <p className="text-gray-500">Quantity: {item.quantity || 1}</p>

            <div className="flex mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 mr-2"
                onClick={() => handleIncrease(item.id)}
              >
                Increase
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 mr-2"
                onClick={() => handleDecrease(item.id)}
              >
                Decrease
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 active:bg-blue-700"
                onClick={() => handleDelete(item.id, item.ImageBook)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <p className="text-xl font-semibold mt-4">
        Total Price: {total} {"រៀល"}
      </p>
      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <p className="text-xl font-semibold mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={confirmDelete}>
                Yes, delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2"
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
