import { Image, StyleSheet, Platform } from 'react-native';
import React from 'react';
import {CartProvider} from '@/screen/CartContext'
import NavFn from '@/navigation/NavFn'
export default function HomeScreen() {
  return (
    <CartProvider>
    <NavFn/>
    </CartProvider>
    
  );
}

const styles = StyleSheet.create({});
