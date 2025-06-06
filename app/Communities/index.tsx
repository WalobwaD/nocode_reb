import CommunityPostCard from "@/components/PostCard";
import { fetchCommunities } from "@/services/communityService";
import { Community } from "@/types/Community";
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

const PER_PAGE = 10;

const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadCommunities = async (pageToLoad = 1, isRefreshing = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const newItems = await fetchCommunities(pageToLoad, PER_PAGE);
      if (isRefreshing) {
        setCommunities(newItems);
      } else {
        setCommunities((prev) => [...prev, ...newItems]);
      }

      setHasMore(newItems.length === PER_PAGE);
      setPage(pageToLoad);
    } catch (error) {
      console.error("Error loading communities:", error);
    } finally {
      setLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCommunities(1, true); // Refresh when the screen is focused
    }, [])
  );

  const handleRemoveFromList = (id: string) => {
    setCommunities((prev) => prev.filter((p) => p.id !== id));
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadCommunities(page + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadCommunities(1, true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => router.push("/CreatePost")}
        >
          <Text style={styles.createPostText}>+ Create Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={communities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommunityPostCard item={item} onDelete={handleRemoveFromList} />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#6200BB" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Communities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9FB",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  createPostButton: {
    backgroundColor: "#6200BB",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: "#6200BB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  createPostText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    padding: 12,
    paddingBottom: 40,
  },
  loadingContainer: {
    padding: 16,
    alignItems: "center",
  },
});
