import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const BookManage = () => {

  const [showUserModal, setShowUserModal] = useState(false);
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'user'));
      const usersData = usersSnapshot.docs.map((doc) => doc.data());
      setUserData(usersData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUserButtonClick = () => {
    fetchUserData();
    setShowUserModal(true);
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
  };

  return (
    <>
      <div className='w-full h-full px-5 flex items-center'>

        <div className="w-full p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Manage Books</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {/* User List */}
            <button onClick={handleUserButtonClick}>
              <div className="bg-blue-100 py-4 rounded-md">
                <h3 className="text-xl font-semibold text-center text-gray-500">User List</h3>
                {/* Render your user list here */}
              </div>
            </button>
            {/* Book List */}
            <button>
              <div className="bg-green-100 py-4 rounded-md">
                <h3 className="text-xl font-semibold text-center text-gray-500">Book List</h3>
                {/* Render your book list here */}
              </div>
            </button>
            {/* Author List */}
            <button>
              <div className="bg-pink-100 py-4 rounded-md">
                <h3 className="text-xl font-semibold text-center text-gray-500">Author List</h3>
                {/* Render your author list here */}
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 overflow-y-auto mt-10">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" onClick={handleCloseModal}>
              <div className="absolute inset-0 opacity-50"></div>
            </div>
            <div className="bg-white rounded-md p-8 max-w-md w-full ">
              <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
              {/* Render user data in the modal */}
              <ul>
                {userData.map((user, index) => (
                  <li key={index} className="border-b-2 p-2">
                    <div className="mb-2">
                      <strong className="mr-2">Name:</strong>
                      {user.displayName}
                    </div>
                    <div className="mb-2">
                      <strong className="mr-2">Email:</strong>
                      {user.email}
                    </div>
                    <div className="mb-2">
                      <strong className="mr-2">Password:</strong>
                      {user.password}
                    </div>
                    <div className="mb-2">
                      <strong className="mr-2">Role:</strong>
                      {user.role}
                    </div>
                    <div>
                      <strong className="mr-2">UID:</strong>
                      {user.uid}
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 bg-red-500 text-white p-3 rounded-full" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
