import GuideCard from "./GuideCard.jsx";
import {API_BASE} from "../../configs/ApiConfig.js";
import {useEffect, useState} from "react";
import GuideApi from "../../api/GuideApi.js";

const ModerationPage = () => {
    const [guides, setGuides] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const fetchGuides = async () => {
            const guides = await GuideApi.getAll();
            setGuides(guides);
        }
        fetchGuides().then();
    }, []);

    const handleGuideClick = () => {
        setClicked(!clicked);
    };

    return (
        <div className="container mx-auto p-4 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scrollbar min-h-0" style={{ maxHeight: 'calc(77vh)' }}>
                {guides.map(g => (
                    <div key={g.id} onClick={() => handleGuideClick()} className="cursor-pointer mb-4">
                        <GuideCard guideCard={{
                            title: g.title,
                            author: g.author,
                            desc: g.description,
                            img: API_BASE + g.staticImagePath
                        }} clicked={clicked} />
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

export default ModerationPage;