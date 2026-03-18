import { useState } from "react";
import axios from "axios";

export default function CreatePost({ currentUser }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);        //text
    if (file) {
      formData.append("media", file);     //file
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );

      setText("");
      setFile(null);
      alert("Post created!");
    } catch (err) {
      console.error(err);
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
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
        Post
      </button>
    </form>
  );
}