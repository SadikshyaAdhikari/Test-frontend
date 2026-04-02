
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import Notifications from "@/components/Notifications";

export function Navbar({ isLoggedIn, onLogout }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("#hamburger-menu") &&
        !e.target.closest("#hamburger-btn")
      ) {
        setShowMenu(false);
      }
      if (
        !e.target.closest("#notifications-dropdown") &&
        !e.target.closest("#notifications-btn")
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 p-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-lg font-bold">
          MyApp
        </Link>

        {isLoggedIn && (
          <div className="flex items-center space-x-4 relative">
            <button
              id="notifications-btn"
              onClick={() => setShowNotifications((prev) => !prev)}
              className="text-white text-xl relative"
            >
              <Bell />
            </button>

            {showNotifications && (
              <div
                id="notifications-dropdown"
                className="absolute right-0 top-12 w-80 bg-white rounded shadow-lg z-50"
              >
                <Notifications />
              </div>
            )}

            <Link to="/profile" className="flex items-center">
              <img
                src={
                  user?.avatar_url
                    ? `${import.meta.env.VITE_API_BASE_URL}${user.avatar_url}`
                    : "/default-avatar.png"
                }
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>

            <div className="relative">
              <button
                id="hamburger-btn"
                onClick={() => setShowMenu((prev) => !prev)}
                className="text-white"
              >
                <Menu size={24} />
              </button>

              {showMenu && (
                <div
                  id="hamburger-menu"
                  className="absolute right-0 top-12 w-64 bg-gray-700 text-white rounded-lg shadow-lg p-4 z-50"
                >
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={
                        user?.avatar_url
                          ? `${import.meta.env.VITE_API_BASE_URL}${user.avatar_url}`
                          : "/default-avatar.png"
                      }
                      className="w-20 h-20 rounded-full object-cover mb-2"
                    />
                  </div>

                  <Link
                    to="/avatar"
                    className="text-white"
                  >
                    Upload Avatar
                  </Link>

                  <br />

                  <Link
                    to="/update-password"
                    className="text-white"
                  >
                    Update Password
                  </Link>

                  <button
                    onClick={onLogout}
                    className="w-2/3 bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-300 px-3 py-2">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}