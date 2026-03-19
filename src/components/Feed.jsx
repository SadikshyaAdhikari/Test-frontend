import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "./Post";

export default function Feed({ currentUser, userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
    let url;

    if (userId) {
      // Profile page → specific user's posts
      url = `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}/posts`;
    } else {
      // Home page → all posts
      url = `${import.meta.env.VITE_API_BASE_URL}/api/posts`;
    }

    const res = await axios.get(url, {
      withCredentials: true,
    });

    // console.log('API response:', res.data);
    setPosts(Array.isArray(res.data) ? res.data : res.data.posts || []);
    // console.log('posts set to:', Array.isArray(res.data) ? res.data : res.data.posts || []);
  } catch (err) {
    console.error(err);
  }
};
    fetchPosts();
  }, [userId]);

  return (
    <div className="max-w-xl mx-auto mt-6">
      {posts.map(post => (
        <Post key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
}