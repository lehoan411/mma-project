import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, Image, 
    StyleSheet, Modal, Button, ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
const AddProduct = ({ isVisible, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('all');
    const [imageUri, setImageUri] = useState('');
    const navigation = useNavigation();

    // Chọn ảnh từ thư viện
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleAdd = () => {
        const newProduct = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description,
            category,
            image: imageUri,
        };
        onAdd(newProduct);
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.imageContainer}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.productImage} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Text>No Image</Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.chooseButton} onPress={pickImage}>
                        <Text style={styles.chooseButtonText}>Choose Image</Text>
                    </TouchableOpacity>
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
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="Category 1" value="category1" />
                        <Picker.Item label="Category 2" value="category2" />
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
