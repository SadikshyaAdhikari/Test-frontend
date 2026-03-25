import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "./Post";

export default function Feed({ currentUser, userId }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // track next page
  const [error, setError] = useState(null);

  // Reset when switching user/profile
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!hasMore) return;

      setLoading(true);
      setError(null);

      try {
        let url = userId
          ? `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}/posts?page=${page}&limit=${limit}`
          : `${import.meta.env.VITE_API_BASE_URL}/api/posts?page=${page}&limit=${limit}`;

        const res = await axios.get(url, {
          withCredentials: true,
        });

        const newPosts = Array.isArray(res.data)
          ? res.data
          : res.data.posts || [];

        // append instead of replace
        setPosts((prev) => [...prev, ...newPosts]);

        // check if more data exists
        if (newPosts.length < limit) {
          setHasMore(false);
        }

      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, userId]);

  return (
    <div className="max-w-xl mx-auto mt-6">

      {/* Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Posts */}
      {posts.map((post) => (
        <Post key={post.id} post={post} currentUser={currentUser} />
      ))}

      {/* Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* No posts */}
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500">No posts found</p>
      )}

      {/* Load More instead of Next */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-6 mb-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}