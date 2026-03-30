// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CommentList from "./CommentList";
// import CommentForm from "./CommentForm";
// import EditPost from "./EditPost";
// import { Link } from "react-router-dom";

// export function Post({ post, currentUser, onUpdate }) {

//   if (!post) return null;

//   const owner = currentUser?.id === post.user_id;

//   const [liked, setLiked] = useState(post?.liked_by_user || false);
//   const [likes, setLikes] = useState(parseInt(post?.like_count) || 0);
//   const [comments, setComments] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);

//   const [username, setUsername] = useState("Loading...");

//   const fetchUserName = async (userId) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/auth/user/${userId}`,
//         { withCredentials: true }
//       );
//       return res.data.user.username;
//     } catch (err) {
//       console.error("Failed to fetch username:", err);
//       return "Unknown";
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;

//     if (post?.user_id) {
//       fetchUserName(post.user_id).then((name) => {
//         if (isMounted && name) {
//           setUsername(name);
//         }
//       });
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [post?.user_id]);

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/comments`,
//         { withCredentials: true }
//       );


//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.comments || [];

//       setComments(data);


//     } catch (err) {
//       console.error("Failed to fetch comments:", err);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [post.id]);

//   const handleDelete = async () => {
//     if (!window.confirm("Delete this post?")) return;

//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/api/${post.id}`,
//         { withCredentials: true }
//       );
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   const toggleLike = async () => {
//     try {
//       if (liked) {
//         await axios.delete(
//           `${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/like`,
//           { withCredentials: true }
//         );
//         setLikes((prev) => prev - 1);
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/like`,
//           {},
//           { withCredentials: true }
//         );
//         setLikes((prev) => prev + 1);
//       }
//       setLiked((prev) => !prev);
//     } catch (err) {
//       console.error("Like failed:", err);
//     }
//   };

//   return (
//     <div className="border p-4 rounded mb-4 shadow">

//       <div className="text-sm text-gray-700 mb-2">
//         <Link to={owner ? "/profile" : `/users/${post.user_id}`}>
//           {username}
//         </Link>
//         <br />
//         {new Date(post.created_at).toLocaleString()}
//       </div>

//       {owner && (
//         <div className="relative flex justify-end">
//           <button onClick={() => setShowMenu((prev) => !prev)}>
//             ⋮
//           </button>


//           {showMenu && (
//             <div className="absolute right-0 mt-4 w-32 bg-white border rounded shadow">
//               <button
//                 onClick={() => {
//                   setIsEditing(true);
//                   setShowMenu(false);
//                 }}
//                 className="block w-full text-left px-3 py-2 hover:bg-gray-100"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={handleDelete}
//                 className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//         </div>
//       )}


//       {isEditing ? (
//         <EditPost
//           post={post}
//           onUpdate={(updatedPost) => {
//             onUpdate(updatedPost);
//             setIsEditing(false);
//           }}
//           onCancel={() => setIsEditing(false)}
//         />
//       ) : (
//         <>
//           {post.text && <p>{post.text}</p>}

//           {post.media_url && (
//             <img
//               src={`${import.meta.env.VITE_API_BASE_URL}${post.media_url}`}
//               className="my-2 max-h-96 w-full object-contain"
//             />
//           )}
//         </>
//       )}

//       <div className="flex gap-4 mt-2">
//         <button onClick={toggleLike}>
//           {liked ? "❤️" : "🤍"} {likes}
//         </button>

//         <button onClick={fetchComments}>
//           💬 {post.comment_count}
//         </button>
//       </div>

//       <CommentList
//         comments={comments}
//         currentUser={currentUser}
//         fetchComments={fetchComments}
//         postOwnerId={post.user_id}
//       />

//       <CommentForm
//         postId={post.id}
//         fetchComments={fetchComments}
//         currentUser={currentUser}
//       />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import EditPost from "./EditPost";
import { Link } from "react-router-dom";

export function Post({ post, currentUser, onUpdate }) {

  if (!post) return null;

  const owner = currentUser?.id === post.user_id;

  const [liked, setLiked] = useState(post?.liked_by_user || false);
  const [likes, setLikes] = useState(parseInt(post?.like_count) || 0);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [username, setUsername] = useState("Loading...");

  const [showComments, setShowComments] = useState(false);

  const fetchUserName = async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/user/${userId}`,
        { withCredentials: true }
      );
      return res.data.user.username;
    } catch (err) {
      console.error("Failed to fetch username:", err);
      return "Unknown";
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (post?.user_id) {
      fetchUserName(post.user_id).then((name) => {
        if (isMounted && name) {
          setUsername(name);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [post?.user_id]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/comments`,
        { withCredentials: true }
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.comments || [];

      setComments(data);

    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };


  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/${post.id}`,
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const toggleLike = async () => {
    try {
      if (liked) {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/like`,
          { withCredentials: true }
        );
        setLikes((prev) => prev - 1);
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/${post.id}/like`,
          {},
          { withCredentials: true }
        );
        setLikes((prev) => prev + 1);
      }
      setLiked((prev) => !prev);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const handleToggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments((prev) => !prev);
  };

  return (
    <div className="border p-4 rounded mb-4 shadow">

      <div className="text-base text-gray-700 mb-2 flex flex-col items-start">
        <Link to={owner ? "/profile" : `/users/${post.user_id}`}>
          {username}
        </Link>

        <span className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleString()}
        </span>
      </div>

      {owner && (
        <div className="relative flex justify-end">
          <button onClick={() => setShowMenu((prev) => !prev)}>
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-4 w-32 bg-white border rounded shadow">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {isEditing ? (
        <EditPost
          post={post}
          onUpdate={(updatedPost) => {
            onUpdate(updatedPost);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          {post.text && <p>{post.text}</p>}

          {post.media_url && (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${post.media_url}`}
              className="my-2 max-h-96 w-full object-contain"
            />
          )}
        </>
      )}

      <div className="flex gap-4 mt-2">
        <button onClick={toggleLike}>
          {liked ? "❤️" : "🤍"} {likes}
        </button>

        <button onClick={handleToggleComments}>
          💬 {post.comment_count}
        </button>
      </div>

      {showComments && (
        <div className="mt-3 border-t pt-2">
          <CommentList
            comments={comments}
            currentUser={currentUser}
            fetchComments={fetchComments}
            postOwnerId={post.user_id}
          />

          <CommentForm
            postId={post.id}
            fetchComments={fetchComments}
            currentUser={currentUser}
          />
        </div>
      )}

    </div>
  );
}