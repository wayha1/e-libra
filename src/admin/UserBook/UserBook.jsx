import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const UserBook = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, "userBook"));
                const usersData = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUserData(usersData);
                console.log(usersData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {userData.map((user) => (
                <div key={user.id} className="bg-white rounded-md shadow-md flex flex-col items-center p-4">
                    <h3 className="flex text-sm overflow-hidden text-blue-300">{user.userId}</h3>
                    <h1>{user.title}</h1>
                    <h1>{user.authorId}</h1>
                    <h1>{user.price}</h1>
                    <h1>{user.type}</h1>
                </div>
            ))}
        </div>
    );
};
