import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TouchableOpacity, Alert } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart } from '../services/api';

const Product = ({ item, onPress }) => {
    const navigation = useNavigation();

    const handleAddToCart = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                Alert.alert("Thông báo", "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.", [
                    { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
                    { text: "Hủy", style: "cancel" },
                ]);
            } else {
                // Convert price to integer by removing commas, if any
                const price = parseInt(item.price.replace(/,/g, ''));
    
                const response = await addToCart(userId, {
                    id: item._id,
                    image: item.image,
                    name: item.name,
                    price, // Save as an integer without formatting
                });
    
                if (response) {
                    console.log("Product added to cart:", response);
                    Alert.alert("Thông báo", "Sản phẩm đã được thêm vào giỏ hàng!");
                }
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
        }
    };

    return (
        <Pressable onPress={onPress} style={styles.pressable}>
            <View style={styles.productContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.details}>
                    <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>
                    <Text style={styles.priceText}>{item.price.toLocaleString()} VND</Text>
                </View>
                <TouchableOpacity
                    style={styles.cart}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.cartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

export default Product;

const styles = StyleSheet.create({
    pressable: {
        marginVertical: 15,
    },
    productContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 180,
    },
    details: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 5,
    },
    priceText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FF6347",
    },
    cart: {
        backgroundColor: "#FFA500",
        paddingVertical: 12,
        alignItems: "center",
        width: "100%",
    },
    cartText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
});