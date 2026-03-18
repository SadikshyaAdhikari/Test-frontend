import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "./Post";

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts`, {
          withCredentials: true
        });
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-6">
      {posts.map(post => (
        <Post key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
}