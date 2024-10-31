import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TouchableOpacity } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";

const Product = ({ item, onPress }) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={onPress} style={styles.pressable}>
            <View style={styles.productContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.details}>
                    <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>
                    <Text style={styles.priceText}>{item.price} VND</Text>
                </View>
                <TouchableOpacity
                    style={styles.cart}
                    onPress={() => navigation.navigate("Cart")}
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
        overflow: "hidden", // Giữ phần tử bên trong không tràn ra ngoài
        
    },
    image: {
        width: "100%",
        height: 100, // Tăng chiều cao cho ảnh để cân đối hơn
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