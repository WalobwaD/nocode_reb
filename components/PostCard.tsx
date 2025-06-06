import { deletePost } from "@/services/postService";
import { Community } from "@/types/Community";
import { Post } from "@/types/Post";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  item: Community | Post;
  onDelete: (postId: string) => void;
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CommunityPostCard = ({ item, onDelete }: Props) => {
  const handleCommentPress = () => {
    router.push({
      pathname: "/Comments",
      params: {
        postId: item.id,
        title: item.title,
        user: item.user_details.user_handle,
        content: item.content,
        avatar: item.user_details.avatar,
        created_at: item.created_at
      },
    });
  };

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const status = await deletePost(item.id);
          if (status === 200 || status === 204) {
            onDelete?.(item.id);
          } else {
            Alert.alert(
              "Failed",
              "Could not delete the post. Please try again."
            );
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.postCard}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri:
              item.community_details.logo.url === ""
                ? "https://picsum.photos/id/870/200/300?grayscale&blur=2"
                : item.community_details.logo.url,
          }}
          style={styles.commLogo}
        />
        <View>
          <Text style={styles.communityName}>
            comm/{item.community_details.name}
          </Text>
          <Text style={styles.metaText}>
            by {item.user_details.user_handle} • {formatDate(item.created_at)}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>
          {item.content.replace(/<[^>]+>/g, "")}
        </Text>
      </View>

      {/* Score */}
      <View style={styles.scoreRow}>
        <Entypo name="arrow-up" size={20} color="#6200BB" />
        <Text style={styles.scoreText}>{item.score || 0}</Text>
        <Entypo name="arrow-down" size={20} color="#a9a9a9" />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleCommentPress} style={styles.iconBtn}>
          <FontAwesome name="comment-o" size={18} color="#6200BB" />
          <Text style={styles.iconText}>
            {item.comments_count} Comment{item.comments_count === 1 ? "" : "s"}
          </Text>
        </TouchableOpacity>

        {item.user_details.user_handle === "codersupreme" && (
          <TouchableOpacity onPress={handleDelete} style={styles.iconBtn}>
            <MaterialIcons name="delete-outline" size={18} color="#ff4d4f" />
            <Text style={styles.iconText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CommunityPostCard;

const styles = StyleSheet.create({
  postCard: {
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  commLogo: {
    borderRadius: 50,
    width: 36,
    height: 36,
  },
  communityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  metaText: {
    fontSize: 13,
    color: "#888",
  },
  content: {
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  postContent: {
    fontSize: 15,
    color: "#444",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  scoreText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    marginTop: 12,
  },
  iconBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconText: {
    fontSize: 14,
    color: "#555",
  },
});
