import { StyleSheet, Dimensions, Platform,Text, View, Image, Pressable, Button, TextInput, ImageBackground, ScrollView } from "react-native";
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const { product } = route.params;

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#FFEFD5',
        }}>
            {/* Search Bar */}
            <View style={styles.search}>
                    <Pressable style={styles.pressSearch}>
                        <MaterialIcons name="search" size={24} color="#FFF" />
                        <TextInput
                            placeholder="Search product"
                            placeholderTextColor="#FFE4B5"
                            style={{ color: '#FFF' }}
                        />
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate("Home")}><Text style={{ fontSize: 20, fontWeight: '500', color: "wheat" }}>ShopLink</Text></Pressable>
                </View>

            {/* Product Details */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {product.image ? (
                    <ImageBackground
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text>No Image Available</Text>
                    </View>
                )}
                
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{product.name || 'Product Name'}</Text>
                    <Text style={styles.productPrice}>{product.price || 'Price not available'}</Text>
                    <Text style={styles.productDescription}>{product.description || 'Description not available'}</Text>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <Pressable
                    style={styles.addToCartButton}
                    onPress={() => navigation.navigate("Login")}
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
}

export default ProductDetail;

const styles = StyleSheet.create({
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
    image: {
        width: "100%",
        height: 300,
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