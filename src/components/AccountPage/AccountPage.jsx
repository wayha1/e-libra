import React from "react";
import { auth } from "../../firebase";


const FormField = ({ id, type, label, placeholder, mb, value, onChange }) => (
  <div className={`mb-${mb}`}>
    <label className="block text-black text-sm font-bold mb-2">{label}</label>
    <input
      className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const AccountPage = () => {

  const user = auth.currentUser;

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-10 md:mt-10 h-full">
        <div className="font-semibold text-black text-5xl 
        md:text-5xl pb-10 pl-4 xl:pl-0 text-center">
          Account Information
        </div>
        <div className="md:flex-row gap-4 justify-between p-4 xl:p-0">
          <div className="w-full text-black">
            <h1 className="font-semibold mb-4 
            text-xl text-center mb-5">Profile information</h1>
          </div>
          <div class="w-full flex justify-center">
            <div class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg rounded-lg bg-white p-6">
              <div class="flex flex-col items-center">
                <img
                  src={user.photoURL || 
                  "https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw"}
                  width={100}
                  height={100}
                  class="rounded-full mb-3 outline outline-offset-2 outline-2 
                  outline-blue-500 cursor-pointer"
                  alt="Profile"
                  onerror="this.onerror=null; 
                  this.src='https://th.bing.com/th/id/R.0f176a0452d52cf716b2391db3ceb7e9?rik=yQN6JCCMB7a4QQ&pid=ImgRaw';"
                />

                <h1 class="mb-3 text-lg hover:text-blue-500 cursor-pointer">{user.displayName}</h1>
                <h1 class="text-sm hover:text-blue-500 cursor-pointer">{user.email}</h1>
              </div>
              <div class="w-full md:w-2/5 p-4 flex justify-end items-end">
              </div>
            </div>
          </div>
        </div>
        <hr className="h-[500px] my-8"></hr>
      </div>
    </div>
  );
};

export default AccountPage;
