import { Comment } from "@/types/Comments";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
type Original = {
  postId: string;
  title: string;
  user: string;
  content: string;
  avatar: string;
};
const OriginalPost = ({
  originalPost,
  retrievedComment,
}: {
  originalPost: Original;
  retrievedComment: Comment;
}) => {
  return (
    <View>
      <View style={styles.postCard}>
        <View style={styles.voteSection}>
          <TouchableOpacity>
            <FontAwesome name="arrow-up" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="arrow-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.postContent}>
          <View style={styles.headerRow}>
            <Image
              source={{
                uri:
                  originalPost.avatar &&
                  Array.isArray(originalPost.avatar) &&
                  originalPost.avatar[0]
                    ? originalPost.avatar[0]
                    : typeof originalPost.avatar === "string" &&
                      originalPost.avatar
                    ? originalPost.avatar
                    : "https://picsum.photos/seed/picsum/200/300",
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.username}>u/{originalPost.user}</Text>
            </View>
          </View>

          <Text style={styles.title}>{originalPost.title}</Text>
          <Text style={styles.bodyText}>
            {(originalPost.content as string)?.replace(/<[^>]+>/g, "")}
          </Text>
        </View>
      </View>
      <View style={styles.commentCard2}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={16} color="#6200BB" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: retrievedComment.user_details.avatar }}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.displayName}>
              {retrievedComment.user_details.display_name}
            </Text>
            <Text style={styles.username}>
              @{retrievedComment.user_details.user_handle}
            </Text>
            <Text style={styles.content}>
              {retrievedComment.content.replace(/<[^>]+>/g, "")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OriginalPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  commentCard2: {
    flexDirection: "column",
    backgroundColor: "#fffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    width: "100%",
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: "#222",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backText: {
    fontSize: 12,
    color: "#6200BB",
    marginLeft: 4,
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
