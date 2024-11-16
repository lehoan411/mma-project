import React, { useState } from "react";
import {
    StyleSheet, Text, View, Image, TextInput,
    TouchableOpacity, Pressable, Alert, KeyboardAvoidingView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { register } from "../services/api";  // Import hàm gọi API

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigation = useNavigation();

    const validateInputs = () => {
        if (!username || !email || !password || !confirmPassword || !phone || !address) {
            Alert.alert("Error", "Please fill all the fields");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Invalid email format");
            return false;
        }
        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return false;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            Alert.alert("Error", "Phone number must be 10 digits");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateInputs()) return;

        try {
            const response = await register({
                username,
                email,
                password,
                address,
                mobile: phone,
            });

            if (response) {
                Alert.alert("Success", "Account created successfully");
                navigation.navigate("Login");
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Registration failed");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 150, height: 150 }}
                source={{ uri: "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-cell-phone-accessories-psd-png-image_13095675.png" }}
            />
            <KeyboardAvoidingView>
                <Text style={styles.loginText}>Register to your account</Text>

                {/* Username */}
                <View style={styles.formInput}>
                    <AntDesign name="user" size={24} color="black" />
                    <TextInput
                        placeholder="Enter username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                    />
                </View>

                {/* Email */}
                <View style={styles.formInput}>
                    <Fontisto name="email" size={24} color="black" />
                    <TextInput
                        placeholder="Enter email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>

                {/* Phone */}
                <View style={styles.formInput}>
                    <AntDesign name="phone" size={24} color="black" />
                    <TextInput
                        placeholder="Enter phone"
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                </View>

                {/* Address */}
                <View style={styles.formInput}>
                    <AntDesign name="home" size={24} color="black" />
                    <TextInput
                        placeholder="Enter address"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
                    />
                </View>

                {/* Password */}
                <View style={styles.formInput}>
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput
                        placeholder="Enter password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                {/* Confirm Password */}
                <View style={styles.formInput}>
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginRedirect}>Already have an account? Login</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFEFD5",
    },
    loginText: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 20,
        color: "#041E42",
    },
    formInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D0D0D0",
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        width: 300,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: "gray",
    },
    registerButton: {
        backgroundColor: "orange",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    loginRedirect: {
        color: "grey",
        textAlign: "center",
        marginTop: 15,
    },
});

export default Register;