import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

//aa


const AllCategory = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data for BacII category
        const bacIIQuery = query(collection(db, 'Books', 'All_Genre', 'BacII'));
        const bacIIDocs = await getDocs(bacIIQuery);
        const bacIIBooks = bacIIDocs.docs.map(doc => ({ ...doc.data(), category: 'BacII' }));

        // Fetch the data for Comic category
        const comicQuery = query(collection(db, 'Books', 'All_Genre', 'Comics'));
        const comicDocs = await getDocs(comicQuery);
        const comicBooks = comicDocs.docs.map(doc => ({ ...doc.data(), category: 'Comics' }));

        // Fetch the data for GeneralBook category
        const GeneralQuery = query(collection(db, 'Books', 'All_Genre', 'GeneralBook'));
        const GeneralDocs = await getDocs(GeneralQuery);
        const GeneralBook = GeneralDocs.docs.map(doc => ({ ...doc.data(), category: 'GeneralBook' }));

        // Fetch the data for NovelBook category
        const NovelQuery = query(collection(db, 'Books', 'All_Genre', 'GeneralBook'));
        const NovelDocs = await getDocs(NovelQuery);
        const NovelBook = NovelDocs.docs.map(doc => ({ ...doc.data(), category: 'NovelBook' }));

        // Combine both sets of books into a single array
        setAllBooks([...bacIIBooks, ...comicBooks, ...GeneralBook, ...NovelBook]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-5xl font-bold mb-4 mt-8 ml-5 uppercase">All Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Display all books */}
        {allBooks.map((book, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-md">
            <img src={book.img} alt={book.title} className="mb-2 rounded-md w-60 h-60" />
            <p>{book.category}</p>
            <p className="text-lg font-semibold">{book.title}</p>
            <p className="text-gray-500">${book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
