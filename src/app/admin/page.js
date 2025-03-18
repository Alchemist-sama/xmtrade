"use client"; // Mark this as a client component
import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import { db } from "../../firebase"; // Adjust the path to your Firebase config

export default function AdminPage() {
  const [users, setUsers] = useState([]); // State to store users

  // Check if the user is an admin
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user && user.email === "admin@example.com") {
        // Allow access
        fetchUsers(); // Fetch users if the user is an admin
      } else {
        // Redirect to login or show an error
        window.location.href = "/login";
      }
    });
  }, []);

  // Fetch users from Firestore
  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };

  // Function to update user amount
  const handleAmountChange = async (userId, newAmount) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { amount: newAmount });
    alert("Amount updated successfully!");
  };

  // Function to update verification badge
  const handleBadgeChange = async (userId, newBadge) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { verificationBadge: newBadge });
    alert("Verification badge updated successfully!");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Verification Badge</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    defaultValue={user.amount}
                    onBlur={(e) => handleAmountChange(user.id, e.target.value)}
                    className="w-20 p-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <select
                    defaultValue={user.verificationBadge}
                    onChange={(e) => handleBadgeChange(user.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="Regular">Regular</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Diamond">Diamond</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleBadgeChange(user.id, user.verificationBadge)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}