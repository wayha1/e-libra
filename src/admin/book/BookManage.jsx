import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where, collection } from "firebase/firestore";

const BookManage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

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
    }
  };

  const navigateUser = useCallback(() => {
    if (user && userData && user.uid === userData.uid) {
      if (userData.role === "admin") {
        return "/dashboard/userlist";
      }
      if (userData.role === "author") {
        return "/dashboard/author";
      }
      else {
        return "/unauthorized";
      }
    } else {
      return "/unauthorized";
    }
  }, [user, userData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchData(currentUser);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUserList = () => {
    navigate(navigateUser());
  };

  const handleAuthorList = () => {
    navigate("/dashboard/author");
  };
  const handleUserBook = () => {
    navigate("/dashboard/userbook")
  }

  return (
    <>
      <div className="w-full h-full px-5 flex items-center">
        <div className="w-full p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Manage Books</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {/* User List */}
            {userData && userData.role === "admin" && (
              <button onClick={handleUserList}>
                <div className="bg-blue-100 py-4 rounded-md">
                  <h3 className="text-xl font-semibold text-center text-gray-500">User List</h3>

                </div>
              </button>
            )}

            {userData && userData.role === "admin" && (
              <button onClick={handleUserBook}>
                <div className="bg-green-100 py-4 rounded-md">
                  <h3 className="text-xl font-semibold text-center text-gray-500">User Book</h3>
                </div>
              </button>

            )}

            {userData && userData.role === "admin" && (
              <button onClick={handleAuthorList}>
                <div className="bg-pink-100 py-4 rounded-md">
                  <h3 className="text-xl font-semibold text-center text-gray-500">Author List</h3>
                </div>
              </button>

            )}

            {/* Disable User List button for authors */}
            {userData && userData.role === "author" && (
              <div className="bg-pink-200 py-4 rounded-md cursor-not-allowed opacity-50">
                <h3 className="text-xl font-semibold text-center text-gray-500">User List</h3>
              </div>
            )}
            {userData && userData.role === "author" && (
              <button onClick={handleUserBook}>
                <div className="bg-green-200 py-4 rounded-md">
                  <h3 className="text-xl font-semibold text-center text-gray-500">User Book</h3>
                </div>
              </button>
            )}
            {userData && userData.role === "author" && (
              <button onClick={handleAuthorList}>
                <div className="bg-blue-200 py-4 rounded-md">
                  <h3 className="text-xl font-semibold text-center text-gray-500">Author list</h3>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* User Modal */}
    </>
  );
};

export default BookManage;
