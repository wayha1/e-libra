import React from 'react';

export const ModalToLogin = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Welcome to Our Website</h2>
                <p className="text-gray-600 mb-6">Please log in to access exclusive features.</p>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Login
                </button>
            </div>
        </div>
    );
};
