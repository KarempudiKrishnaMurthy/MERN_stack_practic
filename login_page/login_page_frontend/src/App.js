import React from "react";
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </Router>
    )
}

export default App;