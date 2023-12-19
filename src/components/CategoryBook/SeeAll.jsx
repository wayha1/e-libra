// SeeAll.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function SeeAll() {
  return (
    <div>
      <div>SeeAll</div>
      {/* Add a button to go back to AllCategory */}
      <Link to="/allGen" className="text-blue-500 hover:underline">
        Back to All Categories
      </Link>
    </div>
  );
}

export default SeeAll;
