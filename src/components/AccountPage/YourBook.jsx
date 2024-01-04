import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function YourBook() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems } = location.state || {};
    const [userBooks, setUserBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserBooks();
    }, []); 
    console.log(userBooks)
    const fetchUserBooks = async () => {
        try {
            const userBookCollection = collection(db, 'userBook');
            const querySnapshot = await getDocs(userBookCollection);
            const userBooksData = querySnapshot.docs.map(doc => doc.data());
            setUserBooks(userBooksData);
        } catch (error) {
            console.error('Error fetching user books:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const bookUser = () => {
        navigate('/account');
    };

    return (
        <div>
            <button
                className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                onClick={bookUser}
            >
                Back
            </button>
            <div>
                <h2>Your Books:</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userBooks.map((book, index) => (
                            <li key={index}>
                                <div className="max-w-xs bg-white rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={book.img}
                                        alt={`Book ${index + 1}`}
                                        className="w-30 h-40"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                                        {/* Add additional information if needed */}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
