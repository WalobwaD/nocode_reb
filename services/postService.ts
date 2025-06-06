import { Post } from "@/types/Post";
import api from "../config/api";

const COMMUNITY_ID = "118af618-b3ef-403e-8bbd-92af080b973a";

export const createPost = async (
  title: string,
  content: string
): Promise<number> => {
  const res = await api.post("/api:Coq7oZJp:staging/posts", {
    community_id: COMMUNITY_ID,
    title,
    content,
  });

  return res.status;
};

export const fetchPosts = async (
  page: number = 1,
  perPage: number = 10,
  sort: string = "latest"
): Promise<Post[]> => {
  const res = await api.get(
    `/api:Coq7oZJp:staging/posts?page=${page}&per_page=${perPage}&sort=${sort}`
  );

  return res.data.items;
};
export const deletePost = async (postId: string): Promise<number> => {
  try {
    const res = await api.delete(`/api:Coq7oZJp:staging/posts/${postId}`, {
      data: {
        posts_id: postId,
      },
    });
    return res.status;
  } catch (error) {
    console.error("Failed to delete post:", error);
    return 500;
  }
};
