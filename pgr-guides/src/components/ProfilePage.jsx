import {useSelector} from "react-redux";
import {selectImagePath, selectUser} from "../store/selectors/authSelectors.js";

const ProfilePage = () => {
    const imagePath = useSelector(selectImagePath);
    const user = useSelector(selectUser);

    return (
        <div className="flex flex-col items-center mt-16 ml-8">
            <img
                className="w-32 h-32 rounded-full border-2 border-red-500"
                src={imagePath}
                alt=""
            />
            <a className="font-bold text-black text-4xl mt-4">{user.login}</a>
            <a className="mt-8">Register date | {user.registerDate}</a>
        </div>
    );
};

export default ProfilePage;