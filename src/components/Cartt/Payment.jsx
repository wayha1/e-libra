import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [email, setEmail] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const { selectedBook, cartItems } = location.state || [];

  const handlePayment = () => {
    if (!paymentMethod || !email || !expiryDate || !cvc) {
      alert('Please fill in all the required fields.');
      return;
    }
    console.log(cartItems)
    setIsPaymentInitiated(true);
    setTimeout(async () => {
      setIsPaymentSuccessful(true);

      try {
        const deletePromises = cartItems.map(async (item) => {
          const itemRef = doc(db, 'addtoCart', item.id);
          await deleteDoc(itemRef);
        });

        await Promise.all(deletePromises);

        setPaymentMethod('');
        setEmail('');
        setExpiryDate('');
        setCVC('');

        setIsPaymentInitiated(false);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error deleting items from the cart:', error.message);
      }
    }, 2000);
  };

  const handleDone = async () => {
    setIsModalOpen(false);
      setIsPaymentSuccessful(false);
  
    try {
      const userBookCollection = collection(db, 'userBook');
        for (const item of cartItems) {
        await addDoc(userBookCollection, {
          title: item.title,
          decs: item.decs,
          img: item.img,
          BookPdf: item.BookPdf,
          date: item.date,
          authorId: item.authorId,
          price: item.price,
          userId: item.uid,
          type: item.type
        });
      }
    
    } catch (error) {
      console.error('Error adding items to userBook collection:', error.message);
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-gray-100 shadow-md mb-9">
      <h2 className="text-2xl font-bold mb-4">Payment Method:</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Select Payment Method:</label>
        <select
          className="w-full p-2 border rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="select">Please Select ....</option>
          <option value="creditCard">Credit Card</option>
          <option value="paypal">ABA</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Email:</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4 flex">
        <div className="w-1/2 mr-2">
          <label className="block text-sm font-semibold mb-1">Expiry Date:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block text-sm font-semibold mb-1">CVC/CVV:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={cvc}
            onChange={(e) => setCVC(e.target.value)}
          />
        </div>
      </div>

      <button
        className="bg-blue-500 text-white py-2 w-[400px] px-4 
          rounded hover:bg-blue-700 active:bg-gray-500"
        onClick={handlePayment}
      >
        Go to Payment
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 max-w-md rounded-md">
            <div className="text-green-500 font-semibold mb-4">
              Payment Successful!{' '}
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 active:bg-gray-500"
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
