// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//     const [userData, setUserData] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     navigate("/");
//                     return;
//                 }

//                 const res = await axios.get("http://localhost:5000/api/auth/profile", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setUserData(res.data);
//             } catch (err) {
//                 console.error("Error fetching profile:", err);
//                 navigate("/");
//             }
//         };

//         fetchUserData();
//     }, [navigate]);

//     // Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token"); // Remove token
//         navigate("/"); // Redirect to login page
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//                 <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">User Profile</h2>

//                 {userData ? (
//                     <div className="text-gray-700">
//                         <p className="text-lg font-medium">
//                             <span className="text-gray-900">Username:</span> {userData.username}
//                         </p>

//                         {/* Login Timestamps */}
//                         {userData.loginTimestamps?.length > 0 && (
//                             <div className="mt-4">
//                                 <h3 className="text-xl font-semibold text-blue-500">Login Timestamps:</h3>
//                                 <ul className="mt-2 list-disc list-inside space-y-1">
//                                     {userData.loginTimestamps.map((time, index) => (
//                                         <li key={index} className="text-gray-600">
//                                             {new Date(time).toLocaleString()}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {/* Logout Timestamps */}
//                         {userData.logoutTimestamps?.length > 0 && (
//                             <div className="mt-4">
//                                 <h3 className="text-xl font-semibold text-red-500">Logout Timestamps:</h3>
//                                 <ul className="mt-2 list-disc list-inside space-y-1">
//                                     {userData.logoutTimestamps.map((time, index) => (
//                                         <li key={index} className="text-gray-600">
//                                             {new Date(time).toLocaleString()}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {/* Logout Button */}
//                         <button 
//                             onClick={handleLogout} 
//                             className="mt-6 w-full p-2 text-white bg-red-500 rounded hover:bg-red-600">
//                             Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-500">Loading...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Profile;

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
                if (!token) {
                    navigate("/");
                    return;
                }

                const res = await axios.get("http://localhost:5000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserData(res.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                navigate("/");
            }
        };

        fetchUserData();
    }, [navigate]);

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.post("http://localhost:5000/api/auth/logout", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">User Profile</h2>

                {userData ? (
                    <div className="text-gray-700">
                        <p className="text-lg font-medium">
                            <span className="text-gray-900">Username:</span> {userData.username}
                        </p>

                        {userData.loginTimestamps.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold text-blue-500">Login Timestamps:</h3>
                                <ul className="mt-2 list-disc list-inside space-y-1">
                                    {userData.loginTimestamps.map((time, index) => (
                                        <li key={index} className="text-gray-600">
                                            {formatTimestamp(time)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {userData.logoutTimestamps.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold text-red-500">Logout Timestamps:</h3>
                                <ul className="mt-2 list-disc list-inside space-y-1">
                                    {userData.logoutTimestamps.map((time, index) => (
                                        <li key={index} className="text-gray-600">
                                            {formatTimestamp(time)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button onClick={handleLogout} className="mt-6 w-full p-2 text-white bg-red-500 rounded hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
