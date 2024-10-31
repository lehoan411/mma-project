import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
const ManageProduct = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const navigation = useNavigation();
    const products = [
        { id: '1', name: 'Product 1', quantity: 10, status: 'In Stock', image: 'https://via.placeholder.com/50' },
        { id: '2', name: 'Product 2', quantity: 5, status: 'Low Stock', image: 'https://via.placeholder.com/50' },
        { id: '3', name: 'Product 3', quantity: 15, status: 'In Stock', image: 'https://via.placeholder.com/50' },
        { id: '4', name: 'Product 4', quantity: 0, status: 'Out of Stock', image: 'https://via.placeholder.com/50' },
        { id: '5', name: 'Product 5', quantity: 8, status: 'In Stock', image: 'https://via.placeholder.com/50' },
    ];

    const renderProductItem = ({ item }) => (
        <View style={styles.productRow}>
            <View style={styles.columnImage}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
            </View>
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.productText}>{item.quantity}</Text>
            <Text style={styles.productText}>{item.status}</Text>
            <View style={styles.columnActions}>
                <TouchableOpacity onPress={() => navigation.navigate("EditProduct")} style={styles.iconButton}>
                    <MaterialIcons name="settings" size={24} color="#FFD700" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header and Search */}
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
                    <Text style={{fontSize: 20, fontWeight: '500', color: "wheat"}}>ShopLink</Text>
                </Pressable>
            </View>

            {/* Category Filter */}
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={category}
                    style={styles.picker}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    <Picker.Item label="Category all" value="all" />
                    <Picker.Item label="Category 1" value="category1" />
                    <Picker.Item label="Category 2" value="category2" />
                </Picker>
            </View>

            {/* Product List Header */}
            <View style={styles.productHeader}>
                <View style={styles.columnImage}>
                    <Text style={styles.headerText}>Image</Text>
                </View>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Quantity</Text>
                <Text style={styles.headerText}>Status</Text>
                <View style={styles.columnActions}>
                    <Text style={styles.headerText}>Actions</Text>
                </View>
            </View>

            {/* Product List */}
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                style={styles.productList}
            />

            {/* Add Product Button */}
            <TouchableOpacity onPress={() => navigation.navigate("AddProduct")} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add product</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.addButtonBack}>
                <Text style={styles.addButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ManageProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFD5',
    },
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
        gap: 10,
        height: 38,
        flex: 1,
        paddingHorizontal: 10,
    },
    filterContainer: {
        paddingVertical: 10,
    },
    picker: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FF8C00',
        padding: 10,
        marginTop: 10,
    },
    headerText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productList: {
        flex: 1,
        marginTop: 10,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    columnImage: {
        width: 70, // Adjust width for image column
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    productText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    columnActions: {
        width: 70, // Adjust width for actions column
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        paddingHorizontal: 10,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    addButtonBack: {
        marginTop: 20,
        backgroundColor: '#FF8C00',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
