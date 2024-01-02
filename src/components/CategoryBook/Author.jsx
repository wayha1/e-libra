import React from "react";

const AuthorFile = ({ authors }) => {
  return (
    <div>
      <h1>All Authors</h1>
      {authors.map((author, i) => (
        <div key={i}>
          <p>{author.authName}</p>
        </div>
      ))}
    </div>
  );
};

export default AuthorFile;
