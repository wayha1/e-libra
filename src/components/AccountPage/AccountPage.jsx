import React from "react";

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
  return (
    <div>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto mt-10 md:mt-10 h-full">
        <div className="font-semibold text-black text-2xl md:text-4xl pb-10 pl-4 xl:pl-0">
          Account Setting
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between p-4 xl:p-0">
          <div className="w-full md:w-2/5 text-black">
            <h1 className="font-semibold mb-4 text-xl">Profile information</h1>
            <p>Update your account's profile information and email address.</p>
          </div>
          <div className="w-full md:w-3/5 flex flex-col md:flex-row shadow-lg rounded">
            <div className="w-full md:w-3/5">
              <form className="p-4">
                <FormField id="username" type="text" label="Username" placeholder="Enter username" mb="4" />
                <FormField id="email" type="email" label="Email" placeholder="Enter your email" mb="10" />
              </form>
            </div>
            <div className="w-full md:w-2/5 p-4 flex justify-end items-end">
              <button className="bg-gray-200 text-black font-bold py-2 px-4 rounded-md" type="button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200"></hr>
        <div className="flex flex-col md:flex-row gap-4 justify-between p-4 xl:p-0">
          <div className="w-full md:w-2/5 text-black">
            <h2 className="font-semibold mb-4 text-xl">Update Password</h2>
            <p>
              Please establish a strong, randomly generated password for your account to enhance security.
            </p>
          </div>
          <div className="w-full md:w-3/5 flex flex-col md:flex-row shadow-lg rounded">
            <div className="w-full md:w-3/5">
              <form className="p-4">
                <FormField
                  id="Current_Password"
                  type="password"
                  label="Current Password"
                  placeholder="Enter your password"
                  mb="4"
                />
                <FormField
                  id="New_Password"
                  type="password"
                  label="New Password"
                  placeholder="Enter your new password"
                  mb="4"
                />
                <FormField
                  id="Confirm_Password"
                  type="password"
                  label="Confirm Password"
                  placeholder="Re-enter your new password"
                  mb="10"
                />
              </form>
            </div>
            <div className="w-full md:w-2/5 p-4 flex justify-end items-end">
              <button className="bg-gray-200 text-black font-bold py-2 px-4 rounded-md" type="button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
