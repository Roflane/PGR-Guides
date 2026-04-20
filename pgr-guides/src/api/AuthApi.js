import axios from "axios";
import {API_AUTH, API_BASE} from "../configs/ApiConfig.js";
import api from "../configs/axios.js";

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    try {
        const response = await api().post(`${API_AUTH}/refresh`, { refreshToken });
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
    } catch (err) {
        console.error("Refresh token failed", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        return null;
    }
};