import React, { useEffect, useState } from 'react';
import {
    View, Text, Pressable, TextInput, Image,
    TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        setLoading(true); // Set loading to true for re-rendering purposes
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser)); // Parse and set user data
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            Alert.alert("Error", "Failed to load user data.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUserData(); // Re-fetch user data every time the screen comes into focus
        }, [])
    );

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear(); // Clears all data in Async Storage
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to logout. Please try again.');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#FF6347" style={{ flex: 1 }} />;
    }

    if (!user) {
        return (
            <View style={styles.containerLogin}>
                <Text style={styles.loginText}>Please log in to access your profile</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Profile UI */}
            <View style={styles.search}>
                <Pressable style={styles.pressSearch}>
                    <MaterialIcons name="search" size={24} color="#FFF" />
                    <TextInput
                        placeholder="Search product"
                        placeholderTextColor="#FFE4B5"
                        style={{ color: '#FFF' }}
                    />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'wheat' }}>
                        ShopLink
                    </Text>
                </Pressable>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: user.avatar || 'https://via.placeholder.com/100' }}
                    style={styles.image}
                />
            </View>

            <Text style={styles.username}>Name: {user.username}</Text>
            <Text style={styles.userInfo}>Email: {user.email}</Text>
            <Text style={styles.userInfo}>Address: {user.address}</Text>
            <Text style={styles.userInfo}>Phone: {user.mobile}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>

                {user.role === 1 && (
                    <>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ManageProduct')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Manage product</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Admin')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Manage Account</Text>
                        </TouchableOpacity>
                    </>
                )}

                <TouchableOpacity
                    onPress={() => navigation.navigate('OrderHistory')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Order History</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ChangePassword')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};



export default Profile;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFEFD5',
    },
    containerLogin: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFEFD5',
        justifyContent: 'center',
    },
    search: {
        paddingTop: 25,
        backgroundColor: '#FFA500',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        color: '#FF6347',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    pressSearch: {
        flexDirection: 'row',
        backgroundColor: '#FF8C00',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 7,
        gap: 10,
        height: 38,
        flex: 1,
        paddingHorizontal: 10,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 15,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#FF4500',
        backgroundColor: '#FFDAB9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FF4500',
    },
    userInfo: {
        fontSize: 16,
        color: '#FF6347',
        marginBottom: 3,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        padding: 12,
        marginVertical: 5,
        backgroundColor: '#FF7F50',
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});