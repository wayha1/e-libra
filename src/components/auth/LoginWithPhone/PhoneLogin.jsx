import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { app } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

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
        console.log(err);
      });
  };

  const confirmOtp = () => {
    window.confirmationResult.confirm(code)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
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
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Phone Login Modal"
      >
        {!isOtp ? (
          <div>
            <h1>Login with OTP</h1>
            <input
              onChange={(e) => { setPhone(e.target.value) }}
              placeholder='Phone Number'
            />
            <div id='abc'></div>
            <button
              type='button'
              onClick={sendOTP}
              className='bg-blue-100 rounded-lg ml-5 p-2'
            >Send OTP</button>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={isPinModalOpen}
        onRequestClose={closePinModal}
        contentLabel="PIN Code Modal"
      >
        {isOtp ? (
          <div>
            <h3>Confirm PIN Code</h3>
            <p>{`Time remaining: ${timer} seconds`}</p>
            <input type='text' onChange={(e) => { setCode(e.target.value) }} />
            <button type='button' onClick={confirmOtp} disabled={timer === 0}>
              Submit PIN
            </button>
          </div>
        ) : null}
        <button onClick={closePinModal}>Close PIN Modal</button>
      </Modal>
    </div>
  );
}

export default PhoneLogin;
