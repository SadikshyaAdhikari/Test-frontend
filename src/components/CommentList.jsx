import Comment from "./Comment";

export default function CommentList({ comments, currentUser, fetchComments, postOwnerId }) {
    
    // ✅ Ensure comments is always an array
    const safeComments = Array.isArray(comments) ? comments : [];

    return (
        <div className="mt-2 pl-4">
            {safeComments.length === 0 ? (
                <p className="text-gray-400 text-sm">No comments yet</p>
            ) : (
                safeComments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        currentUser={currentUser}
                        fetchComments={fetchComments}
                        postOwnerId={postOwnerId}
                    />
                ))
            )}
        </div>
    );
}