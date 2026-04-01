import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/lib/AuthContext";


export default function AvatarUploader() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [username, setUsername] = useState("");
    const [uploading, setUploading] = useState(false);
    const { setUser } = useAuth();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file!");

        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("username", username);

        try {
            setUploading(true);
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/avatar`,
                formData,
                {
                    withCredentials: true,
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log("Upload Progress: " + percent + "%");
                    },
                }
            );

            setUser((prev) => ({
                ...prev,
                avatar: res.data.avatarUrl,
            }));

            console.log(res.data);
            alert("Upload successful!");
            setFile(null);
            setPreview(null);
            setUsername("");
        } catch (err) {
            console.error(err);
            alert("Upload failed!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleUpload} className="avatar-uploader">
            {/* <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /> */}

            <input type="file" accept="image/*" onChange={handleFileChange} required />

            {preview && (
                <div className="preview">
                    <img src={preview} alt="avatar preview" width="150" />
                </div>
            )}

            <button type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Avatar"}
            </button>
        </form>
    );
}