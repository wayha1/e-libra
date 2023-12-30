import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      return updateProfile(userCredential.user, {
        displayName: displayName,
      });
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
