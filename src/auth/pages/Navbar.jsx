import Notifications from '@/components/Notifications';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';


export function Navbar({ isLoggedIn, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-lg font-bold">
          MyApp
        </Link>

        <div className="flex items-center space-x-4 relative">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-gray-300 px-3 py-2">
                Login
              </Link>
              {/* <Link to="/register" className="text-gray-300 px-3 py-2">
                Register
              </Link> */}
            </>
          ) : (
            <>
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="text-white text-xl"
              >
                <Bell></Bell>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded shadow-lg z-50">
                  <Notifications />
                </div>
              )}

              <button
                onClick={onLogout}
                className="bg-red-400 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}