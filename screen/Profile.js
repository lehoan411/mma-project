import React from 'react';
import { View, Text, Pressable, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
const Profile = () => {
    const navigation = useNavigation();
    const user = {
        username: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 Main St, Cityville',
        phone: '0123-456-789',
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.search}>
                <Pressable style={styles.pressSearch}>
                    <MaterialIcons name="search" size={24} color="#FFF" />
                    <TextInput
                        placeholder="Search product"
                        placeholderTextColor="#FFE4B5"
                        style={{ color: '#FFF' }}
                    />
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Home")}><Text style={{fontSize:20, fontWeight:'500', color:"wheat"}}>ShopLink</Text></Pressable>
            </View>

            {/* Avatar */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.image}
                />
            </View>

            {/* User Information */}
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.userInfo}>{user.email}</Text>
            <Text style={styles.userInfo}>{user.address}</Text>
            <Text style={styles.userInfo}>{user.phone}</Text>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={styles.button}>
                    <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("ManageProduct")} style={styles.button}>
                    <Text style={styles.buttonText}>Manage product</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("OrderHistory")} style={styles.button}>
                    <Text style={styles.buttonText}>Order History</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={styles.button}>
                    <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Admin")} style={styles.button}>
                    <Text style={styles.buttonText}>ManageAccount</Text>
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
    search: {
        paddingTop: 25,
        backgroundColor: '#FFA500', // Màu cam
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressSearch: {
        flexDirection: 'row',
        backgroundColor: '#FF8C00', // Cam đậm
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
        color: '#FF4500', // Màu cam đỏ
    },
    userInfo: {
        fontSize: 16,
        color: '#FF6347', // Màu cam nhạt
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
        backgroundColor: '#FF7F50', // Màu nền nút cam
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3, // Đổ bóng
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF', // Màu chữ trắng
    },
});
