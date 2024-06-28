import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { IP_ADDRESS } from '../../global';

const SearchBar = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.length > 0) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://${IP_ADDRESS}:3005/search?term=${searchTerm}`);
            setSearchResults(response.data.filter(result =>
                result.title.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResultPress = (item) => {
        if (item.category === 'news') {
            navigation.navigate('NewsContent', { newsItem: item });
        } else if (item.category === 'analytics') {
            navigation.navigate('AnalyticsContent', { analyticsItem: item });
        } else if (item.category === 'coupons') {
            navigation.navigate('CouponsContent', { couponsItem: item });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="#002E99" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Here...."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            {loading ? (
                <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
            ) : (
                <ScrollView>
                    {searchResults.map((result) => (
                        <TouchableOpacity key={result._id} style={styles.resultContainer} onPress={() => handleResultPress(result)}>
                            <Image
                                source={{ uri: `http://${IP_ADDRESS}:3005/${result.imageSource}` }}
                                style={styles.resultImage}
                                resizeMode="cover"
                            />
                            <View style={styles.resultTextContainer}>
                                <Text style={styles.resultTitle} numberOfLines={1} ellipsizeMode="tail">
                                    {result.title}
                                </Text>
                                <Text style={styles.resultDescription} numberOfLines={2} ellipsizeMode="tail">
                                    {result.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    {searchResults.length === 0 && (
                        <Text style={styles.noResultsText}>Search Results Will Appear Here {searchTerm}</Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
        marginBottom: 10,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: 'blue',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'rgba(31, 61, 77, 0.1)',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: 'rgba(242, 243, 250, 1)',
        flex: 1,
        marginLeft: 10,
    },
    loadingIndicator: {
        marginTop: 20,
    },
    resultContainer: {
        flexDirection: 'row',
        width: '98%',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    resultImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    resultTextContainer: {
        flex: 1,
        padding: 10,
    },
    resultTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#1F3D4D',
        marginBottom: 5,
    },
    resultDescription: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: 'grey',
    },
    noResultsText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: 'grey',
    },
});

export default SearchBar;
