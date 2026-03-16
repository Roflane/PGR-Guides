import {API_BASE, API_GUIDE} from "../configs/ApiConfig.js";

export default class GuideApi {
    static async getAll() {
        const url = `${API_BASE}${API_GUIDE}/all`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            // data.forEach(guide => {
            //     guide.image = API_BASE + guide.image;
            // })
            return Array.isArray(data) ? data : Object.values(data);

        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

}