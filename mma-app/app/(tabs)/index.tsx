import { Image, StyleSheet, Platform } from 'react-native';
import React from 'react';
import {CartProvider} from '@/screen/CartContext'
import App from "@/App"
export default function HomeScreen() {
  return (
    <CartProvider>
    <App/>
    </CartProvider>
    
  );
}

const styles = StyleSheet.create({});
