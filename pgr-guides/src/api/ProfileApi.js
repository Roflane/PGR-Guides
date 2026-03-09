import {API_BASE, API_PROFILE} from "../configs/ApiConfig.js";

export default class ProfileApi {
    static async getImageProfile(userId) {
        const url = `${API_BASE}${API_PROFILE}/image/${userId}`;
        console.log(url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const res= API_BASE + await response.text();
            console.log(res);
            return res;
        } catch (error) {
            console.error(error.message);
            return "";
        }
    }
}