import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🏡 Society Dashboard</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link to="/events" className="p-4 bg-white shadow-md rounded-xl text-center hover:bg-gray-200">
          📅 Events & Announcements
        </Link>
        <Link to="/complaints" className="p-4 bg-white shadow-md rounded-xl text-center hover:bg-gray-200">
          🛠 Complaint Tracking
        </Link>
        <Link to="/notices" className="p-4 bg-white shadow-md rounded-xl text-center hover:bg-gray-200">
          📢 Digital Notice Board
        </Link>
        <Link to="/marketplace" className="p-4 bg-white shadow-md rounded-xl text-center hover:bg-gray-200">
          🛒 Buy & Sell Marketplace
        </Link>
        <Link to="/rideshare" className="p-4 bg-white shadow-md rounded-xl text-center hover:bg-gray-200">
          🚗 Ride Sharing
        </Link>
        <Link to="/hobby-groups" className="p-4 bg-white shadow-md rounded-xl text-center hover:bg-gray-200">
          🎨 Hobby Groups
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
