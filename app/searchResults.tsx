import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { searchPhotos } from '../api/pexels';

// Get screen dimensions
const { width } = Dimensions.get('window');
const numColumns = 3;
const imageMargin = 4;
const listPadding = 8;
const imageSize = (width - (listPadding * 2) - (imageMargin * numColumns * 2)) / numColumns;


const SearchResultsScreen = () => {
  const { query } = useLocalSearchParams();
  const navigation = useNavigation();
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Results for "${query}"`,
      headerTitleStyle: {
        fontSize: 18,
      }
    });
    getSearchResults();
  }, [query]);

  const getSearchResults = async () => {
    const data = await searchPhotos({ query: query as string, per_page: 30 });
    if (data && data.photos) {
      setImages(data.photos);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {images.length > 0 ? (
        <FlatList
          data={images}
          numColumns={numColumns}
          keyExtractor={(item) => item.id.toString()}
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
        />
      ) : (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found for "{query}"</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        paddingHorizontal: listPadding,
    },
    imageWrapper: {
        margin: imageMargin,
        height: imageSize * 1.5, // Make image taller than it is wide
        width: imageSize,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SearchResultsScreen;