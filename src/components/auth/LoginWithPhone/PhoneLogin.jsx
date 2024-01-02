import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react'
import { app } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

function PhoneLogin() {
  const [phone, setPhone] = useState(null);
  const [isOtp, setIsOtp] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const sendOTP = () => {
    const auth = getAuth(app);
    const appVerifier = new RecaptchaVerifier(auth,'abc',{'size':'invisible'})
    signInWithPhoneNumber(auth,phone,appVerifier).then(res=>{
      console.log(res)
      window.confirmationResult = res;
      console.log('otp sent')
      setIsOtp(true);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const confirmOtp = () => {
    window.confirmationResult.confirm(code).then(res=>{
      console.log(res)
      navigate('/')
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div>
      {!isOtp?
      <div>
      <h1>login with OTP</h1>
      <input
      onChange={(e) => {setPhone(e.target.value)}} 
      placeholder='Phone Number'
      />
      <div id='abc'></div>
      <button 
      type='button'
      onClick={sendOTP}
      className='bg-blue-100 rounded-lg ml-5 p-2'
      >sent otp</button>
      </div>
      :
      <div>
        <h3>Confirm OTP</h3>
        <input type='text' onChange={(e) => {setCode(e.target.value)}}/>
        <button type='button' onClick={confirmOtp}>Submit OTP</button>
      </div>
      }
    </div>
  )
}

export default PhoneLogin
