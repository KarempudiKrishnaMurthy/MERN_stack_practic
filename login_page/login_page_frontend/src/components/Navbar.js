import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Society Hub
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-200 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-gray-200 transition">
                Events
              </Link>
            </li>
            <li>
              <Link to="/announcements" className="hover:text-gray-200 transition">
                Announcements
              </Link>
            </li>
            <li>
              <Link to="/complaints" className="hover:text-gray-200 transition">
                Complaints
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-200 transition">
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden bg-blue-700 space-y-4 p-4">
            <li>
              <Link to="/" className="block" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="block" onClick={() => setIsOpen(false)}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/announcements" className="block" onClick={() => setIsOpen(false)}>
                Announcements
              </Link>
            </li>
            <li>
              <Link to="/complaints" className="block" onClick={() => setIsOpen(false)}>
                Complaints
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
