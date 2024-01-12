import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Generalbook } from '../GeneralBook/Generalbook';
import { BookManage } from '../book/BookManage';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { UserList } from '../userManage/UserList';
import { BaciiBook } from '../BacllBook/BaciiBook';
import { ComicBook } from '../ComicBook/ComicBook';
import { KhmerBook } from '../KhmerBook/KhmerBook';
import { NovelBook } from '../NovelBook/NovelBook';
import { PracticeBook } from '../PracticeBook/PracticeBook';
import { Author } from '../Author/Author';


export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const renderContent = () => {
        switch (window.location.pathname) {
            case '/dashboard/mangment':
                return <BookManage />;
            case '/dashboard/book':
                return <Generalbook />;
            case '/dashboard/bacii':
                return <BaciiBook />
            case '/dashboard/comic':
                return <ComicBook />
            case '/dashboard/khmer':
                return <KhmerBook />
            case '/dashboard/novel':
                return <NovelBook />
            case '/dashboard/practice':
                return <PracticeBook />
            case '/dashboard/author':
                return <Author />
            case '/dashboard/userlist':
                return <UserList />
            default:
                return (
                    <div className="text-center text-2xl font-medium">
                        No content available for: {window.location.pathname}
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-screen flex">
            <div className="bg-gray-800 text-white w-[15%] p-10">
                <ul className='space-y-5'>
                    <li className="flex items-center justify-center mt-10">
                        <Link
                            to="/dashboard/mangment"
                            onClick={() => navigate('/dashboard/mangment')}
                            className={`${window.location.pathname === "/dashboard/mangment"} text-xl hover:text-gray-300 `}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/book"
                            onClick={() => navigate('/dashboard/book')}
                            className={`${window.location.pathname === "/dashboard/book"} text-xl hover:text-gray-300`}
                        >
                            Book
                        </Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/bacii"
                            onClick={() => navigate('/dashboard/bacii')}
                            className={`${window.location.pathname === "/dashboard/book"} text-xl hover:text-gray-300`}
                        >
                            bacii
                        </Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/comic"
                            onClick={() => navigate('/dashboard/comic')}
                            className={`${window.location.pathname === "/dashboard/book"} text-xl hover:text-gray-300`}
                        >
                            comic
                        </Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/khmer"
                            onClick={() => navigate('/dashboard/khmer')}
                            className={`${window.location.pathname === "/dashboard/book"} text-xl hover:text-gray-300`}
                        >
                            Khmer-Book
                        </Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/novel"
                            onClick={() => navigate('/dashboard/novel')}
                            className={`${window.location.pathname === "/dashboard/book"} text-xl hover:text-gray-300`}
                        >
                            Novel-Book
                        </Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/practice"
                            onClick={() => navigate('/dashboard/practice')}
                            className={`${window.location.pathname === "/dashboard/book"} text-xl hover:text-gray-300`}
                        >
                            Practice-Book
                        </Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/author"
                            onClick={() => navigate('/dashboard/author')}
                            className={`${window.location.pathname === "/dashboard/author"} text-xl hover:text-gray-300`}
                        >
                            AuthorList
                        </Link>
                    </li>
                </ul>
                <li className="flex h-fit items-end justify-center mt-40">
                    <button className="bg-red-600 p-3 rounded-md" onClick={handleLogout}>
                        Log Out
                    </button>
                </li>
            </div>
            <div className="flex-grow overflow-y-auto bg-neutral-200 w-[85%] ">{renderContent()}</div>
        </div>
    );
};
