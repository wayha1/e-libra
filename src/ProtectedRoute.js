import React, { useEffect, useState } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where, collection } from "firebase/firestore";
import { auth, db } from "./firebase";
import UnauthorizedPage from "./auth/UnauthorizedPage/UnauthorizedPage";
import LoadingPage from "./components/content/LoadingPage/LoadingPage";
import { Admin } from "./admin/Admin";

const ProtectedRoute = ({ element }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      fetchData(currentUser);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    return () => unsubscribe();
  }, [user, userData]);

  useEffect(() => {
    const navigateUser = async () => {
      if (user && userData && user.uid === userData.uid) {
        // Check user data role and navigate accordingly
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/unauthorized");
        }
      } else {
        navigate("/unauthorized");
      }
    };

    if (!isLoading) {
      navigateUser();
    }
    console.log(user);
    console.log(userData);
  }, [isLoading, navigate]);

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (user && userData && user.uid === userData.uid) {
    if (userData.role === "admin") {
      return <Navigate to="/admin"/>;
    }
  } else {
    return <Navigate to="/unauthorized" />;
  }
  return element;
};

export default ProtectedRoute;
