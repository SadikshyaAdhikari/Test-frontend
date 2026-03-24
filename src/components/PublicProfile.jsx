import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Feed from './Feed.jsx';


export function PublicProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

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
      <h2>{user.username}</h2>
      {/* <p>Joined: {new Date(user.created_at).toDateString()}</p> */}

      <h3>User Posts</h3>

<Feed currentUser={{id: userId}} userId={userId} />

    </div>
  );
}