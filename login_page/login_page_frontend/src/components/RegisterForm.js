// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const RegisterForm = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");

//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/register", { username, password });
//             setSuccess("Registration successful! You can now login.");
//             setTimeout(() => navigate("/"), 2000);
//         } catch (error) {
//             setError(error.response?.data?.msg || "Registration failed");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//             <div className="p-6 bg-white rounded-lg shadow-md w-96">
//                 <h2 className="text-2xl font-bold text-center text-blue-600">Register</h2>
//                 {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//                 {success && <p className="text-green-500 text-center mt-2">{success}</p>}

//                 <form onSubmit={handleRegister} className="mt-4">
//                     <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded mb-2" required />
//                     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-2" required />
//                     <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">Register</button>
//                 </form>

//                 <p className="text-center mt-4">
//                     Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default RegisterForm;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
        blockName: "",
        flatNumber: "",
        alternatePhone: "",
        linkedin: "",
        instagram: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                ...formData,
                socialLinks: {
                    linkedin: formData.linkedin,
                    instagram: formData.instagram
                }
            });
            setSuccess("Registration successful! You can now login.");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setError(error.response?.data?.msg || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md w-96 overflow-y-auto max-h-screen">
                <h2 className="text-2xl font-bold text-center text-blue-600">Register</h2>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}

                <form onSubmit={handleRegister} className="mt-4 space-y-2">
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="blockName" placeholder="Block Name" value={formData.blockName} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="flatNumber" placeholder="Flat Number" value={formData.flatNumber} onChange={handleChange} className="w-full p-2 border rounded" required />

                    {/* Optional Fields */}
                    <input type="text" name="alternatePhone" placeholder="Alternate Phone (optional)" value={formData.alternatePhone} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="url" name="linkedin" placeholder="LinkedIn URL (optional)" value={formData.linkedin} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="url" name="instagram" placeholder="Instagram URL (optional)" value={formData.instagram} onChange={handleChange} className="w-full p-2 border rounded" />

                    <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">Register</button>
                </form>

                <p className="text-center mt-4">
                    Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
