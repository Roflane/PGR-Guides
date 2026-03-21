import GuideCard from "./GuideCard.jsx";
import {useEffect, useState} from "react";
import GuideApi from "../../api/GuideApi.js";
import {API_BASE} from "../../configs/ApiConfig.js";

const GuidesPage = () => {
    const [guides, setGuides] = useState([]);
    const [clickedGuideId, setClickedGuideId] = useState(0);

    useEffect(() => {
        const fetchGuides = async () => {
            const guides = await GuideApi.getAll();
            setGuides(guides.filter(g => g.guideStatus === "RELEASED"));
        }
        fetchGuides().then();
    }, []);

    const handleGuideClick = (guideId) => {
        setClickedGuideId(guideId);
    };

    const handleClose = () => {
        setClickedGuideId(0);
    }

    return (
        <div className="container mx-auto p-4 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scrollbar min-h-0" style={{ maxHeight: 'calc(77vh)' }}>
                {guides.map(g => (
                    <div key={g.id} onClick={()=> handleGuideClick(g.id)} className="cursor-pointer">
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
        </div>
    );
}

export default GuidesPage;