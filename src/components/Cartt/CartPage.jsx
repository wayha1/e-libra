import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
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

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">Cart Items</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center border-b-2 py-4">
          <img src={item.ImageBook} alt="Book" className="w-16 h-20 mr-4" />

          <div>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-gray-500">${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
