import React, { useState } from "react";
import axios from "axios";

export default function EditPost({ post, onUpdate, onCancel }) {
  const [text, setText] = useState(post.text);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("File must be less than 5MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, MP4 allowed");
      return;
    }

    setMedia(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (text.trim() !== "") formData.append("text", text);
    if (media) formData.append("media", media);

    try {
      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/edit/${post.id}`,
        formData,
        { withCredentials: true }
      );

      onUpdate(res.data); 
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="file"
        onChange={handleFileChange}
        className="mt-2"
      />

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl"
        >
          {loading ? "Updating..." : "Update"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded-2xl"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}