import {API_BASE, API_CHARACTERS} from "../configs/ApiConfig.js";
import api from "../configs/axios.js";

export default class CharactersApi {
    static async getAll() {
        const url = `${API_CHARACTERS}`;
        try {
            const response = await api.get(url);
            const data = response.data;
            return Array.isArray(data) ? data : Object.values(data);
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }
}