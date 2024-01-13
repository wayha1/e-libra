import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';


export const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [inputVisibility, setInputVisibility] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'user'));
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUserData(usersData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [newRole, userData]);

  const handleSetRole = (userId) => {
    setSelectedUserId(userId);
    setInputVisibility((prev) => ({
      ...prev, [userId]: !prev[userId] || false,
    }));
  };

  const handleConfirmRole = async () => {
    try {
      const userDocRef = doc(db, 'user', selectedUserId);
      await updateDoc(userDocRef, { role: newRole });
      setSelectedUserId(null);
      setNewRole('');
      setInputVisibility((prev) => ({
        ...prev,
        [selectedUserId]: false,
      }));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
      <ul>
        {userData.map((user, index) => (
          <li key={index} className="border-b-2 p-4">
            <div className="grid grid-cols-2 gap-4 border border-black p-4 bg-white">
              <div>
                <strong className="block mb-2">Name:</strong>
                <p>{user.displayName}</p>
              </div>
              <div>
                <strong className="block mb-2">Email:</strong>
                <p>{user.email}</p>
              </div>
              <div>
                <strong className="block mb-2">Password:</strong>
                <p>{user.password}</p>
              </div>
              <div>
                <strong className="block mb-2">Role:</strong>
                <p>{user.role}</p>
              </div>
              <div>
                <strong className="block mb-2">UID:</strong>
                <p>{user.uid}</p>
              </div>

              <div className="h-fit space-x-2 whitespace-nowrap">
                <button
                  onClick={() => handleSetRole(user.id)}
                  className={`
                  ${inputVisibility[user.id] ? 'bg-red-500' : 'bg-green-500'} 
                  text-white active:bg-blue-500 p-2 rounded-xl`}
                >
                  {inputVisibility[user.id] ? 'Close' : 'Set Role'}
                </button>

                {inputVisibility[user.id] && selectedUserId === user.id && (
                  <>
                    <input
                      type="text"
                      placeholder="New Role"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="border p-2 rounded-md"
                    />
                    <button
                      onClick={handleConfirmRole}
                      className="bg-green-500 text-white active:bg-blue-500 p-2 rounded-xl"
                    >
                      Confirm
                    </button>
                  </>
                )}

              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
