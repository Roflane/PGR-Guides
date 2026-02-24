export default class EAffix {
    static #trueslash = 1;
    static #ionization = 2;
    static #ignite = 3;
    static #darkflow = 4;
    static #glaciation = 5;
    static #raydiance = 6;

    static get TRUESLASH()       { return this.#trueslash; }
    static get IONIZATION()      { return this.#ionization; }
    static get IGNITE()          { return this.#ignite; }
    static get DARKFLOW()        { return this.#darkflow; }
    static get GLACIATION()      { return this.#glaciation; }
    static get RAYDIANCE()       { return this.#raydiance; }

    static getName(value) {
        return Object.entries(this).find(([k,v]) => v === value)?.[0] ?? "Unknown";
    }
}