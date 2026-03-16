import EElement from "../../enums/EElement.js";
import EAffix from "../../enums/EAffix.js";
import CharacterCard from "./CharacterCard.jsx";
import {useEffect, useState} from "react";
import CharactersApi from "../../api/ChractersApi.js";
import ComboBox from "../element/ComboBox.jsx";
import ProfileApi from "../../api/ProfileApi.js";

const filtersIdx = [0, EElement.PHYS, EElement.FIRE, EElement.LIGHTNING, EElement.DARK, EElement.ICE, EElement.VOID];

const HomePage = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function fetchCharacters() {
            const result = await CharactersApi.getAll();

            if (Array.isArray(result)) {
                setCharacters(result);
            } else {
                setCharacters([]);
            }
        }
        fetchCharacters().then();
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

    const matchEnumElement = () => {
        return filtersIdx.map((f) => (
            <option key={f} value={f}>
                {f === EElement.PHYS ? "Physical" :
                 f === EElement.FIRE ? "Fire" :
                 f === EElement.LIGHTNING ? "Lightning" :
                 f === EElement.DARK ? "Dark" :
                 f === EElement.ICE ? "Ice" :
                 f === EElement.VOID ? "Void" :
                 "All Elements"}
            </option>
        ))
    };

    const matchEnumAffix = () => {
        return filtersIdx.map((f) => (
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
        ))
    };


    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex gap-4">
                <ComboBox
                    filterCb={setFilterElement}
                    mapCb={matchEnumElement}
                    filterNum={filterElement}
                />

                <ComboBox
                    filterCb={setFilterAffix}
                    mapCb={matchEnumAffix}
                    filterNum={filterAffix}
                />
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