import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { db } from '../../firebase';
// import { collection, getDocs } from 'firebase/firestore';


export const BookManage = () => {

  const navigate = useNavigate();

  const handleUserList = () => {
    navigate("/dashboard/userlist")
  }
  const handleAuthorList = () => {
    navigate("/dashboard/author")
  }

  return (
    <>
      <div className='w-full h-full px-5 flex items-center'>

        <div className="w-full p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Manage Books</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {/* User List */}
            <button onClick={handleUserList}>
              <div className="bg-blue-100 py-4 rounded-md">
                <h3 className="text-xl font-semibold text-center text-gray-500">User List</h3>
                {/* Render your user list here */}
              </div>
            </button>

            {/* Author List */}
            <button onClick={handleAuthorList}>
              <div className="bg-pink-100 py-4 rounded-md">
                <h3 className="text-xl font-semibold text-center text-gray-500">Author List</h3>
                {/* Render your author list here */}
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* User Modal */}

    </>
  );
};
