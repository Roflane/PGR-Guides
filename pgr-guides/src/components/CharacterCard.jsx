import EElement from "../enums/EElement.js";

const CharacterCard = ({ character }) => {
    return (
        <div
            className="w-32 h-35 bg-gray-800 shadow-lg border border-gray-700 rounded-lg overflow-hidden flex flex-col
            items-center justify-center hover:scale-110 duration-100"
        >

            <img
                src={character.image}
                alt={character.name}
                onError={(e) => {
                    console.log('Failed to load image:', character.image);
                   // e.target.src = '/default-placeholder.png';
                }}
            />
            <h3 className={`text-sm font-bold mt-1 text-center ${
                character.element === EElement.PHYS ? "text-gray-500" :
                character.element === EElement.FIRE ? "text-red-700" :
                character.element === EElement.LIGHTNING ? "text-yellow-200" :
                character.element === EElement.DARK ? "text-purple-700" :
                character.element === EElement.ICE ? "text-blue-400" :
                character.element === EElement.VOID ? "text-dark-red" :
                "text-white"
            }`}
            >
                {character.name}
            </h3>
        </div>
    );
};

export default CharacterCard;
