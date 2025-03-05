import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userData,setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const token = localStorage.getItem('token');
                const res = await axios.get("http://localhost:5000/api/auth/profile",{
                    headers : {Authorization: `Bearer ${token} `},
                });
                setUserData(res.data);
            }catch(err){
                console.error(err);
                navigate('/')
            }
        };

        fetchUserData();
    },[navigate]);

    return(
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold">User Profile</h2>
            {userData ? (
                <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Login Timestamps:</strong></p>
                    <ul>
                        {userData.loginTimestamps.map((time, index) => (
                            <li key={index}>{new Date(time).toLocaleString()}</li>
                        ))}
                    </ul>
                    <p><strong>Logout Timestamps:</strong></p>
                    <ul>
                        {userData.logoutTimestamps.map((time, index) => (
                            <li key={index}>{new Date(time).toLocaleString()}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Profile;