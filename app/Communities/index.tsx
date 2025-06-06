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
import { Ionicons } from "@expo/vector-icons";

const PER_PAGE = 10;

const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadCommunities = useCallback(
    async (pageToLoad = 1, isRefreshing = false) => {
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
      } catch {
        setCommunities([]);
      } finally {
        setLoading(false);
        if (isRefreshing) setRefreshing(false);
      }
    },
    [loading]
  );

  useFocusEffect(
    useCallback(() => {
      loadCommunities(1, true);
    }, [loadCommunities])
  );

  const handleRemoveFromList = useCallback(
    (id: string) => {
      setCommunities((prev) => prev.filter((p) => p.id !== id));
    },
    []
  );

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadCommunities(page + 1);
    }
  }, [hasMore, loading, loadCommunities, page]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadCommunities(1, true);
  }, [loadCommunities]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
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
          <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => router.push("/CreatePost")}
            accessibilityLabel="Create a new post"
          >
            <Text style={styles.createPostText}>+ Create Post</Text>
          </TouchableOpacity>
        </View>
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
        ListEmptyComponent={
          !loading && (
            <Text
              style={{
                textAlign: "center",
                marginTop: 24,
                color: "#888",
              }}
            >
              No communities found.
            </Text>
          )
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
