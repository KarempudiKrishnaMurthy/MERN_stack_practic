import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">User Profile</h2>

        {userData ? (
          <div className="text-gray-700">
            <p className="text-lg font-medium">
              <span className="text-gray-900">Username:</span> {userData.username}
            </p>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-blue-500">Login Timestamps:</h3>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {userData.loginTimestamps.map((time, index) => (
                  <li
                    key={index}
                    className={`${
                      index === userData.loginTimestamps.length - 1 ? "text-green-600 font-medium" : ""
                    }`}
                  >
                    {new Date(time).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-red-500">Logout Timestamps:</h3>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {userData.logoutTimestamps.map((time, index) => (
                  <li
                    key={index}
                    className={`${
                      index === userData.logoutTimestamps.length - 1 ? "text-red-600 font-medium" : ""
                    }`}
                  >
                    {new Date(time).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>;;
  );
};

export default Profile;
