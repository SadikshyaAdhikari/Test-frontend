export const isOwner = (currentUser, post) => {
  return currentUser?.id === post.user_id;
};