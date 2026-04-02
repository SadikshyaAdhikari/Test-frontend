import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/lib/AuthContext";

export default function AvatarUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { setUser } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/avatar`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            console.log(`Upload Progress: ${percent}%`);
          },
        }
      );

      // Update user avatar in context
      setUser((prev) => ({
        ...prev,
        avatar_url: res.data.avatarUrl, // make sure key matches backend response
      }));

      alert("Upload successful!");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-gray-100 max-w-sm mx-auto"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />

      {preview && (
        <div className="w-32 h-32 overflow-hidden rounded-full border border-gray-300">
          <img
            src={preview}
            alt="Avatar preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!file || uploading}
        className={`px-4 py-2 rounded-lg text-white ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Avatar"}
      </button>
    </form>
  );
}