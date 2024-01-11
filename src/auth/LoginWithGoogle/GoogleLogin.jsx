import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import HomePage from "../../components/HomePage/HomePage";
import google from "../../asset/google.png";
import { Navigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function GoogleLogin() {

  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
      };

      // Add user data to Firestore
      const userCollection = collection(db, "user");
      await addDoc(userCollection, userData);

      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Navigate to="/" />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>
          <div
            className="my-6 flex border-blue-100 border-2 rounded-lg
            hover:bg-gray-200 shadow-xl hover:shadow-lg w-fit max-sm:justify-center
              sm:px-1"
          >
            <img
              src={google}
              alt="my image"
              width={50}
              height={40}
              className="hover:shadow-full hover:scale-110 mx-2 my-1 "
            />
            <h1 className="flex whitespace-nowrap max-sm:hidden px-2 items-center text-gray-600">
              Login With Google
            </h1>
          </div>
        </button>
      )}
    </div>
  );
}

export default GoogleLogin;
