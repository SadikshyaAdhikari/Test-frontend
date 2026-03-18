import Comment from "./Comment";

export default function CommentList({ comments, currentUser, fetchComments }) {
    return (
        <div className="mt-2 pl-4">
            {comments.map(comment => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                    fetchComments={fetchComments}
                />
            ))}
        </div>
    );
}