// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const uid = currentUser.uid;
          const userDocRef = doc(db, "user", uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            if (userData.role === role) {
              setUser(currentUser);
            } else {
              console.error("No user found");
            }
          } else {
            console.error("No user found");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [navigate, role]);

  return (
    <React.Fragment>
      {user ? <Route {...rest} element={<Component />} /> : <Navigate to="/login" replace />}
    </React.Fragment>
  );
};

export default ProtectedRoute;
