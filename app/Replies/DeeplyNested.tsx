import OriginalPost from "@/components/OriginalPost";
import { Comment, CommentWithChildren } from "@/types/Comments";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, ActivityIndicator, View } from "react-native";
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

const DeeplyNested = () => {
  const { postId, level, parentId, original, initialComment } = useLocalSearchParams();
  const originalPost = JSON.parse(original as string) as Original;
  const retrievedComment = JSON.parse(initialComment as string) as Comment;
  const levelNumber = parseInt(level as string, 10);
  const [comments, setComments] = useState<CommentWithChildren[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchComments(parentId as string, levelNumber + 1)
      .then((fetched: Comment[]) => {
        if (isMounted) {
          const tree = buildCommentTree(fetched);
          setComments(tree);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [parentId, levelNumber, refreshFlag]);

  const handleCommentAdded = useCallback(() => {
    setRefreshFlag((prev) => prev + 1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <OriginalPost originalPost={originalPost} retrievedComment={retrievedComment} />
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#6200BB" />
        </View>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommentItem
              comment={item}
              level={1}
              onReplyPress={() => {}}
              postId={postId}
              onReplyAdded={handleCommentAdded}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<View style={{ alignItems: "center", marginTop: 24 }}><ActivityIndicator size="small" color="#6200BB" /></View>}
        />
      )}
    </SafeAreaView>
  );
};

export default DeeplyNested;

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
