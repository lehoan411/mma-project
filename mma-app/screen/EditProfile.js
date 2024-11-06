import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfile } from '../services/api';

const EditProfile = () => {
    const navigation = useNavigation();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUsername(user.username);
                setEmail(user.email);
                setPhone(user.mobile);
                setAddress(user.address);
                setUserId(user.userId);
            }
        };

        loadUserData();
    }, []);

    const handleSave = async () => {
        try {
            const updatedUser = { username, email, mobile: phone, address };
            const response = await updateProfile(userId, updatedUser);
            await AsyncStorage.setItem("user", JSON.stringify(response.user));

            Alert.alert("Success", "Profile updated successfully");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to update profile");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Edit Profile</Text>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFD5',
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF4500', // Dark orange
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FF6347', // Light orange
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        padding: 15,
        borderColor: '#FF6347', // Light orange border
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 15,
        color: '#FF4500', // Dark orange text
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    saveButton: {
        flex: 1,
        marginRight: 10,
        padding: 15,
        backgroundColor: '#FF7F50', // Coral background color
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        flex: 1,
        marginLeft: 10,
        padding: 15,
        backgroundColor: '#FF6347', // Light orange background color
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF', // White text color
    },
});

export default EditProfile;
