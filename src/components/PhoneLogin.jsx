// PhoneLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";

const PhoneLogin = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = () => {
    // Only open the modal if a phone number is provided
    if (phoneNumber.trim() !== '') {
      setShowModal(true);
    }
  };

  const handleModalOk = async () => {
    try {
      // Simulate sending the verification code to the user's phone
      // In a real-world scenario, you would use Firebase Authentication API

      // For now, let's simulate a successful verification
      const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber);

      // Prompt the user to enter the received code (you might show a UI for this)
      const verificationCode = prompt('Enter the code sent to your phone:');
      const userCredential = await confirmationResult.confirm(verificationCode);
      console.log('Verification successful!', userCredential.user);

      // Close the modal and navigate to the homepage after successful authentication
      setShowModal(false);
      navigate('/homepage');
    } catch (error) {
      console.error('Error sending or verifying the verification code:', error);
    }
  };

  const handleModalClose = () => {
    // Close the modal
    setShowModal(false);
  };

  return (
    <div className='flex flex-col items-center'>
      <button
        className='border-2 border-blue-200 bg-red-200 p-2 rounded'
        onClick={handleSendCode}
      >
        Login with Phone
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded"
            />

            <div className="flex justify-end">
              <button
                className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleModalOk}
              >
                OK
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneLogin;
