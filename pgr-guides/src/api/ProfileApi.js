import {API_BASE, API_PROFILE} from "../configs/ApiConfig.js";
import api from "../configs/axios.js";

export default class ProfileApi {
    static async getAll() {
        const url = `${API_PROFILE}/image/all`;
        try {
            const response = await api.get(url);
            let data =  response.data.map(item => item.image);
            return Array.isArray(data) ? data : Object.values(data);
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    static async getImageProfile(userId) {
        const url = `${API_PROFILE}/image/${userId}`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error(error.message);
            return "";
        }
    }


    static async changeProfileImage(userId, newStaticImagePath) {
        const url = `${API_PROFILE}/image/`;
        const dto = {
            userId: userId,
            newStaticImagePath: newStaticImagePath
        };
        console.log(`user id: ${dto.userId} | static path:  ${dto.newStaticImagePath} }`);

        try {
            const response = await api.put(url, dto);
            return response.data;
        } catch (error) {
            console.error("Error changing profile image:", error.message);
            return false;
        }
    }
}