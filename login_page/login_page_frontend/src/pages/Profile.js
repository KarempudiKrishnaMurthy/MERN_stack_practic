import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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

    const categorizeLoginTime = (timestamp) => {
        const hour = new Date(timestamp).getHours();
        if (hour >= 5 && hour < 12) return "Morning";
        if (hour >= 12 && hour < 17) return "Afternoon";
        if (hour >= 17 && hour < 21) return "Evening";
        return "Night";
    };

    const processLoginData = () => {
        if (!userData || !userData.loginTimestamps) return [];

        const timeCategories = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 };

        userData.loginTimestamps.forEach((time) => {
            const category = categorizeLoginTime(time);
            timeCategories[category]++;
        });

        return Object.keys(timeCategories).map((key) => ({ time: key, count: timeCategories[key] }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">User Profile</h2>

                {userData ? (
                    <>
                        <div className="text-gray-700 text-center mb-6">
                            <p className="text-lg font-medium">
                                <span className="text-gray-900">Username:</span> {userData.username}
                            </p>
                        </div>

                        <div className="w-full h-64">
                            <h3 className="text-xl font-semibold text-blue-500 text-center mb-2">Login Activity</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={processLoginData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#4A90E2" barSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="mt-6 w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Back to Dashboard
                        </button>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;