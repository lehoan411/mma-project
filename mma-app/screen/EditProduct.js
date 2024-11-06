import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { fetchCategories } from '../services/api';

const EditProduct = ({ isVisible }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { productId } = route.params;

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('all');
    const [imageUri, setImageUri] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://192.168.1.51:9999/product/get-product/${productId}`);
                const productData = response.data;
                setProduct(productData);
                setName(productData.name);
                setPrice(productData.price.toString());
                setQuantity(productData.quantity.toString());
                setDescription(productData.description);
                setCategory(productData.catId);
                setImageUri(productData.image);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const loadCategories = async () => {
            const categoriesList = await fetchCategories();
            setCategories(categoriesList);
        };

        fetchProductDetails();
        loadCategories();
    }, [productId]);

    const handleSave = async () => {
        try {
            await axios.put(`http://192.168.1.51:9999/product/update-product/${productId}`, {
                name,
                price: parseFloat(price),
                quantity: parseInt(quantity, 10),
                description,
                catId: category,
                image: imageUri,
            });
            Alert.alert("Success", "Product updated successfully");
            navigation.navigate("ManageProduct", { reload: true });
        } catch (error) {
            Alert.alert("Error", "Failed to update product");
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://192.168.1.51:9999/product/delete-product/${productId}`);
            Alert.alert("Success", "Product deleted successfully");
            navigation.navigate("ManageProduct", { reload: true });
        } catch (error) {
            Alert.alert("Error", "Failed to delete product");
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.imageContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Image URL"
                        value={imageUri}
                        onChangeText={setImageUri}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Product Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={styles.picker}
                    >
                        {categories.map((cat) => (
                            <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
                        ))}
                    </Picker>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Edit Product</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.saveButtonText}>Delete Product</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("ManageProduct")}>
                    <Text style={styles.saveButtonText}>Close</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
};

export default EditProduct;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    placeholder: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    chooseButton: {
        marginLeft: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFD700',
        borderRadius: 5,
    },
    chooseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    picker: {
        height: 50,
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 15,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },

    closeButton: {
        backgroundColor: '#007bff',
        padding: 15,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },  
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
