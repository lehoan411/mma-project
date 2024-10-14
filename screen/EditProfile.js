import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const navigation = useNavigation();
    
    // State for storing user profile data
    const [username, setUsername] = useState('JohnDoe');
    const [email, setEmail] = useState('johndoe@gmail.com');
    const [phone, setPhone] = useState('123-456-7890');
    const [address, setAddress] = useState('123 Main St, City, Country');
    
    // Function to handle profile save (you can implement API call here)
    const handleSave = () => {
        // Add API call to save profile changes
        console.log('Profile Saved:', { username, email, phone, address });
        navigation.goBack(); // Go back to previous screen after saving
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Edit Profile</Text>

                {/* Username */}
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#FF8C00"
                    value={username}
                    onChangeText={setUsername}
                />

                {/* Email */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#FF8C00"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />

                {/* Phone */}
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#FF8C00"
                    value={phone}
                    keyboardType="phone-pad"
                    onChangeText={setPhone}
                />

                {/* Address */}
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor="#FF8C00"
                    value={address}
                    onChangeText={setAddress}
                />

                {/* Save and Cancel buttons */}
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
