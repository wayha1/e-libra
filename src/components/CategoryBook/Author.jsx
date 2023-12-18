// AuthorFile.js
import React from "react";

const AuthorFile = ({ authors }) => {
  return (
    <div>
      <h1>All Authors</h1>
      {authors.map((author, i) => (
        // Render each author's details
        <div key={i}>
          {/* Render author details */}
          <p>{author.authName}</p>
          {/* Add other author details as needed */}
        </div>
      ))}
    </div>
  );
};

export default AuthorFile;
