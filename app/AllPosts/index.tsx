import AllPosterCard from "@/components/PostCard";
import { fetchPosts } from "@/services/postService";
import { Post } from "@/types/Post";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PER_PAGE = 10;

const AllPosts = () => {
  const [communities, setCommunities] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = useCallback(
    async (pageToLoad = 1, isRefreshing = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const newPosts = await fetchPosts(pageToLoad, PER_PAGE);
        if (isRefreshing) {
          setCommunities(newPosts);
        } else {
          setCommunities((prev) => [...prev, ...newPosts]);
        }
        setHasMore(newPosts.length === PER_PAGE);
        setPage(pageToLoad);
      } catch (e) {
        console.error("Failed to load posts:", e);
      } finally {
        setLoading(false);
        if (isRefreshing) setRefreshing(false);
      }
    },
    [loading]
  );

  useFocusEffect(
    useCallback(() => {
      loadPosts(1, true);
    }, [])
  );

  const handleRemoveFromList = useCallback((id: string) => {
    setCommunities((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      // Use functional update to always get the latest page value
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        loadPosts(nextPage);
        return nextPage;
      });
    }
  }, [hasMore, loading, loadPosts]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts(1, true);
    setPage(1);
  }, [loadPosts]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16}}>
        <TouchableOpacity
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => router.back()}
          accessibilityLabel="Back"
        >
          <Ionicons name="arrow-back" size={24} color="#6200BB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/CreatePost")}>
          <Text style={styles.createPost}>+ Create Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={communities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AllPosterCard item={item} onDelete={handleRemoveFromList} />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={
          loading ? (
            <View style={{ padding: 16 }}>
              <ActivityIndicator size="small" color="#6200BB" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default AllPosts;

const styles = StyleSheet.create({
  createPost: {
    fontSize: 16,
    fontWeight: "600",
    padding: 15,
    color: "#6200BB",
  },
});
