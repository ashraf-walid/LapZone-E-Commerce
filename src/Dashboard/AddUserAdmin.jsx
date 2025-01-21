import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export function AddUserAdmin() {
    const [users, setUsers] = useState([]);
    const [newUserEmail, setNewUserEmail] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'UserAdmin'), (snapshot) => {
            const AdminArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(AdminArray);
        });
        return () => unsubscribe();
    }, []);

    // Validate email using a regular expression
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddUser = async () => {
        if (newUserEmail.trim() && isValidEmail(newUserEmail)) {
            try {
                await addDoc(collection(db, 'UserAdmin'), { email: newUserEmail });
                setNewUserEmail(''); // Reset the field after adding
            } catch (error) {
                console.error("Error adding user: ", error);
            }
        } else {
            alert("Please enter a valid email address");
        }
    };

    return (
        <div className="p-4 max-w-md w-11/12 mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-semibold text-gray-700 mb-4">Users List</h1>
            
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Enter admin email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddUser}
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Add Admin User
                </button>
            </div>

            {users.length > 0 ? (
                <ul className="space-y-2">
                    {users.map((user, i) => (
                        <li key={i} className="px-4 py-2 border border-gray-200 rounded-md bg-gray-50">
                            {user.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No users found.</p>
            )}
        </div>
    );
}
