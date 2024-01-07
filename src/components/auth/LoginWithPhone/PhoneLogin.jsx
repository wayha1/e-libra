import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import mobile from "../../../asset/Phone1.png";

Modal.setAppElement('#root');

function PhoneLogin() {
  const [phone, setPhone] = useState(null);
  const [isOtp, setIsOtp] = useState(false);
  const [code, setCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPinModal = () => {
    setIsPinModalOpen(true);
    setTimer(60); // Reset the timer when the PIN modal is opened
  };

  const closePinModal = () => setIsPinModalOpen(false);

  const sendOTP = () => {
    const auth = getAuth(app);
    const appVerifier = new RecaptchaVerifier(auth, 'abc', { 'size': 'invisible' });
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then(res => {
        window.confirmationResult = res;
        setIsOtp(true);
        closeModal(); // Close the phone number modal after sending OTP
        openPinModal(); // Open the PIN modal
      })
      .catch(err => {
      });
  };

  const confirmOtp = () => {
    window.confirmationResult.confirm(code)
      .then(res => {
        navigate('/');
      })
      .catch(err => {
      });
  };

  useEffect(() => {
    let interval;
    if (isPinModalOpen) {
      interval = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPinModalOpen]);

  return (
    <div className="relative">
      <button onClick={openModal}>
        <div
          className="my-6 flex border-blue-100 border-2 rounded-lg
          hover:bg-gray-200 shadow-xl hover:shadow-lg w-fit max-sm:justify-center
            sm:px-1"
        >
          <image
            src={mobile}
            alt="my image"
            width={50}
            height={40}
            onClick={this}
            className="hover:shadow-full hover:scale-110 mx-2 my-1 "
          />
          <h1 className="flex whitespace-nowrap max-sm:hidden px-2 items-center text-gray-600">
            Login with phone
          </h1>
        </div>
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Phone Login Modal"
        className="modal absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        {!isOtp ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Login with phoneNumber</h1>
            <input
              onChange={(e) => { setPhone(e.target.value) }}
              placeholder='Phone Number'
              className="border border-gray-300 rounded-md py-2 px-4 mb-4"
            />
            <div id='abc'></div>
            <button
              type='button'
              onClick={sendOTP}
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >Send OTP</button>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={isPinModalOpen}
        onRequestClose={closePinModal}
        contentLabel="PIN Code Modal"
        className="modal absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        {isOtp ? (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Confirm PIN Code</h3>
            <p>{`Time remaining: ${timer} seconds`}</p>
            <input type='text' onChange={(e) => { setCode(e.target.value) }} className="border border-gray-300 rounded-md py-2 px-4 mb-4" />
            <button type='button' onClick={confirmOtp} disabled={timer === 0} className='bg-blue-500 text-white px-4 py-2 rounded'>
              Submit PIN
            </button>
          </div>
        ) : null}
        <button onClick={closePinModal} className='bg-gray-500 text-white px-4 py-2 rounded mt-4'>Close PIN Modal</button>
      </Modal>
    </div>
  );
}

export default PhoneLogin;
