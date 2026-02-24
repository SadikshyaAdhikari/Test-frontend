//Navbar with home, login, register links
import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-white text-lg font-bold">MyApp</Link>
            <div>
                {/* <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link> */}
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
            </div>  
        </div>
    </nav>
  );
}