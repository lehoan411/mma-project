import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
const OrderDetail = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("creditCard");
    const navigation = useNavigation();

    const success = () => {
        Alert.alert("Checkout Success", "Thank you for your purchase!");
        navigation.navigate("Home");
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Order Summary Section */}
            <View style={styles.orderSummaryContainer}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                <View style={styles.orderDetails}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image, replace with product image URI
                        style={styles.productImage}
                    />
                    <View style={styles.productDetails}>
                        <Text style={styles.productText}>Product name</Text>
                        <Text style={styles.productText}>Price: $XX.XX</Text>
                        <Text style={styles.productText}>Quantity: X</Text>
                    </View>
                </View>
            </View>

            {/* Customer Information Section */}
            <View style={styles.customerInfoContainer}>
                <Text style={styles.sectionTitle}>Customer Information</Text>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                />
                <Text style={styles.label}>Address</Text>
                <TextInput
                    placeholder="Address"
                    style={styles.input}
                />
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    placeholder="Phone number"
                    style={styles.input}
                />
            </View>

            {/* Payment Method Selection */}
            <View style={styles.paymentContainer}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <Picker
                    selectedValue={selectedPaymentMethod}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                >
                    <Picker.Item label="Credit Card" value="creditCard" />
                    <Picker.Item label="PayPal" value="paypal" />
                    <Picker.Item label="Cash on Delivery" value="cashOnDelivery" />
                </Picker>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity onPress={() => success()} style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Go back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFEFD5',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderSummaryContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    orderDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    productDetails: {
        marginLeft: 20,
    },
    productText: {
        fontSize: 16,
        color: '#333',
    },
    customerInfoContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    paymentContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    checkoutButton: {
        width: '80%',
        padding: 15,
        backgroundColor: '#FF7F50',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default OrderDetail;
