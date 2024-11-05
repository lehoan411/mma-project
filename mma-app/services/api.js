import axios from "axios";
// const API_BASE_URL = "http://192.168.1.51:9999";
const API_BASE_URL = "http://10.33.35.119:9999";

export const login = async (username, password) => {
    try {
        const API_URL = `${API_BASE_URL}/auth/login`;
        const response = await axios.post(API_URL, { username, password });
        return response.data; // Trả về dữ liệu chứa token
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const register = async (data) => {
    try {
        const API_URL = `${API_BASE_URL}/auth/register`;
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/product/get-product`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/product/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchCart = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
};

export const updateCartItemQuantity = async (cartId, productId, quantity) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/cart/${cartId}`, {
            productId,
            quantity,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        throw error;
    }
};

export const addToCart = async (userId, product) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cart/add-to-cart`, {
            cid: userId,
            product: {
                pid: product.id, // ID sản phẩm
                image: product.image, // Ảnh sản phẩm
                pname: product.name,
                price: product.price,
                quantity: 1, // Số lượng mặc định là 1, bạn có thể tùy chỉnh
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
};

export const deleteCartItem = async (cartId, productId) => {
    console.log("Deleting item:", productId, "from cart:", cartId);
    try {
        const response = await axios.delete(`${API_BASE_URL}/cart/${cartId}/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting cart item:", error);
        throw error;
    }
};