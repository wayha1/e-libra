import React from 'react';

const DefaultCartPage = () => {
    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-semibold mb-8">Your Shopping Cart</h1>

            <div className="bg-white p-6 rounded shadow-md">
                <p className="text-lg font-semibold mb-4">Your cart is currently empty.</p>

            </div>
        </div>
    );
};

export default DefaultCartPage;
