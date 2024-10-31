import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const OrderHistory = () => {
    const navigation = useNavigation(); // Hook to navigate back

    // Sample order data, to be replaced by API data later
    const orders = [
        {
            id: '001',
            orderDate: '10/01/2024',
            customer: 'JohnDoe',
            products: [
                { name: 'Product A', quantity: 2 },
                { name: 'Product B', quantity: 1 },
            ]
        },
        {
            id: '002',
            orderDate: '12/01/2024',
            customer: 'JaneDoe',
            products: [
                { name: 'Product C', quantity: 3 }
            ]
        }
    ];

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Order History</Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 1 }]}>ID</Text>
                <Text style={[styles.headerCell, { flex: 2 }]}>Order Date</Text>
                <Text style={[styles.headerCell, { flex: 2 }]}>Customer</Text>
                <Text style={[styles.headerCell, { flex: 3 }]}>Product</Text>
            </View>

            {/* Table Rows */}
            <ScrollView style={{ marginBottom: 80 }}>
                {orders.map((order, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.cell, { flex: 1 }]}>{order.id}</Text>
                        <Text style={[styles.cell, { flex: 2 }]}>{order.orderDate}</Text>
                        <Text style={[styles.cell, { flex: 2 }]}>{order.customer}</Text>
                        <View style={[styles.cell, { flex: 3 }]}>
                            {order.products.map((product, pIndex) => (
                                <Text key={pIndex} style={styles.productText}>
                                    {product.name} x {product.quantity}
                                </Text>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Go Back Button */}
            <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => navigation.navigate("Profile")}
            >
                <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFEFD5', // Same background as the VerifyInformation page
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF4500', // Dark orange color for title
        marginBottom: 20,
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#FFA500', // Orange background for header
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: '#FF6347', // Light orange border color
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#FF6347', // Light orange border color
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#FFF', // White text for the header
        textAlign: 'center',
    },
    cell: {
        color: '#FF4500', // Dark orange color for text
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    productText: {
        color: '#FF4500', // Dark orange text color for product details
        textAlign: 'center',
    },
    goBackButton: {
        position: 'absolute',
        bottom: 20,
        left: '10%',
        right: '10%',
        paddingVertical: 15,
        backgroundColor: '#FF7F50', // Coral background color
        borderRadius: 8,
        alignItems: 'center',
    },
    goBackButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF', // White text color
    },
});

export default OrderHistory;
