import React, { useEffect, useState } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where, collection } from "firebase/firestore";
import { auth, db } from "./firebase";
import UnauthorizedPage from "./auth/UnauthorizedPage/UnauthorizedPage";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [user, setUser] = useState(null);
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
      setIsLoading(false);
      console.log(userDataFromFirestore);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to auth state changes
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    const navigateUser = async () => {
      await fetchData(user);
      if (user && user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    };

    if (user) {
      navigateUser();
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => unsubscribe();
  }, []);

  return (
    <React.Fragment>
      {user ? (
        user.role === "admin" ? (
          <Route {...rest} element={<Component />} />
        ) : (
          <UnauthorizedPage />
        )
      ) : (
        <Navigate to="/" />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
