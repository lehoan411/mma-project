import { StyleSheet, Text, Dimensions, View, SafeAreaView, Image, Pressable, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
import Product from "./Product";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts, fetchCategories } from '../services/api';
import axios from "axios";

const API_BASE_URL = "http://192.168.1.51:9999"; // Sửa URL theo địa chỉ IP của server
// const API_BASE_URL = "http://10.33.35.119:9999";
const Home = () => {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Thêm state lưu giá trị tìm kiếm
    const images = [
        'https://lh5.googleusercontent.com/EpcuqPabcy-o-VRJ4HOuYS4ihbGn-n__6BFTOXiml2_tyJH9tUxgqPwJ_Do9HaCSyFxUdwzFr7AKM7cq9Eqv9lfy4u1hXkIEZCfxF2SjmtzvhdmefZwg2eZeWpz_z5eA7-2UwSI',
        'https://www.shopbase.com/blog/wp-content/uploads/2022/02/dropshipping-phu-kien-dien-thoai-banner.jpg',
        'https://www.uplevo.com/blog/wp-content/uploads/2019/07/kinh-doanh-cua-hang-phu-kien-dien-thoai.jpg',
        'https://bak.com.vn/wp-content/uploads/2023/05/BAK-Dia-chi-cung-cap-linh-kien-dien-thoai-gia-si-TP-HCM.jpg',
    ];

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchProductsData = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
                setFilteredProducts(productsData); // Hiển thị tất cả sản phẩm lúc đầu
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchCategoriesData();
        fetchProductsData();
    }, []);

    const handleCategoryPress = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            if (categoryId) {
                const response = await axios.get(`${API_BASE_URL}/product/category/${categoryId}`);
                setFilteredProducts(response.data);
            } else {
                setFilteredProducts(products);
            }
        } catch (error) {
            console.error("Error filtering products:", error);
        }
    };

    const handleSearch = () => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFEFD5' }}>
            <ScrollView>
                {/* Search Bar */}
                <View style={styles.search}>
                    <View style={styles.pressSearch}>
                        <TextInput
                            placeholder="Search product"
                            placeholderTextColor="#FFE4B5"
                            style={{ color: '#FFF', flex: 1 }}
                            value={searchQuery} // Hiển thị giá trị tìm kiếm
                            onChangeText={setSearchQuery} // Cập nhật giá trị tìm kiếm
                        />
                        <Pressable onPress={handleSearch}>
                            <MaterialIcons name="search" size={24} color="#FFF" />
                        </Pressable>
                    </View>
                    <Pressable onPress={() => navigation.navigate("Home")}>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: "wheat" }}>ShopLink</Text>
                    </Pressable>
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

                {/* Categories */}
                <Text style={styles.categoriesTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
                    <Pressable onPress={() => handleCategoryPress(null)} style={styles.categoryItem}>
                        <Text style={[styles.categoryText, selectedCategory === null && styles.categoryTextSelected]}>All</Text>
                    </Pressable>
                    {categories.map((category) => (
                        <Pressable key={category._id} onPress={() => handleCategoryPress(category._id)} style={styles.categoryItem}>
                            <Text style={[styles.categoryText, selectedCategory === category._id && styles.categoryTextSelected]}>{category.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Product List */}
                <Text style={styles.allProductsTitle}>All Products</Text>
                <View style={styles.productList}>
                    {filteredProducts.map((item) => (
                        <View style={styles.productWrapper} key={item._id}>
                            <Product
                                key={item._id}
                                item={{
                                    ...item,
                                    image: item.image || 'https://via.placeholder.com/150',
                                    price: `${item.price.toLocaleString()}`
                                }}
                                onPress={() => navigation.navigate('Detail', { productId: item._id })}
                            />
                        </View>
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
        backgroundColor: '#FFA500',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressSearch: {
        flexDirection: 'row',
        backgroundColor: '#FF8C00',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 7,
        height: 38,
        flex: 1,
        paddingHorizontal: 10,
    },
    carouselItem: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
    },
    categoriesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    categoryList: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    categoryItem: {
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
    categoryTextSelected: {
        fontWeight: 'bold',
        color: '#FFA500',
    },
    allProductsTitle: {
        padding: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    productList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    productWrapper: {
        width: "48%",
        marginBottom: 15,
    }
});