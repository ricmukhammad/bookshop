import axios from "axios";

const AUTH_URL = "http://localhost:8082/auth";

export const login = async (email, password) => {
    const res = await axios.post(`${AUTH_URL}/login`, { email, password });
    return res.data;
};

export const register = async (name, email, password) => {
    const res = await axios.post(`${AUTH_URL}/register`, { name, email, password });
    return res.data;
};

export const googleAuth = async (idToken) => {
    const res = await axios.post(`${AUTH_URL}/google`, { idToken });
    return res.data;
};