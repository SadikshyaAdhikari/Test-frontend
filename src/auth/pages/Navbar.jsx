import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import Notifications from "@/components/Notifications";
import AvatarUploader from "@/components/AvatarUploader";

export function Navbar({ isLoggedIn, onLogout }) {
  const { user } = useAuth();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#hamburger-menu") && !e.target.closest("#hamburger-btn")) {
        setShowMenu(false);
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

        {isLoggedIn ? (
          <div className="hidden md:flex items-center space-x-4 relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="text-white text-xl"
            >
              <Bell />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded shadow-lg z-50">
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

            <button
              onClick={onLogout}
              className="bg-red-400 text-white px-2 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-300 px-3 py-2">
              Login
            </Link>
          </div>
        )}

        {isLoggedIn && (
          <div className="md:hidden relative">
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
                  <Link to="/avatar" className="flex items-center">
                    Upload Profile
                  </Link>

                </div>

                <button
                  onClick={onLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}