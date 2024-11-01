import axios from "axios";
const API_BASE_URL = "http://192.168.1.51:9999";
// const API_BASE_URL = "http://10.33.35.119:9999";
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