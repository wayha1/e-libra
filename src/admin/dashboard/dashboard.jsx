import React from 'react'
import { Link } from 'react-router-dom';


export const Dashboard = () => {

    return (
        <div className="flex h-screen w-full">

            <aside className="bg-gray-800 text-white w-[15%] p-10">
                <h2 className="text-2xl font-bold my-10">Dashboard</h2>
                <nav>
                    <ul className='space-y-5'>
                        <li className="mb-2">
                            <Link to="/dashboard" className="hover:text-gray-300">Dashboad</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/dashboard/book" className="hover:text-gray-300">Book</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/dashboard/auth" className="hover:text-gray-300">AuthorList</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/dashboard/settings" className="hover:text-gray-300">Settings</Link>
                        </li>

                    </ul>
                </nav>
            </aside>


            <main className="flex-1 p-6 w-[85%]">

                <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>

            </main>
        </div>
    );
}

