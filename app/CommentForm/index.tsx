import { createComment } from "@/services/commentService";
import { useState, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  postId: string | string[];
  onCommentAdded?: () => void;
};

const CommentForm = ({ postId, onCommentAdded }: Props) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = useCallback(async () => {
    if (!comment.trim() || loading) {
      Alert.alert("Comment cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const normalizedPostId = Array.isArray(postId) ? postId[0] : postId;
      const response = await createComment(normalizedPostId, comment.trim());
      if (response?.id) {
        Alert.alert("Comment added!");
        setComment("");
        onCommentAdded?.();
      } else {
        Alert.alert("Failed to add comment.");
      }
    } catch (error) {
      Alert.alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [comment, loading, postId, onCommentAdded]);

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            value={comment}
            onChangeText={setComment}
            multiline
            editable={!loading}
            returnKeyType="send"
            onSubmitEditing={handleComment}
            blurOnSubmit={true}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleComment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#6200BB" />
            ) : (
              <Ionicons name="send" size={20} color="#6200BB" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CommentForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 8,
    color: "#333",
    maxHeight: 120,
  },
  sendButton: {
    padding: 6,
    borderRadius: 20,
  },
});
