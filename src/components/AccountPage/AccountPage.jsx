import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const user = auth.currentUser;
  const [imageError, setImageError] = React.useState(false);
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleBookClicked = () => {
    navigate("/yourbook");
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
                    src={user?.photoURL || "https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw"}
                    width={100}
                    height={100}
                    className="rounded-full mb-3 outline outline-offset-2 outline-2 outline-blue-500 cursor-pointer"
                    alt="Profile"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="rounded-full mb-3 outline outline-offset-2 outline-2 outline-blue-500 cursor-pointer bg-gray-300">

                  </div>
                )}

                <h1 className="mb-3 text-lg hover:text-blue-500 cursor-pointer">
                  {user?.displayName || ''}
                </h1>
                <h1 className="text-sm hover:text-blue-500 cursor-pointer">{"User ID : "}{user?.uid}</h1>
                <h1 className="text-sm hover:text-blue-500 cursor-pointer">{user?.email}</h1>
                <h1 className="text-sm hover:text-blue-500 cursor-pointer">{user?.phoneNumber}</h1>
              </div>
              <div className="w-full md:w-2/5 p-4 flex justify-end items-end"></div>
            </div>
          </div>
        </div>
        <button 
        className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        onClick={handleBookClicked}>Your Book</button>
        <hr className="h-[500px] my-8"></hr>
       
      </div>
    </div>
  );
};

export default AccountPage;

