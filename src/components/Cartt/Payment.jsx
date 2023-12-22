import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [email, setEmail] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);

  const location = useLocation();
  const cartItems = location.state?.cartItems || [];


  const handlePayment = () => {
    // Basic validation
    if (!paymentMethod || !email || !expiryDate || !cvc) {
      alert('Please fill in all the required fields.');
      return;
    }

    // Set the payment initiation flag
    setIsPaymentInitiated(true);

    // Add your payment processing logic here
    // For simplicity, I'm just simulating a successful payment after a short delay
    setTimeout(async () => {
      setIsPaymentSuccessful(true);

      try {
        // Delete items from the cart in Firestore
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
      } catch (error) {
        console.error('Error deleting items from the cart:', error.message);
      }
    }, 2000);
  };

  const handleDone = () => {
    // Reset the success state when "Done" is clicked
    setIsPaymentSuccessful(false);
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

      {isPaymentInitiated && !isPaymentSuccessful ? (
        <div className="mt-4">Processing payment...</div>
      ) : isPaymentSuccessful ? (
        <div className="mt-4 text-green-500 font-semibold">
          Payment Successful!{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white py-2 w-[400px] px-4 
          rounded hover:bg-blue-700 active:bg-gray-500"
          onClick={handlePayment}
        >
          Go to Payment
        </button>
      )}
    </div>
  );
}

export default Payment;