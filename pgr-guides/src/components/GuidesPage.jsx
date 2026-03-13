import GuideCard from "./GuideCard.jsx";

const TestGuide = {
    img: "/nuke.jpg",
    title: "Test Guide",
    author: "XD",
    desc: "123131312312312312313131231231231231313123123123",
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