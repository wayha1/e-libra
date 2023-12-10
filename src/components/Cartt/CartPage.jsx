import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const sampleCollection = collection(db, "Sample");
        const snapshot = await getDocs(sampleCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    fetchCartItems();
  }, []);
  
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

  const handleDelete = async (itemId) => {
    try {
      //console.log("Deleting item from Firestore");
      // Delete item from Firestore
      const itemDoc = doc(db, "Sample", itemId);
      await deleteDoc(itemDoc);
      alert('Item deleted from cart!');
  
      console.log("Removing item from local state");
      // Remove the item from local state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting document:", error);
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
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <p className="text-xl font-semibold mt-4">Total Price: {total} {'រៀល'}</p>
    </div>
  );
};

export default CartPage;