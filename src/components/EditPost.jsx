import React, { useState } from "react";
import axios from "axios";

export default function EditPost({ post, onUpdate }) {
    const [text, setText] = useState(post.text);
    const [media, setMedia] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  if (text !== undefined) formData.append("text", text);
  if (media) formData.append("media", media);

  try {
    const res = await axios.put(
      `http://localhost:3000/api/edit/${post.id}`,
      formData,
      {
        withCredentials: true, 
      }
    );

    onUpdate(res.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      {/* Text */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full"
      />

      {/* File */}
      <input
        type="file"
        onChange={(e) => setMedia(e.target.files[0])}
        className="mt-2"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
        Update Post
      </button>
    </form>
  );
}