import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react'; // Corrected import
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';

const FavoritesScreen = () => {
  // Corrected the typo from auseState to useState
  const [favorites, setFavorites] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, [])
  );

  const getFavorites = async () => {
    const favoritesString = await AsyncStorage.getItem('favorites');
    const favs = favoritesString ? JSON.parse(favoritesString) : [];
    setFavorites(favs);
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your favorites list is empty.</Text>
        <Text style={styles.emptySubText}>Press the heart icon on any photo to add it here.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={3}
        keyExtractor={(item, index) => item.url + index}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/details", params: { imageURL: item.url } }} asChild>
            <Pressable style={styles.imageWrapper}>
              <Image
                source={{ uri: item.url }}
                style={styles.image}
              />
            </Pressable>
          </Link>
        )}
        contentContainerStyle={styles.listContainer}
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
  emptySubText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 8,
  }
});

export default FavoritesScreen;