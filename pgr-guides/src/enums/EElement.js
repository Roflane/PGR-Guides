export default class EElement {
    static #phys = 1;
    static #fire = 2;
    static #lightning = 3;
    static #dark = 4;
    static #ice = 5;
    static #void = 6;

    static get PHYS()            { return this.#phys; }
    static get FIRE()            { return this.#fire; }
    static get LIGHTNING()       { return this.#lightning; }
    static get DARK()            { return this.#dark; }
    static get ICE()             { return this.#ice; }
    static get VOID()            { return this.#void; }
}