import { StyleSheet, Text, View,ScrollView , SafeAreaView, Image, Pressable, Button, TouchableOpacity, FlatList } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import Product from './Product';
import { useState, useEffect } from "react";

const ProductList = () => {
    const navigation = useNavigation();

    

    const renderProduct = ({ item }) => (
        <Product item={item} handlePress={handlePress} />
    )
        

    const handlePress = (product) => {
        navigation.navigate('Detail', {data: product });
    }
    return (
        <ScrollView>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                contentContainerStyle={styles.list}
                numColumns={2}
            />    
        </ScrollView>
                
    );
};

export default ProductList;

const styles = StyleSheet.create({
    
    list: {
        justifyContent: "space-between",
    },
});