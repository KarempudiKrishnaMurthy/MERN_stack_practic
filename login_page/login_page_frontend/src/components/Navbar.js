import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBars, FaTimes, FaMoon, FaSun, FaBell, FaUser, 
  FaSearch, FaHome, FaCalendarAlt, FaClipboardList, 
  FaPhone, FaUserFriends
} from "react-icons/fa";
import { Badge, Avatar, IconButton, Tooltip } from "@mui/material";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [searchActive, setSearchActive] = useState(false);
  // Sample user data - in a real app, this would come from authentication context
  const [userData, setUserData] = useState({
    name: "Sarah Johnson",
    role: "Resident",
    avatar: "/images/avatar.jpg"
  });

  // Detect scroll position for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/dashboard", label: "Home", icon: <FaHome /> },
    { path: "/events", label: "Events", icon: <FaCalendarAlt /> },
    { path: "/announcements", label: "Announcements", icon: <FaClipboardList /> },
    { path: "/residents", label: "Residents", icon: <FaUserFriends /> },
    { path: "/contact", label: "Contact", icon: <FaPhone /> },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? darkMode 
            ? "bg-gray-900/95 backdrop-blur-md shadow-lg" 
            : "bg-white/90 backdrop-blur-md shadow-lg" 
          : darkMode 
            ? "bg-gray-900" 
            : "bg-gradient-to-r from-emerald-600 to-teal-500"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 z-10">
            <motion.div 
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                darkMode ? "bg-emerald-600" : "bg-white text-emerald-600"
              }`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </motion.div>
            <span className={`text-xl font-bold ${scrolled && !darkMode ? "text-gray-800" : "text-white"}`}>
              CommunitySpace
            </span>
          </Link>
          
          {/* Search Bar (Desktop) */}
          <motion.div 
            className={`hidden md:flex items-center relative mx-4 flex-grow max-w-md ${
              searchActive ? "scale-105" : ""
            }`}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input 
              type="text" 
              placeholder="Search everything..."
              className={`w-full py-2 px-4 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                darkMode 
                  ? "bg-gray-800 text-white placeholder:text-gray-400 border-gray-700" 
                  : "bg-white/90 text-gray-800 border-gray-200"
              } border`}
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Tooltip title={link.label} arrow>
                  <Link 
                    to={link.path} 
                    className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      scrolled && !darkMode
                        ? "text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
                        : darkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg mb-1">{link.icon}</div>
                    <span>{link.label}</span>
                  </Link>
                </Tooltip>
              </motion.div>
            ))}

            <div className="pl-4 flex items-center space-x-2">
              {/* Notifications */}
              <Tooltip title="Notifications" arrow>
                <IconButton color="inherit">
                  <Badge badgeContent={notificationCount} color="error">
                    <FaBell className={scrolled && !darkMode ? "text-gray-700" : ""} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Dark Mode Toggle */}
              <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"} arrow>
                <IconButton 
                  onClick={() => setDarkMode(!darkMode)} 
                  className={`ml-1 p-2 rounded-full transition-all duration-500 ${
                    darkMode 
                      ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" 
                      : scrolled 
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                        : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </IconButton>
              </Tooltip>

              {/* User Profile */}
              <Tooltip title={userData.name} arrow>
                <div className="ml-1 flex items-center">
                  <Avatar 
                    src={userData.avatar} 
                    alt={userData.name} 
                    className="w-9 h-9 border-2 border-white"
                  />
                  <span className={`ml-2 font-medium hidden lg:block ${
                    scrolled && !darkMode ? "text-gray-800" : "text-white"
                  }`}>
                    {userData.name}
                  </span>
                </div>
              </Tooltip>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Tooltip title="Notifications" arrow>
              <IconButton color="inherit">
                <Badge badgeContent={notificationCount} color="error">
                  <FaBell className={scrolled && !darkMode ? "text-gray-700" : ""} />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <motion.button 
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg ${
                darkMode ? "text-white" : scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search - Appears when menu is open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden relative mb-4 pb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <input 
                type="text" 
                placeholder="Search..."
                className={`w-full py-2 px-4 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  darkMode 
                    ? "bg-gray-800 text-white placeholder:text-gray-400 border-gray-700" 
                    : "bg-white/90 text-gray-800 border-gray-200"
                } border`}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className={`space-y-1 pb-4 ${
                darkMode ? "text-white" : scrolled ? "text-gray-800" : "text-white"
              }`}>
                {navLinks.map((link, index) => (
                  <Link 
                    key={index}
                    to={link.path} 
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      darkMode 
                        ? "hover:bg-gray-800" 
                        : scrolled 
                          ? "hover:bg-gray-100" 
                          : "hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div>{link.icon}</div>
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-700">
                  <div className="flex items-center">
                    <Avatar 
                      src={userData.avatar} 
                      alt={userData.name} 
                      className="w-8 h-8 mr-3"
                    />
                    <div>
                      <p className="font-medium">{userData.name}</p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{userData.role}</p>
                    </div>
                  </div>

                  {/* Dark Mode Toggle */}
                  <IconButton 
                    onClick={() => setDarkMode(!darkMode)} 
                    className={`p-2 rounded-full ${
                      darkMode 
                        ? "bg-gray-800 text-yellow-400" 
                        : scrolled 
                          ? "bg-gray-200 text-gray-700" 
                          : "bg-white/20 text-white"
                    }`}
                  >
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </IconButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;