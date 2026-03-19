import {API_BASE, API_GUIDE} from "../configs/ApiConfig.js";

export default class GuideApi {
    static #API_GUIDE_ALL = `${API_BASE}${API_GUIDE}/all`;
    static #API_GUIDE_CREATE = `${API_BASE}${API_GUIDE}/create`;

    static async getAll() {
        try {
            const response = await fetch(this.#API_GUIDE_ALL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
                // console.error(`Response status: ${response.status}`);
                // return [];
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

                // console.error(`Response status: ${response.status}`);
                // return [];
            }
            const data = await response.json();
            console.log(data)
            return await response.json().then(r => {
                r.filter(g => g.author === login);
            });
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    static async create(login, title, desc, staticImagePath) {
        try {
            const response = await fetch(this.#API_GUIDE_CREATE, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    author: login,
                    description: desc,
                    staticImagePath: staticImagePath
                })
            });
            return response.ok;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }
}