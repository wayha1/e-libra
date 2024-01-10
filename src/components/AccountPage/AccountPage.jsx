import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../content/LoadingPage/LoadingPage";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

          setUserData(userDataFromFirestore);

          if (userDataFromFirestore && userDataFromFirestore.role === "admin") {
            navigate('/admin');
          } else {
            navigate('/account');
          }
        } else {
          console.error("No user found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchData();
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);


  const handleImageError = () => {
    setImageError(true);
  };

  const handleBookClicked = () => {
    navigate("/yourbook");
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-10 md:mt-10 h-full">
        <div className="font-semibold text-black text-5xl md:text-5xl pb-10 pl-4 xl:pl-0 text-center">
          Account Information
        </div>
        <div className="md:flex-row gap-4 justify-between p-4 xl:p-0">
          <div className="w-full text-black">
            <h1 className="font-semibold mb-4 text-xl text-center mb-5">Profile information</h1>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg rounded-lg bg-white p-6">
              <div className="flex flex-col items-center">
                {user && !imageError ? (
                  <img
                    src={
                      user?.photoURL ||
                      "https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw"
                    }
                    width={100}
                    height={100}
                    className="rounded-full mb-3 outline outline-offset-2 outline-2 outline-blue-500 cursor-pointer"
                    alt="Profile"
                    onError={handleImageError}
                    loading="lazy"
                  />
                ) : (
                  <div className="rounded-full mb-3 outline outline-offset-2 outline-2 outline-blue-500 cursor-pointer bg-gray-300"></div>
                )}

                {userData && (
                  <div>
                    <h1>{userData.displayName}</h1>
                    <p>Role: {userData.role}</p>
                    <p>Email: {userData.email}</p>
                  </div>
                )}
                <h1 className="text-sm hover:text-blue-500 cursor-pointer">
                  {"Join : "}
                  {user?.metadata?.creationTime}
                </h1>
                <h1 className="text-sm hover:text-blue-500 cursor-pointer">{user?.email}</h1>
                <h1 className="text-sm hover:text-blue-500 cursor-pointer">{user?.phoneNumber}</h1>
              </div>
              <div className="w-full md:w-2/5 p-4 flex justify-end items-end"></div>
            </div>
          </div>
        </div>
        <button
          className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          onClick={handleBookClicked}
        >
          Your Book
        </button>
        {isLoading && <LoadingPage />}
        <hr className="h-[500px] my-8"></hr>
      </div>
    </div>
  );
};

export default AccountPage;
