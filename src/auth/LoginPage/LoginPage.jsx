import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GoogleLogin from "../LoginWithGoogle/GoogleLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const uid = currentUser.uid;
          const cartCollection = collection(db, "user");
          const q = query(cartCollection, where("uid", "==", uid));
          const querySnapshot = await getDocs(q);
          const userDataFromFirestore = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))[0];

          if (userDataFromFirestore) {
            if (userDataFromFirestore.role === "admin") {
              navigate("/admin");
            } if (userDataFromFirestore.role === "author") {
              navigate("/dashboard/author");
            } if (userDataFromFirestore.role === "user") {
              navigate("/");
            }
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
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword(auth, username, password);

      const userDocRef = doc(db, "user", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.role === "admin") {
          navigate("/admin");
        } else if (userData.role === "author") {
          navigate("/dashboard/author");
        } else if (userData.role === "user") {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
      setError(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
      <div className="flex flex-col w-[70%]">
        <div className="bg-white shadow-xl rounded-xl items-center flex flex-col py-10">
          <form onSubmit={handleLogin}>
            <main className="w-full space-y-10">
              <h1 className="text-center text-4xl pt-8 font-bold text-gray-700 ">Sign In</h1>
              <div className="flex flex-col px-3 py-2 space-y-5">
                <input
                  className={`border border-gray-300 rounded-md py-2 px-4 ${username ? "text-gray-600" : "text-gray-200"
                    }`}
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username or email"
                />

                <input
                  className={`border border-gray-300 rounded-md py-2 px-4 ${password ? "text-gray-600" : "text-gray-200"
                    }`}
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="password"
                />
              </div>

              <div className="mt-5 justify-center w-full flex items-center flex-col">
                {error && <span className="text-sm text-red-600 ">Wrong username or password! </span>}
                <button
                  type="submit"
                  className="bg-blue-600 w-[40%] text-center py-2 rounded-xl hover:bg-blue-800 
                          shadow-xl text-white "
                >
                  Sign In
                </button>
              </div>

              <div className="mt-8 text-center flex justify-center w-full">
                <div className="flex">
                  <button className="py-3 hover:text-blue-900"> Forgot Password &#10072; </button>
                  <Link to={"/register"}>
                    <button className="py-3 text-blue-700 hover:text-blue-900" type="Register">
                      &#160;Sign Up
                    </button>
                  </Link>
                </div>
              </div>

              <ul className="justify-center items-center space-x-5 w-full">
                <div className=" flex">
                  <GoogleLogin />
                </div>
              </ul>
            </main>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
