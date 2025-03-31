import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password,
            });

            console.log("Response from Server:", res.data);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate('/dashboard');
            } else {
                console.error("No token received!");
            }
        } catch (error) {
            setError(error.response?.data?.msg || "Login failed");
            console.error("Login Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleLogin} className="mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>

                <p className="text-center mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
