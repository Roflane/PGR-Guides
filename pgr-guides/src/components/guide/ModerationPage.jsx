import GuideCard from "./GuideCard.jsx";
import {API_BASE} from "../../configs/ApiConfig.js";
import {useEffect, useState} from "react";
import GuideApi from "../../api/GuideApi.js";
import toast, {Toaster} from "react-hot-toast";

const ModerationPage = () => {
    const [guides, setGuides] = useState([]);
    const [clickedGuideId, setClickedGuideId] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchGuides = async () => {
            const guides = await GuideApi.getAll();
            setGuides(guides.filter(g => g.guideStatus === "MODERATION"));
        }
        fetchGuides().then();
    }, [refreshTrigger]);

    const handleGuideClick = (guideId) => {
        setClickedGuideId(guideId);
    };

    const handleClose = () => {
        setClickedGuideId(0);
    }

    const handleAcceptGuide = (id) => {
        const changeGuideStaus = async () => {
            try {
                const res = await GuideApi.changeStatus({id: id, guideStatus: "RELEASED"});
                if (res) {
                    setRefreshTrigger(prev => prev + 1);
                    toast.success('Successfully accepted a guide !')
                }
            }
            catch (error) {
                console.error(`Error: ${error.message}`);
            }
        }
        changeGuideStaus().then();
    }

    return (
        <div className="container mx-auto p-4 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scrollbar min-h-0" style={{ maxHeight: 'calc(77vh)' }}>
                {guides.map(g => (
                    <div className="container mx-auto p-4 flex flex-col overflow-hidden">
                        <div key={g.id} onClick={() => handleGuideClick(g.id)} className="cursor-pointer">
                            <GuideCard
                                guideCard={{
                                    id: g.id,
                                    title: g.title,
                                    author: g.author,
                                    desc: g.description,
                                    img: API_BASE + g.staticImagePath
                                }}
                                clickedGuideId={clickedGuideId} onClose={handleClose}/>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button className="w-32 h-16 scale-[0.73] bg-green-500 rounded hover:bg-green-800 transition-colors duration-200"
                                onClick={() => handleAcceptGuide(g.id)}>
                                Accept
                            </button>
                        </div>
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

export default ModerationPage;