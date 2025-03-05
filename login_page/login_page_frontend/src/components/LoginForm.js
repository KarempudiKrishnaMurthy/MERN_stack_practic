import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from  'react-router-dom';

const LoginForm = () => {
    const[username,setUsername] = useState("");
    const[password,setPassword]=useState("");
    const[error,seterror]=useState("");
    const navigate = useNavigate();

    const handleLogin = async(e)=> {
        e.preventDefault();
        seterror("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password,
            });
        
            console.log("Response from Server:", res.data);  // Log response
        
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate('/profile');
            } else {
                console.error("No token received!");
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
        }
        
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin} className="mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;