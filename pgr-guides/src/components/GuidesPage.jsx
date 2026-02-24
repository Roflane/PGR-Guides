import GuideCard from "./GuideCard.jsx";

const TestGuide = {
    img: "/nuke.jpg",
    title: "Test Guide",
    desc: "123123123312312",
}

const GuidesPage = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex gap-4">
               <GuideCard guideCard={TestGuide}/>
            </div>
        </div>
    );
}

export default GuidesPage;