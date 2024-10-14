import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Login from "../screen/Login";
import Register from "../screen/Register";
import Home from "../screen/Home";
import ProductDetail from "../screen/ProductDetail";
import Cart from './../screen/Cart';
import Profile from './../screen/Profile';
import OrderDetail from './../screen/OrderDetail';
import OrderHistory from './../screen/OrderHistory';
import EditProfile from './../screen/EditProfile';
import ChangePassword from './../screen/ChangePassword';
import ManageProduct from './../screen/ManageProduct';
import EditProduct from './../screen/EditProduct';
import ForgotPassword from './../screen/ForgotPassword';
import Admin from './../screen/Admin';
import AddProduct from './../screen/AddProduct';
const NavFn = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    function BottomTab() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarLabelStyle: { color: "orange" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Entypo name="home" size={24} color="orange" />
                            ) : (
                                <Feather name="home" size={24} color="grey" />
                            )
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarLabelStyle: { color: "orange" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="person-circle" size={24} color="orange" />
                            ) : (
                                <Ionicons name="person-circle-outline" size={24} color="grey" />
                            )
                    }}
                />

                <Tab.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        tabBarLabel: 'Cart',
                        tabBarLabelStyle: { color: "orange" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <MaterialCommunityIcons name="cart" size={24} color="orange" />
                            ) : (
                                <MaterialCommunityIcons name="cart-outline" size={24} color="grey" />
                            )
                    }}
                />

            </Tab.Navigator>
        );
    }
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTab} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={ProductDetail} options={{ headerShown: false }} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />
                <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name="ManageProduct" component={ManageProduct} options={{ headerShown: false }} />
                <Stack.Screen name="EditProduct" component={EditProduct} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
                <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default NavFn;