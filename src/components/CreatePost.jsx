import { useState } from "react";
import axios from "axios";

export default function CreatePost({ currentUser, onPostCreated }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > MAX_SIZE) {
      alert("File size must be less than 5MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only JPG, PNG, and MP4 files are allowed");
      return;
    }

    setFile(selectedFile); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text && !file) {
      alert("Post cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    if (file) {
      formData.append("media", file);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/create`,
        formData,
        {
          withCredentials: true, 
        }
      );

      setText("");
      setFile(null);

      if (onPostCreated);

      alert("Post created!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        className="border w-full p-2 mb-2"
      />

      <input
        type="file"
        accept="image/jpeg, image/png, video/mp4"
        onChange={handleFileChange}
        className="mb-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Post
      </button>
    </form>
  );
}