export default class CharactersApi {
    static apiBase = "http://localhost:5177";
    static apiCharacters = "/api/characters";

    static async getAll() {
        const url = this.apiBase + this.apiCharacters;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();

            data.forEach(character => {
                character.image = this.apiBase + character.image;
            })
            console.log(data);
            return Array.isArray(data) ? data : Object.values(data);

        } catch (error) {
            console.error(error.message);
            return [];
        }
    }
}