import { StyleSheet, Text, Dimensions, View, Platform, SafeAreaView, Image, Pressable, ScrollView, TextInput } from "react-native";
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
import Product from "./Product";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;

    // Sample products array
    const products = [
        { id: '1', name: 'Product 1', price: '$100', description: 'Description for product 1', image: 'https://picsum.photos/700' },
        { id: '2', name: 'Product 2', price: '$120', description: 'Description for product 2', image: 'https://picsum.photos/701' },
        { id: '3', name: 'Product 3', price: '$150', description: 'Description for product 3', image: 'https://picsum.photos/702' },
        { id: '4', name: 'Product 4', price: '$180', description: 'Description for product 4', image: 'https://picsum.photos/703' },
        { id: '5', name: 'Product 5', price: '$180', description: 'Description for product 5', image: 'https://picsum.photos/704' },
        { id: '6', name: 'Product 6', price: '$180', description: 'Description for product 6', image: 'https://picsum.photos/705' },
    ];

    const images = [
        'https://via.placeholder.com/600x300.png?text=Image+1',
        'https://via.placeholder.com/600x300.png?text=Image+2',
        'https://via.placeholder.com/600x300.png?text=Image+3',
        'https://via.placeholder.com/600x300.png?text=Image+4',
    ];

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#FFEFD5',
            }}>
            <ScrollView>
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

                {/* Carousel */}
                <View style={{ flex: 1 }}>
                    <Carousel
                        loop
                        width={width}
                        height={width / 2}
                        autoPlay={true}
                        data={images}
                        scrollAnimationDuration={1000}
                        renderItem={({ item }) => (
                            <View style={styles.carouselItem}>
                                <Image
                                    source={{ uri: item }}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {images.map((item, index) => (
                        <Pressable
                            key={index}
                            style={{
                                margin: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                style={{ width: 50, height: 50, resizeMode: "contain" }}
                                source={{ uri: item }}
                            />

                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 12,
                                    fontWeight: "500",
                                    marginTop: 5,
                                }}
                            >
                                {item?.name}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Product List */}
                <Text style={styles.allProductsTitle}>All Products</Text>
                <View style={styles.productList}>
                    {products.map((item) => (
                        <Product
                            key={item.id}
                            item={item}
                            onPress={() => navigation.navigate('Detail', { product: item })} // Pass product data
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;

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
    carouselItem: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
    },
    allProductsTitle: {
        padding: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    productList: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',

    },
});