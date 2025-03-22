import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar
import { Card, CardContent, Button } from '@mui/material';
import { FaUsers, FaClipboardList, FaBell, FaBuilding } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="p-6 max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                    <img src="" alt="Society View" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h1 className="text-white text-4xl font-bold">Welcome to Your Community</h1>
                    </div>
                </div>

                {/* Grid Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {/* Announcements */}
                    <Card className="shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <FaBell className="text-blue-500 text-3xl" />
                                <h2 className="text-xl font-semibold">Announcements</h2>
                            </div>
                            <p className="text-gray-600 mt-2">New maintenance schedule released for next month.</p>
                            <Button variant="outline" className="mt-3">View More</Button>
                        </CardContent>
                    </Card>

                    {/* Events */}
                    <Card className="shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <FaUsers className="text-green-500 text-3xl" />
                                <h2 className="text-xl font-semibold">Upcoming Events</h2>
                            </div>
                            <img src="https://source.unsplash.com/300x200/?party,event" alt="Event" className="w-full mt-2 rounded-lg" />
                            <p className="text-gray-600 mt-2">Community BBQ - March 20, 6 PM</p>
                            <Button variant="outline" className="mt-3">Join Now</Button>
                        </CardContent>
                    </Card>

                    {/* Hobby Groups */}
                    <Card className="shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <FaClipboardList className="text-purple-500 text-3xl" />
                                <h2 className="text-xl font-semibold">Hobby Groups</h2>
                            </div>
                            <p className="text-gray-600 mt-2">Join book clubs, fitness groups, and more!</p>
                            <Button variant="outline" className="mt-3">Explore Groups</Button>
                        </CardContent>
                    </Card>

                    {/* Complaint Tracking */}
                    <Card className="shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <FaClipboardList className="text-red-500 text-3xl" />
                                <h2 className="text-xl font-semibold">Complaint Tracking</h2>
                            </div>
                            <p className="text-gray-600 mt-2">Check the status of your maintenance and security requests.</p>
                            <Button variant="outline" className="mt-3">Track Complaints</Button>
                        </CardContent>
                    </Card>

                    {/* Visitor Logs */}
                    <Card className="shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <FaBuilding className="text-orange-500 text-3xl" />
                                <h2 className="text-xl font-semibold">Visitor Logs</h2>
                            </div>
                            <p className="text-gray-600 mt-2">Monitor visitors entering and exiting the premises.</p>
                            <Button variant="outline" className="mt-3">View Logs</Button>
                        </CardContent>
                    </Card>

                    {/* Local Businesses */}
                    <Card className="shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <FaBuilding className="text-teal-500 text-3xl" />
                                <h2 className="text-xl font-semibold">Local Businesses</h2>
                            </div>
                            <img src="https://source.unsplash.com/300x200/?store,shop" alt="Business" className="w-full mt-2 rounded-lg" />
                            <p className="text-gray-600 mt-2">Discover services available in your neighborhood.</p>
                            <Button variant="outline" className="mt-3">Explore Now</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
