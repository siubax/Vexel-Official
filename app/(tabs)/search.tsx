import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push({ pathname: '/searchResults', params: { query } });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search for wallpapers..."
                        style={styles.input}
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={handleSearch} // Allows searching by pressing "Enter" on keyboard
                    />
                </View>
                <Pressable onPress={handleSearch} style={styles.searchButton}>
                    <Text style={styles.buttonText}>Search</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    searchContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default SearchScreen;