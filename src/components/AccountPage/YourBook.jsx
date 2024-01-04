import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, where, query, deleteDoc,doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import LoadingPage from '../content/LoadingPage/LoadingPage';

export default function YourBook() {
    const navigate = useNavigate();
    const [userBooks, setUserBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserBooks = useCallback(async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                navigate('/login');
                return;
            }

            const userBookCollection = collection(db, 'userBook');
            const q = query(userBookCollection, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const userBooksData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setUserBooks(userBooksData);
        } catch (error) {
            console.error('Error fetching user books:', error.message);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchUserBooks();
    }, [fetchUserBooks]);

    const goBack = () => {
        navigate('/account');
    };

    const readBook = (book) => {
        const pdfPages = book.BookPdf || [];
        if (pdfPages && pdfPages.length > 0) {
            navigate('/bookview', { state: { pages: { BookPdf: pdfPages } } });
        } else {
            alert("This book does not have any pages to read.");
        }
    };

    const deleteBook = async (bookId) => {
        try {
            // Delete the document with the specified ID from the 'userBook' collection
            await deleteDoc(doc(db, 'userBook', bookId));
            // Optionally, you can update the state to reflect the deletion
            setUserBooks((prevUserBooks) =>
                prevUserBooks.filter((book) => book.id !== bookId)
            );
        } catch (error) {
            console.error('Error deleting book:', error.message);
        }
    };

    return (
        <div className='h-[1100px] w-full z-20 overflow-y-auto px-10  '>
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <button
                        className="bg-gray-700 text-white font-bold mt-10 py-2 px-4 rounded-lg shadow-lg"
                        onClick={goBack}
                    >
                        Back
                    </button>
                    <h2 className="text-4xl mx-auto font-semibold pr-5 text-green-900 mb-5 text-center">Your Books:</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                        {userBooks.map((book, index) => (
                            <li key={index}>
                                <div className=" max-w-xs bg-white rounded-lg overflow-hidden shadow-lg ">
                                    <img
                                        src={book.img}
                                        alt={`Book ${index + 1}`}
                                        className="w-80 h-80"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                                        <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg mr-20"
                                            onClick={() => readBook(book)}
                                        >
                                            Read Book
                                        </button>
                                        <button
                                         onClick={() => deleteBook(book.id)}
                                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg">Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

        </div>
    );
}
