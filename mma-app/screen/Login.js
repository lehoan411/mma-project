import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from "react-native";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as loginApi } from "../services/api"; // Đổi tên import để tránh trùng với hàm login trong component

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to store error message
    const navigation = useNavigation();

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("userId");
            if (token || userId) {
                navigation.navigate("Main");
            }
        };
        checkLogin();
    }, []);

    const handleLogin = async () => {
        // Reset error message
        setError("");

        // Validate empty fields
        if (!username || !password) {
            setError("Username or password are incorrect.");
            return;
        }

        const response = await loginApi(username, password);
        if (response && response.token) {
            const { token, user } = response;
            await AsyncStorage.setItem("token", token); // Lưu token
            await AsyncStorage.setItem("userId", user.userId); // Lưu userId
            await AsyncStorage.setItem("user", JSON.stringify(user)); // Save user info
            navigation.navigate("Main");
        } else {
            setError("Invalid login credentials");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={{ width: 150, height: 150 }}
                    source={{ uri: "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-cell-phone-accessories-psd-png-image_13095675.png" }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.loginText}>
                        Log In to your account
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={styles.formLogin}>
                        <AntDesign style={{ marginLeft: 8 }} name="user" size={24} color="black" />
                        <TextInput
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                            placeholder="Enter username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.formLogin}>
                        <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="black" />
                        <TextInput
                            secureTextEntry={true}
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                </View>

                {/* Display error message if any */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.forgot}>
                    <Text onPress={() => navigation.navigate("ForgotPassword")} style={{ color: "#007FFF", fontWeight: "500" }}>Forgot password?</Text>
                </View>

                <View style={{ marginTop: 50 }} />

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Main")} style={styles.loginButton}>
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>
                        Home
                    </Text>
                </TouchableOpacity>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
                    <Text style={{ color: "grey", textAlign: "center", fontSize: 16 }}>
                        Don't have an account? Sign Up
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFD5',
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 12,
        color: "#041E42",
    },
    formLogin: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 30,
        backgroundColor: "#D0D0D0",
    },
    forgot: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        alignItems: "center",
    },
    loginButton: {
        margin: 10,
        width: 200,
        padding: 15,
        backgroundColor: "orange",
        borderRadius: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 10,
        fontSize: 14,
    },
});

export default Login;