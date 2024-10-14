import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TouchableOpacity } from "react-native";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Fontisto from '@expo/vector-icons/Fontisto';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDbzc545h-aXan19MbkEgA5h4FN_A5BSJRqQ&s" }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.loginText}>
                        Register to your account
                    </Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <View style={styles.formLogin}>
                        <AntDesign style={{ marginLeft: 8 }} name="user" size={24} color="black" />
                        <TextInput style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder="Enter username" />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.formLogin}>
                    <Fontisto style={{ marginLeft: 8 }} name="email" size={24} color="black" />
                        <TextInput style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder="Enter email" />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.formLogin}>
                        <AntDesign style={{ marginLeft: 8 }} name="phone" size={24} color="black" />
                        <TextInput style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder="Enter phone" />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.formLogin}>
                        <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="black" />
                        <TextInput secureTextEntry={true} style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder="Enter password" />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.formLogin}>
                        <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="black" />
                        <TextInput secureTextEntry={true} style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder="Confirm password" />
                    </View>
                </View>


                <View style={{ marginTop: 30 }} />

                <TouchableOpacity style={styles.loginButton}>
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Register</Text>
                </TouchableOpacity>

                <Pressable onPress={() => navigation.navigate("Login")} style={{ marginTop: 15 }}>
                    <Text style={{ color: "grey", textAlign: "center", fontSize: 16 }}>Already have an account? Login</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFD5',
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    text: {
        fontSize: 20,
        color: "gray",
        textAlign: "center",
    },
    loginText: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 10,
        color: "#041E42",
    },
    formLogin: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: "#D0D0D0"
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

export default Register;