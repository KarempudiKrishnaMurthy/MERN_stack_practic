import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Card, CardContent, Button, Chip, Avatar, Badge, Tooltip } from "@mui/material";
import { 
  FaUsers, FaClipboardList, FaBell, FaCog, FaCalendarAlt, 
  FaUserFriends, FaChartLine, FaFileInvoiceDollar, FaShieldAlt 
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [weatherData, setWeatherData] = useState({ temp: "24°C", condition: "Sunny" });
  // Sample user data - in a real app, this would come from authentication
  // const [userData, setUserData] = useState({
  //   name: "Sarah Johnson",
  //   since: "2023",
  //   role: "Resident",
  //   avatar: "/images/avatar.jpg"
  // });
  const { user } = useAuth();
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-emerald-500 rounded-full animate-spin"></div>
          <p className={`mt-4 text-xl font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Loading your community dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-500 ease-in-out min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-emerald-50 to-teal-50 text-gray-800"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <motion.div 
        className="pt-24 pb-12 px-6 md:px-8 max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* User Welcome Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          variants={itemVariants}
        >
          <div>
            <span className={`text-sm font-medium ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>Welcome back,</span>
            <h1 className="text-3xl md:text-4xl font-bold">
              {user ? user.username:'...'}
              {/* dummy */}
              </h1>
            <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              <span className="mx-2">•</span>
              <span className={`${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                {user ? user.username:'...'}
                {/* dummy */}
                </span>
            </p>
          </div>
          <div className={`mt-4 md:mt-0 flex items-center px-4 py-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
            <FaCalendarAlt className={`mr-2 ${darkMode ? "text-emerald-400" : "text-emerald-500"}`} />
            <span>{weatherData.temp}</span>
            <span className="mx-2">•</span>
            <span>{weatherData.condition}</span>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <FaUsers />, label: "Residents", value: "248", color: "emerald" },
              { icon: <FaClipboardList />, label: "Active Groups", value: "12", color: "teal" },
              { icon: <FaUserFriends />, label: "Events This Month", value: "8", color: "green" },
              { icon: <FaShieldAlt />, label: "Security Alerts", value: "0", color: "red" },
            ].map((stat, index) => (
              <Card key={index} className={`overflow-hidden shadow-md rounded-xl transition-all duration-300 hover:shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <CardContent className="p-4">
                  <div className={`text-${stat.color}-${darkMode ? "400" : "500"} text-3xl mb-2`}>{stat.icon}</div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Announcement Section */}
        <motion.div variants={itemVariants}>
          <Card className={`relative overflow-hidden shadow-xl rounded-xl transform transition-all duration-500 hover:shadow-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}> 
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-10"></div>
            <CardContent className="relative p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className={`p-3 rounded-full ${darkMode ? "bg-emerald-900/30" : "bg-emerald-100"}`}>
                    <FaBell className={`${darkMode ? "text-emerald-400" : "text-emerald-600"} text-3xl md:text-4xl animate-pulse`} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Important Community Updates</h2>
                    <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Posted 2 hours ago • By Community Manager</p>
                  </div>
                </div>
                <Chip 
                  label="PRIORITY" 
                  color="error" 
                  variant="outlined" 
                  className="self-start md:self-center"
                />
              </div>
              
              <div className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-700/70" : "bg-gray-50"}`}>
                <p className="text-lg leading-relaxed">
                  We're implementing new security protocols starting next week. All residents must update their access cards 
                  by April 5th. The management office will be open extended hours (8 AM - 8 PM) to facilitate this process.
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                  Additionally, the quarterly maintenance schedule has been updated. Check the maintenance calendar for specific dates.
                </p>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <Button 
                  variant="contained" 
                  size="large"
                  className={`mb-4 sm:mb-0 ${darkMode ? "bg-emerald-700 hover:bg-emerald-600" : "bg-emerald-600 hover:bg-emerald-700"}`}
                  startIcon={<FaClipboardList />}
                >
                  View Full Details
                </Button>
                <div className="flex items-center space-x-2">
                  <Avatar src="/images/avatar1.jpg" />
                  <Avatar src="/images/avatar2.jpg" />
                  <Avatar src="/images/avatar3.jpg" />
                  <Badge badgeContent="+42" color="primary">
                    <Avatar>
                      <FaUsers />
                    </Avatar>
                  </Badge>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>viewed this</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grid Layout for Dashboard Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCalendarAlt className="text-5xl" />,
              title: "Community Events",
              description: "Join our upcoming events and connect with neighbors",
              color: "emerald",
              items: ["Community BBQ - April 5, 6 PM", "Yoga in the Park - April 8, 8 AM", "Kids Movie Night - April 10, 7 PM"],
              buttonText: "View All Events",
              badge: "New"
            },
            {
              icon: <FaUserFriends className="text-5xl" />,
              title: "Hobby Groups",
              description: "Find people with similar interests and passions",
              color: "teal",
              items: ["Book Club", "Fitness Enthusiasts", "Photography Group", "Cooking Classes"],
              buttonText: "Join Groups",
              badge: null
            },
            {
              icon: <FaClipboardList className="text-5xl" />,
              title: "Maintenance Tracking",
              description: "Stay updated on your maintenance requests",
              color: "cyan",
              items: ["2 pending", "3 completed this week"],
              buttonText: "Submit Request",
              badge: null
            },
            {
              icon: <FaChartLine className="text-5xl" />,
              title: "Community Polls",
              description: "Have your say in community decisions",
              color: "amber",
              items: ["New Pool Hours", "Landscaping Options", "Holiday Decoration Theme"],
              buttonText: "Vote Now",
              badge: "3 Active"
            },
            {
              icon: <FaFileInvoiceDollar className="text-5xl" />,
              title: "Payment Portal",
              description: "Manage your community fees and payments",
              color: "emerald",
              items: ["Next payment: April 15", "View payment history"],
              buttonText: "Make Payment",
              badge: null
            },
            {
              icon: <FaCog className="text-5xl" />,
              title: "Account Settings",
              description: "Customize your profile and preferences",
              color: "gray",
              items: ["Profile settings", "Notification preferences", "Privacy settings"],
              buttonText: "Manage Account",
              badge: null
            },
          ].map((card, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className={`h-full shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}> 
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-full ${darkMode ? `bg-${card.color}-900/30` : `bg-${card.color}-100`}`}>
                      <div className={`text-${card.color}-${darkMode ? "400" : "500"}`}>{card.icon}</div>
                    </div>
                    {card.badge && (
                      <Chip 
                        label={card.badge} 
                        size="small"
                        className={`bg-${card.color}-${darkMode ? "700" : "500"} text-white`}
                      />
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                  <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{card.description}</p>
                  
                  <div className={`flex-grow mb-4 p-3 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <ul className="space-y-2">
                      {card.items.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full bg-${card.color}-${darkMode ? "400" : "500"} mr-2`}></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="contained" 
                    className={`bg-${card.color}-${darkMode ? "700" : "500"} hover:bg-${card.color}-${darkMode ? "600" : "600"} w-full`}
                  >
                    {card.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div 
          variants={itemVariants}
          className={`mt-10 p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}
        >
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: <FaUsers />, label: "Residents Directory" },
              { icon: <FaBell />, label: "Notifications" },
              { icon: <FaCalendarAlt />, label: "Calendar" },
              { icon: <FaClipboardList />, label: "Documents" },
              { icon: <FaShieldAlt />, label: "Security" },
              { icon: <FaCog />, label: "Settings" },
            ].map((action, index) => (
              <Tooltip key={index} title={action.label} arrow>
                <Button 
                  variant="outlined"
                  className={`flex flex-col items-center p-4 h-24 ${
                    darkMode 
                      ? "border-gray-700 hover:bg-gray-700 text-emerald-400" 
                      : "border-gray-200 hover:bg-gray-50 text-emerald-500"
                  }`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              </Tooltip>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};


export default Dashboard;