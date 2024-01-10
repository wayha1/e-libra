import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
            <p className="text-gray-600 mb-8">You do not have permission to access this resource.</p>

            {/* Button to go to homepage using Link */}
            <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Homepage
            </Link>
        </div>
    );
};

export default UnauthorizedPage;
