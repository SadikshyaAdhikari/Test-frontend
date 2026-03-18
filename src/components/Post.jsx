import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export function Post({ post, currentUser }) {

    if (!post) return null; 

    const [liked, setLiked] = useState(post?.liked_by_user || false);
    const [likes, setLikes] = useState(parseInt(post?.like_count) || 0);
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/comments`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            setComments(Array.isArray(res.data) ? res.data : res.data.comments || []);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
            setComments([]);
        }
    };

    useEffect(() => {
        if (post?.id) {
            fetchComments();
        }
    }, [post?.id]);

    const toggleLike = async () => {
        try {
            if (liked) {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/like`, {
                    withCredentials: true
                });
                setLikes(prev => prev - 1);
            } else {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/like`, {}, {
                    withCredentials: true
                });
                setLikes(prev => prev + 1);
            }
            setLiked(prev => !prev);
        } catch (err) {
            console.error("Failed to toggle like:", err);
        }
    };

    return (
        <div className="border p-4 rounded mb-4 shadow">
            {post.text && <p>{post.text}</p>}

            {post.media_url && (
                <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${post.media_url}`}
                    className="my-2 max-h-96 w-full object-contain"
                />
            )}

            <div className="flex gap-4 mt-2">
                <button onClick={toggleLike}>
                    {liked ? "💖" : "🤍"} {likes}
                </button>
                <button onClick={fetchComments}>
                    💬 {post.comment_count}
                </button>
                {/* <span>💬 {post.comment_count}</span> */}
            
            </div>

            <CommentList
                comments={comments}
                currentUser={currentUser}
                fetchComments={fetchComments}
            />

            <CommentForm
                postId={post.id}
                fetchComments={fetchComments}
                currentUser={currentUser}
            />
        </div>
    );
}