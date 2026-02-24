import EElement from "../enums/EElement.js";
import EAffix from "../enums/EAffix.js";
import CharacterCard from "./CharacterCard";
import {useEffect, useState} from "react";
import ChractersApi from "../api/ChractersApi";
import CharactersApi from "../api/ChractersApi";

const TeddySpectre = {
    name: "Teddy: Spectre",
    img: "/teddy-spectre.png",
    element: EElement.ICE,
    affix: EAffix.RAYDIANCE
};

const RosettaArete = {
    name: "Rosetta: Arete",
    img: "/rosetta-arete.png",
    element: EElement.DARK,
    affix: EAffix.TRUESLASH
};

const Vergil = {
    name: "Vergil",
    img: "/버질.png",
    element: EElement.PHYS,
    affix: EAffix.TRUESLASH
};

//const allCharacters = [TeddySpectre, RosettaArete, Vergil];
const filtersIdx = [0, EElement.PHYS, EElement.FIRE, EElement.LIGHTNING, EElement.DARK, EElement.ICE, EElement.VOID];

const HomePage = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCharacters() {
            const result = await CharactersApi.getAll();
            if (Array.isArray(result)) {
                setCharacters(result);
            } else {
                setCharacters([]);
            }
            setLoading(false);
        }
        fetchCharacters();
    }, []);

    const [filterElement, setFilterElement] = useState(0);
    const [filterAffix, setFilterAffix] = useState(0);

    const filteredCharacters =
        filterElement === 0 && filterAffix === 0 ? characters :
            characters.filter(
                (c) =>
                    c.element === filterElement && c.affix === filterAffix ||
                    filterElement === 0 && c.affix === filterAffix ||
                    filterAffix === 0 && c.element === filterElement
            );

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex gap-4">
                <select
                    className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterElement}
                    onChange={(e) => setFilterElement(Number(e.target.value))}
                >
                    {filtersIdx.map((f) => (
                        <option key={f} value={f}>{
                            f === EElement.PHYS ? "Physical" :
                            f === EElement.FIRE ? "Fire" :
                            f === EElement.LIGHTNING ? "Lightning" :
                            f === EElement.DARK ? "Dark" :
                            f === EElement.ICE ? "Ice" :
                            f === EElement.VOID ? "Void" :
                            "All Elements"
                        }
                        </option>
                    ))}
                </select>

                <select
                    className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterAffix}
                    onChange={(e) => setFilterAffix(Number(e.target.value))}
                >
                    {filtersIdx.map((f) => (
                        <option key={f} value={f}>{
                            f === EAffix.TRUESLASH ? "Trueslash" :
                            f === EAffix.IONIZATION ? "Ionization" :
                            f === EAffix.IGNITE ? "Ignite" :
                            f === EAffix.DARKFLOW ? "Darkflow" :
                            f === EAffix.GLACIATION ? "Glaciation" :
                            f === EAffix.RAYDIANCE ? "Raydiance" :
                            "All Affixes"
                        }
                        </option>
                    ))}
                </select>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
                {filteredCharacters.map((c) => (
                    <CharacterCard key={c.name} character={c} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;