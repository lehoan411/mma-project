import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    Pressable,
    TextInput,
    ImageBackground,
    ScrollView,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { addToCart } from "../services/api"; // Giả sử bạn đã import `addToCart` từ file api.js

// const API_BASE_URL = "http://192.168.1.51:9999"; // Update with your actual backend URL
const API_BASE_URL = "http://10.33.35.119:9999";
const ProductDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const width = Dimensions.get("window").width;
    const { productId } = route.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details from API
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/product/get-product/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                Alert.alert("Thông báo", "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.", [
                    { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
                    { text: "Hủy", style: "cancel" },
                ]);
            } else {
                // Kiểm tra product.price trước khi gọi replace
                const priceString = product.price ? product.price.toString() : "0 VND"; // Nếu không có giá, đặt giá mặc định là 0
                const price = parseInt(priceString.replace(" VND", ""), 10); // Chuyển đổi giá thành số nguyên
                const response = await addToCart(userId, {
                    id: product._id,
                    image: product.image,
                    name: product.name,
                    price,
                });
                if (response) {
                    Alert.alert("Thông báo", "Sản phẩm đã được thêm vào giỏ hàng!");
                }
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
        }
    };

    if (!product) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading product details...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFEFD5" }}>
            {/* Search Bar */}
            <View style={styles.search}>
                <Pressable style={styles.pressSearch}>
                    <MaterialIcons name="search" size={24} color="#FFF" />
                    <TextInput
                        placeholder="Search product"
                        placeholderTextColor="#FFE4B5"
                        style={{ color: "#FFF" }}
                    />
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "wheat" }}>ShopLink</Text>
                </Pressable>
            </View>

            {/* Product Details */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {product.image && product.image.length > 0 ? (
                    <ImageBackground
                        source={{ uri: product.image}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text>No Image Available</Text>
                    </View>
                )}

                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{product.name || "Product Name"}</Text>
                    <Text style={styles.productPrice}>{`${product.price.toLocaleString() || "Price not available"} VND`}</Text>
                    <Text style={styles.productDescription}>{product.description || "Description not available"}</Text>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <Pressable
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </Pressable>
                <Pressable
                    style={styles.homeButton}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.buttonText}>Home</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    search: {
        paddingTop: 25,
        backgroundColor: "#FFA500",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    pressSearch: {
        flexDirection: "row",
        backgroundColor: "#FF8C00",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 7,
        gap: 10,
        height: 38,
        flex: 1,
        paddingHorizontal: 10,
    },
    image: {
        width: "100%",
        height: 400,
    },
    imagePlaceholder: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E0E0E0",
    },
    productDetails: {
        padding: 15,
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 10,
    },
    productPrice: {
        fontSize: 20,
        color: "#FF6347",
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22,
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderColor: "#E0E0E0",
    },
    addToCartButton: {
        backgroundColor: "#FF6347",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 10,
        alignItems: "center",
    },
    homeButton: {
        backgroundColor: "#4682B4",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});