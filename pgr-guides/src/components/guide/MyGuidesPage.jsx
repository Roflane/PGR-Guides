import {useEffect, useState} from "react";
import GuideApi from "../../api/GuideApi.js";
import GuideCard from "./GuideCard.jsx";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/selectors/authSelectors.js";
import {API_BASE} from "../../configs/ApiConfig.js";
import CharactersApi from "../../api/ChractersApi.js";
import toast, {Toaster} from "react-hot-toast";

const MyGuidesPage = () => {
    const user = useSelector(selectUser);

    const [characters, setCharacters] = useState([]);
    const [guides, setUserGuides] = useState([]);


    const [clickedGuideId, setClickedGuideId] = useState(0);
    const [createGuideClicked, setCreateGuideClicked] = useState(false);
    const [selectGuideImageClicked, setSelectGuideImageClicked] = useState(false);

    const [selectedCharacter, setSelectedCharacter] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setUserGuides(await GuideApi.getAllForUser(user.login));
                setCharacters(await CharactersApi.getAll());
            } catch (error) {
                console.error(`Error: ${error.message}`);
            }
        };

        if (user?.login) {
            fetchData().then();
        }
    }, [user?.login, refreshTrigger]);

    const handleGuideClick = (guideId) => {
        setClickedGuideId(guideId);
    };

    const handleCreateGuideClicked = () => {
        setCreateGuideClicked(!createGuideClicked);
    }

    const handleSelectGuideImageClicked = () => {
        setSelectGuideImageClicked(!selectGuideImageClicked);
    }

    const handleCharacterSelection = (c) => {
        if (c.image.includes(API_BASE)) {
            setSelectedCharacter(c);
        }
    }

    const handleClose = () => {
        setClickedGuideId(0);
    }

    const handleGuideSubmit = async () => {
        let staticImagePath = "";
        if (selectedCharacter.image.includes(API_BASE)) {
            staticImagePath = selectedCharacter.image.split(API_BASE)[1];
        }

        const dto = {
          roles: user.roles,
          guideDto: {
              title: title,
              author: user.login,
              description: description,
              staticImagePath: staticImagePath,
          }
        };
        if (await GuideApi.create(dto)) {
            setRefreshTrigger(prev => prev + 1);
            toast.success('Successfully created a guide !')
        }
    }


    return (
        <div className="container mx-auto p-4 flex flex-col overflow-hidden">
            <button className="w-32 h-16 scale-[0.73] bg-blue-500 rounded hover:bg-blue-800 transition-colors duration-200"
                onClick={handleCreateGuideClicked}>
                Create Guide
            </button>

            {createGuideClicked && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-6
                            w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto
                            flex gap-6 items-start">

                        {selectGuideImageClicked && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleSelectGuideImageClicked}>
                                <div className="grid md:grid-cols-4 gap-2 bg-gray-800 p-4 rounded-lg">
                                    {characters.map(c => (
                                        <div

                                            className="rounded-lg overflow-hidden border-2 border-black hover:border-blue-500 cursor-pointer transition-all"
                                            onClick={() => { handleCharacterSelection(c)} }
                                        >
                                            <img src={c.image} alt={c.name} className="w-32 h-32 h-scale"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button className="w-32 h-32 border overflow-hidden" onClick={handleSelectGuideImageClicked}>
                            <img src={selectedCharacter.image} alt="" className="w-full h-full object-cover"/>
                        </button>

                        <div className="flex flex-col h-fit w-full">
                            <input
                                type="text"
                                className="w-full bg-transparent border-b-2 border-gray-600 px-3 py-2
                                    text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none
                                    transition-colors duration-200"
                                placeholder="Title"
                                onChange={(t) => setTitle(t.target.value)}
                            />

                            <textarea
                                className="w-full h-64 bg-transparent border-b-2 border-gray-600 px-3 py-2
                                    text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none
                                    transition-colors duration-200 resize-none overflow-hidden"
                                placeholder="Description"
                                onChange={(d) => setDescription(d.target.value)}
                            />

                            <div className="flex justify-center mt-4">
                                <button
                                    className="w-32 h-12 scale-[0.73] bg-blue-500 rounded hover:bg-blue-800 transition-colors duration-200"
                                    onClick={handleGuideSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>

                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleCreateGuideClicked}>
                            <i className="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
            )}


            <div className="flex-1 overflow-y-auto no-scrollbar min-h-0" style={{ maxHeight: 'calc(72vh)' }}>
                {guides.map(g => (
                    <div key={g.id} onClick={() => handleGuideClick(g.id)} className="cursor-pointer">
                        <GuideCard guideCard={{
                            id: g.id,
                            title: g.title,
                            author: g.author,
                            desc: g.description,
                            img: API_BASE + g.staticImagePath
                        }} clickedGuideId={clickedGuideId} onClose={handleClose} />
                    </div>
                ))}
            </div>

            <style>
                {`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
            `}
            </style>

            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
        </div>
    );
}

export default MyGuidesPage;