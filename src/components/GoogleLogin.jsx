// GoogleLogin.js

import React, { useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import HomePage from './HomePage/HomePage';

function GoogleLogin() {

  const [user, setUser] = useState(null);

  const handleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user);
    });
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

  return (
    <div>
      {user ? (
        <>
          <HomePage />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login With Google</button>
      )}
    </div>
  );
}

export default GoogleLogin;
