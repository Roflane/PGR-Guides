const GuideCard = ({ guideCard }) => {
    return (
        <div className="
              bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-4
              flex gap-4 items-start hover:scale-[1.02] transition
              w-full">

            <img
                className="w-32 h-32 object-cover rounded-md flex-shrink-0"
                src={guideCard.img}
                alt={guideCard.title}
            />

            <div className="flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white text-center">
                    {guideCard.title}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                    {guideCard.desc}
                </p>
            </div>

        </div>
    );
};

export default GuideCard;
