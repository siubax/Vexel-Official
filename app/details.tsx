import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';

const DetailsScreen = () => {
    const { imageURL } = useLocalSearchParams();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);

    // This effect runs once to check the favorite status
    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    // This effect updates the header buttons whenever the favorite status changes
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Ionicons name="chevron-back" size={32} color="white" />
                </Pressable>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    {/* Download Button */}
                    <Pressable onPress={handleDownload} style={styles.headerButton}>
                        <Ionicons name="download-outline" size={30} color="white" />
                    </Pressable>
                    {/* Favorite Button */}
                    <Pressable onPress={handleFavorite} style={[styles.headerButton, { marginLeft: 15 }]}>
                        <Ionicons 
                            name={isFavorite ? "heart" : "heart-outline"} 
                            size={30} 
                            color={isFavorite ? "red" : "white"} 
                        />
                    </Pressable>
                </View>
            ),
        });
    }, [navigation, isFavorite]);

    const checkFavoriteStatus = async () => {
        const favoritesString = await AsyncStorage.getItem('favorites');
        const favorites = favoritesString ? JSON.parse(favoritesString) : [];
        const isFav = favorites.some(fav => fav.url === imageURL);
        setIsFavorite(isFav);
    };

    const handleFavorite = async () => {
        const favoritesString = await AsyncStorage.getItem('favorites');
        let favorites = favoritesString ? JSON.parse(favoritesString) : [];

        if (isFavorite) {
            favorites = favorites.filter(fav => fav.url !== imageURL);
        } else {
            favorites.push({ url: imageURL });
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite); // Toggle the state
    };

    const handleDownload = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission required", "We need permission to save photos to your device.");
            return;
        }

        try {
            const fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;
            const { uri } = await FileSystem.downloadAsync(imageURL as string, fileUri);
            await MediaLibrary.createAssetAsync(uri);
            Alert.alert("Success!", "Image has been saved to your gallery.");
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to download image.");
        }
    };

    if (!imageURL) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageURL as string }}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    headerButton: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
    },
});

export default DetailsScreen;