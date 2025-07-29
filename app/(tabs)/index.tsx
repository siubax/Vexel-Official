import { Link } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { fetchCuratedPhotos } from '../../api/pexels';

const HomeScreen = () => {
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getPhotos = useCallback(async (pageNum = 1, shouldRefresh = false) => {
    if (loading || (!hasMore && !shouldRefresh)) return;

    setLoading(true);
    const data = await fetchCuratedPhotos({ page: pageNum, per_page: 30 });
    setLoading(false);

    if (data && data.photos && data.photos.length > 0) {
      if (shouldRefresh) {
        setImages(data.photos);
      } else {
        setImages(prevImages => [...prevImages, ...data.photos]);
      }
      setPage(pageNum + 1);
    } else {
      setHasMore(false);
    }
  }, [loading, hasMore]);


  useEffect(() => {
    getPhotos(); // Fetch initial photos
  }, []);

  const handleLoadMore = () => {
    getPhotos(page);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#0000ff" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/details", params: { imageURL: item.src.large2x } }} asChild>
            <Pressable style={styles.imageWrapper}>
              <Image
                source={{ uri: item.src.portrait }}
                style={styles.image}
              />
            </Pressable>
          </Link>
        )}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  imageWrapper: {
    flex: 1,
    margin: 4,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default HomeScreen;