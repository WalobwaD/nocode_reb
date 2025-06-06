import { Comment, CommentWithChildren } from "@/types/Comments";

export function buildCommentTree(comments: Comment[]): CommentWithChildren[] {
  const map = new Map<string, CommentWithChildren>();
  const roots: CommentWithChildren[] = [];

  // Step 1: Create a map of comment ID to CommentWithChildren
  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, children: [] });
  });

  // Step 2: Build the tree by linking replies to parents
  map.forEach((comment) => {
    if (comment.reply_to && map.has(comment.reply_to)) {
      const parent = map.get(comment.reply_to)!;
      parent.children.push(comment);
    } else {
      // Top-level comment
      roots.push(comment);
    }
  });

  return roots;
}
