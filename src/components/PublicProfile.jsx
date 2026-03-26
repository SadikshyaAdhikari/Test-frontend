import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Feed from './Feed.jsx';
import { Navbar } from "@/auth/pages/Navbar.jsx";
import { Link } from "react-router-dom";





export function PublicProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
          {
            withCredentials: true
          }
        );

        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Navbar
              isLoggedIn={true}
              onLogout={async () => {
                try {
                  await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
                    {},
                    { withCredentials: true }
                  );
                  nav("/login");
                } catch (err) {
                  console.error("Logout failed", err);
                  alert("Logout failed");
                }
              }}
            />
             <div className="flex justify-end">
                <Link to="/dashboard" className="text-gray-500 px-3 py-2 rounded-md text-sm font-medium">Back</Link>
            </div>
      <h2>{user.username}</h2>
      <p>Joined: {new Date(user.created_at).toDateString()}</p>

      {/* <h3>User Posts</h3> */}

<Feed currentUser={{id: userId}} userId={userId} />

    </div>
  );
}