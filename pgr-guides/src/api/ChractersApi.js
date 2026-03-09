import {API_BASE, API_CHARACTERS} from "../configs/ApiConfig.js";

export default class CharactersApi {

    static async getAll() {
        const url = API_BASE + API_CHARACTERS;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();

            data.forEach(character => {
                character.image = API_BASE + character.image;
            })
            //console.log(data);
            return Array.isArray(data) ? data : Object.values(data);

        } catch (error) {
            console.error(error.message);
            return [];
        }
    }
}