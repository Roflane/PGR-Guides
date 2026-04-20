import {API_BASE, API_GUIDE} from "../configs/ApiConfig.js";
import api from "../configs/axios.js";

export default class GuideApi {
    static #API_GUIDE_ALL = `${API_GUIDE}/all`;
    static #API_GUIDE_CREATE = `${API_GUIDE}/create`;
    static #API_GUIDE_CHANGESTATUS = `${API_GUIDE}/change-status`;

    static async getAll() {
        try {
            const response = await api.get(this.#API_GUIDE_ALL);
            const data = response.data;
            return Array.isArray(data) ? data : Object.values(data);
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    static async getAllForUser(login) {
        try {
            const response = await api.get(this.#API_GUIDE_ALL);
            const data = response.data;
            let filtered = [];
            data.forEach(g => {
                if (g.author === login) {
                    filtered.push(g);
                }
            });
            return filtered;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    static async create(guideCreateDto) {
        try {
            const response = await api.post(this.#API_GUIDE_CREATE, guideCreateDto);
            return response.data;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    static async changeStatus(guideChangeStatusDto) {
        try {
            const response = await api.put(this.#API_GUIDE_CHANGESTATUS, guideChangeStatusDto);
            return response.data;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }
}