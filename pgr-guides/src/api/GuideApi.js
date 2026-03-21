import {API_BASE, API_GUIDE} from "../configs/ApiConfig.js";

export default class GuideApi {
    static #API_GUIDE_ALL = `${API_BASE}${API_GUIDE}/all`;
    static #API_GUIDE_CREATE = `${API_BASE}${API_GUIDE}/create`;
    static #API_GUIDE_CHANGESTATUS = `${API_BASE}${API_GUIDE}/change-status`;

    static async getAll() {
        try {
            const response = await fetch(this.#API_GUIDE_ALL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();

            return Array.isArray(data) ? data : Object.values(data);
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    static async getAllForUser(login) {
        try {
            const response = await fetch(this.#API_GUIDE_ALL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
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
            const response = await fetch(this.#API_GUIDE_CREATE, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guideCreateDto)
            });
            return response.ok;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    static async changeStatus(guideChangeStatusDto) {
        try {
            const response = await fetch(this.#API_GUIDE_CHANGESTATUS, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guideChangeStatusDto)
            });
            return response.ok;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }
}