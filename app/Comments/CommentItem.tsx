import { createComment, deleteComment } from "@/services/commentService"; // your delete API
import { Comment, CommentWithChildren } from "@/types/Comments";
import { formatTimeAgo } from "@/utils/formatTime";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  comment: CommentWithChildren;
  level: number;
  onReplyPress: (
    parentId: string,
    level: number,
    comment: Comment,
    navigate?: boolean
  ) => void;
  currentUserId?: string;
  postId: string | string[];
  onCommentDeleted?: (commentId: string) => void;
  onReplyAdded?: () => void;
}

const CommentItem: React.FC<Props> = ({
  comment,
  level,
  onReplyPress,
  currentUserId,
  onCommentDeleted,
  postId,
  onReplyAdded,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isDeleted, setIsDeleted] = useState(comment.is_deleted);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  // Memoize avatar URI for performance
  const avatarUri = React.useMemo(() => {
    return (
      comment.user_details.avatar || "https://picsum.photos/seed/picsum/200/300"
    );
  }, [comment.user_details.avatar]);

  // Memoize formatted time
  const formattedTime = React.useMemo(() => {
    return formatTimeAgo(new Date(comment.created_at).getTime());
  }, [comment.created_at]);

  // Prevent empty reply and double submit
  const handleReply = async () => {
    if (!replyText.trim() || loading) {
      Alert.alert("Comment cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const normalizedPostId = Array.isArray(postId) ? postId[0] : postId;
      const normalizedCommentId = Array.isArray(comment.id)
        ? comment.id[0]
        : comment.id;
      const response = await createComment(
        normalizedPostId,
        replyText.trim(),
        normalizedCommentId
      );
      if (response?.id) {
        Alert.alert("Comment added!");
        setReplyText("");
        setShowReplies(true); // Ensure thread stays open
        // Do not close the reply input after reply
        onReplyAdded?.();
        // setIsReplying(false); // REMOVE this line to keep reply box open
      } else {
        Alert.alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error while replying:", error);
      Alert.alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Confirm before deleting
  const handleDelete = () => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const res = await deleteComment(comment.id);
            if (res === 204 || res === 200) {
              setIsDeleted(true);
              onCommentDeleted?.(comment.id);
            } else {
              Alert.alert("Failed to delete comment.");
            }
          },
        },
      ]
    );
  };

  // Handle showing replies or navigating to nested replies
  const handleViewReplies = () => {
    if (comment.depth_level === 4 || comment.depth_level === 8) {
      onReplyPress(comment.id, comment.depth_level, comment, true);
    } else {
      setShowReplies((prev) => !prev);
    }
  };

  // Render children recursively only if not deleted
  const renderChildren = () =>
    showReplies &&
    comment.children.map((child) => (
      <CommentItem
        key={child.id}
        comment={child}
        level={level + 1}
        onReplyPress={onReplyPress}
        currentUserId={currentUserId}
        onCommentDeleted={onCommentDeleted}
        postId={postId}
        onReplyAdded={onReplyAdded}
      />
    ));

  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: "row" }}>
        {/* Vertical thread line */}
        {level > 0 && (
          <View
            style={[styles.verticalLine, { marginLeft: (level - 1) * 12 + 10 }]}
          />
        )}
        <View style={[styles.commentBlock, { marginLeft: level * 12 }]}>
          <View style={styles.commentContainer}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.displayName}>
                  {comment.user_details.display_name}
                </Text>
                <Text style={styles.username}>
                  @{comment.user_details.user_handle}
                </Text>
                <Text style={styles.timestamp}>{formattedTime}</Text>
              </View>
              <Text style={styles.body}>
                {isDeleted
                  ? "(This comment was deleted)"
                  : comment.content.replace(/<[^>]+>/g, "")}
              </Text>
              {!isDeleted && (
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity
                    onPress={() => setIsReplying((prev) => !prev)}
                  >
                    <Text style={styles.reply}>Reply</Text>
                  </TouchableOpacity>
                  {comment.user_details.user_handle === "codersupreme" && (
                    <TouchableOpacity onPress={handleDelete}>
                      <Text style={styles.delete}>Delete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {comment.child_count > 0 && (
                <TouchableOpacity onPress={handleViewReplies}>
                  <Text style={styles.viewReplies}>
                    {showReplies ? "-" : "+"}{" "}
                    {comment.depth_level === 4 || comment.depth_level === 8
                      ? "View more comments"
                      : `View ${comment.child_count} repl${
                          comment.child_count > 1 ? "ies" : "y"
                        }`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
      {/* Render Children */}
      {renderChildren()}
      {/* Reply input */}
      {isReplying && !isDeleted && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
            paddingHorizontal: 12,
            marginTop: 8,
          }}
        >
          <TextInput
            value={replyText}
            onChangeText={setReplyText}
            placeholder="Write a reply..."
            multiline
            style={{
              flex: 1,
              minHeight: 40,
              maxHeight: 120,
              paddingVertical: 8,
              paddingRight: 32,
            }}
            editable={!loading}
            returnKeyType="send"
            onSubmitEditing={handleReply}
            blurOnSubmit={true}
          />
          <TouchableOpacity
            onPress={handleReply}
            style={{ paddingLeft: 8 }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#6200BB" />
            ) : (
              <Ionicons name="send" size={20} color="#6200BB" />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
  verticalLine: {
    width: 2,
    backgroundColor: "#ccc",
    marginTop: 4,
    marginBottom: 4,
  },
  commentBlock: {
    flex: 1,
  },
  commentContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginRight: 6,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginBottom: 4,
    flexWrap: "wrap",
    alignItems: "center",
  },
  displayName: {
    fontWeight: "bold",
    marginRight: 6,
    fontSize: 14,
  },
  timestamp: {
    marginLeft: 20,
    fontSize: 10,
    fontWeight: 200,
  },
  username: {
    color: "#555",
    fontSize: 13,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  reply: {
    color: "#6200BB",
    marginTop: 2,
    fontSize: 13,
  },
  delete: {
    color: "#ff3b30",
    marginTop: 2,
    fontSize: 13,
  },
  viewReplies: {
    color: "#6200BB",
    marginTop: 6,
    fontSize: 13,
  },
});

export default CommentItem;
