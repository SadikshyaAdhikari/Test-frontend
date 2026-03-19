// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Post } from "./Post";

// export default function Feed({ currentUser, userId }) {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//     let url;

//     if (userId) {
//       // Profile page → specific user's posts
//       url = `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}/posts`;
//     } else {
//       // Home page → all posts
//       url = `${import.meta.env.VITE_API_BASE_URL}/api/posts`;
//     }

//     const res = await axios.get(url, {
//       withCredentials: true,
//     });

//     // console.log('API response:', res.data);
//     setPosts(Array.isArray(res.data) ? res.data : res.data.posts || []);
//     // console.log('posts set to:', Array.isArray(res.data) ? res.data : res.data.posts || []);
//   } catch (err) {
//     console.error(err);
//   }
// };
//     fetchPosts();
//   }, [userId]);

//   return (
//     <div className="max-w-xl mx-auto mt-6">
//       {posts.map(post => (
//         <Post key={post.id} post={post} currentUser={currentUser} />
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "./Post";

export default function Feed({ currentUser, userId }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // posts per page
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url;

        if (userId) {
          // Profile page → specific user's posts (no pagination yet)
          url = `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}/posts?page=${page}&limit=${limit}`;
        } else {
          // Home page → all posts with pagination
          url = `${import.meta.env.VITE_API_BASE_URL}/api/posts?page=${page}&limit=${limit}`;
        }

        const res = await axios.get(url, {
          withCredentials: true,
        });

        setPosts(Array.isArray(res.data) ? res.data : res.data.posts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, page, limit]); // Re-fetch when page changes

  return (
    <div className="max-w-xl mx-auto mt-6">
      {loading && <p className="text-center">Loading posts...</p>}

      {posts.length === 0 && !loading && (
        <p className="text-center text-gray-500">No posts found</p>
      )}

      {posts.map(post => (
        <Post key={post.id} post={post} currentUser={currentUser} />
      ))}

    {/* pagination controls */}
      {posts.length > 0 && (
        <div className="flex justify-between items-center mt-6 mb-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>

          <span className="text-gray-600">Page {page}</span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={posts.length < limit} // Disable if fewer posts than limit
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}