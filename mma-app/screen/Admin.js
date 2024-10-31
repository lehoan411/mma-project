import React, { useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, 
    Modal, TextInput, Button, ActivityIndicator
} from 'react-native';
import { useNavigation } from "@react-navigation/native";


const Admin = () => {
    const [accounts, setAccounts] = useState([
        { id: '1', username: 'user1', email: 'user1@example.com', status: 'Active' },
        { id: '2', username: 'user2', email: 'user2@example.com', status: 'Blocked' },
        { id: '3', username: 'admin', email: 'admin@example.com', status: 'Active' },
    ]);

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [newAccount, setNewAccount] = useState({ username: '', email: '', status: 'Active' });
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    // Xóa tài khoản
    const handleDeleteAccount = (id) => {
        Alert.alert('Delete Account', 'Are you sure you want to delete this account?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => setAccounts(accounts.filter((account) => account.id !== id)),
            },
        ]);
    };

    // Chặn/Mở khóa tài khoản
    const toggleBlockAccount = (id) => {
        setAccounts((prevAccounts) =>
            prevAccounts.map((account) =>
                account.id === id
                    ? { ...account, status: account.status === 'Active' ? 'Blocked' : 'Active' }
                    : account
            )
        );
    };

    // Thêm tài khoản mới
    const handleAddAccount = () => {
        if (!newAccount.username || !newAccount.email) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setAccounts([...accounts, { ...newAccount, id: Math.random().toString() }]);
            setAddModalVisible(false);
            setNewAccount({ username: '', email: '', status: 'Active' });
            setLoading(false);
        }, 1000); // Giả lập chờ API
    };

    const handleCloseModal = () => {
        setAddModalVisible(false);
        setNewAccount({ username: '', email: '', status: 'Active' });
    }

    const renderAccountItem = ({ item }) => (
        <View style={styles.accountRow}>
            <Text style={styles.accountText}>{item.username}</Text>
            <Text style={styles.accountText}>{item.email}</Text>
            <Text style={styles.accountText}>{item.status}</Text>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#007bff' }]}
                    onPress={() => toggleBlockAccount(item.id)}
                >
                    <Text style={styles.actionButtonText}>
                        {item.status === 'Active' ? 'Block' : 'Unblock'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#dc3545' }]}
                    onPress={() => handleDeleteAccount(item.id)}
                >
                    <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Account Management</Text>
            <FlatList
                data={accounts}
                renderItem={renderAccountItem}
                keyExtractor={(item) => item.id}
                style={styles.accountList}
            />

            {/* Nút thêm tài khoản */}
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => setAddModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Add New Account</Text>
            </TouchableOpacity>

            {/* Nút đăng xuất */}
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.addButtonText}>Logout</Text>
            </TouchableOpacity>

            {/* Modal thêm tài khoản mới */}
            <Modal
                visible={isAddModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setAddModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Account</Text>
                        <TextInput
                            placeholder="Username"
                            value={newAccount.username}
                            onChangeText={(text) =>
                                setNewAccount({ ...newAccount, username: text })
                            }
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Email"
                            value={newAccount.email}
                            onChangeText={(text) =>
                                setNewAccount({ ...newAccount, email: text })
                            }
                            style={styles.input}
                            keyboardType="email-address"
                        />

                        
                        <Button color={"green"} title="Save" onPress={handleAddAccount} disabled={loading} />
                        <Text></Text> 
                        <Button title="Close" onPress={handleCloseModal} disabled={loading} />
                        {loading && <ActivityIndicator size="small" color="#000" />}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Admin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    accountList: {
        flex: 1,
        marginTop: 10,
    },
    accountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    accountText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        marginLeft: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
    },
});
