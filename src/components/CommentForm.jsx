import { useState } from "react";
import axios from "axios";

export default function CommentForm({ postId, fetchComments, currentUser }) {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text) return;

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/${postId}/comments`, {
                text
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });

            setText("");
            fetchComments();
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="border p-1 rounded flex-1"
            />
            <button type="submit" className="bg-blue-500 text-white px-2 rounded">Send</button>
        </form>
    );
}