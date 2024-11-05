import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { fetchCart, updateCartItemQuantity, deleteCartItem } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [userId, setUserId] = useState(null);

    // Load userId from AsyncStorage and fetch cart data whenever the screen is focused
    useFocusEffect(
        useCallback(() => {
            const loadUserIdAndCart = async () => {
                try {
                    const storedUserId = await AsyncStorage.getItem('userId');
                    setUserId(storedUserId);
                    if (storedUserId) {
                        const cartData = await fetchCart(storedUserId);
                        setItems(cartData?.product || []);
                    }
                } catch (error) {
                    console.error("Error loading cart data:", error);
                }
            };
            loadUserIdAndCart();
        }, [])
    );

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await updateCartItemQuantity(userId, productId, newQuantity);
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.pid === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeItem = async (productId) => {
        console.log("Attempting to delete product:", productId, "from cart of user:", userId);
        try {
            await deleteCartItem(userId, productId); // Ensure `userId` is correctly passed
            setItems((prevItems) => prevItems.filter((item) => item.pid !== productId));
            Alert.alert("Removed", "Item has been removed from the cart.");
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const getTotalPrice = () => {
        return (items || []).reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.pname}</Text>
                <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => updateQuantity(item.pid, item.quantity - 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.pid, item.quantity + 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.pid)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (!userId) {
        return (
            <View style={styles.containerLogin}>
                <Text style={styles.loginText}>Please log in to access your cart</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Pressable style={styles.pressSearch}>
                    <MaterialIcons name="search" size={24} color="#FFF" />
                    <TextInput
                        placeholder="Search product"
                        placeholderTextColor="#FFE4B5"
                        style={{ color: '#FFF' }}
                    />
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.shopLinkText}>ShopLink</Text>
                </Pressable>
            </View>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.pid.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: {getTotalPrice().toLocaleString()} VND</Text>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate("OrderDetail")}
                >
                    <Text style={styles.checkoutButtonText}>Check out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFD5', // Light background color for contrast
    },
    search: {
        paddingTop: 25,
        backgroundColor: '#FFA500', // Bright orange
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressSearch: {
        flexDirection: 'row',
        backgroundColor: '#FF8C00', // Dark orange
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 7,
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
    },
    shopLinkText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'wheat',
    },
    containerLogin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFEFD5',
    },
    loginText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#FF4500',
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    cartItem: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5, // Subtle shadow effect
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: "#ddd",
    },
    productDetails: {
        flex: 1,
        marginLeft: 12,
    },
    productName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333", // Darker text for better contrast
    },
    productPrice: {
        fontSize: 16,
        color: "#FF4500", // Dark orange
        marginVertical: 5,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: "#FF6347", // Soft border color
        backgroundColor: "#FF6347", // Orange color for action items
        paddingLeft: 10,
        paddingRight: 10,
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    quantityText: {
        fontSize: 16,
        color: "#333", // Darker for consistency
    },
    deleteButton: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#FF6347",
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    deleteButtonText: {
        fontSize: 14,
        color: "#FF6347", // Orange color for action items
    },
    footer: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 5,
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    checkoutButton: {
        backgroundColor: "#FFA500",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    checkoutButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 18,
        color: "#AAA",
        marginTop: 50,
    },
});
