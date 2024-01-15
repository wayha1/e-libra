import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where, collection } from "firebase/firestore";
import { auth, db } from "./firebase";
import LoadingPage from "./components/content/LoadingPage/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //fetch data from firestore
  const fetchData = async (currentUser) => {
    try {
      const uid = currentUser.uid;
      const cartCollection = collection(db, "user");
      const q = query(cartCollection, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const userDataFromFirestore = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))[0];

      setUser(currentUser);
      setUserData(userDataFromFirestore);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch from authecation from firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchData(currentUser);
      } else {
        setUser(null);
        setUserData(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // function for navigate page by checking role
  const navigateUser = useCallback(() => {
    if (user && userData && user.uid === userData.uid) {
      if (userData.role === "admin") {
        return "/admin";
      }
      if (userData.role === "author") {
        return "/dashboard/author";
      } else {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }
  }, [user, userData, navigate]);

  useEffect(() => {
    if (!isLoading) {
      navigateUser();
    }
  }, [isLoading, navigateUser]);

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }
  return userData.role === "admin" || "author" ? children : <Navigate to="/unauthorized" />;
};
export default ProtectedRoute;
