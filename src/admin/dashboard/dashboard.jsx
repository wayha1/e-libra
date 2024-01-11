import React from 'react';
import { Link } from 'react-router-dom';
import { Generalbook } from '../GeneralBook/Generalbook';

export const Dashboard = () => {

    const renderContent = () => {
        switch (window.location.pathname) {
            case "/dashboard/book":
                return <Generalbook />;
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
                    <h2 className="text-2xl font-bold my-10">Dashboard</h2>
                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/generalbook"
                            className={`${window.location.pathname === "/dashboard/generalbook"
                                }  className="hover:text-gray-300"`}
                        >
                            Book
                        </Link>
                    </li>

                    <li className="flex items-center justify-center">
                        <Link
                            to="/dashboard/author"
                            className={`${window.location.pathname === "/dashboard/generalbook"
                                }  className="hover:text-gray-300"`}
                        >
                            AuthorList
                        </Link>
                    </li>

                    <li className="flex items-center justify-center">

                        LogOut

                    </li>
                </ul>
            </div>
            <div className="flex-grow overflow-y-auto bg-neutral-200 w-[75%] ">{renderContent()}</div>
        </div>
    );
};
