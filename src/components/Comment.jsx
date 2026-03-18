import axios from "axios";
import { useEffect, useState } from "react";

export default function Comment({ comment, currentUser, fetchComments }) {
    const [username, setUsername] = useState("Loading...");

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${comment.id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            fetchComments(); // refresh comments after delete
        } catch (err) {
            console.error("Failed to delete comment:", err);
        }
    };

    const fetchUserName = async (userId) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user/${userId}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });

            return res.data.user.username;
        } catch (err) {
            console.error("Failed to fetch user name:", err);
            return "Unknown User";
        }
    };

     useEffect(() => {
        if (comment?.user_id) {
            fetchUserName(comment.user_id).then(name => {
                setUsername(name);
            });
        }
    }, [comment?.user_id]);
    return (
        <div className="flex justify-between items-center text-sm mb-1">
            <div>
                <strong> {username}:</strong> {comment.text}
            </div>

            {/* Show delete only if it's user's own comment  */}
            {currentUser?.id === comment.user_id && (
                <button
                    onClick={handleDelete}
                    className="text-red-500 text-xs ml-2"
                >
                    Delete
                </button>
            )}
        </div>
    );
}