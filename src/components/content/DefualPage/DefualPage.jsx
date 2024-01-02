import React from 'react';
import { FaCog } from 'react-icons/fa';
import 'animate.css';
import './DefualPage.css';

export const DefaultPage = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin text-gray-500">
                    <FaCog size={100} />
                </div>
                <div className='ml-10'>This Page We are Working On</div>
            </div>
        </div>
    );
};
