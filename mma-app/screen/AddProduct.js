import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { fetchCategories, addProduct } from '../services/api';

const AddProduct = ({ isVisible }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();

    // Fetch categories from the API on component mount
    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getCategories();
    }, []);

    // Handle adding a product
    const handleAdd = async () => {
        const productData = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description,
            image: imageUri,
            catId: category,
        };

        try {
            await addProduct(productData);
            alert("Product added successfully!");
            navigation.navigate("ManageProduct"); // Go back to product management
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Error adding product. Please try again.");
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Image URL"
                    value={imageUri}
                    onChangeText={setImageUri}
                />
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
                        <Picker.Item label="Select Category" value="" />
                        {categories.map((cat) => (
                            <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
                        ))}
                    </Picker>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                    <Text style={styles.addButtonText}>Add Product</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("ManageProduct")}>
                    <Text style={styles.addButtonText}>Close</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
};

export default AddProduct;


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
    addButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#007bff',
        padding: 15,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
