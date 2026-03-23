import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "./Post";

export default function SearchPosts({ currentUser }) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Don't search empty input
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    // Debounce (wait 500ms after typing stops)
    const delayDebounce = setTimeout(() => {
      searchPosts();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const searchPosts = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/search",
        { keyword },
        {
          withCredentials: true,
        }
      );
      setResults(res.data);

    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="p-4">
      {/* Input */}
      <input
        type="text"
        placeholder="Search posts..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Results */}
      <div className="mt-4">
        {keyword && results.length === 0 && <p>No results found</p>}

        {/* {results.map((post) => (
          <div key={post.id} className="border p-3 mb-2 rounded">
            <p>{post.text}</p>

            {post.media_url && (
              <img src={post.media_url} alt="" className="mt-2 w-40" />
            )}
          </div>
        ))} */}

        {results.map((post) => (
          <Post
            key={post.id}
            post={post}
            currentUser={currentUser}
          />
        ))}

      </div>
    </div>
  );
}