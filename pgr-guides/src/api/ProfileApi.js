import {API_BASE, API_PROFILE} from "../configs/ApiConfig.js";

export default class ProfileApi {
    static async getAll() {
        const url = `${API_BASE}${API_PROFILE}/image/all`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            let data = await response.json();
            data = data.map(p => API_BASE + p);
          //  console.log(data);
            return Array.isArray(data) ? data : Object.values(data);
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    static async getImageProfile(userId) {
        const url = `${API_BASE}${API_PROFILE}/image/${userId}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return API_BASE + await response.text();
        } catch (error) {
            console.error(error.message);
            return "";
        }
    }


    static async changeProfileImage(userId, newStaticImagePath) {
        const url = `${API_BASE}${API_PROFILE}/image/`;
        const dto = {
            userId: userId,
            newStaticImagePath: newStaticImagePath
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server response:", errorText);
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error changing profile image:", error.message);
            return false;
        }
    }
}