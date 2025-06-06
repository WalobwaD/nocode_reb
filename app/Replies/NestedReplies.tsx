import OriginalPost from "@/components/OriginalPost";
import { Comment, CommentWithChildren } from "@/types/Comments";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { fetchComments } from "../../services/commentService";
import { buildCommentTree } from "../../utils/commentTree";
import CommentItem from "../Comments/CommentItem";

type Original = {
  postId: string;
  title: string;
  user: string;
  content: string;
  avatar: string;
};
const NestedReplies = () => {
  const {
    postId,
    level,
    parentId,
    comment: initialComment,
    original,
  } = useLocalSearchParams();
  const retrievedComment = JSON.parse(initialComment as string) as Comment;
  const originalPost = JSON.parse(original as string) as Original;
  const levelNumber = parseInt(level as string, 10);
  const [comments, setComments] = useState<CommentWithChildren[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    fetchComments(parentId as string, levelNumber + 1).then(
      (fetched: Comment[]) => {
        const tree = buildCommentTree(fetched);
        setComments(tree);
      }
    );
  }, [postId, refreshFlag]);

  const onReplyPress = (
    parentId: string,
    level: number,
    comment: Comment,
    navigateToReplies = false
  ) => {
    if (level >= 8 && navigateToReplies) {
      router.push({
        pathname: "/Replies/DeeplyNested",
        params: {
          postId,
          level: level.toString(),
          parentId,
          initialComment: JSON.stringify(comment),
          original: original,
        },
      });
    } else {
      // Show inline reply UI
      console.log("Replying to:", parentId);
    }
  };

  const handleCommentAdded = () => {
    setRefreshFlag((prev) => prev + 1); // force reload
  };

  return (
    <SafeAreaView style={styles.container}>
      <OriginalPost
        originalPost={originalPost}
        retrievedComment={retrievedComment}
      />

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            level={1}
            onReplyPress={onReplyPress}
            postId={postId}
            onReplyAdded={handleCommentAdded}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default NestedReplies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  commentCard1: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  commentCard2: {
    flexDirection: "row",
    backgroundColor: "#fffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  username: {
    fontSize: 13,
    color: "#777",
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: "#222",
  },
});
