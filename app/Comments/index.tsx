import { Comment, CommentWithChildren } from "@/types/Comments";
import { formatTimeAgo } from "@/utils/formatTime";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchComments } from "../../services/commentService";
import { buildCommentTree } from "../../utils/commentTree";
import CommentForm from "../CommentForm";
import CommentItem from "./CommentItem";

const extractImageUrlFromHtml = (html: string): string | null => {
  const match = html?.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const CommentsScreen = () => {
  const { postId, title, user, content, avatar, created_at } = useLocalSearchParams();
  const created_at_num = Number(created_at);
  const [comments, setComments] = useState<CommentWithChildren[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [loading, setLoading] = useState(true);

  const imageUrl = extractImageUrlFromHtml(content as string);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchComments(postId as string, 1)
      .then((fetched: any) => {
        if (isMounted) {
          const tree = buildCommentTree(fetched);
          setComments(tree);
        }
      })
      .catch(() => {
        if (isMounted) setComments([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [postId, refreshFlag]);

  const handleCommentAdded = () => setRefreshFlag((prev) => prev + 1);

  const onReplyPress = useCallback(
    (
      parentId: string,
      level: number,
      comment: Comment,
      navigateToReplies = false
    ) => {
      if (level >= 4 && navigateToReplies) {
        router.push({
          pathname: "/Replies/NestedReplies",
          params: {
            postId,
            level,
            parentId,
            comment: JSON.stringify(comment),
            original: JSON.stringify({ postId, title, user, content, avatar }),
          },
        });
      }
    },
    [postId, title, user, content, avatar]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postCard}>
        <View style={styles.voteSection}>
          <TouchableOpacity accessibilityLabel="Upvote post">
            <FontAwesome name="arrow-up" size={20} color="#6200BB" />
          </TouchableOpacity>
          <TouchableOpacity accessibilityLabel="Downvote post">
            <FontAwesome name="arrow-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.postContent}>
          <View style={styles.headerRow}>
            <Image
              source={{
                uri:
                  avatar && Array.isArray(avatar) && avatar[0]
                    ? avatar[0]
                    : typeof avatar === "string" && avatar
                    ? avatar
                    : "https://picsum.photos/seed/picsum/200/300",
              }}
              style={styles.avatar}
              accessibilityLabel="User avatar"
            />
            <View>
              <Text style={styles.username}>u/{user}</Text>
              <Text style={styles.timeAgo}>
                {formatTimeAgo(new Date(created_at_num).getTime())}
              </Text>
            </View>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.bodyText}>
            {(content as string)?.replace(/<[^>]+>/g, "")}
          </Text>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.postImage}
              resizeMode="contain"
              accessibilityLabel="Post image"
            />
          )}
        </View>
      </View>
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
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
              onReplyPress={onReplyPress}
              postId={postId}
              onReplyAdded={handleCommentAdded}
            />
          )}
          contentContainerStyle={styles.commentList}
          ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: '#888' }}>No comments yet.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  commentList: {
    paddingBottom: 100,
  },
  postCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    margin: 10,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  voteSection: {
    alignItems: "center",
    marginRight: 10,
  },
  voteCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 4,
  },
  postContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  timeAgo: {
    fontSize: 12,
    color: "#999",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 8,
  },
});
