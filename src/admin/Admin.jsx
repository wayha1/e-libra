import React from 'react';
import { Link } from 'react-router-dom';

export const Admin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Hello, Admin!</h1>
      <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
        Go to Dashboard
      </Link>
    </div>
  );
};
