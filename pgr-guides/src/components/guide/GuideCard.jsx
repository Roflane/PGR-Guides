const GuideCard = ({ guideCard, clicked }) => {
    return (
        <>
            {!clicked && (
                <div className="
                  bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-4
                  flex gap-4 items-start hover:scale-[1.02] transition
                  w-full relative">
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
                            Author: {guideCard.author}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            Desc: {guideCard.desc}
                        </p>
                    </div>
                </div>
            )}

            {clicked && (
                <div className="
                  fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="
                      bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-6
                      w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto
                      flex gap-6 items-start">

                        <img
                            className="w-64 h-64 object-cover rounded-md flex-shrink-0"
                            src={guideCard.img}
                            alt={guideCard.title}
                        />

                        <div className="flex flex-col flex-1">
                            <h3 className="text-2xl font-bold text-white text-center mb-4">
                                {guideCard.title}
                            </h3>

                            <p className="text-sm text-gray-400 mb-2">
                                <span className="font-semibold text-white">Author:</span> {guideCard.author}
                            </p>

                            <p className="text-sm text-gray-400">
                                <span className="font-semibold text-white">Description:</span> {guideCard.desc}
                            </p>

                            {guideCard.content && (
                                <div className="mt-4 text-gray-300">
                                    {guideCard.content}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GuideCard;