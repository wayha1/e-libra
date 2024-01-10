import React, { useEffect, useState, useCallback } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where, collection } from "firebase/firestore";
import { auth, db } from "./firebase";
import UnauthorizedPage from "./auth/UnauthorizedPage/UnauthorizedPage";
import LoadingPage from "./components/content/LoadingPage/LoadingPage";
import { Admin } from "./admin/Admin";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const navigateUser = useCallback(() => {
    if (user && userData && user.uid === userData.uid) {
      if (userData.role === "admin") {
        navigate("/admin");
        return <Admin />;
      } else {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }
  }, [user, userData, navigate]);

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

  if (!userData) {
    return <Navigate to="/unauthorized" />;
  }

  if (userData.role === "admin") {
    return <Navigate to="/admin"></Navigate>;
  }

  return children;
};
export default ProtectedRoute;
