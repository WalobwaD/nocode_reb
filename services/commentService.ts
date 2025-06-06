import { Comment } from "@/types/Comments";
import api from "../config/api";

export const createComment = async (
  postId: string,
  content: string,
  parentId?: string
) => {
  try {
    const payload = {
      post_id: postId,
      content,
      reply_to: parentId || null,
    };

    const res = await api.post("/api:HPNnGSlw:staging/comments", payload);
    return res.data;
  } catch (error: any) {
    console.error(
      "createComment error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchComments = async (
  postId: string | string[],
  level: number
): Promise<Comment[]> => {
  let url = "";
  if (level <= 4) {
    url = `/api:HPNnGSlw:staging/comments?post_id=${postId}`;
  } else if (level <= 8) {
    url = `/api:HPNnGSlw:staging/comments/${postId}/replies`;
  } else {
    url = `/api:HPNnGSlw:staging/comments/${postId}/deep-replies`;
  }
  const res = await api.get(url);
  return res.data;
};

export const deleteComment = async (commentId: string): Promise<number> => {
  try {
    const res = await api.delete(`/api:HPNnGSlw:staging/comments`, {
      data: {
        comment_id: commentId,
      },
    });
    return res.status;
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return 500;
  }
};
