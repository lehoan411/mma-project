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
    const navigation = useNavigation();

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                navigation.navigate("Main");
            }
        };
        checkLogin();
    }, []);

    const handleLogin = async () => {
        const response = await loginApi(username, password);
        if (response && response.token) {
            const userData = JSON.stringify(response.user);
            await AsyncStorage.setItem("user", userData); // Save user info
            navigation.navigate("Main");
        } else {
            alert("Invalid login credentials");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDbzc545h-aXan19MbkEgA5h4FN_A5BSJRqQ&s" }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.loginText}>
                        Login In to your account
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={styles.formLogin}>
                        <AntDesign style={{ marginLeft: 8 }} name="user" size={24} color="black" />
                        <TextInput
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                            placeholder="Enter username"
                            value={username}
                            onChangeText={(text) => setUsername(text)} // Cập nhật state cho username
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
                            onChangeText={(text) => setPassword(text)} // Cập nhật state cho password
                        />
                    </View>
                </View>

                <View style={styles.forgot}>
                    <Text onPress={() => navigation.navigate("ForgotPassword")} style={{ color: "#007FFF", fontWeight: "500" }}>Forgot password?</Text>
                </View>

                <View style={{ marginTop: 50 }} />

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    {/* Đảm bảo text bên trong TouchableOpacity được bao bởi thành phần Text */}
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>
                        Login
                    </Text>
                </TouchableOpacity>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
                    {/* Đảm bảo text bên trong Pressable được bao bởi thành phần Text */}
                    <Text style={{ color: "grey", textAlign: "center", fontSize: 16 }}>
                        Don't have an account? Sign Up
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFD5',
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 12,
        color: "#041E42",
    },
    formLogin: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
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
        width: 200,
        padding: 15,
        backgroundColor: "orange",
        borderRadius: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default Login;